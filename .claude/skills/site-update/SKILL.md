---
name: site-update
description: Workflow for updating content or design on kasrasedghi.com (add/edit a job, project, or bullet; refresh copy; tweak the theme) without breaking the design system or static export build. Use whenever the user asks to update their personal site's content or look.
---

# Updating kasrasedghi.com

1. **Get full context cheaply first.** If the change touches more than one or two files, run `npx repomix` at the repo root and skim the output before editing — it's a single-file map of the whole codebase (components, data, styles) and prevents guessing at conventions or duplicating an existing component.

2. **Content changes → `src/data/*.ts` only.**
   - New job → append to `src/data/experience.ts`.
   - New project → append to `src/data/projects.ts`. If it corresponds to a real GitHub repo, use the *actual* repo URL (`gh api users/KasraSedghi/repos` or the GitHub website) even if the resume-facing project name differs from the repo name — that's normal here (e.g. "Agent-Based Market Simulator" ↔ repo `Project-Ruba`).
   - Education/activities/skills → the matching file in `src/data/`.
   - Never hand-edit rendered JSX to change a fact — it'll drift from the data file and the next content update will miss it.

3. **Design/visual changes** → invoke the `design-lead` subagent for a quick sanity pass before or after the edit (palette, contrast, spacing, motion consistency with the black/gold theme and the soccer-ball/timeline motifs already established).

4. **Implementation** → the `frontend-engineer` subagent or direct edits following its conventions doc (`.claude/agents/frontend-engineer.md`): Tailwind tokens, Framer Motion, mobile-first, no server runtime.

5. **Before calling it done:**
   - `npm run build` must succeed (static export — this is what GitHub Pages actually serves).
   - If copy or meta tags changed, consider an SEO sanity check (see `open-seo` reference in `CLAUDE.md`) — the site currently carries fairly complete Open Graph / Twitter / JSON-LD metadata; don't let an edit silently drop it.
   - Don't merge into `main` / push to production without the user reviewing a preview — this is a live site real recruiters visit.
