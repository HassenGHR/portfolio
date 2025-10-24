## Purpose

This file gives focused, actionable guidance for an AI coding agent to be immediately productive in this repository (React + Vite portfolio). It documents the project's structure, where state and data live, common patterns, build/test commands, and exact places to edit for the two critical fixes: category filtering and cursor-driven horizontal scrolling.

## Quick start (commands)
- Run dev server: `npm run dev` (Vite)
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

Configs: Tailwind + PostCSS + Vite are used (see `tailwind.config.js`, `postcss.config.js`, `vite.config.js`). Packages are in `package.json`.

## Big-picture architecture
- Single-page React app bootstrapped with Vite. UI uses Tailwind + SCSS + Framer Motion for animation.
- 3D/canvas scenes live under `src/components/canvas` (`Earth.jsx`, `Computers.jsx`, etc.) and use `@react-three/fiber` and `@react-three/drei`.
- Portfolio data is centralized in `src/data/portfolioItems.jsx` (array of project objects).
- Category metadata exists in two places (duplication): `src/data/Services.jsx` and `src/constants/index.js` — prefer `src/data/Services.jsx` as canonical for category filtering.
- Top-level composition and state for filtering lives in `src/App.jsx` — it owns `activeCategory` and computes `displayItems` then passes them to `Categories` and `Portfolio` components.

## Important files to inspect (examples)
- `src/App.jsx` — where `activeCategory` is set (default currently: `"all"`) and where `handleSelectCategory` is implemented; also where filtered items are computed and passed.
- `src/data/portfolioItems.jsx` — project list and canonical fields: `id, title, desc, img, demo, category, tech, features`.
- `src/data/Services.jsx` — category list (title, icon, category). Keep this canonical for category metadata.
- `src/components/categories/Categories.jsx` — renders category buttons and shows selected category label (reads `services` from `src/data/Services.jsx`).
- `src/components/categories/CategoryBar.jsx` — older/alternate UI that duplicates categories + project list. Prefer consolidating to `src/data/Services.jsx` and `src/data/portfolioItems.jsx` to avoid divergence.
- `src/components/portfolio/Portfolio.jsx` — carousel component; currently implements left/right arrow scroll and gradient overlays. This is the place to add cursor-driven horizontal scrolling logic and touch/swipe support.

## Project-specific conventions & patterns
- Data-driven UI: categories and projects are arrays of plain objects; components map over arrays (no remote API).
- Strings are case-sensitive and used for comparisons (e.g., `activeCategory === service.category`). Keep category keys stable (use `category: 'all'` for all projects). Avoid using `title` for logic — titles are display-only.
- Animation-first UX: many components use `framer-motion` variants and motion components. Prefer adding small motion props rather than rewriting animations.
- Styling: mixture of Tailwind utility classes and local `.scss` files. When editing layout, keep utility classes consistent with adjacent components.

## Integration points & external deps to be aware of
- Visual/animation: `framer-motion` (`src/components/*`)
- 3D: `three`, `@react-three/fiber`, `@react-three/drei` (`src/components/canvas/*`)
- Tilt effect: `react-parallax-tilt` (used in `CategoryBar.jsx`)
- Email form: `@emailjs/browser` (used in contact form)

## How to fix the Category Filter bug (exact edits)
1. Authoritative state lives in `src/App.jsx`. Ensure the default is `"all"` and code uses `category` keys consistently:
   - Confirm `src/data/Services.jsx` contains the first entry `{ title: "All projects", icon: "…", category: "all" }`.
2. In `src/components/categories/Categories.jsx` ensure the category button `onClick` passes `service.category` (not `service.title`) to `onCategorySelect` — the file currently does this correctly. If duplicates exist (e.g., `CategoryBar.jsx`), consolidate usage to the same `service.category` key.
3. Remove or update `src/components/categories/CategoryBar.jsx` which defines its own `items` array and compares to `"All projects"` — either:
   - Make `CategoryBar` use `src/data/Services.jsx` and call `onFilterChange(service.category)` (preferred), or
   - If `CategoryBar` must remain independent, ensure its `onCardClick` calls the same `onCategorySelect` signature as `App.jsx` (pass `category` key string). 
4. Always render category buttons (don't conditionally hide them based on number of projects). `Categories.jsx` already renders `services.map(...)` — avoid changing this to a filtered map.

Small example (what to check in `App.jsx`):
  - default: `const [activeCategory, setActiveCategory] = useState('all');`
  - `getDisplayItems` should treat `'all'` as the fallback and return `portfolioItems`.

## How to add cursor-driven horizontal scroll (exact edits)
1. Edit `src/components/portfolio/Portfolio.jsx` (component name `PortfolioCarousel`). Key changes:
   - Add a `onMouseMove` handler on the scroll container (the element referenced by `scrollContainerRef`). Compute mouse X relative to container width and map to a target scrollLeft (e.g., target = (mouseX / width) * (scrollWidth - clientWidth)). Use `requestAnimationFrame` to smooth movement and avoid state updates on each frame.
   - Add `onMouseEnter` / `onMouseLeave` to enable/disable the automatic mapping (keep arrow buttons working).
   - For touch devices, add `onTouchStart`, `onTouchMove`, and allow native horizontal swiping by keeping `overflow-x: auto` and `-webkit-overflow-scrolling: touch`.
   - Keep the existing gradient overlays and arrow buttons; use the `canScrollLeft` / `canScrollRight` checks from the file to show fade overlays. There are already gradient overlays present — reuse them.

Minimal pseudocode to add inside `Portfolio.jsx` (place near `scrollContainerRef` usage):
```js
let raf = null;
const onMouseMove = (e) => {
  if (!scrollContainerRef.current) return;
  const el = scrollContainerRef.current;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, x / rect.width));
  const target = ratio * (el.scrollWidth - el.clientWidth);
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => el.scrollTo({ left: target, behavior: 'smooth' }));
};
// attach: <div onMouseMove={onMouseMove} onMouseLeave={() => cancelAnimationFrame(raf)} ...>
```

Notes: throttle/limit `requestAnimationFrame` updates and avoid storing `target` in React state (use refs) to prevent re-renders.

## Testing pointers & debugging
- Manual test flows: start dev server and verify
  1. On load the `All projects`/`all` category is active and all projects shown.
  2. Clicking any category filters projects but keeps category buttons visible and highlighted.
  3. Hovering over the carousel causes smooth horizontal movement; arrows still work; touch swipe works on mobile.
- Helpful dev checks: open DevTools → Elements and inspect `#portfolio-section` to confirm scroll container exists and has overflow-x.

## Gotchas & maintenance notes
- There are two places that define category metadata (`src/data/Services.jsx` and `src/constants/index.js`). Consolidate to one source (prefer `src/data/Services.jsx`) to avoid drift.
- Several components duplicate project data (`CategoryBar.jsx` defines an `items` array). Remove duplicates and import `portfolioItems` from `src/data/portfolioItems.jsx`.
- Keep category keys (the `category` field) canonical and machine-friendly (lowercase for `all` is already used). Use `service.category` for comparisons; `service.title` is for display only.

## If you need to change behavior
- Make minimal edits to the files listed above and run `npm run dev` to validate. Add unit tests only if you introduce new pure functions (this repo is UI-heavy; prefer manual/visual tests).

---
If any part of this guidance is unclear or you want me to implement the fixes (Category filter consolidation + cursor-driven scrolling) now, say "Apply fixes" and I'll implement them and run quick checks.
