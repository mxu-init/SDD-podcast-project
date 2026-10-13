# Implementation Plan: Modern Podcast Website

**Branch**: `(none — not a git repo)` | **Date**: 2026-10-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-podcast-website/spec.md`

## Summary

Build an elegant, distinctive 4-page podcast website (Landing with one
featured episode, Episodes with exactly 20 mocked episodes, About, FAQ)
as a fully static site using Next.js in static-export mode. All episode
data is embedded in the source — no database, no external feeds, no
server runtime. Mobile-first responsive design across all pages.

## Technical Context

**Language/Version**: TypeScript 5.x with React (Next.js 15.x)

**Primary Dependencies**: Next.js (static export, App Router); no CSS
framework — styling via CSS Modules built into Next.js; no data or HTTP
libraries

**Storage**: N/A — all 20 episodes, FAQ items, and site copy embedded as
typed static data in the source; audio is placeholder/mock in `public/`

**Testing**: Browser-based validation per [quickstart.md](./quickstart.md)
(responsive checks at 360 px / 1440 px, link checks, content counts).
Spec requests no automated test suite.

**Target Platform**: Any static file host (or local static server);
latest two major versions of Chrome, Firefox, Edge, Safari; mobile (≥360
px) and desktop (1440 px) viewports

**Project Type**: Web — static site (Next.js `output: 'export'`)

**Performance Goals**: Landing core content visible <2 s on typical mobile
connection (SC-006); images/audio compressed, large media lazy-loaded

**Constraints**: Deliverable MUST be static HTML/CSS/JS — no API routes,
no server runtime, no middleware, no database, no auth; responsive at
360–1440 px; 0 broken links; core content readable with JavaScript
disabled

**Scale/Scope**: 4 pages, 20 episodes, ≥6 FAQ items, 1 featured episode
(chosen from the catalog), 1 host/creator

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Checked against `.specify/memory/constitution.md` (v1.0.0):

| # | Principle / Constraint | Verdict | Notes |
|---|------------------------|---------|-------|
| I | Static-Only Delivery (NON-NEGOTIABLE) | ✅ PASS | Static export produces static files; no server, DB, or auth; data embedded in source |
| II | Simplicity & Template Reuse | ✅ PASS (justified) | Framework (Next.js) added per explicit user requirement; justification recorded in Complexity Tracking. No other new dependencies — CSS Modules ships with Next.js |
| III | Baseline Quality Gate (NON-NEGOTIABLE) | ✅ PASS (planned) | Semantic HTML, alt text, keyboard focus, responsive, content works without JS, optimized assets — enforced via quickstart validation |
| — | Static App Constraints: "plain HTML, CSS, and JavaScript only" | ⚠️ JUSTIFIED DEVIATION | User explicitly mandates Next.js as the authoring toolchain; the *deliverable* is still plain static HTML/CSS/JS. See Complexity Tracking |
| — | Static App Constraints: no server/DB/auth; embeds optional-only | ✅ PASS | Matches "no databases — data embedded" requirement |
| — | Static App Constraints: browser support | ✅ PASS | Latest two majors of Chrome/Firefox/Edge/Safari targeted |
| — | Development Workflow: local browser verification, Constitution Check gate | ✅ PASS | quickstart.md provides local verification; gates recorded here |

No unjustified violations → gate passes.

**Post-design re-check (after Phase 1 artifacts)**: ✅ Still passes.
`research.md` confirms static export only (R1: no API routes/middleware/
SSR) and embedded data (R2); `data-model.md` keeps all content local with
build-time invariants (20 episodes, ≥6 FAQ, local assets only);
`contracts/ui.md` exposes routes only — no external interfaces;
`quickstart.md` gates cover Constitution III (no-JS content, a11y,
responsive) and Constitution I (static export validation). The sole
deviation (Next.js toolchain) remains justified in Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-podcast-website/
├── plan.md                 # This file
├── research.md             # Phase 0 output
├── data-model.md           # Phase 1 output
├── quickstart.md           # Phase 1 output
├── contracts/
│   └── ui.md               # Phase 1 output (routes + page contracts)
├── checklists/
│   └── requirements.md     # Spec quality checklist
└── tasks.md                # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx          # Shared shell: header nav, footer, fonts
│   ├── page.tsx            # Landing (hero + featured episode)
│   ├── episodes/page.tsx   # 20-episode catalog
│   ├── about/page.tsx      # About: podcast + host
│   └── faq/page.tsx        # FAQ accordion
├── components/             # EpisodeCard, Player, FaqItem, Nav, Hero, ...
├── data/
│   ├── episodes.ts         # 20 mocked episodes + featured reference
│   ├── faq.ts              # FAQ items
│   └── site.ts             # Podcast identity, host/creator
├── styles/                 # CSS Modules + global stylesheet
└── types.ts                # Episode, FaqItem, SiteIdentity types

public/
├── audio/                  # Placeholder/mock audio files
└── images/                 # Episode artwork, hero art
```

**Structure Decision**: Single Next.js project (Option 1 shape adapted for
Next.js App Router). No backend/frontend split — static export only; no
`api/` or server directories are permitted (Constitution I).

## Complexity Tracking

> Fill only for Constitution Check violations that must be justified.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Next.js framework vs. "plain HTML/CSS/JS only" source-stack constraint (Principle II / Static App Constraints) | Explicit user requirement: "I am going to use Next.js with static site configuration" | Hand-written static HTML rejected by direct user direction; mitigated — `output: 'export'` still delivers plain static HTML/CSS/JS with zero server runtime, preserving Constitution I |
| Placeholder audio player (native `<audio>`, no player library) | FR-005 requires playable episodes; mock audio allowed by spec | Custom player libraries add dependencies; native element is sufficient and keeps Principle II |
