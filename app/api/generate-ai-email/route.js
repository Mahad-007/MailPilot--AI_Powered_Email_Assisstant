import { NextResponse } from "next/server";
import { generateEmailWithGemini } from "../../../lib/mcp-handler.js";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Only generate email content using Gemini (DO NOT SEND)
    const aiBody = await generateEmailWithGemini(data.prompt);

    return NextResponse.json({
      success: true,
      generatedBody: aiBody,
      message: "Email generated successfully! Review and edit before sending."
    });
  } catch (error) {
    console.error("Error generating AI email:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to generate AI email",
        generatedBody: ""
      },
      { status: 500 }
    );
  }
}

