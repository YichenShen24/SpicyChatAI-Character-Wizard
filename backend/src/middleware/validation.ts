import { RequestHandler } from "express";

const validateCharacter: RequestHandler = (req, res, next) => {
  const {
    name,
    title,
    personality,
    greeting,
    scenario,
    exampleDialogue,
    avatarPrompt,
  } = req.body;

  if (
    !name &&
    !title &&
    !personality &&
    !greeting &&
    !scenario &&
    !exampleDialogue &&
    !avatarPrompt
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  if (name && (typeof name !== "string" || name.trim() === "")) {
    res.status(400).json({ message: "Name must be a non-empty string" });
    return;
  }

  if (title && (typeof title !== "string" || title.trim() === "")) {
    res.status(400).json({ message: "Title must be a non-empty string" });
    return;
  }

  if (
    personality &&
    (typeof personality !== "string" || personality.trim() === "")
  ) {
    res.status(400).json({ message: "Personality must be a non-empty string" });
    return;
  }

  if (greeting && (typeof greeting !== "string" || greeting.trim() === "")) {
    res.status(400).json({ message: "Greeting must be a non-empty string" });
    return;
  }

  if (scenario && (typeof scenario !== "string" || scenario.trim() === "")) {
    res.status(400).json({ message: "Scenario must be a non-empty string" });
    return;
  }

  if (
    exampleDialogue &&
    (typeof exampleDialogue !== "string" || exampleDialogue.trim() === "")
  ) {
    res
      .status(400)
      .json({ message: "Example dialogue must be a non-empty string" });
    return;
  }

  if (
    avatarPrompt &&
    (typeof avatarPrompt !== "string" || avatarPrompt.trim() === "")
  ) {
    res
      .status(400)
      .json({ message: "Avatar prompt must be a non-empty string" });
    return;
  }

  return next();
};

const validateTextDescription: RequestHandler = (req, res, next) => {
  const { textDescription } = req.body;

  if (
    !textDescription ||
    typeof textDescription !== "string" ||
    textDescription.trim() === ""
  ) {
    res.status(400).json({
      message: "Text description is required and must be a non-empty string",
    });
    return;
  }

  return next();
};

const validateUrl: RequestHandler = (req, res, next) => {
  const { url } = req.body;

  if (!url || typeof url !== "string" || url.trim() === "") {
    res
      .status(400)
      .json({ message: "URL is required and must be a non-empty string" });
    return;
  }

  try {
    new URL(url);
    return next();
  } catch (error) {
    res.status(400).json({ message: "Invalid URL format" });
    return;
  }
};

const validateTemplateId: RequestHandler = (req, res, next) => {
  const { templateId } = req.body;

  if (
    !templateId ||
    typeof templateId !== "string" ||
    templateId.trim() === ""
  ) {
    res.status(400).json({
      message: "Template ID is required and must be a non-empty string",
    });
    return;
  }

  return next();
};

const validateAvatarPrompt: RequestHandler = (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    res
      .status(400)
      .json({ message: "Prompt is required and must be a non-empty string" });
    return;
  }

  return next();
};

const validateTemplate: RequestHandler = (req, res, next) => {
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
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ message: "Name must be a non-empty string" });
    return;
  }

  if (typeof category !== "string" || category.trim() === "") {
    res.status(400).json({ message: "Category must be a non-empty string" });
    return;
  }

  if (typeof description !== "string" || description.trim() === "") {
    res.status(400).json({ message: "Description must be a non-empty string" });
    return;
  }

  return next();
};

const validateUserRegistration: RequestHandler = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ message: "Name must be a non-empty string" });
    return;
  }

  if (typeof email !== "string" || email.trim() === "") {
    res.status(400).json({ message: "Email must be a non-empty string" });
    return;
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  return next();
};

const validateUserLogin: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  if (typeof email !== "string" || email.trim() === "") {
    res.status(400).json({ message: "Email must be a non-empty string" });
    return;
  }

  return next();
};

const validateUserPreferences: RequestHandler = (req, res, next) => {
  const { notifications, emailUpdates, theme } = req.body;

  if (notifications !== undefined && typeof notifications !== "boolean") {
    res.status(400).json({ message: "Notifications must be a boolean value" });
    return;
  }

  if (emailUpdates !== undefined && typeof emailUpdates !== "boolean") {
    res.status(400).json({ message: "Email updates must be a boolean value" });
    return;
  }

  if (
    theme !== undefined &&
    (typeof theme !== "string" || (theme !== "light" && theme !== "dark"))
  ) {
    res.status(400).json({ message: 'Theme must be either "light" or "dark"' });
    return;
  }

  return next();
};

export {
  validateCharacter,
  validateTextDescription,
  validateUrl,
  validateTemplateId,
  validateAvatarPrompt,
  validateTemplate,
  validateUserRegistration,
  validateUserLogin,
  validateUserPreferences,
};
