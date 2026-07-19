import html from './logiscripts.com.html';

const ALLOW_METHODS = 'GET, HEAD, OPTIONS';

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
};

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(token: string): string {
  const meta = `<meta name="nabulife-token" content="${escapeAttr(token)}">`;
  return html.replace('</head>', `${meta}\n</head>`);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const method = request.method.toUpperCase();

    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          Allow: ALLOW_METHODS,
        },
      });
    }

    if (method !== 'GET' && method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: {
          Allow: ALLOW_METHODS,
          'Content-Type': 'text/plain; charset=utf-8',
          ...SECURITY_HEADERS,
        },
      });
    }

    const body = buildHtml(env.NABULIFE_TOKEN);
    const contentLength = new TextEncoder().encode(body).byteLength.toString();

    return new Response(method === 'HEAD' ? null : body, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': contentLength,
        ...SECURITY_HEADERS,
      },
    });
  },
} satisfies ExportedHandler<Env>;
