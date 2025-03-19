const axios = require("axios");

/**
 * Generates a character profile using AI based on a given text description.
 * @param {string} textDescription - The input text describing the character.
 * @returns {Object} - A structured character object with fields like name, title, personality, etc.
 */
const generateCharacterFromText = async (textDescription) => {
  try {
    // Retrieve API Key from environment variables
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not defined in environment variables");
    }

    // Send a request to the AI API to generate a character profile
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192", // Specify the AI model to use
        messages: [
          {
            role: "system", // AI system prompt to guide character generation
            content:
              "You are a creative AI assistant that specializes in creating detailed character profiles for roleplaying. Generate a character based on the user's description.",
          },
          {
            role: "user", // User request with character description
            content: `Create a detailed character profile based on the following description: "${textDescription}". Include the following fields: name, title, personality, greeting, scenario, exampleDialogue, and avatarPrompt (a prompt that can be used to generate an image of this character).`,
          },
        ],
        temperature: 0.7, // Adjusts creativity of AI output (higher = more creative)
        max_tokens: 1024, // Limits response length
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Authenticate request with API key
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the AI-generated character details from the response
    const content = response.data.choices[0].message.content;

    // Parse and format the character details into a structured object
    const characterDetails = parseCharacterDetails(content);

    return characterDetails;
  } catch (error) {
    console.error("Error generating character from text:", error);
    throw new Error("Failed to generate character from text description");
  }
};

/**
 * Parses the character details from the AI response using Regular Expressions.
 * @param {string} content - The AI-generated text containing character details.
 * @returns {Object} - A structured object containing extracted character attributes.
 */
const parseCharacterDetails = (content) => {
  try {
    let characterDetails = {};

    // Extract each field from the response using Regular Expressions
    const nameMatch = content.match(/name:\s*([^\n]+)/i); // Extracts "name: CharacterName"
    const titleMatch = content.match(/title:\s*([^\n]+)/i); // Extracts "title: CharacterTitle"
    const personalityMatch = content.match(/personality:\s*([^#]+)/i); // Extracts personality details
    const greetingMatch = content.match(/greeting:\s*([^#]+)/i); // Extracts greeting text
    const scenarioMatch = content.match(/scenario:\s*([^#]+)/i); // Extracts scenario description
    const exampleDialogueMatch = content.match(/exampleDialogue:\s*([^#]+)/i); // Extracts example dialogue
    const avatarPromptMatch = content.match(/avatarPrompt:\s*([^#]+)/i); // Extracts avatar prompt

    // Assign extracted values to the character object, or use default values if missing
    characterDetails.name = nameMatch
      ? nameMatch[1].trim()
      : "Unknown Character";
    characterDetails.title = titleMatch
      ? titleMatch[1].trim()
      : "Mysterious Being";
    characterDetails.personality = personalityMatch
      ? personalityMatch[1].trim()
      : "Mysterious and enigmatic.";
    characterDetails.greeting = greetingMatch
      ? greetingMatch[1].trim()
      : "Hello there!";
    characterDetails.scenario = scenarioMatch
      ? scenarioMatch[1].trim()
      : "You encounter this character in an unknown place.";
    characterDetails.exampleDialogue = exampleDialogueMatch
      ? exampleDialogueMatch[1].trim()
      : "Character: Nice to meet you!";
    characterDetails.avatarPrompt = avatarPromptMatch
      ? avatarPromptMatch[1].trim()
      : `Portrait of ${characterDetails.name}, ${characterDetails.title}`;

    return characterDetails;
  } catch (error) {
    console.error("Error parsing character details:", error);
    throw new Error("Failed to parse character details from API response");
  }
};

// Export the function for use in other modules
module.exports = {
  generateCharacterFromText,
};
