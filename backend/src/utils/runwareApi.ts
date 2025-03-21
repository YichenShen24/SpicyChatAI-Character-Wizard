import { Runware } from "@runware/sdk-js";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.RUNWARE_API_KEY;

let runware: any | null = null;
if (apiKey) {
  runware = new Runware({ apiKey });
}

const generateAvatarImage = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey || !runware) {
      throw new Error(
        "RUNWARE_API_KEY is not defined in environment variables."
      );
    }

    const request = {
      positivePrompt: prompt, // 用户定义的头像生成提示
      negativePrompt:
        "deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb",
      width: 512,
      height: 512,
      steps: 30,
      CFGScale: 7.5,
      numberResults: 1,
      model: "rundiffusion:130@100",
    };

    const images = await runware.requestImages(request);

    // console.log(" Runware API Response:", JSON.stringify(images, null, 2));

    if (!images || images.length === 0 || !images[0].imageURL) {
      throw new Error(" No image URL returned from Runware API.");
    }

    return images[0].imageURL;
  } catch (error) {
    console.error(" Error generating avatar image:", error);
    throw new Error("Failed to generate avatar image.");
  }
};

export { generateAvatarImage };
