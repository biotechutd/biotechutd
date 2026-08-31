# Website Maintenance Guide

This site is a Next.js, TypeScript, Tailwind CSS, and Cloudflare Workers project for Biotech UTD. Most routine updates should be done by editing YAML files in `src/content`, not by changing React code.

For exact YAML fields and examples, use `src/content/README.md`.

## Project Layout

- `src/app`: pages and routes, such as the homepage, officers page, join page, and contact page.
- `src/components`: reusable visual pieces, page sections, layout, buttons, cards, galleries, and forms.
- `src/content`: editable website content in YAML.
- `src/lib/content`: content loaders and Zod schemas that validate YAML before the site uses it.
- `src/backend`: Cloudflare Worker backend code for the contact form.
- `public/images`: public images used by pages, officers, galleries, and UI.

## Content Pattern

Most editable content follows this pattern:

```txt
YAML in src/content
-> schema in src/lib/content/schemas.ts
-> loader in src/lib/content/getSomething.ts
-> page/component renders the content
```

If a YAML edit breaks the expected shape, the build or page render should fail early instead of silently showing bad content.

## Routine Maintenance

### Editing Page Content

Edit files in `src/content`. Use `src/content/README.md` as the reference for what each YAML file can contain.

### Editing the Banner

Use `src/content/banner.yaml`.

- `enabled: true` shows it.
- `enabled: false` hides it.
- `text` controls the message.
- `href` controls where it links.

### Editing Officers

Officer files live in `src/content/officers/[category]/`.

Each officer gets one YAML file. The `order` field controls display order within that category. The `image` field should point to a file in `public/images/headshots`.

Prefer square headshots around `256x256` so they load quickly. If a listed image is missing, the site uses a fallback headshot.

### Editing Galleries

Gallery YAML files live in `src/content/gallery`. Gallery images live in matching folders under `public/images/gallery`.

Example:

```txt
src/content/gallery/home.yaml
public/images/gallery/home/
```

Use `autoAdvance: true` or `false` to control whether a gallery changes slides automatically.

### Editing Applications

Use `src/content/applications.yaml`.

Cards can be enabled or disabled, and each card can have visible or hidden action buttons.

### Editing Committee Pages

Use `src/content/committees/[committee-name]/content.yaml`.

These files control committee hero text, buttons, and project listings. A fuller commented example lives at `src/content/committees/example-content.yaml`.

## Images

Put site images in `public/images`, then reference them with paths that start with `/images/...`.

Officer headshots should be small square images, preferably around `256x256`.

## Checking Changes

Run these before deploying:

```bash
npm.cmd run typecheck
npm.cmd run build
```

For local development:

```bash
npm.cmd run dev
```

## Deployment

The site is deployed with Cloudflare Workers. The Worker serves the exported Next.js site from `out` and runs the contact form backend for `/api/*`.

See `README.md` for development, local Worker testing, and Cloudflare secret commands.

## Contact Form

The contact form UI is in `src/components/sections/ContactForm.tsx`.

The backend lives in `src/backend/contact` and sends messages to Discord and Google Sheets. Production secrets are stored in Cloudflare, not in YAML.