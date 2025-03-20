import { Link, FileText, ChevronLeft, Loader } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { StartWithTemplate } from "./StartWithTemplate";
import {
  CharacterCreationMethod,
  CharacterTemplate,
} from "../../types/character";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UrlPlaceholder from "../../assets/url-placeholder.png";
import TextPlaceholder from "../../assets/prompt-placeholder.png";
import { useState } from "react";

// Define different steps for character creation
type CreationStep = "options" | "text-input" | "url-input" | "examples";

// Define props for the CharacterCreationSteps component
interface CharacterCreationStepsProps {
  creationStep: CreationStep;
  theme: "dark" | "light";
  url: string;
  textDescription: string;
  examples: CharacterTemplate[];
  setUrl: (url: string) => void;
  setTextDescription: (description: string) => void;
  setCreationStep: (step: CreationStep) => void;
  handleSelectCreationMethod: (method: CharacterCreationMethod) => void;
  handleCreateWithText: () => void;
  handleCreateWithUrl: () => void;
  handleSelectTemplate: (templateId: string) => void;
}

// Character creation steps component
export const CharacterCreationSteps = ({
  creationStep,
  theme,
  url,
  textDescription,
  examples,
  setUrl,
  setTextDescription,
  setCreationStep,
  handleSelectCreationMethod,
  handleCreateWithText,
  handleCreateWithUrl,
  handleSelectTemplate,
}: CharacterCreationStepsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Handle character creation via URL with a loading state
  const handleCreateWithUrlWithLoading = () => {
    setIsLoading(true);
    handleCreateWithUrl();
  };

  // Handle character creation via text with a loading state
  const handleCreateWithTextWithLoading = () => {
    setIsLoading(true);
    handleCreateWithText();
  };

  // Render skeleton UI while data is loading
  const renderSkeletonUI = () => {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Skeleton height={30} width={200} />
          <Skeleton height={20} width={300} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={40} />
            </Card>
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={40} />
            </Card>
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={100} />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={100} />
            </Card>
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={100} />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={100} />
            </Card>
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={20} width={150} className="ml-2" />
              </div>
              <Skeleton height={40} />
              <Skeleton height={40} className="mt-4" />
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Step 1: Show creation options
  if (creationStep === "options") {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 max-w-3xl mx-auto ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-10 text-center">
          Create Your Character
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Smart Link Create Option */}
          <Card
            className={`p-6 cursor-pointer transition-colors border ${
              theme === "dark"
                ? "bg-gray-900 hover:bg-black border-gray-800"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
            onClick={() => handleSelectCreationMethod("url")}
          >
            <div className="flex items-center mb-2">
              <div
                className={`p-2 rounded-full mr-3 ${
                  theme === "dark" ? "bg-black" : "bg-gray-100"
                }`}
              >
                <Link size={24} />
              </div>
              <h3 className="text-xl font-semibold">Smart Link Create</h3>
            </div>

            <p
              className={`mb-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Best for creating existing characters from anime, manga, games,
              and more.
            </p>

            <div
              className={`rounded-lg p-4 mb-4 ${
                theme === "dark" ? "bg-black" : "bg-gray-100"
              }`}
            >
              <img
                src={UrlPlaceholder}
                alt="URL input example"
                className="w-full rounded"
              />
            </div>

            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Copy and paste a character-related URL, and we'll instantly create
              a fully interactive AI character.
            </p>
          </Card>

          {/* One-Line Create Option */}
          <Card
            className={`p-6 cursor-pointer transition-colors border ${
              theme === "dark"
                ? "bg-gray-900 hover:bg-black border-gray-800"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
            onClick={() => handleSelectCreationMethod("text")}
          >
            <div className="flex items-center mb-2">
              <div
                className={`p-2 rounded-full mr-3 ${
                  theme === "dark" ? "bg-black" : "bg-gray-100"
                }`}
              >
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-semibold">One-Line Create</h3>
            </div>

            <p
              className={`mb-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Best for quickly creating unique, personalized characters.
            </p>

            <div
              className={`rounded-lg p-4 mb-4 ${
                theme === "dark" ? "bg-black" : "bg-gray-100"
              }`}
            >
              <img
                src={TextPlaceholder}
                alt="Text input example"
                className="w-full rounded"
              />
            </div>

            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Describe your character in one sentence, and we'll create it for
              you.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: URL Input
  if (creationStep === "url-input") {
    if (isLoading) {
      return renderSkeletonUI();
    }

    return (
      <div
        className={`flex flex-col p-6 max-w-2xl mx-auto ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        <button
          onClick={() => setCreationStep("options")}
          className={`flex items-center mb-6 self-start transition-colors ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <ChevronLeft size={20} />
          <span>Back to options</span>
        </button>

        <div
          className={`rounded-lg p-6 mb-8 ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          <h3 className="text-lg font-medium mb-4">Wiki, Blog, or Website</h3>
          <Input
            placeholder="https://fandom.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCreateWithUrlWithLoading}
              disabled={!url.trim() || isLoading}
              variant="primary"
              className="flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>

        <StartWithTemplate
          examples={examples}
          onSelectTemplate={handleSelectTemplate}
          theme={theme}
        />
      </div>
    );
  }

  // Step 2: Text Input
  if (creationStep === "text-input") {
    if (isLoading) {
      return renderSkeletonUI();
    }

    return (
      <div
        className={`flex flex-col p-6 max-w-2xl mx-auto ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        <button
          onClick={() => setCreationStep("options")}
          className={`flex items-center mb-6 self-start transition-colors ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <ChevronLeft size={20} />
          <span>Back to options</span>
        </button>

        <div
          className={`rounded-lg p-6 mb-8 ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          <h3 className="text-lg font-medium mb-4">Persona</h3>
          <TextArea
            placeholder="Describe your character in one sentence..."
            value={textDescription}
            onChange={(e) => setTextDescription(e.target.value)}
            fullWidth
            rows={2}
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCreateWithTextWithLoading}
              disabled={!textDescription.trim() || isLoading}
              variant="primary"
              className="flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>

        <StartWithTemplate
          examples={examples}
          onSelectTemplate={handleSelectTemplate}
          theme={theme}
        />
      </div>
    );
  }

  return null;
};
