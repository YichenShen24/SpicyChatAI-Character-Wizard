import mongoose, { Schema } from "mongoose";
import { CharacterTemplateDocument } from "../types";

const characterTemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    defaultPersonality: {
      type: String,
      required: true,
    },
    defaultGreeting: {
      type: String,
      required: true,
    },
    defaultScenario: {
      type: String,
      required: true,
    },
    defaultExampleDialogue: {
      type: String,
      required: true,
    },
    defaultAvatarPrompt: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

characterTemplateSchema.methods.toJSON = function () {
  const template = this.toObject();
  template.id = template._id.toString();
  delete template._id;
  delete template.__v;
  return template;
};

const CharacterTemplate = mongoose.model<CharacterTemplateDocument>(
  "CharacterTemplate",
  characterTemplateSchema
);

export default CharacterTemplate;
