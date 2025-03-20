import { create } from "zustand"; // Importing Zustand for state management

import {
  Character,
  CharacterCreationMethod,
  CharacterCreationParams,
} from "../types/character"; // Importing types for better TypeScript support

import { characterApi } from "../services/api"; // Importing API service for character-related requests

// Define the structure of the character store
interface CharacterState {
  characters: Character[]; // List of characters
  currentCharacter: Character | null; // Currently selected character
  loading: boolean; // Loading state for async operations
  error: string | null; // Error message if any request fails
  creationMethod: CharacterCreationMethod; // Method for character creation (text, url, template)
  creationParams: CharacterCreationParams; // Parameters used for character creation

  // Functions for interacting with character data
  fetchCharacters: () => Promise<void>; // Fetch all characters
  fetchCharacter: (id: string) => Promise<void>; // Fetch a single character by ID
  createCharacter: () => Promise<Character | null>; // Create a new character
  updateCharacter: (id: string, updates: Partial<Character>) => Promise<void>; // Update a character
  generateAvatar: (id: string, prompt: string) => Promise<void>; // Generate an avatar for a character
  deleteCharacter: (id: string) => Promise<void>; // Delete a character
  setCreationMethod: (method: CharacterCreationMethod) => void; // Set how characters are created
  setCreationParams: (params: Partial<CharacterCreationParams>) => void; // Set parameters for character creation
  clearCurrentCharacter: () => void; // Clear selected character
}

// Create Zustand store for managing character state
export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
  creationMethod: "text", // Default creation method
  creationParams: {},

  // Fetch all characters from the API
  fetchCharacters: async () => {
    try {
      set({ loading: true, error: null });
      const characters = await characterApi.getCharacters();
      set({ characters, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch characters", loading: false });
      console.error("Error fetching characters:", error);
    }
  },

  // Fetch a single character by ID
  fetchCharacter: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const character = await characterApi.getCharacter(id);
      set({ currentCharacter: character, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch character", loading: false });
      console.error("Error fetching character:", error);
    }
  },

  // Create a new character based on selected creation method
  createCharacter: async () => {
    try {
      set({ loading: true, error: null });
      const { creationMethod, creationParams } = get();
      let character: Character | null = null;

      if (creationMethod === "text" && creationParams.textDescription) {
        character = await characterApi.createCharacterWithText(
          creationParams.textDescription
        );
      } else if (creationMethod === "url" && creationParams.url) {
        character = await characterApi.createCharacterWithUrl(
          creationParams.url
        );
      } else if (creationMethod === "template" && creationParams.templateId) {
        character = await characterApi.createCharacterWithTemplate(
          creationParams.templateId
        );
      }

      if (character) {
        set({
          currentCharacter: character,
          characters: [...get().characters, character],
          loading: false,
        });
        return character;
      }

      set({ loading: false });
      return null;
    } catch (error) {
      set({ error: "Failed to create character", loading: false });
      console.error("Error creating character:", error);
      return null;
    }
  },

  // Update character details
  updateCharacter: async (id: string, updates: Partial<Character>) => {
    try {
      set({ loading: true, error: null });
      const updatedCharacter = await characterApi.updateCharacter(id, updates);

      set((state) => ({
        currentCharacter:
          state.currentCharacter?.id === id
            ? updatedCharacter
            : state.currentCharacter,
        characters: state.characters.map((char) =>
          char.id === id ? updatedCharacter : char
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update character", loading: false });
      console.error("Error updating character:", error);
    }
  },

  // Generate an avatar for a character based on a prompt
  generateAvatar: async (id: string, prompt: string) => {
    try {
      set({ loading: true, error: null });
      const avatarUrl = await characterApi.generateAvatar(id, prompt);

      if (get().currentCharacter?.id === id) {
        set((state) => ({
          currentCharacter: state.currentCharacter
            ? { ...state.currentCharacter, avatarUrl }
            : null,
          loading: false,
        }));
      }

      set((state) => ({
        characters: state.characters.map((char) =>
          char.id === id ? { ...char, avatarUrl } : char
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to generate avatar", loading: false });
      console.error("Error generating avatar:", error);
    }
  },

  // Delete a character from the list
  deleteCharacter: async (id: string) => {
    try {
      set({ loading: true, error: null });
      await characterApi.deleteCharacter(id);

      set((state) => ({
        characters: state.characters.filter((char) => char.id !== id),
        currentCharacter:
          state.currentCharacter?.id === id ? null : state.currentCharacter,
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete character", loading: false });
      console.error("Error deleting character:", error);
    }
  },

  // Set character creation method (text, URL, template)
  setCreationMethod: (method: CharacterCreationMethod) => {
    set({ creationMethod: method });
  },

  // Set parameters for creating a character
  setCreationParams: (params: Partial<CharacterCreationParams>) => {
    set((state) => ({
      creationParams: { ...state.creationParams, ...params },
    }));
  },

  // Clear the currently selected character
  clearCurrentCharacter: () => {
    set({ currentCharacter: null });
  },
}));
