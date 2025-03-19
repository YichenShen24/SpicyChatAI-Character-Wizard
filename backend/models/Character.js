const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    personality: {
      type: String,
      required: true,
    },
    greeting: {
      type: String,
      required: true,
    },
    scenario: {
      type: String,
      required: true,
    },
    exampleDialogue: {
      type: String,
      required: true,
    },
    avatarPrompt: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },

    creationMethod: {
      type: String,
      enum: ["text", "url", "template"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

characterSchema.methods.toJSON = function () {
  const character = this.toObject();
  character.id = character._id.toString();
  delete character._id;
  delete character.__v;
  return character;
};

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
