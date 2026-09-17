# sajon.com.np

Personal site of Sajon Shrestha, Flutter and mobile engineer. Live at <https://sajon.com.np>.

## At a glance

- **What:** a static site. Five pages plus a 404. No server, no database, no login, no analytics.
- **Built with:** [Astro](https://astro.build) 7, TypeScript, plain CSS. No UI framework, no Tailwind.
- **Hosted on:** Firebase Hosting, custom domain `sajon.com.np`, HTTPS managed by Firebase.
- **Content:** one file, `src/data/profile.ts`. Pages only render it.
- **Deploy:** build on the laptop, upload with the Firebase CLI. No CI.

## Hosting

Firebase Hosting serves the `dist/` folder that `npm run build` produces. Everything about hosting
is in `firebase.json`:

- `cleanUrls` and `trailingSlash`, so `/work/` is the canonical form of every route
- 301 redirects from the retired `/services/` and `/research/` pages
- cache headers: hashed assets under `/_astro/` for a year, HTML for ten minutes

The Firebase project id lives in `.firebaserc`, which is **not committed** (see Deploy). The
domain, DNS and SSL are configured in the Firebase console, not in this repo.

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | Astro 7, static output | HTML at build time, zero JS shipped except two small scripts |
| Language | TypeScript in `.astro` and `.ts` files | typed content model in `profile.ts` |
| Styling | one file, `src/styles/global.css` | tokens, light and dark, fluid type; no framework |
| Fonts | Host Grotesk, self-hosted `woff2` in `public/fonts/` | no third-party requests |
| Sitemap | `@astrojs/sitemap` | emits `/sitemap-index.xml` on build |
| Runtime | Node 22.12 or newer, npm | `engines` in `package.json` |
| Hosting | Firebase Hosting | static, free tier, domain already bound |

## Structure

```
.
├── astro.config.mjs      site URL, trailing slash, sitemap
├── firebase.json         hosting: dist/, clean URLs, redirects, cache headers
├── package.json          scripts and the two dependencies
├── design/og.svg         source of the share image
├── public/               copied to dist/ as is
│   ├── fonts/            Host Grotesk latin + italic
│   ├── icons/            launcher icons of the shipped apps, 192px PNG
│   ├── og.png            share image 1200x630, built from design/og.svg
│   ├── Sajon-Shrestha-CV.pdf
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── data/profile.ts   ALL content: site, nav, experience, projects, play listings, skills, education
    ├── layouts/Base.astro  <head>, SEO, theme bootstrap, header, footer, view transitions
    ├── pages/            one file per route: index, work, about, cv, contact, 404
    ├── components/       Header, Footer, Hero, Figure, Section, ProjectRow, Entry, PlayTable
    ├── scripts/          theme.ts (toggle), reveal.ts (scroll reveal, header hairline)
    └── styles/global.css the whole design system
```

Ignored, never committed: `dist/`, `node_modules/`, `.astro/`, `.firebase/`, `.firebaserc`, `.env`.

## Architecture

Data flows one way: `profile.ts` → page → components → `Base` layout → static HTML.

**Content model.** `src/data/profile.ts` exports typed arrays and objects (`site`, `nav`, `summary`,
`experience`, `projects`, `playListings`, `services`, `skills`, `education`, `research`,
`languages`). Pages import what they need and map over it. Counts shown on the site (apps on Play,
roles, projects) are derived from these arrays, so they cannot drift from the content.

**Routes.** Astro file routing. `src/pages/work.astro` becomes `/work/`. Six outputs: `/`, `/work/`,
`/about/`, `/cv/`, `/contact/`, `/404.html`.

**Layout.** `Base.astro` wraps every page: title, description, canonical URL, Open Graph and
Twitter cards, `theme-color` for both schemes, JSON-LD `Person` (plus an optional page schema),
the sitemap link, font preload, skip link, `Header`, `<main>`, `Footer`. It also mounts Astro's
`ClientRouter`, so navigation between pages is a view transition instead of a full reload.

**Page grammar.** Every page is `Hero` (eyebrow, two-line title with the second line in the accent,
lede, actions) → one `Figure` band (a single proof number) → `Section` bands that alternate plain
and soft backgrounds. Records (projects, roles, degree) share one two-column grid from 48rem up and
stack below that.

**Theme.** Light and dark tokens in `global.css`. Default follows the system setting. The header
toggle stores `theme` in `localStorage`; an inline script in `Base.astro` applies it before first
paint and again after every view transition, because the swap resets `<html>` attributes. Choosing
the scheme that matches the system removes the stored value, so "follow system" needs no third
state.

**Motion.** `reveal.ts` runs one `IntersectionObserver` that adds `.in` to `[data-reveal]` elements
and toggles a header hairline on scroll. Reveal and view transitions switch off under
`prefers-reduced-motion`.

**SEO.** Canonical URLs, `robots.txt`, `sitemap-index.xml`, Open Graph image, structured data. All
generated at build time; nothing runs on a server.

## Commands

```bash
npm install       # once
npm run dev       # local preview at http://localhost:4321
npm run build     # static site into dist/
npm run preview   # serve dist/ locally
```

## Deploy

1. `npm run build`
2. First time on a machine: `firebase use <project-id>` (writes the ignored `.firebaserc`)
3. `firebase deploy --only hosting`
4. Check `https://sajon.com.np/` in a browser; hard refresh if an old asset is cached

## Routine tasks

**Change a fact** (role, dates, a bullet): edit `src/data/profile.ts`, build, deploy. The file
mirrors the CV, so change the CV first, then the site, so the site never says something the CV does
not.

**Add a project or app:** append to `projects` in `profile.ts`, drop its launcher icon in
`public/icons/` as a 192x192 PNG, set `icon` and `color` (the app's primary hex; it drives the row
hover tint). If it is on Google Play, add it to `playListings` too.

**Refresh the CV PDF:** replace `public/Sajon-Shrestha-CV.pdf`. Keep the phone number out of it.

**Regenerate the share image** after editing `design/og.svg` (macOS):

```bash
qlmanage -t -s 1200 -o /tmp design/og.svg && sips -c 630 1200 /tmp/og.svg.png --out public/og.png
```

## Rules

**Content.** Public-safe only: no phone number, no referees, no identity numbers, no install
figure that is not on a public Google Play listing. Contact email is public by design.

**Design.** Monochrome plus one accent, type led, one idea per band. No cards, no pill tags, no
stat boxes, no gradients, no decorative icons, no timeline dots. Sizes are fluid and checked down to
a 320px phone.
