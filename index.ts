import html from './logiscripts.com.html';

const ALLOW_METHODS = 'GET, HEAD, OPTIONS';

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cache-Control': 'no-store',
};

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(token?: string): string {
  if (!token) return html;
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
