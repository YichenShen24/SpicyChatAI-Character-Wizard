import { Menu } from "lucide-react"; // Import menu icon from lucide-react
import { ThemeToggle } from "./ThemeToggle"; // Import theme switch component
import { useThemeStore } from "../../store/themeStore"; // Import theme state manager

// Define props for the Header component
interface HeaderProps {
  toggleSidebar: () => void; // Function to toggle sidebar
}

// Header Component
export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { theme } = useThemeStore(); // Get current theme (dark or light)

  return (
    <header
      className={`
        flex items-center justify-between p-4 text-white
        ${theme === "dark" ? "bg-black" : "bg-gray-100 text-gray-800"}
      `}
    >
      {/* Left Side: Menu Button + Title for small screens*/}
      <div className="flex items-center">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`
            p-2 mr-4 rounded-lg transition-colors md:hidden
            ${theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-200"}
          `}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} /> {/* Menu Icon */}
        </button>

        {/* Page Title */}
        <h1
          className={`text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          SPICYCHAT.AI
        </h1>
      </div>

      {/* Right Side: Theme Toggle Button */}
      <div className="flex items-center space-x-2">
        <ThemeToggle /> {/* Button to switch between light/dark mode */}
      </div>
    </header>
  );
};
