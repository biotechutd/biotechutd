# Biotech UTD Website

Notebook-inspired website for Biotech UTD, built with Next.js, Tailwind CSS, TypeScript, and Cloudflare Workers.

## Development

Officer-editable content lives in `src/content`. Frontend code lives in `src/app`, `src/components`, and `src/lib`.
Cloudflare Worker backend code lives in `src/backend`.

If you just want to test the frontend,

```bash
npm install
npm run dev
```

For local Worker testing, copy `.dev.vars.example` to `.dev.vars` and fill in the secret values. Then run:

```bash
npm run build
npx wrangler dev
```

## Cloudflare Secrets

The contact form backend reads Worker secrets from Cloudflare. Add or update them with Wrangler:

```bash
npx wrangler secret put DISCORD_WEBHOOK_URL
npx wrangler secret put DISCORD_CONTACT_ROLE_ID
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
npx wrangler secret put GOOGLE_SHEET_ID
```

To see which secrets exist without printing their values:

```bash
npx wrangler secret list
```
