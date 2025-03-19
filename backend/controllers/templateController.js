const CharacterTemplate = require("../models/CharacterTemplate");
const mongoose = require("mongoose");

/**
 * Fetch all character templates
 * Supports filtering by category, sorting, and limiting results.
 */
const getAllTemplates = async (req, res) => {
  try {
    const { category, limit, sort } = req.query;

    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Only fetch active templates
    query.isActive = true;

    let sortOption = {};

    // Sort by popularity (descending) or by creation date (default)
    if (sort === "popularity") {
      sortOption = { popularity: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    let templatesQuery = CharacterTemplate.find(query).sort(sortOption);

    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      templatesQuery = templatesQuery.limit(parseInt(limit));
    }

    // Fetch templates from database
    const templates = await templatesQuery;

    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Fetch a single character template by ID
 */
const getTemplateById = async (req, res) => {
  try {
    const template = await CharacterTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(template);
  } catch (error) {
    // Handle invalid MongoDB ID format errors
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid template ID format" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new character template
 */
const createTemplate = async (req, res) => {
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

    // Create new template instance
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
      isActive: isActive !== undefined ? isActive : true, // Default isActive to true if not provided
    });

    // Save to database
    await template.save();

    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update an existing character template
 */
const updateTemplate = async (req, res) => {
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
      popularity,
      isActive,
    } = req.body;

    // Find template by ID
    const template = await CharacterTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Update fields if provided
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
    if (popularity !== undefined) template.popularity = popularity;
    if (isActive !== undefined) template.isActive = isActive;

    // Save updated template to database
    await template.save();

    res.json(template);
  } catch (error) {
    // Handle invalid MongoDB ID format errors
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid template ID format" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete a character template by ID
 */
const deleteTemplate = async (req, res) => {
  try {
    // Find and delete template by ID
    const template = await CharacterTemplate.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(204).end(); // No content response for successful deletion
  } catch (error) {
    // Handle invalid MongoDB ID format errors
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid template ID format" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export all controller functions
module.exports = {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
