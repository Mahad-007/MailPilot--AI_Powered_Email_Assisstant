#!/usr/bin/env node

/**
 * Environment Variables Checker for MailPilot
 * Run this script to verify your environment is properly configured
 * 
 * Usage:
 *   node scripts/check-env.js
 *   npm run check-env
 */

const requiredVars = {
  GEMINI_API_KEY: {
    required: true,
    description: 'Gemini API key from Google AI Studio',
    format: 'Should start with "AIza"',
    validator: (value) => value && value.startsWith('AIza'),
  },
  ZAPIER_MCP_URL: {
    required: true,
    description: 'Zapier MCP endpoint URL',
    format: 'Should start with "https://mcp.zapier.com"',
    validator: (value) => value && value.startsWith('https://mcp.zapier.com'),
  },
};

const optionalVars = {
  NODE_ENV: {
    description: 'Node environment (development/production)',
    format: 'development or production',
  },
};

console.log('\n🔍 Checking MailPilot Environment Configuration...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('📋 Required Environment Variables:\n');

for (const [varName, config] of Object.entries(requiredVars)) {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`❌ ${varName}: MISSING`);
    console.log(`   ${config.description}`);
    console.log(`   Format: ${config.format}\n`);
    hasErrors = true;
  } else if (config.validator && !config.validator(value)) {
    console.log(`⚠️  ${varName}: INVALID FORMAT`);
    console.log(`   Current: ${value.substring(0, 20)}...`);
    console.log(`   Expected: ${config.format}\n`);
    hasWarnings = true;
  } else {
    const maskedValue = value.length > 20 
      ? `${value.substring(0, 15)}...${value.substring(value.length - 5)}`
      : `${value.substring(0, 10)}...`;
    console.log(`✅ ${varName}: ${maskedValue}`);
    console.log(`   ${config.description}\n`);
  }
}

// Check optional variables
console.log('\n📝 Optional Environment Variables:\n');

for (const [varName, config] of Object.entries(optionalVars)) {
  const value = process.env[varName];
  
  if (!value) {
    console.log(`ℹ️  ${varName}: Not set (optional)`);
    console.log(`   ${config.description}\n`);
  } else {
    console.log(`✅ ${varName}: ${value}`);
    console.log(`   ${config.description}\n`);
  }
}

// Print summary
console.log('\n' + '='.repeat(60) + '\n');

if (hasErrors) {
  console.log('❌ Environment check FAILED');
  console.log('\nMissing required environment variables!');
  console.log('\n📝 To fix this:');
  console.log('1. Create a .env.local file in your project root');
  console.log('2. Add the missing variables:');
  console.log('\n   GEMINI_API_KEY=your_gemini_api_key');
  console.log('   ZAPIER_MCP_URL=your_zapier_mcp_url');
  console.log('\n3. Get your keys from:');
  console.log('   - Gemini: https://makersuite.google.com/app/apikey');
  console.log('   - Zapier MCP: https://mcp.zapier.com');
  console.log('\n4. Restart your development server\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Environment check PASSED with warnings');
  console.log('\nSome variables may have invalid formats.');
  console.log('Please verify they are correct.\n');
  process.exit(0);
} else {
  console.log('✅ Environment check PASSED');
  console.log('\nAll required environment variables are configured!');
  console.log('You can now run: npm run dev\n');
  process.exit(0);
}

