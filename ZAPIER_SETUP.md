# 🔧 Zapier MCP Gmail Setup Guide

Your Zapier MCP is connected, but Gmail needs to be configured as an action. Follow these steps:

## Step 1: Access Zapier MCP Dashboard

Go to: **https://mcp.zapier.com**

Or directly to your server config: **https://mcp.zapier.com/mcp/servers/412cd563-6fc7-43fa-812d-77dc9227773d/config**

## Step 2: Add Gmail Action

1. Click **"Add Tool"** or **"Configure Actions"**
2. Search for **"Gmail"**
3. Select **"Gmail - Send Email"** from the available actions
4. Click **"Add"** or **"Enable"**

## Step 3: Connect Your Gmail Account

1. You'll be prompted to **connect your Gmail account**
2. Click **"Connect Account"**
3. Sign in with your Google account
4. **Authorize Zapier** to send emails on your behalf
5. Choose which Gmail account to use (if you have multiple)

## Step 4: Configure the Action (if needed)

Some actions may need configuration:
- Set any default values
- Configure required fields
- Test the connection

## Step 5: Publish/Enable

1. Make sure the action is **enabled** (toggle switch)
2. Click **"Save"** or **"Publish"**
3. Wait a few seconds for changes to propagate

## Step 6: Test in MailPilot

1. Go back to http://localhost:3000
2. Try sending an email again
3. You should now see it working!

---

## 🔍 Troubleshooting

### "Tool not found" error persists
- Wait 30-60 seconds after configuring Gmail in Zapier
- Refresh the Zapier MCP dashboard to confirm Gmail is listed
- Restart your Next.js dev server: `npm run dev`

### Gmail authorization fails
- Make sure you're using the correct Google account
- Check if "Less secure app access" is enabled (if using older Gmail accounts)
- Try using an App Password instead of your regular password

### Emails not sending after setup
- Check Zapier execution logs at https://zapier.com/app/history
- Verify your Gmail account has sending permissions
- Check spam folder of recipient

---

## 📝 Alternative: Use Zapier's Web Interface

If MCP setup is complex, you can also:
1. Create a Zap at https://zapier.com
2. Trigger: Webhook
3. Action: Gmail - Send Email
4. Use the webhook URL in the app instead

---

## ✅ Verification

Once configured, you should see `mcp_Zapier_gmail_send_email` in your available tools.

You can verify by checking the Zapier MCP dashboard - it should list "Gmail - Send Email" as an active action.

