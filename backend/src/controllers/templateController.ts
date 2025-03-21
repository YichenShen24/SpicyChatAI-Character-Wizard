import { Request, Response } from "express";
import { CharacterTemplate } from "../models/index";
import mongoose from "mongoose";

const getAllTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const templates = await CharacterTemplate.find({ isActive: true });
    res.json(templates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const getTemplateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await CharacterTemplate.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }

    res.json(template);
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

const createTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      category,
      description,
      image,
      defaultPersonality,
      defaultGreeting,
      defaultScenario,
      defaultExampleDialogue,
      defaultAvatarPrompt,
    } = req.body;

    const template = new CharacterTemplate({
      name,
      category,
      description,
      image,
      defaultPersonality,
      defaultGreeting,
      defaultScenario,
      defaultExampleDialogue,
      defaultAvatarPrompt,
    });

    await template.save();

    res.status(201).json(template);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

const updateTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      category,
      description,
      image,
      defaultPersonality,
      defaultGreeting,
      defaultScenario,
      defaultExampleDialogue,
      defaultAvatarPrompt,
      isActive,
    } = req.body;

    const template = await CharacterTemplate.findById(req.params.id);

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }

    if (name) template.name = name;
    if (category) template.category = category;
    if (description) template.description = description;
    if (image) template.image = image;
    if (defaultPersonality) template.defaultPersonality = defaultPersonality;
    if (defaultGreeting) template.defaultGreeting = defaultGreeting;
    if (defaultScenario) template.defaultScenario = defaultScenario;
    if (defaultExampleDialogue)
      template.defaultExampleDialogue = defaultExampleDialogue;
    if (defaultAvatarPrompt) template.defaultAvatarPrompt = defaultAvatarPrompt;
    if (isActive !== undefined) template.isActive = isActive;

    await template.save();

    res.json(template);
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

const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
  try {
    const template = await CharacterTemplate.findById(req.params.id);

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }

    template.isActive = false;
    await template.save();

    res.status(204).end();
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

export {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
