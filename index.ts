import html from './im-purple.com.html';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Serve the HTML file for the root path
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },

  async scheduled(event: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log("Cron job fired at", new Date().toISOString());
    // Example: call an API, update KV, write to D1, etc.
  },
} satisfies ExportedHandler<Env>;
