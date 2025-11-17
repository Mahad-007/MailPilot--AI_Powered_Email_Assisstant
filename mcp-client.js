import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let mcpClient = null;

export async function getMCPClient() {
  if (mcpClient) return mcpClient;

  // Windows requires .cmd extension for npm commands
  const isWindows = process.platform === "win32";
  const command = isWindows ? "npx.cmd" : "npx";

  const transport = new StdioClientTransport({
    command: command,
    args: ["-y", "@modelcontextprotocol/server-zapier"]
  });

  mcpClient = new Client(
    {
      name: "mailpilot-client",
      version: "1.0.0"
    },
    {
      capabilities: {}
    }
  );

  await mcpClient.connect(transport);
  return mcpClient;
}

