/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions are enabled by default in Next.js 14
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle MCP SDK - it needs to run in pure Node.js
      config.externals = [...(config.externals || []), '@modelcontextprotocol/sdk'];
    }
    return config;
  },
};

module.exports = nextConfig;

