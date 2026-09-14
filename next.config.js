/** @type {import('next').NextConfig} */
const scriptSrc =
  process.env.NODE_ENV === 'development'
    ? "'self' 'unsafe-inline' 'unsafe-eval' https://cdn.botpress.cloud https://files.bpcontent.cloud"
    : "'self' 'unsafe-inline' https://cdn.botpress.cloud https://files.bpcontent.cloud";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    const resourceSlugs = [
      'agentic-ai-system-design',
      'adk-system-design-interview',
      'agentic-operations',
      'agentic-tools-hub',
      'enterprise-llm-guide',
      'getauctionlist-ai-front-door',
      'multi-agent-workflow-map',
      'rag-systems',
      'smart-agent',
    ];

    return [
      ...resourceSlugs.flatMap((slug) => [
        {
          source: `/home/${slug}`,
          destination: `/resources/${slug}`,
          permanent: true,
        },
        {
          source: `/portfolio/${slug}`,
          destination: `/resources/${slug}`,
          permanent: true,
        },
      ]),
      {
        source: '/home/enterprise-ai-agents',
        destination: '/resources/smart-agent',
        permanent: true,
      },
      {
        source: '/portfolio/enterprise-ai-agents',
        destination: '/resources/smart-agent',
        permanent: true,
      },
      {
        source: '/home/ai-commerce-orchestration',
        destination: '/resources/multi-agent-workflow-map',
        permanent: true,
      },
      {
        source: '/portfolio/ai-commerce-orchestration',
        destination: '/resources/multi-agent-workflow-map',
        permanent: true,
      },
      {
        source: '/portfolio/resources',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/home/resources',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/project',
        destination: '/resources',
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