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

    // 🔹 Print raw AI response for debugging
    console.log(
      "🔍 RAW AI RESPONSE:",
      response.data.choices[0].message.content
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

    // Clean AI Response: Remove "**" artifacts & trim spaces
    const cleanText = (text) => text.replace(/\*\*/g, "").trim();

    // Updated Regex to Capture Multi-line Responses Properly
    const nameMatch = content.match(/\*\*Name:\*\*\s*([\s\S]+?)\n+\*\*Title:/i);
    const titleMatch = content.match(
      /\*\*Title:\*\*\s*([\s\S]+?)\n+\*\*Personality:/i
    );
    const personalityMatch = content.match(
      /\*\*Personality:\*\*\s*([\s\S]+?)\n+\*\*Greeting:/i
    );
    const greetingMatch = content.match(
      /\*\*Greeting:\*\*\s*([\s\S]+?)\n+\*\*Scenario:/i
    );
    const scenarioMatch = content.match(
      /\*\*Scenario:\*\*\s*([\s\S]+?)\n+\*\*Example Dialogue:/i
    );
    const exampleDialogueMatch = content.match(
      /\*\*Example Dialogue:\*\*\s*([\s\S]+?)\n+\*\*Avatar Prompt:/i
    );
    const avatarPromptMatch = content.match(
      /\*\*Avatar Prompt:\*\*\s*([\s\S]+)/i
    );

    // Assign extracted values, or use default values if missing
    characterDetails.name = nameMatch
      ? cleanText(nameMatch[1])
      : "Unknown Character";
    characterDetails.title = titleMatch
      ? cleanText(titleMatch[1])
      : "Mysterious Being";
    characterDetails.personality = personalityMatch
      ? cleanText(personalityMatch[1])
      : "Mysterious and enigmatic.";
    characterDetails.greeting = greetingMatch
      ? cleanText(greetingMatch[1])
      : "Hello there!";
    characterDetails.scenario = scenarioMatch
      ? cleanText(scenarioMatch[1])
      : "You encounter this character in an unknown place.";
    characterDetails.exampleDialogue = exampleDialogueMatch
      ? cleanText(exampleDialogueMatch[1])
      : "Character: Nice to meet you!";
    characterDetails.avatarPrompt = avatarPromptMatch
      ? cleanText(avatarPromptMatch[1])
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
