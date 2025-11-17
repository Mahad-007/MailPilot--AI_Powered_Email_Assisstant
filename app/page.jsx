import UnifiedEmailForm from "../components/UnifiedEmailForm";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-all duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <ThemeToggle />

      <div className="relative z-10 flex flex-col justify-center items-center py-10 px-4 min-h-screen">
        {/* Header */}
        <div className="mb-12 text-center animate-float">
          <div className="inline-block mb-4 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700">
            <span className="text-6xl">📬</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 gradient-text tracking-tight">
            MailPilot
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light">
            Send regular emails or let AI craft them for you with cutting-edge technology
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/40 dark:bg-black/30 backdrop-blur-sm rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-glow"></span>
              AI Powered
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/40 dark:bg-black/30 backdrop-blur-sm rounded-full">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-glow"></span>
              MCP Enabled
            </span>
          </div>
        </div>

        {/* Unified Email Form */}
        <UnifiedEmailForm />

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Powered by
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">MCP</span>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Gemini AI</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 font-light">
            Enterprise-grade email automation
          </p>
        </footer>
      </div>
    </main>
  );
}

