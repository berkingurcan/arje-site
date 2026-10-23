# ARJE

One-page website for ARJE, built with **SvelteKit (Svelte 5)** and deployed on **Vercel**.
Turkish / English / Russian, light & dark themes, designed mobile-first.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build (static pages + Vercel output)
npm run check      # type-check
```

Requires Node 20+.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. The framework is detected as SvelteKit; no settings needed.
3. After the first deploy, set the real domain in `src/lib/config.ts` → `url` (used for canonical links, hreflang and social cards) and redeploy.

Or from the terminal: `npx vercel` (preview) / `npx vercel --prod`.

## URLs & languages

| Language | URL   |
| -------- | ----- |
| Türkçe   | `/`   |
| English  | `/en` |
| Русский  | `/ru` |

All three are pre-rendered as static HTML with correct `<html lang>`, `hreflang` alternates, Open Graph tags and Organization structured data.
Copy lives in `src/lib/i18n/tr.ts`, `en.ts`, `ru.ts` — the English and Russian files are type-checked against the Turkish one, so a missing key fails the build.

## Before launch — replace these placeholders

| What | Where |
| --- | --- |
| Contact email (currently `info@arje.com.tr`, **placeholder**) | `src/lib/config.ts` → `email` |
| Production URL | `src/lib/config.ts` → `url` |
| Social links (Instagram, Pinterest, LinkedIn — **placeholder URLs**) | `src/lib/config.ts` → `social` |
| Product names (“Form I … Form V” are working titles) | `collection.items` in each `src/lib/i18n/*.ts` |

### Enquiry form

With `formEndpoint` empty (default), “Send enquiry” validates the form and opens the visitor's email app pre-filled to `email`.
To receive submissions directly, create a form endpoint (Formspree, Basin, a Make/Zapier webhook…) and paste its URL into `src/lib/config.ts` → `formEndpoint`. The form will then POST JSON: `{ name, email, studio, projectType, object, message }`.

## Images

All imagery is **temporary** (Unsplash, free licence) and listed in one place: `src/lib/media.ts`.
To use real product photography:

1. Put files in `static/images/` (e.g. `static/images/form-i.jpg`, ideally ≥ 2000 px wide, sRGB).
2. In `src/lib/media.ts`, change `src: 'photo-…'` to `src: '/images/form-i.jpg'`.
3. Update the alt texts under `alt` in each language file, and remove the “Representative image” tags/note in `collection` if no longer needed.

Every image slot has a designed placeholder (warm gradient + monogram) underneath, so the layout never breaks while images load or if one fails.

## Design system

- **Brand**: Bordeaux & Pine handoff — Bordeaux `#571F2D`, Pine `#233D32`, Ivory `#F3EDE2`, Brass `#B49A70`. Logo marks are the original outlined SVG paths (`src/lib/brand/`), never retyped.
- **Type**: Noto Serif Display (light, condensed width — display) + Geist (text), both open-source (SIL OFL), self-hosted via Fontsource, with Turkish and Cyrillic coverage. Labels are sentence case; no tracked-out caps.
- **Symbol**: the continuous-line A·J mark leads the header lockup, signs the footer, and is drawn once as a brass hairline across the hero (the page's single orchestrated motion).
- **Favicon**: Bordeaux disc with the Ivory symbol (`static/brand/favicon.svg`, 16/32/48 PNG + ICO, 192/512 icons, maskable 512, 180 Apple touch icon).
- **Themes**: light is the default (per brand guidance the palette is not auto-inverted from the OS setting). Dark is an authored “evening” palette built on deep Bordeaux. The choice is remembered per visitor. Tokens are in `src/app.css`.
- **Motion**: one hero sequence (symbol line-draw + headline rise), circular theme transition. Language switches swap copy in place with no page-wide transition (the old cross-fade froze the page on every switch); the other languages are preloaded eagerly. All motion is disabled for visitors with *reduce motion* turned on.
- **Accessibility**: WCAG 2.2 AA contrast on all text pairs, 44px touch targets, visible focus rings, skip link, keyboard-operable menu (Esc closes), labelled form with inline errors.

## Structure

```
src/
  app.css                     design tokens, base styles, motion
  app.html                    no-flash theme script
  hooks.server.ts             sets <html lang> per language
  lib/
    brand/                    Wordmark + Monogram (from the brand handoff)
    components/               Header, Hero, Manifesto, Collection, Approach,
                              InSitu, Trade (form), Footer, …
    i18n/                     tr.ts (source), en.ts, ru.ts
    config.ts                 email, URL, form endpoint
    media.ts                  all imagery in one place
  routes/[[lang=lang]]/       the page (/, /en, /ru)
static/brand/                 favicons, app icons, social card
```
