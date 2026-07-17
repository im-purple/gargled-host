import html from './logiscripts.com.html';

const ALLOW_METHODS = 'GET, HEAD, OPTIONS';
let htmlContentLength: string | undefined;

function getHtmlContentLength(): string {
  if (!htmlContentLength) {
    htmlContentLength = new TextEncoder().encode(html).byteLength.toString();
  }
  return htmlContentLength;
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
        },
      });
    }

    return new Response(method === 'HEAD' ? null : html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': getHtmlContentLength(),
      },
    });
  },
} satisfies ExportedHandler<Env>;
