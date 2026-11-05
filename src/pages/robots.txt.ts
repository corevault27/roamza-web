import type { APIRoute } from 'astro';

// AI search/assistant crawlers are explicitly allowed (GEO). Edit here to opt out.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();
  if (process.env.CONTEXT && process.env.CONTEXT !== 'production') {
    return new Response(`User-agent: *
Disallow: /
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const body = `User-agent: *
Allow: /
Disallow: /thank-you/

# AI search & assistants (allowed so Roamza can be found and cited)
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
