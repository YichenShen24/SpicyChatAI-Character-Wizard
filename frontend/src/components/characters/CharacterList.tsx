import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Edit, Trash2, AlertTriangle, X } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useCharacterStore } from "../../store/characterStore";
import { Character } from "../../types/character";
import { useThemeStore } from "../../store/themeStore";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const CharacterList = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { characters, loading, fetchCharacters, deleteCharacter } =
    useCharacterStore();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<string | null>(
    null
  );

  // Add custom CSS for popup
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement("style");
    const darkModeStyles =
      theme === "dark"
        ? `
        .popup-overlay {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .popup-content {
          background-color: #1F2937 !important;
          color: white !important;
          border: 1px solid #374151 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2) !important;
        }
        .popup-content button:hover {
          background-color: #374151;
        }
      `
        : `
        .popup-overlay {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .popup-content {
          background-color: white !important;
          color: #1F2937 !important;
          border: 1px solid #E5E7EB !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }
        .popup-content button:hover {
          background-color: #F3F4F6;
        }
      `;

    styleEl.innerHTML = `
      .popup-overlay {
        backdrop-filter: blur(2px);
      }
      .popup-content {
        border-radius: 0.5rem !important;
        padding: 0 !important;
        width: auto !important;
        max-width: 500px !important;
        animation: popupFadeIn 0.3s ease-out;
      }
      @keyframes popupFadeIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      ${darkModeStyles}
    `;

    // Append to head
    document.head.appendChild(styleEl);

    // Cleanup
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [theme]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleEditCharacter = (id: string) => {
    navigate(`/character/${id}`);
  };

  const handleDeleteCharacter = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setCharacterToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = async () => {
    if (characterToDelete) {
      await deleteCharacter(characterToDelete);
      setIsDeletePopupOpen(false);
      setCharacterToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeletePopupOpen(false);
    setCharacterToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className={`p-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Characters</h2>
          <div
            className={`animate-pulse h-10 w-32 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-lg p-4 animate-pulse ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-200"
              }`}
            >
              <div
                className={`h-6 rounded mb-3 w-3/4 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-4 rounded mb-2 w-1/2 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`h-20 rounded mb-4 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                }`}
              ></div>
              <div className="flex justify-between">
                <div
                  className={`h-8 rounded w-20 ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`h-8 rounded w-20 ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Display character list
  return (
    <div className={`p-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Characters</h2>
        <Button onClick={() => navigate("/")} variant="primary">
          Character Wizard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character: Character) => (
          <Card
            key={character.id}
            className={`cursor-pointer transition-colors ${
              theme === "dark"
                ? "bg-gray-900 hover:bg-black"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleEditCharacter(character.id)}
          >
            <div className="flex flex-col items-start mb-3">
              {character.avatarUrl && (
                <div className="w-full aspect-square mb-3 overflow-hidden flex items-center justify-center self-center">
                  <img
                    src={character.avatarUrl}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{character.name}</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {character.title}
                </p>
              </div>
            </div>

            <p
              className={`text-sm mb-4 line-clamp-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {character.personality}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div
                className={`flex flex-col text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  Created: {formatDate(character.createdAt)}
                </span>
                <span className="flex items-center mt-1">
                  <Clock size={14} className="mr-1" />
                  Updated: {formatDate(character.updatedAt)}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCharacter(character.id);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  }`}
                  aria-label="Edit character"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => handleDeleteCharacter(character.id, e)}
                  className={`p-1.5 rounded-full transition-colors ${
                    theme === "dark"
                      ? "hover:bg-red-900"
                      : "hover:bg-red-100 text-red-500"
                  }`}
                  aria-label="Delete character"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Popup
        open={isDeletePopupOpen}
        onClose={cancelDelete}
        modal
        nested
        className="character-delete-popup"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Delete Character</h3>
            <button
              onClick={cancelDelete}
              className={`p-1 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
              aria-label="Close"
            >
              <X size={18} className="text-red-500" />
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div
              className={`p-2 mr-3 rounded-full ${
                theme === "dark" ? "bg-red-900" : "bg-red-100"
              }`}
            >
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <p>
              Are you sure you want to delete this character? This action cannot
              be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              onClick={cancelDelete}
              variant="outline"
              className={`border ${
                theme === "dark"
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              variant="primary"
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};
