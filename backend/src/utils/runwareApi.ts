import { Runware } from "@runware/sdk-js";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.RUNWARE_API_KEY;

// 初始化 Runware SDK（如果 API 密钥存在）
let runware: any | null = null;
if (apiKey) {
  runware = new Runware({ apiKey });
}

/**
 * 使用 Runware API 生成头像图片。
 * @param {string} prompt - 描述头像的文本提示。
 * @returns {Promise<string>} - 生成的头像图片的 URL。
 */
const generateAvatarImage = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey || !runware) {
      throw new Error(
        "RUNWARE_API_KEY is not defined in environment variables."
      );
    }

    console.log(" Generating avatar for prompt:", prompt);

    // 定义生成选项（如果需要，可以修改模型标识符）
    const request = {
      positivePrompt: prompt, // 用户定义的头像生成提示
      negativePrompt:
        "deformed, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb",
      width: 512,
      height: 512,
      steps: 30,
      CFGScale: 7.5, // 提示遵循强度
      numberResults: 1, // 生成一张图片
      model: "rundiffusion:130@100", // 使用 Runware 文档验证此模型
    };

    // 向 Runware API 发送请求
    const images = await runware.requestImages(request);

    // 调试：打印完整的 API 响应
    console.log(" Runware API Response:", JSON.stringify(images, null, 2));

    if (!images || images.length === 0 || !images[0].imageURL) {
      throw new Error(" No image URL returned from Runware API.");
    }

    // 返回第一个生成的图片 URL
    return images[0].imageURL;
  } catch (error) {
    console.error(" Error generating avatar image:", error);
    throw new Error("Failed to generate avatar image.");
  }
};

export { generateAvatarImage };
