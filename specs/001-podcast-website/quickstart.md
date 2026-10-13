# Quickstart: Build & Validate — Modern Podcast Website

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

Validation guide proving the feature works end-to-end. References
[contracts/ui.md](./contracts/ui.md) and
[data-model.md](./data-model.md) instead of duplicating details.

## Prerequisites

- Node.js 20+ and npm installed
- Project dependencies installed from repo root:

```bash
npm install
```

## Build & Run

```bash
# Development (local browser verification — Constitution Workflow)
npm run dev            # open http://localhost:3000

# Production static export (must succeed — static-only gate)
npm run build          # generates static site in out/
npx serve out          # or any static file server, e.g.:
npx http-server out    # validate the EXPORTED site, not just dev
```

**Expected**: `build` completes with 0 type errors and writes `out/`
containing `index.html`, `episodes/index.html`, `about/index.html`,
`faq/index.html`.

## Validation Scenarios

Run against the **exported** `out/` build.

### V1 — Pages exist & navigation works (FR-001, FR-008, FR-012)

- Open all 4 routes: `/`, `/episodes/`, `/about/`, `/faq/`.
- From each page, use the header nav to reach every other page.
- **Pass**: all pages load; header/footer identical; 0 broken internal
  links (spot-check by clicking all nav + in-page links).

### V2 — Landing featured episode (FR-002, US1, SC-001)

- Open `/`.
- **Pass**: podcast name + tagline visible immediately (≤5 s to identify
  name + play action, SC-001); exactly ONE featured episode shown with
  title, description, artwork, play/listen control; activating play
  starts (mock) audio without leaving the site.

### V3 — Episode catalog (FR-003, FR-004, FR-005, US2, SC-004)

- Open `/episodes/`.
- **Pass**:
  - Exactly 20 episode entries, newest first.
  - Every entry shows number, title, release date, duration, short
    description.
  - Click/play any episode → its player/detail opens with long
    description and audio control; playback begins or shows clear state.
  - Reachable in ≤2 clicks from any page (SC-002).

### V4 — About & FAQ (FR-006, FR-007, US3, US4, SC-005)

- Open `/about/`: podcast description + host name/bio present.
- Open `/faq/`: ≥6 questions; expand/collapse each inline; answers cover
  how to listen, where to find episodes, schedule, contact; no dead ends
  (SC-005).

### V5 — Responsive & layout (FR-010, SC-003)

- At 360 px and 1440 px viewport widths, check all 4 pages.
- **Pass**: no horizontal scrolling, no overlapping/clipped content,
  touch targets ≥44 px on mobile; menus/cards reflow properly.

### V6 — No-JS content (Constitution III, plan constraint)

- Disable JavaScript in the browser; reload the exported site.
- **Pass**: episode list with metadata, FAQ questions/answers, about
  content, and navigation all readable/usable; only audio playback and
  accordion toggling may degrade.

### V7 — Design consistency (FR-011, SC-007)

- Compare all 4 pages.
- **Pass**: same fonts, color palette, spacing rhythm throughout; no
  page looks unstyled/default; artwork has alt text; headings in order.

### V8 — Performance (SC-006)

- Throttle to "Slow 4G" in devtools; hard-reload `/`.
- **Pass**: core landing content (name, tagline, featured episode)
  visible in <2 s.

### V9 — Data integrity (FR-009, data-model invariants)

- Confirm content renders with no network requests to any
  feed/API/external content service (devtools Network tab: only same-origin
  static assets).
- **Pass**: 20 unique episode numbers/ids; featured episode is one of the
  20; all referenced images/audio files exist in `out/` (no 404s).

## Troubleshooting

- `build` fails mentioning server features → remove API routes/
  middleware; config must stay `output: 'export'`.
- Broken images in export → assets must live under `public/` and be
  referenced with root-relative paths; `images.unoptimized: true`.
- Episodes count ≠ 20 → fix `src/data/episodes.ts`; a build-time
  assertion should flag this.
