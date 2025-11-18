# ✅ Production Deployment Checklist

Use this checklist to ensure your MailPilot deployment is production-ready.

## Pre-Deployment

### Code Preparation

- [ ] All features are tested locally
- [ ] Code is pushed to Git repository (GitHub, GitLab, or Bitbucket)
- [ ] `.env.local` is not committed (check `.gitignore`)
- [ ] No hardcoded API keys or secrets in code
- [ ] All console.logs are appropriate for production
- [ ] Error handling is implemented for all API calls

### Environment Variables

- [ ] `GEMINI_API_KEY` obtained from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] `ZAPIER_MCP_URL` obtained from [Zapier MCP](https://mcp.zapier.com)
- [ ] Gmail is connected and authorized in Zapier MCP
- [ ] Test email sent successfully in development
- [ ] Test AI email generated and sent successfully in development

### Dependencies

- [ ] Run `npm audit` to check for vulnerabilities
  ```bash
  npm audit
  npm audit fix  # if needed
  ```
- [ ] All dependencies are up to date
  ```bash
  npm outdated
  npm update
  ```
- [ ] Build succeeds locally
  ```bash
  npm run build
  ```

## Vercel Setup

### Account & Project

- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] Repository connected to Vercel
- [ ] Project imported successfully
- [ ] Framework detected as Next.js

### Configuration

- [ ] Build command set to: `npm run build` (default)
- [ ] Output directory set to: `.next` (default)
- [ ] Install command set to: `npm install` (default)
- [ ] Node.js version set to: 18.x or higher

### Environment Variables in Vercel

- [ ] `GEMINI_API_KEY` added for Production environment
- [ ] `ZAPIER_MCP_URL` added for Production environment
- [ ] Optionally add for Preview environment
- [ ] Optionally add for Development environment
- [ ] Double-check for typos in variable names
- [ ] Verify URLs are complete (include https://)

## Deployment

### Initial Deployment

- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Check build logs for any errors
- [ ] Deployment successful (green checkmark)
- [ ] Deployment URL is accessible

### Testing Production

- [ ] Visit your production URL: `https://your-project.vercel.app`
- [ ] UI loads correctly
- [ ] No console errors in browser
- [ ] Theme toggle works (if applicable)

#### Test Regular Email
- [ ] Fill in recipient email
- [ ] Add subject line
- [ ] Add body content
- [ ] Click "Send Email"
- [ ] Email is sent successfully
- [ ] Check recipient inbox to verify delivery

#### Test AI Email
- [ ] Fill in recipient email
- [ ] Add subject line
- [ ] Enter AI prompt (e.g., "Write a thank you email")
- [ ] Click "Generate & Send AI Email"
- [ ] Email is generated successfully
- [ ] Email is sent successfully
- [ ] Check recipient inbox to verify delivery

### Monitoring

- [ ] Check Vercel deployment logs
  ```
  https://vercel.com/your-username/your-project/logs
  ```
- [ ] No errors in production logs
- [ ] API calls are succeeding
- [ ] Response times are acceptable

## Security Review

### Environment Variables

- [ ] No API keys in source code
- [ ] `.env.local` is in `.gitignore`
- [ ] Different API keys for development vs production (recommended)
- [ ] API keys are stored securely in Vercel

### Headers & Configuration

- [ ] Security headers configured in `next.config.js`
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] `poweredByHeader` is set to `false`
- [ ] `reactStrictMode` is enabled

### API Access

- [ ] Gemini API usage is within quota
- [ ] Billing alerts configured in Google Cloud Console
- [ ] Zapier task limits are sufficient for usage
- [ ] Gmail sending limits are adequate

## Post-Deployment

### Documentation

- [ ] README.md includes deployment instructions
- [ ] PRODUCTION_DEPLOYMENT.md is complete
- [ ] SECURITY.md guidelines are followed
- [ ] `.env.template` is available for reference

### Monitoring Setup (Optional but Recommended)

- [ ] Enable Vercel Analytics
  ```
  https://vercel.com/your-username/your-project/analytics
  ```
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring

### Custom Domain (Optional)

- [ ] Custom domain purchased
- [ ] DNS records configured
- [ ] Domain added in Vercel project settings
- [ ] SSL certificate provisioned automatically
- [ ] Domain is accessible via HTTPS

## Ongoing Maintenance

### Weekly

- [ ] Review deployment logs
- [ ] Check error rates
- [ ] Monitor API usage
- [ ] Review user feedback

### Monthly

- [ ] Update dependencies
  ```bash
  npm update
  npm audit
  ```
- [ ] Review Vercel analytics
- [ ] Check API costs (Gemini, Zapier)
- [ ] Review access logs

### Quarterly

- [ ] Rotate API keys
- [ ] Security audit
- [ ] Performance review
- [ ] Update documentation

## Troubleshooting

If deployment fails, check:

- [ ] Build logs in Vercel dashboard
- [ ] Environment variables are set correctly
- [ ] No typos in variable names
- [ ] Dependencies are compatible
- [ ] Next.js version is compatible

If emails fail to send:

- [ ] `ZAPIER_MCP_URL` is correct
- [ ] Gmail is connected in Zapier MCP
- [ ] No rate limiting from Gmail
- [ ] Check Zapier task history
- [ ] Review API logs in Vercel

If AI generation fails:

- [ ] `GEMINI_API_KEY` is correct and active
- [ ] API quota is not exceeded
- [ ] Check Google AI Studio console
- [ ] Review error messages in logs

## Rollback Plan

If you need to rollback:

1. **Via Vercel Dashboard**
   - Go to Deployments
   - Find the last working deployment
   - Click "..." menu
   - Select "Promote to Production"

2. **Via Vercel CLI**
   ```bash
   vercel rollback <deployment-url>
   ```

## Success Criteria

Your deployment is successful when:

- [x] ✅ Application is accessible at production URL
- [x] ✅ No errors in browser console
- [x] ✅ No errors in Vercel logs
- [x] ✅ Regular emails send successfully
- [x] ✅ AI emails generate and send successfully
- [x] ✅ All environment variables are configured
- [x] ✅ Security headers are in place
- [x] ✅ HTTPS is enabled
- [x] ✅ Performance is acceptable

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Production Deployment Guide](./PRODUCTION_DEPLOYMENT.md)
- [Security Policy](./SECURITY.md)

---

## Need Help?

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **GitHub Issues**: Create an issue in your repository

---

**Ready to deploy? Follow this checklist step by step, and you'll have a successful production deployment! 🚀**

