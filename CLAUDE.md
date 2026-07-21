# CLAUDE.md — kasrasedghi.com

This file orients any Claude Code session working in this repo. Read it before touching content or components.

## What this is

Kasra Sedghi's personal portfolio site, custom domain `kasrasedghi.com` (see `CNAME`), deployed via GitHub Pages from this repo (`KasraSedghi/KasraSedghi.com`). It is being migrated from a static multi-page HTML/CSS/JS site (now under `legacy/`) to a **Next.js + TypeScript + Tailwind** app that still ships as a static export, so GitHub Pages hosting and the custom domain keep working unchanged.

- Old site: `legacy/index.html`, `about.html`, `projects.html`, `contact.html`, `styles.css`, `script.js` — kept for reference/rollback, no longer deployed once the new app ships.
- New site: root-level Next.js app (`app/`, `src/`) using the App Router, `output: 'export'` in `next.config.ts`, deployed via `.github/workflows/deploy.yml` to GitHub Pages.
- Brand theme: **black + gold**. Primary background `#000000` / `#0a0a0a`, accent gold `#FFD700`, body font Inter. Keep this identity — it's established brand, not up for relitigating without being asked.

## Content is data, not prose in components

All resume/bio content (experience, projects, education, activities, skills) lives in `src/data/*.ts` as typed arrays, not hardcoded inside JSX. When Kasra says "update my experience" or "add a project," the edit belongs in `src/data/`, never scattered across component files. This is also what keeps `repomix`-style full-codebase dumps small and what makes future content updates a one-file diff.

Source of truth for content, in priority order:
1. Whatever Kasra says in the current conversation (always wins).
2. `src/data/*.ts` (the reconciled, current truth).
3. `legacy/*.html` (outdated — e.g. still says "Management Information Systems" instead of the correct **Finance** major, and uses an old contact email). Don't copy from legacy without cross-checking against `src/data/`.

Known corrected facts (legacy site had these wrong — don't regress):
- Degrees: BS Computer Science + BS Finance, Minor in Data Science (not MIS). Interdisciplinary Business Honors College, UMD College Park. Expected graduation May 2029.
- Contact email: `sedghik07@gmail.com` (legacy site shows `KasrsaSedghiBusiness@gmail.com` — retired).
- LinkedIn: `linkedin.com/in/kasrasedghi` (legacy links to a different slug).
- GitHub: `github.com/KasraSedghi` — real flagship repos are `Project-Ruba` (Agent-Based Market Simulator), `Stocks101` (ShadowVest Portfolio Tracker), `SmallBusiness-Scheduling-App` (The Red Bean Scheduler). Resume project names and GitHub repo names differ intentionally; link to the real repo URL, display the resume-facing project name.

LinkedIn scraping was attempted and blocked (anti-bot). Don't re-attempt WebFetch/curl against linkedin.com — it will 999. Treat the resume text Kasra pastes into conversation as authoritative instead.

## Tech stack

- Next.js (App Router) + TypeScript, static export (no server runtime — GitHub Pages can't run one).
- Tailwind CSS for styling, design tokens in `tailwind.config.ts` mapped to the black/gold theme.
- Framer Motion for animation (scroll-linked timeline, draggable hero soccer ball, page transitions).
- No backend. The contact form posts to Formspree (`https://formspree.io/f/mblkpyjw`) client-side, same as legacy.

Conventions (carried over from `.cursor/rules/myRules.mdc`, still apply): functional components only, descriptive `isX`/`hasX` naming, colocate component + subcomponents + types, kebab-case directories, mobile-first, Zod for any form validation, minimize unnecessary `useEffect`.

## The interactive theme

Kasra asked for a soccer ball motif and a livelier timeline:
- **Hero**: a draggable/flickable SVG soccer ball (Framer Motion `drag` + inertia) as a tactile easter egg — not a gimmick, a small demonstration of animation/physics skill for anyone reviewing the site as a portfolio.
- **Experience timeline** (About page): scroll-linked — a ball rolls down the timeline line as the visitor scrolls, position driven by `useScroll`/`useTransform`, not by discrete steps.

Keep both subtle and performant (respect `prefers-reduced-motion`); this is a recruiting-facing professional site, not a game.

## Subagents

- `.claude/agents/design-lead.md` — visual/UX review persona. Use for design-system consistency passes, palette/spacing/motion critique, before shipping a visual change.
- `.claude/agents/frontend-engineer.md` — implementation persona for component work matching the conventions above.

## Skills

- `.claude/skills/site-update/SKILL.md` — the workflow for future content updates (add a job, add a project, refresh a bullet) without breaking the design system.

## Reference tools (not installed, just useful context)

- [repomix](https://github.com/yamadashy/repomix) — bundles the repo into one context file; run `npx repomix` before large refactors so Claude sees the full current structure instead of guessing.
- [open-seo](https://github.com/every-app/open-seo) — SEO audit; worth running after copy/meta-tag changes to check nothing regresses search visibility (the legacy site has fairly thorough OG/Twitter/JSON-LD meta — preserve that coverage in the new app's `metadata` exports).

## Deployment

`git push` to `main` triggers `.github/workflows/deploy.yml`: `npm ci && npm run build` (static export to `out/`), then publishes `out/` to the `gh-pages` branch (or Pages' configured source) with `CNAME` preserved. Don't merge `feat/react-rewrite` into `main` without Kasra reviewing a preview build first — this is his live production site.
