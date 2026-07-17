# Gargled Host Worker (Logiscripts Route)

Free web hosting on Cloudflare Workers, currently deployed on `logiscripts.com` while `im-purple.com` is still propagating in Cloudflare. Keep `logiscripts.com` as the active domain until Cloudflare shows `im-purple.com` as active and public DNS lookups resolve correctly, then re-add the `im-purple.com` routes and redeploy if you want to switch back.

## Overview

This repository hosts a Cloudflare Worker that serves a static landing page from `im-purple.com.html`. The filename is intentionally decoupled from the live domain and can be renamed later for clarity without changing how the Worker serves the asset; the Worker simply returns that HTML for any configured route.

## Current domain

- Primary live route: `logiscripts.com`
- Also routed for: `www.logiscripts.com`
- The current Worker configuration only routes traffic through `logiscripts.com`; `im-purple.com` can be added back later once Cloudflare propagation is complete.

## Project files

- `index.ts` - Worker entrypoint
- `im-purple.com.html` - Static HTML page returned by the worker
- `wrangler.toml` - Worker and route configuration
- `package.json` - Scripts, dependencies, and LavaMoat settings

## Requirements

- Node.js
- npm
- A Cloudflare account with Wrangler access

## Install dependencies

```bash
npm ci
```

## Local development

```bash
npm run dev
```

Wrangler will start a local development server for the worker.

## Type checking

```bash
npm run type-check
```

## Deploy

```bash
npm run deploy
```

## Security note

This project includes `@lavamoat/preinstall-always-fail` as part of its dependency safety setup, alongside LavaMoat's allowlist configuration in `package.json`. This helps prevent unexpected lifecycle scripts from running unless they are explicitly allowed.

## Scripts

- `npm run dev` - Run the worker locally
- `npm run deploy` - Deploy the worker
- `npm run tail` - Stream worker logs
- `npm run type-check` - Run TypeScript checks

## Hosting model

The current worker setup is a good fit for:

- Landing pages
- Lightweight static websites
- Early-stage hosting prototypes
- Free hosting experiments on Cloudflare's edge
