import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreationSteps } from "../components/characters/CharacterCreationSteps";
import { useCharacterStore } from "../store/characterStore";
import { useThemeStore } from "../store/themeStore";
import { CharacterCreationMethod } from "../types/character";

type CreationStep = "options" | "text-input" | "url-input" | "examples";

export const CharacterCreationPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
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

    setCreationMethod("text");
    setCreationParams({ textDescription });
    const character = await createCharacter();

    if (character) {
      navigate(`/character/${character.id}`);
    }
  };

  const handleCreateWithUrl = async () => {
    if (!url.trim()) return;

    setCreationMethod("url");
    setCreationParams({ url });
    const character = await createCharacter();

    if (character) {
      navigate(`/character/${character.id}`);
    }
  };

  const handleSelectTemplate = async (templateId: string) => {
    setCreationMethod("template");
    setCreationParams({ templateId });
    const character = await createCharacter();

    if (character) {
      navigate(`/character/${character.id}`);
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
    <div className="container mx-auto px-4">
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
