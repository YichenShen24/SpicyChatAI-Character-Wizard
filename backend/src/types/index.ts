import { Document, Types } from "mongoose";
import { Request } from "express";

export interface CharacterDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  title: string;
  personality: string;
  greeting: string;
  scenario: string;
  exampleDialogue: string;
  avatarPrompt: string;
  avatarUrl: string | null;
  creationMethod: "text" | "url" | "template" | "options";
  toJSON(): any;
}

export interface CharacterTemplateDocument extends Document {
  _id: Types.ObjectId;
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
  toJSON(): any;
}

export interface UrlContent {
  title: string;
  text: string;
  url: string;
  summary: string;
  highlights: string[];
}

export interface CharacterDetails {
  name: string;
  title: string;
  personality: string;
  greeting: string;
  scenario: string;
  exampleDialogue: string;
  avatarPrompt: string;
}
