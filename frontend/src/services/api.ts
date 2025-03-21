import { Character, CharacterTemplate } from "../types/character";
import { httpService } from "./http";

export const characterApi = {
  /**
   * Fetches all characters templates from the backend.
   * Returns an array of Character objects.
   */
  getTemplates: async (): Promise<CharacterTemplate[]> => {
    const response = await httpService.get<CharacterTemplate[]>("/templates");
    return response.data;
  },
  /**
   * Fetches all characters from the backend.
   * Returns an array of Character objects.
   */
  getCharacters: async (): Promise<Character[]> => {
    const response = await httpService.get<Character[]>("/characters");
    return response.data;
  },

  /**
   * Fetches a single character by ID.
   * Returns the Character object.
   */
  getCharacter: async (id: string): Promise<Character> => {
    const response = await httpService.get<Character>(`/characters/${id}`);
    return response.data;
  },

  /**
   * Creates a character using a text description.
   * Sends the description to the backend and returns the created character.
   */
  createCharacterWithText: async (
    textDescription: string
  ): Promise<Character> => {
    const response = await httpService.post<Character>(
      "/characters/create-with-text",
      { textDescription }
    );
    return response.data;
  },

  /**
   * Creates a character by extracting data from a URL.
   * Sends the URL to the backend and returns the created character.
   */
  createCharacterWithUrl: async (url: string): Promise<Character> => {
    const response = await httpService.post<Character>(
      "/characters/create-with-url",
      { url }
    );
    return response.data;
  },

  /**
   * Creates a character using a predefined template.
   * Sends the template ID to the backend and returns the created character.
   */
  createCharacterWithTemplate: async (
    templateId: string
  ): Promise<Character> => {
    const response = await httpService.post<Character>(
      "/characters/create-with-template",
      { templateId }
    );
    return response.data;
  },

  /**
   * Updates an existing character.
   * Sends the updated character data to the backend and returns the updated character.
   */
  updateCharacter: async (
    id: string,
    character: Partial<Character>
  ): Promise<Character> => {
    const response = await httpService.put<Character>(
      `/characters/${id}`,
      character
    );
    console.log("update api", response);
    return response.data;
  },

  /**
   * Generates an avatar for a character based on a text prompt.
   * Sends the prompt to the backend and returns the avatar image URL.
   */
  generateAvatar: async (id: string, prompt: string): Promise<string> => {
    const response = await httpService.post<{ avatarUrl: string }>(
      `/characters/${id}/generate-avatar`,
      { prompt }
    );
    return response.data.avatarUrl;
  },

  /**
   * Deletes a character by ID.
   * Sends a request to remove the character from the backend.
   */
  deleteCharacter: async (id: string): Promise<void> => {
    await httpService.delete(`/characters/${id}`);
  },
};
