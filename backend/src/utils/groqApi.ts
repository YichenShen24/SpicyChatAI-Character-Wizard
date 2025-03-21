import axios from "axios";
import { CharacterDetails } from "../types";
import { match } from "assert";

const generateCharacterFromText = async (
  textDescription: string
): Promise<CharacterDetails> => {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn(
        "GROQ_API_KEY is not defined in environment variables. Using mock data."
      );
      return {
        name: "Mock Character",
        title: "Development Test Character",
        personality:
          "This is a mock character created because the GROQ_API_KEY is not configured. The character is friendly, helpful, and exists only for development testing purposes.",
        greeting:
          "Hello! I am a mock character created for development testing. The actual API integration is not available because the GROQ_API_KEY is not set.",
        scenario:
          "You are testing the application without a valid GROQ API key. This character appears instead of making an actual API call.",
        exampleDialogue:
          "Mock Character: Hello there! I'm just a placeholder until you configure the proper API key.\nUser: How can I set up the API key?\nMock Character: You need to add the GROQ_API_KEY to your environment variables or .env file!",
        avatarPrompt:
          "A simple cartoon robot character with a friendly face, representing a development test placeholder",
      };
    }
    // console.log("API RECeIVeD", textDescription);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a creative AI assistant that specializes in creating detailed character profiles for roleplaying. Generate a character based on the user's description.",
          },
          {
            role: "user",
            content: `Create a detailed and vivid character profile based on the following description: "${textDescription}". The response should read like a character introduction in a story, with depth, voice, and emotional nuance—not just a list of traits.

Begin with the character’s full name and a short title that captures their role, identity, or essence. Then, write a rich paragraph describing their personality. Focus on how they behave, what drives them, and how they express themselves in conversation and action. Include internal conflicts, personal values, and quirks. Avoid listing generic traits—this should read like a short narrative from a character study.

For the greeting, craft a rich paragraph describing cinematic moment where the character is introduced through action and dialogue. Set the scene with environmental details and what the character is doing or thinking. Describe their entrance, body language, and emotional state. Then include at least one full line of dialogue from the character that captures their personality and voice. This should feel like a moment from a movie or game, not just a quote At least 3 sentences. 

In the scenario, imagine a specific, grounded encounter between the character and the user—such as running into each other at a shopping mall, a late-night diner, or on a mission. Describe how the user meets the character, what they’re doing, and the emotional tone of the interaction.

Then, in the exampleDialogue, write a natural back-and-forth between the user and the character. This should include at least three full exchanges. Make it feel like an authentic conversation, using casual, story-driven language that reveals the character’s personality. Keep each line consistent with their voice—whether that’s sarcastic, reserved, flirtatious, intense, etc.

Finally, provide an avatarPrompt: a description that could be used to generate an image of the character. Include physical features, clothing style, expression, pose, background, and overall aesthetic. Make sure it reflects the tone and personality established earlier.

The goal is to present the character like they’re stepping out of a story—visually, emotionally, and narratively real.
Required Output Format:
**Name:** ...
**Title:** ...
**Personality:** ...
**Greeting:** ...
**Scenario:** ...
**Example Dialogue:** ...
**Avatar Prompt:** ...

`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;

    const characterDetails = parseCharacterDetails(content);

    return characterDetails;
  } catch (error) {
    console.error("Error generating character from text:", error);
    throw new Error(
      `Error generating character from text: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
export const parseCharacterDetails = (content: string): CharacterDetails => {
  console.log("API GENERATED ", content);
  try {
    const cleanText = (text: string): string =>
      text.replace(/\*\*/g, "").trim();

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

    const name = nameMatch ? cleanText(nameMatch[1]) : "Unknown Character";
    const title = titleMatch ? cleanText(titleMatch[1]) : "Mysterious Being";
    const personality = personalityMatch
      ? cleanText(personalityMatch[1])
      : "Mysterious and enigmatic.";
    const greeting = greetingMatch
      ? cleanText(greetingMatch[1])
      : "Hello there!";
    const scenario = scenarioMatch
      ? cleanText(scenarioMatch[1])
      : "You encounter this character in an unknown place.";
    const exampleDialogue = exampleDialogueMatch
      ? cleanText(exampleDialogueMatch[1])
      : "Character: Nice to meet you!";
    const avatarPrompt = avatarPromptMatch
      ? cleanText(avatarPromptMatch[1])
      : `Portrait of ${name}, ${title}`;

    const characterDetails: CharacterDetails = {
      name,
      title,
      personality,
      greeting,
      scenario,
      exampleDialogue,
      avatarPrompt,
    };

    return characterDetails;
  } catch (error) {
    console.error("Error parsing character details:", error);
    throw new Error("Failed to parse character details from API response");
  }
};

export { generateCharacterFromText };
