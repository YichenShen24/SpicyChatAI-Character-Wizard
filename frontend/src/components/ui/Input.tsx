import { InputHTMLAttributes, forwardRef } from "react";
import { useThemeStore } from "../../store/themeStore"; // Import theme state manager

// Define props for the Input component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label
  error?: string; // Error message
  fullWidth?: boolean; // If true, input takes full width
}

// Input Component with ref support
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = "", ...props }, ref) => {
    const { theme } = useThemeStore(); // Get current theme (dark or light)

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {/* Apply full width if enabled */}
        {label && (
          <label
            className={`block text-sm font-medium mb-1 ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref} // Forward ref for form handling
          className={`
            w-full px-3 py-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 placeholder:text-gray-500 text-white"
                : "bg-white border border-gray-300 placeholder:text-gray-400 text-gray-900"
            }
            ${
              error ? "border-red-500" : ""
            } // Highlight input if there's an error
            ${className}
          `}
          {...props}
        />
        {error && ( // Display error message if provided
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
