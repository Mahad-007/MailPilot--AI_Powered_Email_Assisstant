"use server";

import { generateEmailWithGemini, sendEmailViaMCP } from "../../lib/mcp-handler.js";

export async function sendAIEmail(data) {
  try {
    // Generate email content with AI
    const generatedBody = await generateEmailWithGemini(data.prompt);
    
    // Send the generated email
    const sendResult = await sendEmailViaMCP({
      to: data.to,
      subject: data.subject,
      body: generatedBody
    });

    return {
      ...sendResult,
      generatedBody: generatedBody
    };
  } catch (error) {
    console.error("Error sending AI email:", error);
    return {
      success: false,
      message: error.message || "Failed to send AI email",
      generatedBody: ""
    };
  }
}

