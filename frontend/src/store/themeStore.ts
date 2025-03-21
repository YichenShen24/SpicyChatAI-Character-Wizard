import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      toggleTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        // console.log("Toggling theme:", newTheme); // Debug log
        set({ theme: newTheme });
      },
      setTheme: (theme: Theme) => {
        // console.log("Setting theme:", theme); // Debug log
        set({ theme });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
