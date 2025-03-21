import express from "express";
import {
  getAllCharacters,
  getCharacterById,
  createCharacterWithText,
  createCharacterWithUrl,
  createCharacterWithTemplate,
  updateCharacter,
  generateAvatar,
  deleteCharacter,
} from "../controllers/characterController";
import {
  validateCharacter,
  validateTextDescription,
  validateUrl,
  validateTemplateId,
  validateAvatarPrompt,
} from "../middleware/validation";

const router = express.Router();

// @route   GET /api/characters
// @desc    Get all characters
// @access  Private
router.get("/", getAllCharacters);

// @route   GET /api/characters/:id
// @desc    Get a character by ID
// @access  Private
router.get("/:id", getCharacterById);

// @route   POST /api/characters/create-with-text
// @desc    Create a new character from text description
// @access  Private
router.post(
  "/create-with-text",
  validateTextDescription,
  createCharacterWithText
);

// @route   POST /api/characters/create-with-url
// @desc    Create a new character from URL content
// @access  Private
router.post("/create-with-url", validateUrl, createCharacterWithUrl);

// @route   POST /api/characters/create-with-template
// @desc    Create a new character from a template
// @access  Private
router.post(
  "/create-with-template",
  validateTemplateId,
  createCharacterWithTemplate
);

// @route   PUT /api/characters/:id
// @desc    Update a character
// @access  Private
router.put("/:id", validateCharacter, updateCharacter);

// @route   POST /api/characters/:id/generate-avatar
// @desc    Generate avatar for a character
// @access  Private
router.post("/:id/generate-avatar", validateAvatarPrompt, generateAvatar);

// @route   DELETE /api/characters/:id
// @desc    Delete a character
// @access  Private
router.delete("/:id", deleteCharacter);

export default router;
