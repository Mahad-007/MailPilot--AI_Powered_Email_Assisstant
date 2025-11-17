"use client";

import { useState } from "react";
import { sendEmail } from "../app/actions/sendEmail";
import { generateAIEmail } from "../app/actions/generateAIEmail";

export default function UnifiedEmailForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiContent, setAIContent] = useState("");
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  async function handleRegularSend(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending email...");

    const form = new FormData(e.target);

    const res = await sendEmail({
      to: form.get("to"),
      subject: form.get("subject"),
      body: form.get("body")
    });

    setStatus(res.message);
    setLoading(false);

    if (res.success) {
      e.target.reset();
      setAIContent("");
      setShowAIPrompt(false);
    }
  }

  async function handleAIGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("Generating AI email...");

    const form = new FormData(e.target);

    const res = await generateAIEmail({
      prompt: form.get("aiPrompt")
    });

    if (res.generatedBody) {
      setAIContent(res.generatedBody);
      setEditedContent(res.generatedBody);
      setIsEditing(true);
      setStatus("Email generated! Review and edit if needed, then send.");
    } else {
      setStatus(res.message);
    }
    
    setLoading(false);
  }

  async function handleSendEditedEmail(toEmail, subject) {
    setLoading(true);
    setStatus("Sending email...");

    const res = await sendEmail({
      to: toEmail,
      subject: subject,
      body: editedContent
    });

    setStatus(res.message);
    setLoading(false);

    if (res.success) {
      setAIContent("");
      setEditedContent("");
      setIsEditing(false);
      setShowAIPrompt(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto group">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 border border-white/20 dark:border-gray-700 hover:shadow-3xl transition-all duration-500">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 rounded-2xl shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Compose Email
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send directly or let AI craft your message
            </p>
          </div>
        </div>

        <form onSubmit={showAIPrompt && !isEditing ? handleAIGenerate : handleRegularSend} className="space-y-6" id="emailForm">
          {/* Recipient Field */}
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

          {/* Message Field - Show only when NOT in AI mode */}
          {!showAIPrompt && (
            <div className="group/input">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="body"
                placeholder="Type your message here..."
                required={!showAIPrompt}
                className="w-full px-4 py-3.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl h-32 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-y text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          )}

          {/* AI Assistant Section */}
          <div className="relative">
            <div className="flex items-center justify-center my-6">
              <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
              <button
                type="button"
                onClick={() => setShowAIPrompt(!showAIPrompt)}
                className="mx-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white text-sm font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {showAIPrompt ? "Switch to Manual" : "Use AI Assistant"}
              </button>
              <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
            </div>

            {/* AI Prompt Field - Show only when in AI mode */}
            {showAIPrompt && (
              <div className="group/input animate-in fade-in duration-300">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Prompt
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-purple-500 dark:text-purple-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <textarea
                    name="aiPrompt"
                    placeholder="Describe what you want the email to say... (e.g., 'Write a professional thank you email for the meeting')"
                    required={showAIPrompt}
                    className="w-full pl-12 pr-4 py-3.5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl h-32 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-y text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {!showAIPrompt ? (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Email
                    </>
                  )}
                </span>
              </button>
            ) : !isEditing ? (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
                      Generate with AI
                    </>
                  )}
                </span>
              </button>
            ) : null}
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 rounded-xl transition-all duration-300 ${
            status.includes("success") 
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
              : status.includes("Generating")
              ? "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
              : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          }`}>
            <p className={`text-center text-sm font-medium ${
              status.includes("success") 
                ? "text-green-700 dark:text-green-400" 
                : status.includes("Generating")
                ? "text-purple-700 dark:text-purple-400"
                : "text-blue-700 dark:text-blue-400"
            }`}>
              {status}
            </p>
          </div>
        )}

        {/* AI Generated Email - Edit Mode */}
        {isEditing && aiContent && (
          <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <strong className="text-purple-800 dark:text-purple-300 font-semibold">Review & Edit Your Email:</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setAIContent("");
                  setEditedContent("");
                  setStatus("");
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Cancel"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-4 py-3.5 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-lg h-48 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-y text-gray-900 dark:text-white"
              placeholder="Edit your AI-generated email..."
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const form = document.getElementById('emailForm');
                  const formData = new FormData(form);
                  handleSendEditedEmail(formData.get('to'), formData.get('subject'));
                }}
                disabled={loading || !editedContent.trim()}
                className="flex-1 relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Email
                    </>
                  )}
                </span>
              </button>
              
              <button
                type="button"
                onClick={async () => {
                  const form = document.getElementById('emailForm');
                  await handleAIGenerate({ preventDefault: () => {}, target: form });
                }}
                disabled={loading}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white py-3.5 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Regenerate
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

