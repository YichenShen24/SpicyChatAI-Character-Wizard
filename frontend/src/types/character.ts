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

export type CharacterCreationMethod = 'text' | 'url' | 'template';
