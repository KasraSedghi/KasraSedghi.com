# CLAUDE.md: kasrasedghi.com

This file orients any Claude Code session working in this repo. Read it before touching content or components.

## What this is

Kasra Sedghi's personal portfolio site, custom domain `kasrasedghi.com` (see `CNAME`), deployed via GitHub Pages from this repo (`KasraSedghi/KasraSedghi.com`). It was migrated from a static multi-page HTML/CSS/JS site (now under `legacy/`) to a **Next.js + TypeScript + Tailwind** app that still ships as a static export, so GitHub Pages hosting and the custom domain keep working unchanged.

- Old site: `legacy/index.html`, `about.html`, `projects.html`, `contact.html`, `styles.css`, `script.js`. Kept for reference and rollback, no longer deployed.
- New site: root-level Next.js app (`src/app`, `src/components`, `src/data`) using the App Router, `output: 'export'` in `next.config.ts`, deployed via `.github/workflows/deploy.yml` to GitHub Pages.
- Brand theme: **black and gold**. Primary background `#000000` / `#0a0a0a`, accent gold `#FFD700`, body font Inter. Keep this identity; it's established brand, not up for relitigating without being asked.

## Content is data, not prose in components

All resume and bio content (experience, projects, education, activities, skills) lives in `src/data/*.ts` as typed arrays, not hardcoded inside JSX. When Kasra says "update my experience" or "add a project," the edit belongs in `src/data/`, never scattered across component files. This also keeps `repomix` style full codebase dumps small and makes future content updates a one file diff.

Source of truth for content, in priority order:
1. Whatever Kasra says in the current conversation (always wins).
2. `src/data/*.ts` (the reconciled, current truth).
3. `legacy/*.html` (outdated: still says "Management Information Systems" instead of the correct **Finance** major, and uses an old contact email). Don't copy from legacy without cross checking against `src/data/`.

## Writing style for site copy

- No em dashes, en dashes, or " - " as sentence punctuation, anywhere a person reads it (prose, descriptions, list items, page titles, FAQ answers). It reads as AI generated and Kasra has explicitly asked for it to be gone. Rewrite the sentence instead: split it into two sentences, or use "and", "with", or a comma. Hyphenated compound words are fine in principle, but this site writes them as two words where reasonable (`full stack`, not `full-stack`) to stay safely clear of the pattern. Code identifiers, ids, and CSS classes with hyphens are unaffected; this rule is about human facing sentences only.
- Date ranges read "Month Year to Month Year", not a dash.
- Work experience and project copy should read like a portfolio, not a resume. Summarize at a high level in plain language; don't paste resume bullet fragments verbatim. A portfolio's job is to be quick and easy to understand, and the resume already exists for the dense, credential heavy version. When updating `src/data/experience.ts` or `src/data/projects.ts` from a new resume, rewrite for a general reader rather than copying bullets. See the Indeed/CyberCoders "portfolio vs. resume" framing Kasra shared: a portfolio shows the work, it doesn't restate the resume.

Known corrected facts (legacy site had these wrong, don't regress):
- Degrees: BS Computer Science and BS Finance, Minor in Data Science (not MIS). Interdisciplinary Business Honors College, UMD College Park. Expected graduation May 2029.
- Contact email: `sedghik07@gmail.com` (legacy site shows `KasrsaSedghiBusiness@gmail.com`, retired).
- LinkedIn: `linkedin.com/in/kasrasedghi` (legacy links to a different slug).
- GitHub: `github.com/KasraSedghi`. Real flagship repos are `Project-Ruba` (Agent-Based Market Simulator), `Stocks101` (ShadowVest Portfolio Tracker), `SmallBusiness-Scheduling-App` (The Red Bean Scheduler). Portfolio project names and GitHub repo names differ intentionally; link to the real repo URL, display the portfolio facing project name.

LinkedIn scraping was attempted and blocked (anti-bot). Don't re-attempt WebFetch or curl against linkedin.com; it will return an HTTP 999. Treat the resume text Kasra pastes into conversation as authoritative instead.

## Tech stack

- Next.js (App Router) with TypeScript, static export (no server runtime; GitHub Pages can't run one).
- Tailwind CSS for styling, design tokens in `tailwind.config.ts` mapped to the black and gold theme.
- Framer Motion for animation (scroll linked timeline, draggable hero soccer ball).
- No backend. The contact form posts to Formspree (`https://formspree.io/f/mblkpyjw`) client side, same as legacy.

Conventions (carried over from `.cursor/rules/myRules.mdc`, still apply): functional components only, descriptive `isX`/`hasX` naming, colocate component with subcomponents and types, kebab case directories, mobile first, minimize unnecessary `useEffect`.

## The interactive theme

Kasra asked for a soccer ball motif and a livelier, more visual site overall:
- **Hero**: a draggable, flickable SVG soccer ball (Framer Motion `drag` plus inertia and an idle bounce) next to Kasra's photo, as a tactile easter egg. Not a gimmick: a small demonstration of animation and physics skill for anyone reviewing the site as a portfolio.
- **Experience timeline** (About page): scroll linked. A ball rolls down the timeline line as the visitor scrolls, position driven by `useScroll`/`useTransform`, not by discrete steps, and a small celebration fires once the visitor reaches the bottom.
- **Org badges**: each employer/organization gets a small hand drawn monoline icon (`src/components/OrgIcon.tsx`) rather than a real logo image, to avoid trademark/licensing questions on a personal site while keeping every mark in the same style.
- **PitchBackground** and **PitchDivider**: a faint mowed grass stripe pattern and a center circle divider echo the soccer motif without competing with the content.
- **BallList**: bullet points across the site use a tiny ball instead of a plain dot.

Keep all of this subtle and performant (respect `prefers-reduced-motion` through `MotionProvider`); this is a recruiting facing professional site, not a game.

## Subagents

- `.claude/agents/design-lead.md`: visual and UX review persona. Use for design system consistency passes, palette/spacing/motion critique, before shipping a visual change.
- `.claude/agents/frontend-engineer.md`: implementation persona for component work matching the conventions above.

## Skills

- `.claude/skills/site-update/SKILL.md`: the workflow for future content updates (add a job, add a project, refresh a bullet) without breaking the design system.

## Reference tools (not installed, just useful context)

- [repomix](https://github.com/yamadashy/repomix): bundles the repo into one context file. Run `npx repomix` before large refactors so Claude sees the full current structure instead of guessing.
- [open-seo](https://github.com/every-app/open-seo): SEO audit, worth running after copy or meta tag changes to check nothing regresses search visibility (the site carries fairly thorough OG/Twitter/JSON-LD meta; preserve that coverage in the app's `metadata` exports).

## Deployment

`git push` to `main` triggers `.github/workflows/deploy.yml`: `npm ci && npm run build` (static export to `out/`), then publishes `out/` to GitHub Pages with `public/CNAME` preserved.

## GitHub workflow

- Commit for every change requested, with detailed messages, and split unrelated changes into separate commits.
- Work on a feature branch; once a change is verified (build and lint pass), merge it into `main`.
- Follow normal git hygiene for committing, pulling, and pushing; don't force push or skip hooks without being asked.
