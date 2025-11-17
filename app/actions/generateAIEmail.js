"use server";

export async function generateAIEmail(data) {
  try {
    const response = await fetch("http://localhost:3000/api/generate-ai-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error generating AI email:", error);
    return {
      success: false,
      message: error.message || "Failed to generate AI email",
      generatedBody: ""
    };
  }
}

