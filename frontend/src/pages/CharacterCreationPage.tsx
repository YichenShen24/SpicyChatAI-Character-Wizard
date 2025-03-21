import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreationSteps } from "../components/characters/CharacterCreationSteps";
import { useCharacterStore } from "../store/characterStore";
import { useThemeStore } from "../store/themeStore";
import { CharacterCreationMethod } from "../types/character";
import { useToast } from "../components/ui/Toast";

type CreationStep = "options" | "text-input" | "url-input" | "examples";

export const CharacterCreationPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { showToast } = useToast();

  const {
    examples,
    creationMethod: storeCreationMethod,
    setCreationMethod,
    setCreationParams,
    createCharacter,
    fetchTemplates,
  } = useCharacterStore();

  const [textDescription, setTextDescription] = useState("");
  const [url, setUrl] = useState("");
  const [creationStep, setCreationStep] = useState<CreationStep>("options");
  //   console.log("1st", creationStep, storeCreationMethod);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  useEffect(() => {
    if (storeCreationMethod === "text") {
      setCreationStep("text-input");
    } else if (storeCreationMethod === "url") {
      setCreationStep("url-input");
    }
  }, [storeCreationMethod]);

  const handleCreateWithText = async () => {
    if (!textDescription.trim()) return;

    try {
      setCreationMethod("text");
      setCreationParams({ textDescription });
      const character = await createCharacter();

      if (character) {
        showToast("Character created successfully!", "success");
        navigate(`/character/${character.id}`);
      }
    } catch (error) {
      showToast(
        `Failed to create character: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    }
  };

  const handleCreateWithUrl = async () => {
    if (!url.trim()) return;

    try {
      setCreationMethod("url");
      setCreationParams({ url });
      const character = await createCharacter();

      if (character) {
        showToast("Character created successfully!", "success");
        navigate(`/character/${character.id}`);
      }
    } catch (error) {
      showToast(
        `Failed to create character: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    }
  };

  const handleSelectTemplate = async (templateId: string) => {
    try {
      setCreationMethod("template");
      setCreationParams({ templateId });
      const character = await createCharacter();

      if (character) {
        showToast("Character created successfully!", "success");
        navigate(`/character/${character.id}`);
      }
    } catch (error) {
      showToast(
        `Failed to create character: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    }
  };

  const handleSelectCreationMethod = (method: CharacterCreationMethod) => {
    setCreationMethod(method);
    if (method === "text") {
      setCreationStep("text-input");
    } else if (method === "url") {
      setCreationStep("url-input");
    }
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <CharacterCreationSteps
        creationStep={creationStep}
        theme={theme}
        url={url}
        textDescription={textDescription}
        examples={examples}
        setUrl={setUrl}
        setTextDescription={setTextDescription}
        setCreationStep={setCreationStep}
        handleSelectCreationMethod={handleSelectCreationMethod}
        handleCreateWithText={handleCreateWithText}
        handleCreateWithUrl={handleCreateWithUrl}
        handleSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};
