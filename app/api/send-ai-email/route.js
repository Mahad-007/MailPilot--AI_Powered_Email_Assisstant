import { NextResponse } from "next/server";
import { sendEmailViaMCP, generateEmailWithGemini } from "../../../lib/mcp-handler.js";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // 1️⃣ Generate email content using Gemini
    const aiBody = await generateEmailWithGemini(data.prompt);

    // 2️⃣ Send email using MCP Gmail tool
    const result = await sendEmailViaMCP({
      to: data.to,
      subject: data.subject,
      body: aiBody
    });

    return NextResponse.json({
      ...result,
      generatedBody: aiBody
    });
  } catch (error) {
    console.error("Error sending AI email:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send AI email",
        generatedBody: ""
      },
      { status: 500 }
    );
  }
}

