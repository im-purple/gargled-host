# Gargled Host Worker

Free web hosting on Cloudflare Workers, currently routed through `logiscripts.com` while `im-purple.com` finishes propagating.

## Overview

This repository hosts a Cloudflare Worker that serves a static landing page from `im-purple.com.html`. The worker is written in TypeScript and returns that HTML for incoming requests.

## Current domain

- Primary live route: `logiscripts.com`
- Also routed for: `www.logiscripts.com`
- The `im-purple.com` domain can be restored later once Cloudflare propagation is complete.

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

This project includes `@lavamoat/preinstall-always-fail` as part of its dependency safety setup, alongside LavaMoat's allowlist configuration in `package.json`. That helps prevent unexpected lifecycle scripts from running unless they are explicitly allowed.

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
