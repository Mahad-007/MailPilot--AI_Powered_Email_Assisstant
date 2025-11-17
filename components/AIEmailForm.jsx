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
    <div className="w-full group">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 rounded-2xl shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              AI Generator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* To Field */}
          <div className="group/input">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Recipient
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                name="to"
                type="email"
                placeholder="recipient@example.com"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="group/input">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </span>
              <input
                name="subject"
                placeholder="Email subject"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Prompt Field */}
          <div className="group/input">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              AI Prompt
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <textarea
                name="prompt"
                placeholder="Describe what you want the email to say..."
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl h-40 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:shadow-lg group-hover:scale-[1.02] disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate & Send AI Email
                </>
              )}
            </span>
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 rounded-xl transition-all duration-300 ${
            status.includes("success") 
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
              : "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
          }`}>
            <p className={`text-center text-sm font-medium ${
              status.includes("success") 
                ? "text-green-700 dark:text-green-400" 
                : "text-purple-700 dark:text-purple-400"
            }`}>
              {status}
            </p>
          </div>
        )}

        {/* Generated Email Preview */}
        {aiContent && (
          <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <strong className="text-purple-800 dark:text-purple-300 font-semibold">Generated Email:</strong>
            </div>
            <div className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              {aiContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

