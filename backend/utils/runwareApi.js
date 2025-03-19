const { Runware } = require("@runware/sdk-js");

const axios = require("axios");

const apiKey = process.env.RUNWARE_API_KEY;

if (!apiKey) {
  throw new Error(
    "🚨 RUNWARE_API_KEY is not defined in environment variables."
  );
}

// Initialize the Runware SDK with the API Key
const runware = new Runware({ apiKey });

/**
 * Generates an avatar image using the Runware API.
 * @param {string} prompt - The text prompt describing the avatar.
 * @returns {Promise<string>} - The URL of the generated avatar image.
 */

const generateAvatarImage = async (prompt) => {
  try {
    console.log("🔍 Generating avatar for prompt:", prompt);

    // Define generation options (Modify model identifier if needed)
    const request = {
      positivePrompt: prompt, // ✅ The user-defined prompt for avatar generation
      width: 512,
      height: 512,
      steps: 30,
      CFGScale: 7.5, // Prompt adherence strength
      numberResults: 1, // Generate one image
      model: "rundiffusion:130@100", // ✅ Verify this model with Runware documentation
    };

    // Make the request to Runware API
    const images = await runware.requestImages(request);

    // Debug: Print full API response
    console.log("✅ Runware API Response:", JSON.stringify(images, null, 2));

    if (!images || images.length === 0 || !images[0].imageURL) {
      throw new Error("❌ No image URL returned from Runware API.");
    }

    // ✅ Return the first generated image URL
    return images[0].imageURL;
  } catch (error) {
    console.error("🚨 Error generating avatar image:", error);
    throw new Error("Failed to generate avatar image.");
  }
};

module.exports = {
  generateAvatarImage,
};
// const generateAvatarImage = async (prompt) => {
//   try {
//     // Retrieve API Key from environment variables
//     const apiKey = process.env.RUNWARE_API_KEY;

//     if (!apiKey) {
//       throw new Error(
//         "RUNWARE_API_KEY is not defined in environment variables"
//       );
//     }

//     // Send a request to Runware AI API to generate an avatar image
//     const response = await axios.post(
//       "https://api.runware.ai/generation/image", // Image generation API endpoint
//       {
//         prompt: prompt, // The main prompt describing the avatar
//         negative_prompt:
//           "deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb",
//         // Negative prompt ensures better quality by avoiding unwanted distortions
//         width: 512, // Set image width
//         height: 512, // Set image height
//         num_inference_steps: 30, // Controls quality and detail of the generated image
//         guidance_scale: 7.5, // Balances creativity vs prompt adherence
//         model: "realistic-vision-v5", // Specifies the AI model used for generation
//         scheduler: "K_EULER_ANCESTRAL", // Defines the image generation algorithm
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`, // Authenticate API request
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Validate API response and ensure an image was successfully generated
//     if (
//       !response.data ||
//       !response.data.images ||
//       response.data.images.length === 0
//     ) {
//       throw new Error("No image generated from the provided prompt");
//     }

//     // Return the URL of the first generated image
//     return response.data.images[0].url;
//   } catch (error) {
//     console.error("Error generating avatar image:", error);
//     throw new Error("Failed to generate avatar image");
//   }
// };

// Export the function for use in other modules
