# Portfolio — Hassen Goumghar

Personal portfolio site. Single page: hero, services, project carousel with
per-project detail modals, skills, and a contact form.

Built with Vite + React, styled with Tailwind and SCSS, animated with
Framer Motion, with a Three.js starfield behind the contact section.

Started as a fork of [safak/animated-portfolio](https://github.com/safak/animated-portfolio)
— see [Credits](#credits).

---

## Running it

```bash
npm install
npm run dev        # dev server with HMR
npm run build      # production build into dist/
npm run preview    # serve the built dist/ locally
npm run lint       # eslint, configured with --max-warnings 0
```

> **Lint is not currently clean** — it reports around 33 problems, all
> pre-existing. Most are `react/no-unknown-property` firing on
> react-three-fiber props (`intensity`, `castShadow`, `position` …), which the
> React plugin does not recognise and which are not real errors. The rest are
> unescaped apostrophes and a few unused variables. Worth clearing, but the
> build does not depend on it.

> **On installing:** `.npmrc` sets `legacy-peer-deps=true`. Some
> `@react-three` peers do not resolve under strict npm 7+ rules, and this is
> what makes a clean install work. Do not replace it with a `postinstall` that
> shells out to `npm install` — that recurses until it fails, which is what
> the file replaced.

### Environment

Copy `.env.example` to `.env` and fill it in. Everything is optional — the
site builds and runs without it, the contact form just will not send and the
social links fall back to `#`.

| Variable | Used for |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | Contact form delivery (EmailJS) |
| `VITE_EMAILJS_TEMPLATE_ID` | Contact form delivery |
| `VITE_EMAILJS_PUBLIC_KEY` | Contact form delivery |
| `VITE_LINKEDIN_URL` | Social links, in the sidebar and contact section |
| `VITE_GITHUB_URL` | Social links |
| `VITE_DATACAMP_URL` | Social links |

`.env` is gitignored. Set the same variables in the Vercel project settings
for production.

---

## Editing the content

### Projects

**`src/data/portfolioItems.jsx` is the single source of truth.** Add or edit
an entry there and it flows into the carousel and the detail modal. Nothing
else needs touching.

```jsx
{
  id: 16,                                   // unique, used as the React key
  title: "Project name",
  demo: "https://example.com/",             // "#" or omitted marks it private
  private: true,                            // optional; forces the private badge
  desc: "Full description. The card clamps this to two lines, the modal shows all of it.",
  img: someImportedImage,                   // import at the top of the file
  imgFit: "contain",                        // optional; for logo artwork, default is cover
  category: "Full-Stack",                   // label only; there is no filtering
  tech: ["Flutter", "PostgreSQL"],          // card shows 3, modal shows all
  features: ["Does a thing", "Does another"], // card shows 2, modal shows all
}
```

Cards deliberately show less than the data holds — the **Details** modal is
where the full description, every feature and the whole tech list appear. That
matters for the private projects, which have no demo link and would otherwise
have nowhere to lead.

A project counts as private when `private: true`, or when `demo` is missing or
`"#"`. Private cards swap the demo button for a "Private — commercial project"
badge, and their modal closes with a note instead of a link.

### Images

Card images live in `src/assets/projects/` and are imported at the top of
`portfolioItems.jsx` — not referenced by string path, so Vite fingerprints and
bundles them.

Compress before committing. Cards render around 384px wide, so anything past
~1400px is wasted bytes; the existing images sit at 55–130 kB each. Prefer JPEG
unless transparency is genuinely needed, and set `imgFit: "contain"` for logo
artwork so it is not cropped by the default `object-cover`.

### Skills and icons

Skill entries are in `src/components/skills/Technology.jsx`, and the
"technologies" counter derives from the length of that list. Brand logos are
vendored as SVGs in `src/assets/tech/` (Devicon, ISC) — nothing is fetched from
a CDN at runtime. Devicon is MIT licensed.

UI and social icons are inline SVG React components in
`src/components/icons/Icons.jsx` (outlines from Lucide, ISC; brand marks from
Simple Icons, CC0). They are inline rather than image files so they inherit
`currentColor` on the gradient tiles.

---

## Layout of the source

```
src/
├── App.jsx                     # section order lives here
├── components/
│   ├── hero/                   # headline, stats, avatar, floating badges
│   ├── services/               # service cards
│   ├── parallax/               # the "What We Did?" divider
│   ├── portfolio/              # project carousel + details modal
│   ├── skills/                 # technology grid + stat tiles
│   ├── contact/                # contact form, socials, Three.js starfield
│   ├── navbar/ · sidebar/      # desktop nav and mobile menu
│   ├── icons/                  # shared inline SVG icons
│   ├── cursor/                 # custom cursor
│   └── canvas/                 # Three.js helpers
├── data/portfolioItems.jsx     # project content
└── assets/                     # avatar, project images, tech logos
```

Section order is set in `App.jsx`: hero → services → "What We Did?" → projects
→ skills → contact. Both the desktop navbar and the mobile sidebar keep their
own copy of the nav list, so a label or anchor change has to be made in **both**
`components/navbar/Navbar.jsx` and `components/sidebar/Sidebar.jsx`.

---

## Deployment

Hosted on Vercel, built from `dist/`.

**The production branch is `starter`, not `main`.** Pushing to it deploys
straight to production, so use a branch and merge when you want a preview
first.

Icons in `public/` (`favicon-32.png`, `favicon-192.png`,
`apple-touch-icon.png`) are copied to the build root as-is. Favicons cache
hard — expect to need a fresh tab after changing one.

---

## Credits

Forked from **[safak/animated-portfolio](https://github.com/safak/animated-portfolio)**
by [Safak](https://github.com/safak) (Lama Dev), which is the origin of the
scroll and parallax animation work, the custom cursor, and the sidebar and
navbar structure. The root commit of this repository is his.

Everything since is this site's own: the project data model and details modal,
the services and skills sections, the icon set, and the content.

Third-party assets vendored into the repo:

| Asset | Source | Licence |
| --- | --- | --- |
| Technology logos (`src/assets/tech/`) | [Devicon](https://github.com/devicons/devicon) | MIT |
| Outline icons (`components/icons/`) | [Lucide](https://lucide.dev) | ISC |
| Brand marks — LinkedIn, GitHub, DataCamp, Odoo | [Simple Icons](https://simpleicons.org) | CC0 |
