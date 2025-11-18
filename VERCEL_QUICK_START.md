# ⚡ Vercel Quick Start Guide

Get your MailPilot app deployed to production in 5 minutes!

## 📋 What You Need

Before starting, make sure you have:

1. ✅ Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. ✅ Zapier MCP URL from [Zapier MCP](https://mcp.zapier.com)
3. ✅ Gmail connected in Zapier MCP dashboard
4. ✅ Code pushed to GitHub/GitLab/Bitbucket

## 🚀 5-Minute Deployment

### Step 1: Import Project (1 minute)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in or create a free account
3. Click "Import Git Repository"
4. Select your MailPilot repository
5. Click "Import"

### Step 2: Configure Project (2 minutes)

Vercel will auto-detect Next.js. Just verify:

- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅

Click "Continue"

### Step 3: Add Environment Variables (1 minute)

In the "Environment Variables" section, add both variables:

**Variable 1:**
```
Name: GEMINI_API_KEY
Value: [paste your Gemini API key]
Environment: Production ✅
```

**Variable 2:**
```
Name: ZAPIER_MCP_URL
Value: [paste your Zapier MCP URL]
Environment: Production ✅
```

**Important**: Make sure you copy-paste the entire values with no extra spaces!

### Step 4: Deploy (1 minute)

1. Click "Deploy"
2. Wait 2-3 minutes while Vercel builds your app
3. ☕ Grab a coffee!

### Step 5: Test Your App (30 seconds)

Once deployed:

1. Click "Visit" to open your live app
2. Try sending a test email
3. 🎉 Celebrate!

## 🔗 Your URLs

After deployment, you'll get:

- **Production URL**: `https://your-project-name.vercel.app`
- **Dashboard**: `https://vercel.com/your-username/your-project`
- **Logs**: `https://vercel.com/your-username/your-project/logs`

## ⚡ Fast Commands

### Deploy via CLI (Alternative Method)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add GEMINI_API_KEY production
vercel env add ZAPIER_MCP_URL production
```

## 🐛 Quick Troubleshooting

### Build Failed?

**Check**: Are all dependencies installed?
```bash
npm install
npm run build  # Test locally first
```

### Environment Variables Not Working?

**Check**: Did you select "Production" environment when adding variables?

1. Go to Project Settings → Environment Variables
2. Make sure both variables show "Production" tag
3. Redeploy if you just added them

### Emails Not Sending?

**Check**: Is your Zapier MCP URL correct?

1. Visit [mcp.zapier.com](https://mcp.zapier.com)
2. Verify Gmail is connected
3. Copy the MCP URL again
4. Update in Vercel → Redeploy

### 404 or Page Not Found?

**Check**: Did the build complete successfully?

1. Check the deployment logs
2. Look for any error messages
3. Fix errors and push to Git (auto-redeploys)

## 🎯 What's Next?

### Immediate

- [ ] Test regular email sending
- [ ] Test AI email generation
- [ ] Share the URL with your team

### Optional Improvements

- [ ] Add a custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up error monitoring
- [ ] Configure custom OG images

## 💡 Pro Tips

### Automatic Deployments

Every time you push to your `main` branch, Vercel automatically:
1. Builds your app
2. Runs tests (if configured)
3. Deploys to production
4. Notifies you of success/failure

### Preview Deployments

Every pull request automatically gets:
- A unique preview URL
- Full environment variables
- Perfect for testing before merging

### Custom Domain

Add a custom domain in 2 clicks:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `mail.yourdomain.com`)
3. Update DNS records as shown
4. Wait 5 minutes for SSL

## 📊 Monitor Your App

### View Logs
```
https://vercel.com/your-username/your-project/logs
```

### View Analytics
```
https://vercel.com/your-username/your-project/analytics
```

### View Settings
```
https://vercel.com/your-username/your-project/settings
```

## 🔐 Security Reminders

- ✅ Never commit `.env.local` to Git
- ✅ Use different API keys for dev and production
- ✅ Rotate API keys every 90 days
- ✅ Monitor API usage regularly

## 📚 More Resources

- **Full Deployment Guide**: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- **Security Best Practices**: [SECURITY.md](./SECURITY.md)
- **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

## 🆘 Need Help?

Something not working? Here's where to get help:

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Full Guide**: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

---

**That's it! Your MailPilot app is now live and ready to send emails! 🚀✨**

