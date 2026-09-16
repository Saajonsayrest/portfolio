# sajon.com.np

Personal site of Sajon Shrestha. Astro, static output, Firebase Hosting.

## Where the content lives

Every fact on the site is in `src/data/profile.ts`. Pages only render it. The file mirrors the
CV, so change a fact in the CV first, then here, and the site never says something the CV does not.

Public-safe only. No phone number, no referees, no identity numbers, no install figure that is not
on a public Google Play listing.

## Design

Monochrome, type led, two schemes from the system setting (no toggle). Host Grotesk, self-hosted in
`public/fonts/`, falls back to the system stack. Scroll reveal and page transitions switch off under
`prefers-reduced-motion`. Rules that keep it from looking like a template: no cards, no pill tags,
no stat boxes, no gradients, no icons, no timeline dots. One idea per band.

## Commands

```bash
npm run dev       # local preview at http://localhost:4321
npm run build     # static site into dist/
npm run preview   # serve dist/ locally
```

Deploys use the Firebase CLI with a local `.firebaserc` (not committed). Run `firebase use <project>`
once, then `firebase deploy --only hosting`.

Regenerate the share image after editing `design/og.svg`:

```bash
qlmanage -t -s 1200 -o /tmp design/og.svg && sips -c 630 1200 /tmp/og.svg.png --out public/og.png
```

## Files

- `src/layouts/Base.astro`, head with title, description, canonical, Open Graph, JSON-LD Person, fonts, view transitions
- `src/components/`, `Header`, `Footer`, `Section` (band, optional label column), `ProjectRow`, `Entry`, `PlayTable`
- `src/pages/`, one file per route, `index work about cv contact 404`
- `src/scripts/reveal.ts`, scroll reveal and the header hairline
- `src/styles/global.css`, the whole design
- `public/og.png`, the share image, 1200 by 630, source in `design/og.svg`
- `public/Sajon-Shrestha-CV.pdf`, the downloadable CV, copied by hand from the CV build
- `firebase.json`, hosting config, `dist/` with clean URLs, 301s from the retired `/services/` and `/research/`
