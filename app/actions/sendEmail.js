"use server";

import { sendEmailViaMCP } from "../../lib/mcp-handler.js";

export async function sendEmail(data) {
  try {
    const result = await sendEmailViaMCP({
      to: data.to,
      subject: data.subject,
      body: data.body
    });
    
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error.message || "Failed to send email"
    };
  }
}

