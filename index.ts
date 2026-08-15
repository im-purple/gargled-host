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

function badRequest(message: string): Response {
  return new Response(message, {
    status: 400,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const method = request.method.toUpperCase();
    let url: URL;

    try {
      url = new URL(request.url);
    } catch {
      return badRequest('Malformed request URL');
    }

    if (method === 'OPTIONS') {
      if (request.body !== null) {
        return badRequest('Malformed request body');
      }

      const contentLength = request.headers.get('Content-Length');
      if (contentLength !== null) {
        const trimmed = contentLength.trim();
        if (!/^\d+$/.test(trimmed) || Number.parseInt(trimmed, 10) !== 0) {
          return badRequest('Malformed request body');
        }
      }

      if (request.headers.has('Transfer-Encoding')) {
        return badRequest('Malformed request body');
      }
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

    if (url.pathname !== '/') {
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    const contentLength = request.headers.get('Content-Length');
    if (contentLength !== null) {
      const parsedLength = Number(contentLength);
      if (!Number.isInteger(parsedLength) || parsedLength < 0 || parsedLength > 0) {
        return badRequest('Malformed request body');
      }
    }

    if (request.headers.has('Transfer-Encoding')) {
      return badRequest('Malformed request body');
    }

    const body = buildHtml(env.NABULIFE_TOKEN);
    const bodyLength = new TextEncoder().encode(body).byteLength.toString();

    return new Response(method === 'HEAD' ? null : body, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': bodyLength,
        ...SECURITY_HEADERS,
      },
    });
  },
} satisfies ExportedHandler<Env>;
