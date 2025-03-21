import axios from "axios";
import { generateCharacterFromText } from "./groqApi";
import { UrlContent, CharacterDetails } from "../types";

const fetchContentFromUrl = async (url: string): Promise<UrlContent> => {
  try {
    const apiKey = process.env.EXA_API_KEY;

    // 如果API密钥未定义，提供一个模拟响应
    if (!apiKey) {
      console.warn(
        "EXA_API_KEY is not defined in environment variables. Using mock data."
      );
      return {
        title: "Mock Content (EXA_API_KEY not configured)",
        text: `This is mock content because the EXA_API_KEY is not configured. 
               The URL you attempted to fetch was: ${url}. 
               Please set the EXA_API_KEY environment variable to use the actual API.`,
        url: url,
        summary: "Mock summary for development without API key",
        highlights: [
          "Mock highlight 1",
          "Mock highlight 2",
          "Mock highlight 3",
        ],
      };
    }

    const response = await axios.post(
      "https://api.exa.ai/contents",
      {
        urls: [url],
        text: true,
        highlights: {
          count: 3,
        },
        summary: true,
        crawl: "always",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      !response.data ||
      !response.data.results ||
      response.data.results.length === 0
    ) {
      throw new Error("No content found at the provided URL");
    }

    const result = response.data.results[0];

    return {
      title: result.title || "Untitled Content",
      text: result.text || "",
      url: result.url || url,
      summary: result.summary || "",
      highlights: result.highlights || [],
    };
  } catch (error) {
    console.error("Error fetching content from URL:", error);
    throw new Error(
      `Error fetching content from URL: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const generateCharacterFromUrlContent = async (
  urlContent: UrlContent
): Promise<CharacterDetails> => {
  try {
    const textDescription = `
      Create a character based on this content:
      Title: ${urlContent.title}
      Content: ${urlContent.text.substring(0, 2000)}
    `;

    return await generateCharacterFromText(textDescription);
  } catch (error) {
    console.error("Error generating character from URL content:", error);
    throw new Error("Failed to generate character from URL content");
  }
};

export { fetchContentFromUrl, generateCharacterFromUrlContent };
