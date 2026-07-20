# gargled-host — Monorepo

Consolidated monorepo for all im-purple Cloudflare Workers and projects.

## Structure

```
gargled-host/
├── workers/
│   ├── logiscripts/    — Worker serving logiscripts.com (static HTML)
│   ├── rest-api/       — Hono CRUD REST API backed by D1
│   └── bantaysarado/   — Vite/React SPA + Cloudflare Workflows demo
└── projects/
    ├── im-purple/      — Worker serving im-purple.com
    └── FirstProject/   — Gargle auth debugging project
```

Each subdirectory is a standalone project. Install and deploy independently from inside each directory.

## Root (logiscripts Worker)

The root `package.json` manages the logiscripts worker and its LavaMoat security setup.

## Project files (root worker)

- `index.ts` - Worker entrypoint
- `logiscripts.com.html` - Static HTML page returned by the worker
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
