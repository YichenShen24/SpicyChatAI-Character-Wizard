import { Request, Response } from "express";
import { Character, CharacterTemplate } from "../models/index";
import mongoose from "mongoose";
import { generateCharacterFromText } from "../utils/groqApi";
import {
  fetchContentFromUrl,
  generateCharacterFromUrlContent,
} from "../utils/exaApi";
import { generateAvatarImage } from "../utils/runwareApi";

const getAllCharacters = async (req: Request, res: Response): Promise<void> => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const getCharacterById = async (req: Request, res: Response): Promise<void> => {
  try {
    const character = await Character.findOne({
      _id: req.params.id,
    });

    if (!character) {
      res.status(404).json({ message: "Character not found" });
      return;
    }

    res.json(character);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: "Invalid character ID format" });
      return;
    }
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const createCharacterWithText = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { textDescription } = req.body;

    const characterDetails = await generateCharacterFromText(textDescription);

    const character = new Character({
      name: characterDetails.name,
      title: characterDetails.title,
      personality: characterDetails.personality,
      greeting: characterDetails.greeting,
      scenario: characterDetails.scenario,
      exampleDialogue: characterDetails.exampleDialogue,
      avatarPrompt: characterDetails.avatarPrompt,
      creationMethod: "text",
    });

    await character.save();

    res.status(201).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const createCharacterWithUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { url } = req.body;

    const urlContent = await fetchContentFromUrl(url);

    const characterDetails = await generateCharacterFromUrlContent(urlContent);

    const character = new Character({
      name: characterDetails.name,
      title: characterDetails.title,
      personality: characterDetails.personality,
      greeting: characterDetails.greeting,
      scenario: characterDetails.scenario,
      exampleDialogue: characterDetails.exampleDialogue,
      avatarPrompt: characterDetails.avatarPrompt,
      creationMethod: "url",
    });

    await character.save();

    res.status(201).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const createCharacterWithTemplate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { templateId } = req.body;

    const template = await CharacterTemplate.findById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }

    const character = new Character({
      name: template.name,
      title: `Based on ${template.name} template`,
      personality: template.defaultPersonality,
      greeting: template.defaultGreeting,
      scenario: template.defaultScenario,
      exampleDialogue: template.defaultExampleDialogue,
      avatarPrompt: template.defaultAvatarPrompt,
      creationMethod: "template",
      avatarUrl: template.image,
    });

    await character.save();

    template.popularity += 1;
    await template.save();

    res.status(201).json(character);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: "Invalid template ID format" });
      return;
    }
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const updateCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      title,
      personality,
      greeting,
      scenario,
      exampleDialogue,
      avatarPrompt,
    } = req.body;

    const character = await Character.findOne({
      _id: req.params.id,
    });

    if (!character) {
      res.status(404).json({ message: "Character not found" });
      return;
    }

    if (name) character.name = name;
    if (title) character.title = title;
    if (personality) character.personality = personality;
    if (greeting) character.greeting = greeting;
    if (scenario) character.scenario = scenario;
    if (exampleDialogue) character.exampleDialogue = exampleDialogue;
    if (avatarPrompt) character.avatarPrompt = avatarPrompt;

    await character.save();

    res.json(character);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: "Invalid character ID format" });
      return;
    }
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const generateAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;

    const character = await Character.findOne({
      _id: req.params.id,
    });

    if (!character) {
      res.status(404).json({ message: "Character not found" });
      return;
    }

    const avatarUrl = await generateAvatarImage(prompt);

    character.avatarPrompt = prompt;
    character.avatarUrl = avatarUrl;

    await character.save();

    res.json({ avatarUrl: character.avatarUrl });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: "Invalid character ID format" });
      return;
    }
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const deleteCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const character = await Character.findOneAndDelete({
      _id: req.params.id,
    });

    if (!character) {
      res.status(404).json({ message: "Character not found" });
      return;
    }

    res.status(204).end();
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({ message: "Invalid character ID format" });
      return;
    }
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export {
  getAllCharacters,
  getCharacterById,
  createCharacterWithText,
  createCharacterWithUrl,
  createCharacterWithTemplate,
  updateCharacter,
  generateAvatar,
  deleteCharacter,
};
