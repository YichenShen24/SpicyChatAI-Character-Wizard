const axios = require("axios");
const { generateCharacterFromText } = require("./groqApi");

/**
 * Fetches content from a given URL using the Exa AI API.
 * @param {string} url - The URL from which content should be extracted.
 * @returns {Object} - An object containing title, extracted text, and the original URL.
 */
const fetchContentFromUrl = async (url) => {
  try {
    // Retrieve API Key from environment variables
    const apiKey = process.env.EXA_API_KEY;

    if (!apiKey) {
      throw new Error("EXA_API_KEY is not defined in environment variables");
    }

    // Send a request to Exa AI API to extract content from the given URL
    const response = await axios.post(
      "https://api.exa.ai/search", // API endpoint for content extraction
      {
        query: url, // The URL to fetch content from
        numResults: 1, // Limit to one result
        includeDomains: [new URL(url).hostname], // Restrict search to the same domain
        useAutoprompt: false, // Disable auto-prompting
        type: "neural", // Use AI-based content extraction
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Authenticate request with API key
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the API response contains valid data
    if (
      !response.data ||
      !response.data.results ||
      response.data.results.length === 0
    ) {
      throw new Error("No content found at the provided URL");
    }

    // Extract the first result from the API response
    const result = response.data.results[0];

    return {
      title: result.title || "Untitled Content", // Use API title or fallback
      text: result.text || "", // Extracted content text
      url: result.url || url, // Use API-provided URL or fallback to the original URL
    };
  } catch (error) {
    console.error("Error fetching content from URL:", error);
    throw new Error("Failed to fetch content from the provided URL");
  }
};

/**
 * Generates a character based on the extracted content from a URL.
 * @param {Object} urlContent - An object containing the extracted title and text.
 * @returns {Object} - A structured character object.
 */
const generateCharacterFromUrlContent = async (urlContent) => {
  try {
    // Create a formatted text description using extracted content
    const textDescription = `
      Create a character based on this content:
      Title: ${urlContent.title}
      Content: ${urlContent.text.substring(0, 2000)} 
    `;
    // Truncate content to 2000 characters to avoid exceeding API limits

    // Call AI function to generate a character from the extracted content
    return await generateCharacterFromText(textDescription);
  } catch (error) {
    console.error("Error generating character from URL content:", error);
    throw new Error("Failed to generate character from URL content");
  }
};

// Export functions for use in other modules
module.exports = {
  fetchContentFromUrl,
  generateCharacterFromUrlContent,
};
