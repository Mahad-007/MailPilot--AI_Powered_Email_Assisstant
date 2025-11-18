# 🔒 Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in MailPilot, please report it by emailing the maintainers directly. Please do not create a public GitHub issue for security vulnerabilities.

### What to Include

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Best Practices

### Environment Variables

#### ✅ DO
- Store all API keys and secrets in environment variables
- Use different API keys for development and production
- Rotate API keys regularly (at least every 90 days)
- Use Vercel's environment variables feature for production
- Add `.env.local` and `.env` to `.gitignore`

#### ❌ DON'T
- Never commit `.env.local` or `.env` files to Git
- Never hardcode API keys or secrets in your code
- Never share API keys in public forums or screenshots
- Never use production keys in development

### API Keys Management

#### Gemini API Key
- Keep your Gemini API key secure and private
- Set up usage quotas in Google AI Studio
- Monitor API usage regularly
- Enable billing alerts to prevent unexpected charges
- Revoke and regenerate if compromised

#### Zapier MCP URL
- Treat your MCP URL as a secret (it contains your credentials)
- Don't share your MCP URL publicly
- Regenerate if exposed or compromised
- Monitor Zapier task history for unexpected activity

### Application Security

#### Input Validation
- All user inputs are validated on the server side
- Email addresses are validated before processing
- Subject lines and body content are sanitized
- Maximum length limits are enforced

#### Rate Limiting
- Vercel provides built-in rate limiting
- Consider implementing application-level rate limiting for API endpoints
- Monitor for unusual traffic patterns

#### HTTPS/TLS
- Always use HTTPS in production
- Vercel automatically provisions SSL certificates
- HSTS header is enabled by default

### Security Headers

The following security headers are configured in `next.config.js`:

```javascript
{
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

### Error Handling

#### ✅ DO
- Log errors server-side for debugging
- Return generic error messages to users
- Monitor error rates and patterns
- Set up error tracking (Sentry, LogRocket, etc.)

#### ❌ DON'T
- Never expose stack traces to users
- Never return sensitive information in error messages
- Never log sensitive data (API keys, passwords, etc.)

### Dependencies

#### Regular Updates
```bash
# Check for outdated dependencies
npm outdated

# Update dependencies
npm update

# Audit for security vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

#### Dependency Management
- Regularly audit dependencies for vulnerabilities
- Keep Next.js and React up to date
- Review dependency changes before updating
- Use `npm audit` before deploying

### Access Control

#### Gmail Access
- Only grant necessary permissions to Zapier
- Review connected apps regularly
- Use a dedicated service account for production (recommended)
- Monitor sent emails for unauthorized activity

#### Vercel Access
- Use strong passwords and enable 2FA
- Limit team access to necessary members only
- Use role-based access control
- Audit access logs regularly

### Monitoring & Logging

#### What to Monitor
- Failed authentication attempts
- Unusual API usage patterns
- Error rates and types
- Response times and performance
- Email sending failures

#### Logging Best Practices
- Log all important events (email sends, API calls, errors)
- Don't log sensitive information
- Use structured logging (JSON format)
- Set up log retention policies
- Enable real-time alerting for critical errors

### Production Checklist

Before deploying to production, ensure:

- [ ] All environment variables are set in Vercel
- [ ] `.env.local` is in `.gitignore`
- [ ] API keys are different from development
- [ ] Security headers are configured
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Error monitoring is set up
- [ ] Usage monitoring is configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Dependencies are up to date
- [ ] `npm audit` shows no vulnerabilities

### Incident Response

If you suspect a security breach:

1. **Immediately**
   - Rotate all API keys (Gemini, Zapier)
   - Review recent logs for suspicious activity
   - Check Vercel deployment logs
   - Review Zapier task history

2. **Investigate**
   - Determine the scope of the breach
   - Identify affected users or data
   - Document all findings

3. **Remediate**
   - Fix the vulnerability
   - Deploy the fix
   - Verify the fix works

4. **Communicate**
   - Notify affected users if necessary
   - Update documentation
   - Share lessons learned

### Compliance

#### Data Privacy
- User email addresses are only used for sending emails
- No email content is stored permanently
- Comply with GDPR, CCPA, and other relevant regulations
- Provide a privacy policy if collecting user data

#### Email Compliance
- Include unsubscribe links if sending marketing emails
- Comply with CAN-SPAM Act
- Honor bounce and complaint feedback
- Don't send unsolicited emails

### Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Guidelines](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#securing-environment-variables)
- [Vercel Security](https://vercel.com/docs/security)
- [Google AI Studio Security](https://ai.google.dev/docs/safety_guidance)
- [Zapier Security](https://zapier.com/security)

### Regular Security Audits

Perform security audits:
- **Weekly**: Review logs and monitoring
- **Monthly**: Update dependencies, review access
- **Quarterly**: Rotate API keys, conduct penetration testing
- **Annually**: Full security assessment, update policies

---

**Security is a shared responsibility. Stay vigilant and keep your application and users safe! 🔒**

