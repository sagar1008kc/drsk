/** @type {import('next').NextConfig} */
const scriptSrc =
  process.env.NODE_ENV === 'development'
    ? "'self' 'unsafe-inline' 'unsafe-eval' https://cdn.botpress.cloud https://files.bpcontent.cloud"
    : "'self' 'unsafe-inline' https://cdn.botpress.cloud https://files.bpcontent.cloud";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/portfolio/smart-agent',
        destination: '/home/smart-agent',
        permanent: true,
      },
      {
        source: '/portfolio/agentic-tools-hub',
        destination: '/home/agentic-tools-hub',
        permanent: true,
      },
      {
        source: '/portfolio/enterprise-llm-guide',
        destination: '/home/enterprise-llm-guide',
        permanent: true,
      },
      {
        source: '/portfolio/multi-agent-workflow-map',
        destination: '/home/multi-agent-workflow-map',
        permanent: true,
      },
      {
        source: '/portfolio/resources',
        destination: '/home/resources',
        permanent: true,
      },
      {
        source: '/portfolio/agentic-ai-system-design',
        destination: '/home/agentic-ai-system-design',
        permanent: true,
      },
      {
        source: '/portfolio/rag-systems',
        destination: '/home/rag-systems',
        permanent: true,
      },
      {
        source: '/portfolio/adk-system-design-interview',
        destination: '/home/adk-system-design-interview',
        permanent: true,
      },
      {
        source: '/portfolio/enterprise-ai-agents',
        destination: '/home/smart-agent',
        permanent: true,
      },
      {
        source: '/portfolio/ai-commerce-orchestration',
        destination: '/home/multi-agent-workflow-map',
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      {
        key: 'Content-Security-Policy',
        value:
          `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://files.bpcontent.cloud; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://cdn.botpress.cloud https://*.botpress.cloud wss://*.botpress.cloud; frame-src 'self' https://*.stripe.com https://checkout.stripe.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'`,
      },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
}
 
module.exports = nextConfig 