import { useEffect, useState } from "react";
import { href, useParams } from "react-router-dom";
import { Image, ChevronDown, ChevronUp } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import { useToast } from "../ui/Toast";
import { useCharacterStore } from "../../store/characterStore";
import { Character } from "../../types/character";
import { useThemeStore } from "../../store/themeStore";
import { getErrorMessage } from "../../utils/errors";

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentCharacter,
    loading,
    fetchCharacter,
    updateCharacter,
    generateAvatar,
  } = useCharacterStore();
  const [character, setCharacter] = useState<Partial<Character>>({});
  const [avatarPrompt, setAvatarPrompt] = useState("");
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      fetchCharacter(id);
    }
  }, [id, fetchCharacter]);

  useEffect(() => {
    if (currentCharacter) {
      setCharacter(currentCharacter);
      setAvatarPrompt(currentCharacter.avatarPrompt || "");
    }
  }, [currentCharacter]);

  const handleInputChange = (field: keyof Character, value: string) => {
    setCharacter((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field: keyof Character) => {
    if (id) {
      // Check if the field is empty or undefined
      if (
        !character[field] ||
        (typeof character[field] === "string" &&
          (character[field] as string).trim() === "")
      ) {
        showToast(
          `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty!`,
          "error"
        );
        return;
      }

      try {
        await updateCharacter(id, { [field]: character[field] });
        showToast(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } updated successfully!`,
          "success"
        );
      } catch (error) {
        showToast(
          `Failed to update ${field}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          "error"
        );
      }
    }
  };

  const handleGenerateAvatar = async () => {
    if (id && avatarPrompt) {
      setIsGeneratingAvatar(true);
      try {
        await generateAvatar(id, avatarPrompt);
        // Also update the avatarPrompt field
        await updateCharacter(id, { avatarPrompt });
        showToast("Avatar generated successfully!", "success");
      } catch (error) {
        console.log("detailpage - error", error);
        showToast(` ${getErrorMessage(error)}`, "error");
      } finally {
        setIsGeneratingAvatar(false);
      }
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-8 rounded-lg ${
        theme === "dark" ? "text-white bg-black" : "text-gray-900 bg-white"
      }`}
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create Your Own Chatbot</h2>
        <a
          href="https://your-guide-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm sm:hidden block mt-2"
        >
          Creation Guide
        </a>
        <a
          href="https://your-guide-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-sm hidden sm:block"
        >
          Read Our Chatbot Creation Guide
        </a>
      </div>

      {/* Character Fields */}

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="text-lg font-semibold">Name</label>
          <p className="text-xs text-gray-500 mb-2">
            The name can include first and last names.
          </p>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <Input
              className="w-full"
              value={character.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={() => handleSave("name")}
            />
          )}
        </div>

        {/* Title Field */}
        <div>
          <label className="text-lg font-semibold">Title</label>
          <p className="text-xs text-gray-500 mb-2">
            Short sentence describing your chatbot, for display only.
          </p>
          {loading ? (
            <Skeleton height={40} />
          ) : (
            <Input
              className="w-full"
              value={character.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
              onBlur={() => handleSave("title")}
            />
          )}
        </div>

        {/* Greeting Field */}
        <div>
          <label className="text-lg font-semibold">Greeting</label>
          <p className="text-xs text-gray-500 mb-2">
            What will they say to start a conversation?
          </p>
          {loading ? (
            <Skeleton height={100} />
          ) : (
            <TextArea
              className="w-full"
              value={character.greeting || ""}
              onChange={(e) => handleInputChange("greeting", e.target.value)}
              onBlur={() => handleSave("greeting")}
            />
          )}
        </div>

        {/* Personality Field */}
        <div>
          <label className="text-lg font-semibold">Chatbot's Personality</label>
          <p className="text-xs text-gray-500 mb-2">
            In a few sentences, describe your chatbot’s personality.
          </p>
          {loading ? (
            <Skeleton height={100} />
          ) : (
            <TextArea
              className="w-full"
              value={character.personality || ""}
              onChange={(e) => handleInputChange("personality", e.target.value)}
              onBlur={() => handleSave("personality")}
            />
          )}
        </div>
      </div>

      <Card className="mb-4 mt-6">
        <div className="flex items-center mb-3">
          <Image className="text-pink-500" />
          <h3 className="text-lg font-semibold ml-2">Avatar Generation</h3>
        </div>

        {loading ? (
          <Skeleton height={40} />
        ) : (
          <>
            <div className="mb-4">
              {currentCharacter?.avatarUrl && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={currentCharacter.avatarUrl}
                    alt={currentCharacter.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              )}

              <TextArea
                label="Avatar Prompt"
                placeholder="Describe how the avatar should look..."
                value={avatarPrompt}
                onChange={(e) => setAvatarPrompt(e.target.value)}
                fullWidth
              />
            </div>

            <Button
              onClick={handleGenerateAvatar}
              disabled={isGeneratingAvatar || !avatarPrompt.trim()}
              fullWidth
            >
              {isGeneratingAvatar ? "Generating..." : "Generate Avatar"}
            </Button>
          </>
        )}
      </Card>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mt-2 rounded-md">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Advanced Options Toggle */}
      <div className="mt-6">
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center"
        >
          {showAdvanced ? "Hide" : "Advanced"}
          {showAdvanced ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="ml-2" />
          )}
        </Button>
      </div>

      {/* Advanced Options (Hidden by Default) */}
      {showAdvanced && (
        <div className="mt-6 space-y-6">
          {/* Scenario Field */}
          <div>
            <label className="text-gray-400 text-sm">Scenario</label>
            <p className="text-xs text-gray-500 mb-2">
              Describe the current situation and context of the conversation.
            </p>
            {loading ? (
              <Skeleton height={100} />
            ) : (
              <TextArea
                className="w-full"
                value={character.scenario || ""}
                onChange={(e) => handleInputChange("scenario", e.target.value)}
                onBlur={() => handleSave("scenario")}
              />
            )}
          </div>

          {/* Example Dialogue Field */}
          <div>
            <label className="text-gray-400 text-sm">Example Dialogue</label>
            <p className="text-xs text-gray-500 mb-2">
              Provide example conversations to define your chatbot's speech
              style.
            </p>
            {loading ? (
              <Skeleton height={100} />
            ) : (
              <TextArea
                className="w-full"
                value={character.exampleDialogue || ""}
                onChange={(e) =>
                  handleInputChange("exampleDialogue", e.target.value)
                }
                onBlur={() => handleSave("exampleDialogue")}
              />
            )}
          </div>
        </div>
      )}

      {/* Submit Button
      <div className="mt-8">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
          Submit
        </Button>
      </div> */}
    </div>
  );
};
