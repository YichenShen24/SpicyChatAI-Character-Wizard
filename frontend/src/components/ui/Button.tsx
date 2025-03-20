import { ButtonHTMLAttributes, ReactNode } from "react"; // Import types for button props
import { useThemeStore } from "../../store/themeStore"; // Import theme state manager

// Define props for the Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

// Button Component
export const Button = ({
  children, // Button label or content
  variant = "primary", // Default variant is 'primary'
  size = "md", // Default size is 'md'
  fullWidth = false, // Default is not full width
  className = "", // Allow custom classes
  ...props // Spread other button attributes
}: ButtonProps) => {
  const { theme } = useThemeStore(); // Get the current theme (dark or light)

  // Base button styles (applied to all buttons)
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

  // Define styles for different button variants
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white", // Blue button
    secondary:
      theme === "dark"
        ? "bg-gray-800 hover:bg-gray-700 text-white" // Dark mode: Gray button
        : "bg-gray-200 hover:bg-gray-300 text-gray-800", // Light mode: Light gray button
    outline:
      theme === "dark"
        ? "border border-gray-700 hover:bg-gray-800 text-gray-200" // Dark mode: Outlined button
        : "border border-gray-300 hover:bg-gray-100 text-gray-800", // Light mode: Outlined button
    ghost:
      theme === "dark"
        ? "hover:bg-gray-800 text-gray-300" // Dark mode: Transparent button
        : "hover:bg-gray-100 text-gray-600", // Light mode: Transparent button
  };

  // Define styles for different button sizes
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5", // Small button
    md: "text-base px-4 py-2", // Medium button (default)
    lg: "text-lg px-6 py-3", // Large button
  };

  // Apply full width if `fullWidth` is true
  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`}
      {...props} // Pass down all other button props
    >
      {children} {/* Render button text or content */}
    </button>
  );
};
