import { ReactNode } from "react";
import { useThemeStore } from "../../store/themeStore"; // Import theme state manager

// Define props for the Card component
interface CardProps {
  children: ReactNode; // Content inside the card
  className?: string; // Custom styling
  onClick?: () => void; // Click event handler
}

// Card Component
export const Card = ({ children, className = "", onClick }: CardProps) => {
  const { theme } = useThemeStore(); // Get current theme (dark or light)

  return (
    <div
      className={`rounded-lg p-4 shadow-lg ${
        theme === "dark" ? "bg-gray-900" : "bg-white" // Dark mode or light mode background
      } ${className}`}
      onClick={onClick} // Handle click event if provided
    >
      {children} {/* Render card content */}
    </div>
  );
};
