const express = require("express");
const router = express.Router();
const {
  getAllCharacters,
  getCharacterById,
  createCharacterWithText,
  createCharacterWithUrl,
  createCharacterWithTemplate,
  updateCharacter,
  generateAvatar,
  deleteCharacter,
} = require("../controllers/characterController");

const Character = require("../models/Character"); // Import Character Model

const {
  validateCharacter,
  validateTextDescription,
  validateUrl,
  validateTemplateId,
  validateAvatarPrompt,
} = require("../middleware/validation");

/**
 * @route GET /api/characters
 * @desc Get all characters
 */
router.get("/", getAllCharacters);

/**
 * @route GET /api/characters/:id
 * @desc Get a specific character by ID
 */
router.get("/:id", getCharacterById);

/**
 * @route POST /api/characters
 * @desc Add a character manually (without AI generation)
 */
// router.post("/", async (req, res) => {
//   try {
//     const character = new Character(req.body);
//     await character.save();
//     res.status(201).json(character);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error adding character", error: error.message });
//   }
// });

/**
 * @route POST /api/characters/create-with-text
 * @desc Create a character from a text description
 */
router.post(
  "/create-with-text",
  validateTextDescription,
  createCharacterWithText
);

/**
 * @route POST /api/characters/create-with-url
 * @desc Create a character from extracted content of a given URL
 */
router.post("/create-with-url", validateUrl, createCharacterWithUrl);

/**
 * @route POST /api/characters/create-with-template
 * @desc Create a character from an existing template
 */
router.post(
  "/create-with-template",
  validateTemplateId,
  createCharacterWithTemplate
);

/**
 * @route PUT /api/characters/:id
 * @desc Update an existing character
 */
router.put("/:id", validateCharacter, updateCharacter);

/**
 * @route POST /api/characters/:id/generate-avatar
 * @desc Generate an AI avatar for a character
 */
router.post("/:id/generate-avatar", validateAvatarPrompt, generateAvatar);

/**
 * @route DELETE /api/characters/:id
 * @desc Delete a character
 */
router.delete("/:id", deleteCharacter);

module.exports = router;
