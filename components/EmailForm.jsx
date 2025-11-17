"use client";

import { useState } from "react";
import { sendEmail } from "../app/actions/sendEmail";

export default function EmailForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
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
    }
  }

  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        📧 Send Email
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
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body
          </label>
          <textarea
            name="body"
            placeholder="Email body..."
            required
            className="w-full border border-gray-300 p-2 rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>

      {status && (
        <p className={`mt-4 text-center text-sm ${status.includes("success") ? "text-green-600" : "text-gray-700"}`}>
          {status}
        </p>
      )}
    </div>
  );
}

