"use server";

import { generateEmailWithGemini } from "../../lib/mcp-handler.js";

export async function generateAIEmail(data) {
  try {
    const generatedBody = await generateEmailWithGemini(data.prompt);
    
    return {
      success: true,
      message: "Email generated successfully!",
      generatedBody: generatedBody
    };
  } catch (error) {
    console.error("Error generating AI email:", error);
    return {
      success: false,
      message: error.message || "Failed to generate AI email",
      generatedBody: ""
    };
  }
}

