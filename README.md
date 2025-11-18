# 📬 MailPilot

AI-powered email assistant that lets you send regular emails or AI-generated emails using Gemini API and MCP (Model Context Protocol).

## ✨ Features

- **Regular Email**: Send emails directly through Gmail using MCP
- **AI Email Generation**: Type a prompt and let Gemini AI craft professional emails
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Server Actions**: Secure server-side email handling with Next.js 14+

## 🚀 Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS**
- **MCP (Model Context Protocol)** for Gmail integration
- **Gemini AI API** for email generation
- **Axios** for API requests

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **Gemini API Key** - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Gmail account** connected to Zapier MCP
4. **Zapier MCP Server** configured

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
ZAPIER_MCP_URL=your_zapier_mcp_url_here
```

**Getting Your Keys:**
- **GEMINI_API_KEY**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **ZAPIER_MCP_URL**: Get it from [Zapier MCP](https://mcp.zapier.com) after connecting Gmail

### 3. Set Up MCP Gmail Connection

Make sure you have the Zapier MCP server configured with Gmail access. Check your `~/.cursor/mcp.json` or equivalent configuration file.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
mailpilot/
├── app/
│   ├── actions/
│   │   ├── sendEmail.js       # Regular email sender
│   │   └── sendAIEmail.js     # AI email generator & sender
│   ├── page.jsx               # Main page
│   ├── layout.jsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── EmailForm.jsx          # Regular email form
│   └── AIEmailForm.jsx        # AI email form
├── mcp-client.js              # MCP client configuration
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 🎯 Usage

### Send Regular Email

1. Fill in recipient email, subject, and body
2. Click "Send Email"
3. Email will be sent via Gmail through MCP

### Generate & Send AI Email

1. Enter recipient email and subject
2. Type a prompt describing what you want the email to say
   - Example: "Write a follow-up email thanking them for the meeting"
3. Click "Generate & Send AI Email"
4. Gemini AI will generate the email content and send it automatically

## 🔧 Configuration

### MCP Client

The MCP client is configured in `mcp-client.js` to connect to Zapier's Gmail integration. Make sure your MCP server is running:

```bash
npx @modelcontextprotocol/cli run src/index.ts
```

### Gemini API

The project uses Gemini Pro model for text generation. You can modify the model or prompt in `app/actions/sendAIEmail.js`.

## 📝 API Reference

### Gemini API Endpoint

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

### MCP Gmail Tool

```javascript
client.callTool("mcp_Zapier_gmail_send_email", {
  instructions: "...",
  to: ["email@example.com"],
  subject: "...",
  body: "...",
  body_type: "html"
});
```

## 🚀 Production Deployment

Ready to deploy to production? See our comprehensive [Production Deployment Guide](./PRODUCTION_DEPLOYMENT.md) for detailed instructions on deploying to Vercel.

### Quick Deploy to Vercel

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Import to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Framework: Next.js (auto-detected)

3. **Add Environment Variables**
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key
   ZAPIER_MCP_URL=your_actual_zapier_mcp_url
   ```

4. **Deploy**
   - Click Deploy and wait 2-3 minutes
   - Your app will be live at `https://your-project.vercel.app`

For detailed instructions, troubleshooting, and best practices, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md).

## 🐛 Troubleshooting

### Email Not Sending

- Verify your MCP server is running (development only)
- Check Gmail is properly connected in Zapier
- Ensure you have proper authentication
- Verify `ZAPIER_MCP_URL` environment variable is set correctly

### AI Generation Failed

- Verify `GEMINI_API_KEY` is set correctly
- Check you have API quota available
- Review the Gemini API console for errors

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Environment Variables Not Loading

- Make sure `.env.local` exists in project root
- Restart the development server after adding new variables
- Check for typos in variable names

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for learning and production.

## 🔗 Links

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zapier MCP Server](https://github.com/modelcontextprotocol/servers)

---

**Made with ❤️ using MCP and Gemini AI**

