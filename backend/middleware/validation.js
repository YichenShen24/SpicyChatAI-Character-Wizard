const validateCharacter = (req, res, next) => {
  // Extract required fields from request body
  const {
    name,
    title,
    personality,
    greeting,
    scenario,
    exampleDialogue,
    avatarPrompt,
  } = req.body;

  // Ensure all fields are present
  if (
    !name ||
    !title ||
    !personality ||
    !greeting ||
    !scenario ||
    !exampleDialogue ||
    !avatarPrompt
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate that each field is a non-empty string
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Name must be a non-empty string" });
  }

  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Title must be a non-empty string" });
  }

  if (typeof personality !== "string" || personality.trim() === "") {
    return res
      .status(400)
      .json({ message: "Personality must be a non-empty string" });
  }

  if (typeof greeting !== "string" || greeting.trim() === "") {
    return res
      .status(400)
      .json({ message: "Greeting must be a non-empty string" });
  }

  if (typeof scenario !== "string" || scenario.trim() === "") {
    return res
      .status(400)
      .json({ message: "Scenario must be a non-empty string" });
  }

  if (typeof exampleDialogue !== "string" || exampleDialogue.trim() === "") {
    return res
      .status(400)
      .json({ message: "Example dialogue must be a non-empty string" });
  }

  if (typeof avatarPrompt !== "string" || avatarPrompt.trim() === "") {
    return res
      .status(400)
      .json({ message: "Avatar prompt must be a non-empty string" });
  }

  // Proceed to the next middleware if validation passes
  next();
};

/**
 * Validates the text description provided in the request.
 */
const validateTextDescription = (req, res, next) => {
  const { textDescription } = req.body;

  if (
    !textDescription ||
    typeof textDescription !== "string" ||
    textDescription.trim() === ""
  ) {
    return res.status(400).json({
      message: "Text description is required and must be a non-empty string",
    });
  }

  next();
};

/**
 * Validates the URL provided in the request.
 */
const validateUrl = (req, res, next) => {
  const { url } = req.body;

  if (!url || typeof url !== "string" || url.trim() === "") {
    return res
      .status(400)
      .json({ message: "URL is required and must be a non-empty string" });
  }

  // Check if the URL is valid
  try {
    new URL(url);
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid URL format" });
  }
};

/**
 * Validates the template ID provided in the request.
 */
const validateTemplateId = (req, res, next) => {
  const { templateId } = req.body;

  if (
    !templateId ||
    typeof templateId !== "string" ||
    templateId.trim() === ""
  ) {
    return res.status(400).json({
      message: "Template ID is required and must be a non-empty string",
    });
  }

  next();
};

/**
 * Validates the avatar generation prompt.
 */
const validateAvatarPrompt = (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res
      .status(400)
      .json({ message: "Prompt is required and must be a non-empty string" });
  }

  next();
};

/**
 * Validates a character template, ensuring all necessary fields exist and are valid.
 */
const validateTemplate = (req, res, next) => {
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

  // Ensure all required fields are provided
  if (
    !name ||
    !category ||
    !description ||
    !image ||
    !defaultPersonality ||
    !defaultGreeting ||
    !defaultScenario ||
    !defaultExampleDialogue ||
    !defaultAvatarPrompt
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate each field type
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Name must be a non-empty string" });
  }

  if (typeof category !== "string" || category.trim() === "") {
    return res
      .status(400)
      .json({ message: "Category must be a non-empty string" });
  }

  if (typeof description !== "string" || description.trim() === "") {
    return res
      .status(400)
      .json({ message: "Description must be a non-empty string" });
  }

  if (typeof image !== "string" || image.trim() === "") {
    return res
      .status(400)
      .json({ message: "Image must be a non-empty string" });
  }

  next();
};

// Export all validation functions for use in routes
module.exports = {
  validateCharacter,
  validateTextDescription,
  validateUrl,
  validateTemplateId,
  validateAvatarPrompt,
  validateTemplate,
};
