import express from "express";
import {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from "../controllers/templateController";
import { validateTemplate } from "../middleware/validation";

const router = express.Router();

// @route   GET /api/templates
// @desc    Get all templates
// @access  Public
router.get("/", getAllTemplates);

// @route   GET /api/templates/:id
// @desc    Get a template by ID
// @access  Public
router.get("/:id", getTemplateById);

// @route   POST /api/templates
// @desc    Create a new template
// @access  Private
router.post("/", validateTemplate, createTemplate);

// @route   PUT /api/templates/:id
// @desc    Update a template
// @access  Private
router.put("/:id", validateTemplate, updateTemplate);

// @route   DELETE /api/templates/:id
// @desc    Delete a template (soft delete)
// @access  Private
router.delete("/:id", deleteTemplate);

export default router;
