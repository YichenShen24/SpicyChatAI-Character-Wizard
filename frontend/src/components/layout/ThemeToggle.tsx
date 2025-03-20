import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-md transition-colors
        ${theme === 'dark' 
          ? 'hover:bg-gray-900 text-yellow-300' 
          : 'hover:bg-gray-200 text-blue-500'}
      `}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};
