import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CharacterTemplate } from "../../types/character";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

// Define props for the StartWithTemplate component
interface StartWithTemplateProps {
  examples: CharacterTemplate[];
  onSelectTemplate: (templateId: string) => void;
  theme: "dark" | "light";
}

// Component to display example character templates
export const StartWithTemplate = ({
  examples,
  onSelectTemplate,
  theme,
}: StartWithTemplateProps) => {
  const [currentExamplePage, setCurrentExamplePage] = useState(0);
  //   let pageSize = 3;

  // Determine how many examples to show per page based on device type
  const pageSize = examples.length
    ? isDesktop
      ? 3
      : isTablet
      ? 2
      : examples.length
    : 1;

  const maxPage = examples.length ? Math.ceil(examples.length / pageSize) : 1;

  // Go to the next example page
  const nextExamplePage = () => {
    if (examples.length === 0) return; // Prevent errors if there are no examples

    setCurrentExamplePage((prev) => {
      if (prev >= maxPage - 1) return prev; // Stay at last page if max reached
      return (prev + 1) % examples.length; // Cycle through pages
    });
  };

  const prevExamplePage = () => {
    if (examples.length === 0 || currentExamplePage === 0) return; // Prevent errors

    setCurrentExamplePage(
      (prev) => (prev - 1 + examples.length) % examples.length
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mb-4">Start with examples</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {examples
          .slice(
            currentExamplePage * pageSize,
            (currentExamplePage + 1) * pageSize
          )
          .map((example) => (
            <div
              key={example.id}
              className="rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onSelectTemplate(example.id)}
            >
              <div className="relative">
                <img
                  src={example.image}
                  alt={example.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <span className="text-white/70 text-sm">
                    {example.category}
                  </span>
                  <span className="text-white font-medium text-lg">
                    {example.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="hidden md:flex justify-center items-center space-x-2 mb-6">
        <button
          onClick={prevExamplePage}
          className={`p-2 rounded-full ${
            theme === "dark"
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Previous examples"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextExamplePage}
          className={`p-2 rounded-full ${
            theme === "dark"
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Next examples"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
