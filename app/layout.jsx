import "./globals.css";

export const metadata = {
  title: "MailPilot - AI Email Assistant",
  description: "Send emails with AI using MCP and Gemini API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="transition-colors duration-300">{children}</body>
    </html>
  );
}

