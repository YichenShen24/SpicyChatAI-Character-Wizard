const Character = require("../models/Character");
const CharacterTemplate = require("../models/CharacterTemplate");
const mongoose = require("mongoose");
const { generateCharacterFromText } = require("../utils/groqApi");
const {
  fetchContentFromUrl,
  generateCharacterFromUrlContent,
} = require("../utils/exaApi");
const { generateAvatarImage } = require("../utils/runwareApi");

/**
 * Fetch all characters (No user authentication required)
 */
const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find(); // Fetch all characters
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Fetch a single character by ID
 */
const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json(character);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid character ID format" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new AI-generated character from a text description
 */
const createCharacterWithText = async (req, res) => {
  try {
    const { textDescription } = req.body;

    // Generate character details using AI (Groq API)
    const characterDetails = await generateCharacterFromText(textDescription);

    // Save the new character to the database
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new character by extracting details from a URL
 */
const createCharacterWithUrl = async (req, res) => {
  try {
    const { url } = req.body;

    // Fetch website content using Exa API
    const urlContent = await fetchContentFromUrl(url);

    // Generate AI character details from extracted content
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a character from a predefined template
 */
const createCharacterWithTemplate = async (req, res) => {
  try {
    const { templateId } = req.body;

    // Find the template by ID
    const template = await CharacterTemplate.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Create a new character based on the template
    const character = new Character({
      name: template.name,
      title: `Based on ${template.name} template`,
      personality: template.defaultPersonality,
      greeting: template.defaultGreeting,
      scenario: template.defaultScenario,
      exampleDialogue: template.defaultExampleDialogue,
      avatarPrompt: template.defaultAvatarPrompt,
      creationMethod: "template",
    });

    await character.save();

    // Increase the popularity count of the template
    template.popularity += 1;
    await template.save();

    res.status(201).json(character);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid template ID format" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update character details
 */
const updateCharacter = async (req, res) => {
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

    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    // Update character fields if they exist
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Generate a new avatar using AI (Runware API)
 */
const generateAvatar = async (req, res) => {
  try {
    const { prompt } = req.body;

    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    // Generate avatar using Runware API
    const avatarUrl = await generateAvatarImage(prompt);

    // Save the avatar URL to the character
    character.avatarPrompt = prompt;
    character.avatarUrl = avatarUrl;

    await character.save();

    res.json({ avatarUrl: character.avatarUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete a character by ID
 */
const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  createCharacterWithText,
  createCharacterWithUrl,
  createCharacterWithTemplate,
  updateCharacter,
  generateAvatar,
  deleteCharacter,
};
