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
    const apiUrl = "https://api.exa.ai/contents";

    if (!apiKey) {
      throw new Error("EXA_API_KEY is not defined in environment variables");
    }

    const data = {
      urls: [url],
      text: true, // Ensures Exa API extracts text content
    };

    // Send a request to Exa AI API to extract content from the given URL
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`, // Authenticate request with API key
        "Content-Type": "application/json",
      },
    });

    const results = response.data.results;
    // console.log("🔍 Result");

    // Check if the API response contains valid data
    if (results && results.length > 0) {
      const content = results[0].text;
      if (content) {
        return {
          title: results[0].title || "Untitled Content",
          text: content,
          url: results[0].url || url,
        };
      } else {
        throw new Error('Content extraction failed: "text" field is empty.');
      }
    } else {
      throw new Error("No results found for the provided URL.");
    }
  } catch (error) {
    console.error("Error fetching content from URL:", error);
    throw new Error("Failed to fetch content from the provided URL");
  }
};

/**
 * Generates a character based on the extracted content from a URL.
 * @param {Object} urlContent - An object containing the extracted title and text.
 * @returns {Promise<Object>} - A structured character object.
 */
const generateCharacterFromUrlContent = async (urlContent) => {
  try {
    // Create a formatted text description using extracted content
    // Truncate content to 2000 characters to avoid exceeding API limits

    const textDescription = `
      Create a character based on this content:
      Title: ${urlContent.title}
      Content: ${urlContent.text.substring(0, 2000)} 
    `;
    return await generateCharacterFromText(textDescription);

    // Call AI function to generate a character from the extracted content
    // return await generateCharacterFromText(textDescription);
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
