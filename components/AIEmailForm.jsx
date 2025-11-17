"use client";

import { useState } from "react";
import { sendAIEmail } from "../app/actions/sendAIEmail";

export default function AIEmailForm() {
  const [status, setStatus] = useState("");
  const [aiContent, setAIContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("Generating AI email...");

    const form = new FormData(e.target);

    const res = await sendAIEmail({
      to: form.get("to"),
      subject: form.get("subject"),
      prompt: form.get("prompt")
    });

    setAIContent(res.generatedBody || "");
    setStatus(res.message);
    setLoading(false);

    if (res.success) {
      e.target.reset();
    }
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        ✨ AI Email Generator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            name="to"
            type="email"
            placeholder="recipient@example.com"
            required
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            name="subject"
            placeholder="Email subject"
            required
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            AI Prompt
          </label>
          <textarea
            name="prompt"
            placeholder="Describe what you want the email to say..."
            required
            className="w-full border border-gray-300 p-2 rounded h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate & Send AI Email"}
        </button>
      </form>

      {status && (
        <p className={`mt-4 text-center text-sm ${status.includes("success") ? "text-green-600" : "text-gray-700"}`}>
          {status}
        </p>
      )}

      {aiContent && (
        <div className="mt-4 p-4 border border-gray-200 rounded bg-gray-50">
          <strong className="text-gray-800">Generated Email:</strong>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{aiContent}</p>
        </div>
      )}
    </div>
  );
}

