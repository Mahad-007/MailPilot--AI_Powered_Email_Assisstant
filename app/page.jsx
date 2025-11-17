import EmailForm from "../components/EmailForm";
import AIEmailForm from "../components/AIEmailForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 py-10 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          📬 MailPilot
        </h1>
        <p className="text-gray-600">
          Send regular emails or let AI craft them for you
        </p>
      </div>

      <EmailForm />
      <AIEmailForm />

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Powered by MCP + Gemini AI</p>
      </footer>
    </main>
  );
}

