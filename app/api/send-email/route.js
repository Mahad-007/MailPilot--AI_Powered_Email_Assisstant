import { NextResponse } from "next/server";
import { sendEmailViaMCP } from "../../../lib/mcp-handler.js";

export async function POST(request) {
  try {
    const data = await request.json();
    
    const result = await sendEmailViaMCP({
      to: data.to,
      subject: data.subject,
      body: data.body
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send email"
      },
      { status: 500 }
    );
  }
}

