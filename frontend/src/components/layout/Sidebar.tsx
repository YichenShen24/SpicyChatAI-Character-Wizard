import { Users, User } from "lucide-react"; // Import icons
import { NavLink } from "react-router-dom"; // Import navigation links
import { useThemeStore } from "../../store/themeStore"; // Import theme state

interface SidebarProps {
  isOpen: boolean; // Controls sidebar visibility
  closeSidebar: () => void; // Function to close sidebar
}

// Sidebar Component
export const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const { theme } = useThemeStore(); // Get current theme (dark or light)

  // Function to generate dynamic classes for NavLink
  const getNavLinkClasses = (isActive: boolean) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive
        ? theme === "dark"
          ? "bg-gray-900 text-white" // Dark mode active
          : "bg-gray-200 text-gray-900" // Light mode active
        : theme === "dark"
        ? "hover:bg-gray-900" // Dark mode hover
        : "hover:bg-gray-100" // Light mode hover
    }`;

  return (
    <>
      {/* Mobile overlay (click to close sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:z-0
          ${
            theme === "dark"
              ? "bg-black text-white border-r border-gray-800" // Dark mode styles
              : "bg-white text-gray-800 border-r border-gray-200" // Light mode styles
          }`}
      >
        {/* Navigation menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {/* Characters Link */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => getNavLinkClasses(isActive)}
                end
              >
                <Users className="mr-3" size={20} />
                <span>Characters</span>
              </NavLink>
            </li>

            {/* Profile Link */}
            <li>
              <NavLink
                to="/all"
                className={({ isActive }) => getNavLinkClasses(isActive)}
              >
                <Users className="mr-3" size={20} />
                <span>All Characters</span>
              </NavLink>
            </li>

            {/* Profile Link */}
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => getNavLinkClasses(isActive)}
              >
                <User className="mr-3" size={20} />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
