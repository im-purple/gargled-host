import html from './logiscripts.com.html';

const ALLOW_METHODS = 'GET, HEAD, OPTIONS';
let htmlContentLength: string | undefined;

function getHtmlContentLength(): string {
  if (!htmlContentLength) {
    htmlContentLength = new TextEncoder().encode(html).byteLength.toString();
  }
  return htmlContentLength;
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

    return new Response(method === 'HEAD' ? null : html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': getHtmlContentLength(),
      },
    });
  },
} satisfies ExportedHandler<Env>;
