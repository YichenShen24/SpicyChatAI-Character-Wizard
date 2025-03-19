const express = require("express");
const router = express.Router();
const {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

const { validateTemplate } = require("../middleware/validation");

/**
 * @route GET /api/templates
 * @desc Get all character templates
 */
router.get("/", getAllTemplates);

/**
 * @route GET /api/templates/:id
 * @desc Get a specific template by ID
 */
router.get("/:id", getTemplateById);

/**
 * @route POST /api/templates
 * @desc Create a new character template
 */
router.post("/", validateTemplate, createTemplate);

/**
 * @route PUT /api/templates/:id
 * @desc Update an existing template
 */
router.put("/:id", validateTemplate, updateTemplate);

/**
 * @route DELETE /api/templates/:id
 * @desc Delete a template
 */
router.delete("/:id", deleteTemplate);

module.exports = router;
