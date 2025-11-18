// This file runs in pure Node.js environment, not webpack-bundled
const axios = require('axios');

// Your Zapier MCP endpoint from environment variables
const ZAPIER_MCP_URL = process.env.ZAPIER_MCP_URL;

// Validate that required environment variable is set
if (!ZAPIER_MCP_URL) {
  throw new Error('ZAPIER_MCP_URL environment variable is not set. Please configure it in your environment.');
}

/**
 * Sends an email using Zapier MCP Gmail integration
 * @param {Object} emailData - Email data
 * @returns {Promise<Object>} Result
 */
async function sendEmailViaMCP(emailData) {
  try {
    // Prepare the MCP JSON-RPC request
    const mcpRequest = {
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name: "gmail_send_email",  // Correct tool name from Zapier MCP
        arguments: {
          instructions: `Send an email to ${emailData.to} with subject "${emailData.subject}" and body: ${emailData.body}`,
          to: [emailData.to],  // Must be an array as per Zapier MCP schema
          subject: emailData.subject,
          body: emailData.body
        }
      }
    };

    // Send request to Zapier MCP HTTP endpoint
    const response = await axios.post(ZAPIER_MCP_URL, mcpRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream'
      },
      timeout: 30000 // 30 second timeout
    });

    // Parse SSE (Server-Sent Events) response
    let mcpResponse;
    if (typeof response.data === 'string' && response.data.includes('event: message')) {
      // Extract JSON from SSE format: "event: message\ndata: {...}\n\n"
      const dataMatch = response.data.match(/data: ({.*})/);
      if (dataMatch) {
        mcpResponse = JSON.parse(dataMatch[1]);
      } else {
        throw new Error('Could not parse SSE response from Zapier MCP');
      }
    } else {
      mcpResponse = response.data;
    }

    console.log('Parsed MCP Response:', JSON.stringify(mcpResponse, null, 2));

    // Check for JSON-RPC error
    if (mcpResponse.error) {
      const errorMsg = mcpResponse.error.message || 'MCP request failed';
      
      // Provide helpful error message for tool not found
      if (errorMsg.includes('Tool gmail_send_email not found') || 
          errorMsg.includes('Tool mcp_Zapier_gmail_send_email not found')) {
        throw new Error(
          'Gmail is not configured in your Zapier MCP. Please go to ' +
          'https://mcp.zapier.com and add the "Gmail - Send Email" action, ' +
          'then connect your Gmail account.'
        );
      }
      
      throw new Error(errorMsg);
    }

    // Check if the result contains any error information
    const result = mcpResponse.result;
    if (result && result.content) {
      console.log('MCP Result Content:', result.content);
    }

    return {
      success: true,
      message: "Email sent successfully!",
      result: mcpResponse.result
    };
  } catch (error) {
    console.error('MCP Error:', error.response?.data || error.message);
    throw new Error(`Failed to send email via Zapier MCP: ${error.message}`);
  }
}

/**
 * Generates email content using Gemini AI
 * @param {string} prompt - User prompt
 * @returns {Promise<string>} Generated email content
 */
async function generateEmailWithGemini(prompt) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured in .env.local');
  }

  const fullPrompt = `You are a professional email writing assistant. Write a single, complete email body based on the request below.

IMPORTANT RULES:
- Generate ONLY the email body content (no subject lines)
- Do NOT provide multiple options or alternatives
- Do NOT include explanations, instructions, or notes
- Do NOT use placeholders like [Your Name] or [Recipient's Name]
- Write ONE complete, ready-to-send email
- Use a professional but friendly tone
- Format with proper paragraphs and line breaks
- Use natural, real language throughout

Request: ${prompt}

Email body:`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
           "Sorry, could not generate email.";
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error(`Failed to generate email with Gemini: ${error.message}`);
  }
}

module.exports = {
  sendEmailViaMCP,
  generateEmailWithGemini
};

