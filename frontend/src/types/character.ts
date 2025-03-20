export interface Character {
  id: string;
  name: string;
  title: string;
  personality: string;
  greeting: string;
  scenario: string;
  exampleDialogue: string;
  avatarPrompt: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterCreationParams {
  textDescription?: string;
  url?: string;
  templateId?: string;
}

export type CharacterCreationMethod = "text" | "url" | "template";

export interface CharacterTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  defaultPersonality: string;
  defaultGreeting: string;
  defaultScenario: string;
  defaultExampleDialogue: string;
  defaultAvatarPrompt: string;
  popularity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
