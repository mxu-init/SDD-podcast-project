# Phase 1: UI Contracts — Modern Podcast Website

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

This application exposes no external APIs (static site, Constitution I).
Its public interfaces are **routes** and **page-level UI contracts**.
Data shapes live in [data-model.md](../data-model.md).

## Route Contract

| Route | Page | Static output | Required content (FR → AC) |
|-------|------|---------------|------------------------------|
| `/` | Landing | `index.html` | Podcast name + tagline (FR-002, SC-001); exactly one featured episode card with title, description, artwork, listen/play action (FR-002); nav to all pages (FR-008) |
| `/episodes/` | Episodes | `episodes/index.html` | Exactly 20 episode entries (FR-003); each shows number, title, release date, duration, short description (FR-004); newest first (US2-AC4); selectable → player/detail view (FR-005) |
| `/about/` | About | `about/index.html` | Podcast description + host name/bio (FR-006); nav (FR-008) |
| `/faq/` | FAQ | `faq/index.html` | ≥6 expandable/collapsible Q&A items (FR-007); answers cover listen/find/schedule/contact (US4-AC3); nav (FR-008) |

**Deep-link contract**: every route loads standalone with working nav to
all other routes; 0 broken links sitewide (FR-012, spec edge case).

## Shared Shell Contract (every route)

- **Header**: site name/logo (link to `/`) + navigation listing Landing,
  Episodes, About, FAQ — plain anchors, functional with JavaScript
  disabled.
- **Footer**: minimal (site name, year, optional contact link).
- **Consistency**: same typography scale, color palette (CSS custom
  properties), and spacing tokens on all 4 pages (FR-011, SC-007).

## Interaction Contracts

### Featured episode (Landing)

- Activating the featured "listen/play" action opens/plays that episode
  **without navigating off-site** (US1-AC3).
- If audio fails to play, a clear non-broken state is shown; rest of page
  remains usable (spec edge case).

### Episode selection (Episodes)

- Activating an episode entry opens its player/detail view showing title,
  long description, artwork, and a native audio control (FR-005).
- Player/detail is client interactivity only; the episode list itself is
  present in the statically rendered HTML.

### FAQ accordion

- Each question toggles its answer inline; toggling one item does not
  disturb others; items can be collapsed (US4-AC2, spec edge case).
- Works with keyboard (Enter/Space on the toggle, visible focus state) —
  Constitution III.

## Quality Gates (enforced via [quickstart.md](../quickstart.md))

| Gate | Check |
|------|-------|
| Static-only | `next build` produces static export; no API routes/server files |
| Responsive | No horizontal scroll or layout breakage at 360 px and 1440 px (SC-003) |
| No-JS content | Episode list, FAQ questions/answers, and about content readable with JS disabled (Constitution III) |
| Accessibility | Semantic headings in order, alt text on meaningful images, keyboard-operable controls (Constitution III) |
| Performance | Landing core content visible <2 s on throttled mobile (SC-006) |
