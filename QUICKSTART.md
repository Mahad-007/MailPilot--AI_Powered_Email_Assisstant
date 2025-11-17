# 🚀 MailPilot - Quick Start Guide

Get up and running with MailPilot in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

## Step 3: Create Environment File

Create a file named `.env.local` in the root directory:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key from Step 2.

## Step 4: Configure MCP for Gmail

Ensure your MCP server has Gmail access configured. Check your MCP configuration file (usually `~/.cursor/mcp.json` or `C:\Users\YourName\.cursor\mcp.json` on Windows).

Example MCP configuration:

```json
{
  "mcpServers": {
    "zapier": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-zapier"]
    }
  }
}
```

Make sure you've connected Gmail to Zapier following their authentication flow.

## Step 5: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 6: Send Your First Email!

### Regular Email
1. Fill in the "Send Email" form
2. Enter recipient, subject, and body
3. Click "Send Email"

### AI-Generated Email
1. Fill in the "AI Email Generator" form
2. Enter recipient and subject
3. Type a prompt like: "Write a professional follow-up email thanking them for yesterday's meeting"
4. Click "Generate & Send AI Email"

## 🎉 You're Done!

Your AI email assistant is ready to use!

## Troubleshooting

### "Failed to send email"
- Make sure MCP server is running
- Verify Gmail is connected in Zapier
- Check your internet connection

### "AI generation failed"
- Verify your Gemini API key is correct
- Check you have API quota available at [Google AI Studio](https://makersuite.google.com/app/apikey)

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## Next Steps

- Customize the AI prompts in `app/actions/sendAIEmail.js`
- Add more email templates
- Style the UI to match your brand
- Deploy to Vercel or your preferred hosting platform

---

Need help? Check the full [README.md](./README.md) for detailed documentation.

