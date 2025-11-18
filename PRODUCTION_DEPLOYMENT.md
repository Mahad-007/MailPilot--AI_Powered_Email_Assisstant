# 🚀 Production Deployment Guide

This guide walks you through deploying MailPilot to Vercel for production use.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] **Gemini API Key** - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [x] **Zapier MCP URL** - Get it from [Zapier MCP](https://mcp.zapier.com)
- [x] **Gmail Connected** - Configure Gmail in your Zapier MCP dashboard
- [x] **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
- [x] **Git Repository** - Code pushed to GitHub, GitLab, or Bitbucket

## 🔐 Environment Variables

### Required Environment Variables

Your production deployment requires the following environment variables:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Your Gemini API key from Google AI Studio | ✅ Yes | `AIzaSy...` |
| `ZAPIER_MCP_URL` | Your Zapier MCP endpoint URL | ✅ Yes | `https://mcp.zapier.com/api/mcp/s/...` |
| `NODE_ENV` | Node environment (auto-set by Vercel) | ⚠️ Auto | `production` |

### Getting Your Zapier MCP URL

1. Visit [https://mcp.zapier.com](https://mcp.zapier.com)
2. Sign in with your Zapier account
3. Add the **Gmail - Send Email** action
4. Connect your Gmail account and authorize access
5. Copy your unique MCP URL from the configuration page
   - Format: `https://mcp.zapier.com/api/mcp/s/YOUR_UNIQUE_KEY/mcp`

### Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. **Important**: Keep this key secure and never commit it to version control

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Your Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Import your `mailpilot` repository

2. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Add Environment Variables**
   - In the "Environment Variables" section, add:
     ```
     GEMINI_API_KEY = your_actual_gemini_api_key
     ZAPIER_MCP_URL = your_actual_zapier_mcp_url
     ```
   - Make sure to add these for **Production** environment
   - Optionally add for Preview and Development environments too

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (typically 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Production**
   ```bash
   # First deployment
   vercel --prod
   
   # Add environment variables during deployment
   vercel env add GEMINI_API_KEY production
   vercel env add ZAPIER_MCP_URL production
   ```

4. **Subsequent Deployments**
   ```bash
   # Just run
   vercel --prod
   ```

### Option 3: Deploy via Git Integration (Automatic)

1. **Connect Repository to Vercel**
   - Link your GitHub/GitLab/Bitbucket repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Automatic Deployments**
   - Every push to `main` branch automatically deploys to production
   - Pull requests create preview deployments
   - No manual intervention needed

## 🔧 Post-Deployment Configuration

### 1. Verify Environment Variables

After deployment, verify your environment variables:

```bash
vercel env ls
```

You should see:
- `GEMINI_API_KEY` (Production)
- `ZAPIER_MCP_URL` (Production)

### 2. Test Your Deployment

Visit your deployed URL and test:

1. **Regular Email**
   - Enter a recipient email, subject, and body
   - Click "Send Email"
   - Verify the email is received

2. **AI-Generated Email**
   - Enter a recipient email and subject
   - Provide a prompt like "Write a thank you email for attending our meeting"
   - Click "Generate & Send AI Email"
   - Verify the email is generated and sent

### 3. Monitor Logs

View real-time logs in Vercel dashboard:

```bash
# Via CLI
vercel logs your-project-url.vercel.app
```

Or visit: `https://vercel.com/your-username/your-project/logs`

## 🔒 Security Best Practices

### Environment Variables

- ✅ **Never commit** `.env.local` or `.env` files to Git
- ✅ **Use Vercel's Environment Variables** feature for secrets
- ✅ **Rotate API keys** periodically
- ✅ **Use different keys** for development and production

### API Security

- ✅ **Rate Limiting**: Vercel provides built-in rate limiting
- ✅ **CORS**: Configure CORS headers if needed
- ✅ **Input Validation**: All inputs are validated on the server side
- ✅ **Error Handling**: Errors don't expose sensitive information

### Security Headers

The `vercel.json` file includes security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## 📊 Monitoring & Analytics

### Vercel Analytics

Enable Vercel Analytics to track:
- Page views and performance
- Core Web Vitals
- User engagement

Enable in your Vercel dashboard under "Analytics".

### Error Monitoring

Consider integrating error monitoring services:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Datadog](https://www.datadoghq.com)

## 🔄 Updating Your Deployment

### Update Code

```bash
# Make your changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel will automatically deploy
```

### Update Environment Variables

```bash
# Via CLI
vercel env add GEMINI_API_KEY production

# Or update in Vercel dashboard
# https://vercel.com/your-username/your-project/settings/environment-variables
```

### Rollback if Needed

```bash
# List deployments
vercel list

# Rollback to a previous deployment
vercel rollback <deployment-url>
```

## 🌍 Custom Domain

### Add a Custom Domain

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `mailpilot.yourdomain.com`)
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

### DNS Configuration

For example, if using `mailpilot.example.com`:

```
Type: CNAME
Name: mailpilot
Value: cname.vercel-dns.com
```

## 🚨 Troubleshooting

### Build Failures

**Problem**: Build fails with module errors

```bash
# Solution: Clear cache and rebuild
vercel --force
```

### Environment Variables Not Working

**Problem**: App can't access environment variables

```bash
# Solution: Verify environment variables are set
vercel env ls

# Re-add if needed
vercel env add GEMINI_API_KEY production
vercel env add ZAPIER_MCP_URL production

# Redeploy
vercel --prod
```

### Email Not Sending

**Problem**: Emails fail to send in production

**Solutions**:
1. Verify `ZAPIER_MCP_URL` is correct in Vercel dashboard
2. Check Gmail is connected in Zapier MCP dashboard
3. Review logs: `vercel logs`
4. Test Zapier MCP connection directly

### API Rate Limits

**Problem**: Hitting Gemini API rate limits

**Solutions**:
1. Upgrade your Gemini API plan
2. Implement client-side rate limiting
3. Add request queuing
4. Cache AI-generated responses

### CORS Issues

**Problem**: CORS errors in production

**Solution**: Add CORS headers to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
      ],
    },
  ];
}
```

## 📈 Performance Optimization

### Edge Functions

Consider using Vercel Edge Functions for:
- Faster response times globally
- Lower latency
- Better scalability

### Caching Strategy

Implement caching for:
- Static assets (automatic with Next.js)
- API responses (where appropriate)
- AI-generated templates

### Monitoring Core Web Vitals

Ensure optimal performance:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 💰 Cost Considerations

### Vercel Pricing

- **Hobby Plan**: Free
  - 100GB bandwidth
  - 100 hours build time
  - Perfect for personal projects

- **Pro Plan**: $20/month
  - 1TB bandwidth
  - 400 hours build time
  - Better for production apps

### Gemini API Costs

- **Free Tier**: 60 requests per minute
- Monitor usage in Google Cloud Console
- Set up billing alerts

### Zapier MCP

- Check Zapier plan limits for Gmail actions
- Monitor email send quota

## 📝 Checklist: First Deployment

- [ ] Code pushed to Git repository
- [ ] Gemini API key obtained and tested
- [ ] Zapier MCP URL obtained and Gmail connected
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Environment variables added in Vercel
- [ ] First deployment successful
- [ ] Test regular email sending
- [ ] Test AI email generation
- [ ] Check logs for any errors
- [ ] Configure custom domain (optional)
- [ ] Enable analytics (optional)
- [ ] Set up error monitoring (optional)

## 🎉 Success!

Your MailPilot app should now be live and ready to send emails!

**Deployed URL**: `https://your-project-name.vercel.app`

### Next Steps

1. Share your app with users
2. Monitor usage and errors
3. Iterate based on feedback
4. Scale as needed

## 🆘 Need Help?

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Gemini API Docs**: [ai.google.dev/docs](https://ai.google.dev/docs)
- **Zapier MCP Docs**: [mcp.zapier.com](https://mcp.zapier.com)

---

**Happy Deploying! 🚀**

