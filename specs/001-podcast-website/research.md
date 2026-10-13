# Phase 0: Research — Modern Podcast Website

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md)

No NEEDS CLARIFICATION items remained in Technical Context (stack was
supplied by the user). Research therefore resolves best-practice and
design decisions for the chosen stack.

## R1: Next.js static site configuration

- **Decision**: Use Next.js App Router with `output: 'export'` in
  `next.config.ts`, producing a fully static `out/` directory. Disable
  runtime server features: no API routes, no middleware, no SSR/
  revalidation. Set `images.unoptimized: true` (required for static
  export) and `trailingSlash: true` for maximum static-host compatibility.
- **Rationale**: Satisfies the user requirement ("Next.js with static site
  configuration, no databases") and Constitution I (static-only
  deliverable) simultaneously.
- **Alternatives considered**:
  - `next dev` + Node server (rejected: violates Constitution I).
  - `getServerSideProps`-style runtime rendering (rejected: not available
    under static export anyway).
  - Plain HTML (rejected: user explicitly chose Next.js — recorded in
    plan Complexity Tracking).

## R2: Mock data strategy

- **Decision**: Embed all content as typed TypeScript modules under
  `src/data/` (`episodes.ts`, `faq.ts`, `site.ts`), imported at build
  time so every page is pre-rendered with the data baked in. Exactly 20
  episodes; `featuredEpisodeId` in `site.ts` references one catalog
  episode.
- **Rationale**: "Data is embedded in the content for the mock episodes" —
  no fetch at runtime, no feed, fully compatible with static export and
  Constitution I/II (zero data libraries).
- **Alternatives considered**:
  - JSON files in `public/` + client fetch (rejected: needs JS to render
    content, fails "readable without JavaScript" gate).
  - Real RSS/podcast API (explicitly out of scope per spec FR-009).

## R3: Styling approach

- **Decision**: CSS Modules for components + one global stylesheet for
  tokens (color palette, type scale, spacing) using CSS custom
  properties. Mobile-first media queries; breakpoints validated at 360 px
  and 1440 px per SC-003.
- **Rationale**: Ships with Next.js (no new dependency → Principle II),
  scoped by default, and a token-based system directly supports FR-011
  (elegant, consistent design) and SC-007 (consistency check).
- **Alternatives considered**:
  - Tailwind CSS (rejected: extra dependency; Constitution II requires
    justification and plain CSS suffices).
  - CSS-in-JS runtime libs (rejected: runtime JS cost, conflicts with
    no-JS content goal).
  - Component libraries e.g. MUI/Chakra (rejected: heavy, generic look —
    works against "stand out" goal).

## R4: Typography, color, and imagery for an elegant look

- **Decision**: One distinctive display font for headings + one clean
  body font via `next/font` (self-hosted at build time → no external
  font requests); restrained palette (dark/light pair + single accent);
  generous whitespace and a consistent spacing scale; SVG/PNG artwork in
  `public/images/` with explicit dimensions and alt text; lazy-load
  below-the-fold images.
- **Rationale**: Delivers FR-011 "elegant, distinctive" as a concrete,
  testable system (SC-007) while keeping assets local (Constitution I
  and "no external content service").
- **Alternatives considered**:
  - Google Fonts `<link>` at runtime (rejected: external runtime
    dependency; `next/font` achieves the same statically).
  - Stock photo hotlinks (rejected: external service, brittle links).

## R5: Episode playback with mocked audio

- **Decision**: Native HTML5 `<audio controls>` per selected episode,
  pointing at small placeholder files in `public/audio/` (short
  royalty-free or generated tone clips). Episode selection opens a
  detail/player view on the Episodes page (client component limited to
  interactivity); the episode *list and metadata* remain server-rendered
  static HTML.
- **Rationale**: Meets FR-005 and spec assumption "placeholder/mock audio
  is acceptable" with zero dependencies; keeps core content readable
  without JavaScript (Constitution III).
- **Alternatives considered**:
  - Web Audio API custom player (rejected: complexity, no spec need).
  - Embedding third-party players (rejected: external service
    dependency; spec says embeds optional only).

## R6: Navigation & routing

- **Decision**: Four static routes: `/` (or `/index.html`), `/episodes/`,
  `/about/`, `/faq/`. Shared `layout.tsx` renders identical header nav +
  footer on every page; nav uses plain `<a>`/`<Link>` anchors so it works
  without JS. Active-page indication via pathname (no client state).
- **Rationale**: FR-001/FR-008, deep-link edge case in spec, and
  SC-002 (≤2 clicks to any episode).
- **Alternatives considered**:
  - Client-side state router (rejected: unnecessary under static export).

## R7: Responsiveness strategy

- **Decision**: Mobile-first CSS (single-column base), breakpoints at
  ≥768 px (tablet) and ≥1024 px (desktop); fluid type/spacing with
  `clamp()`; touch targets ≥44 px; FAQ accordion and episode cards
  reflow without horizontal scroll at 360 px.
- **Rationale**: User requirement "responsive and ready for mobile" +
  FR-010, SC-003 (validated at 360 px and 1440 px).
- **Alternatives considered**: Desktop-first or JS-based layout switching
  (rejected: worse mobile baseline, adds runtime logic).

## R8: Quality verification approach

- **Decision**: Manual/scripted browser validation per
  [quickstart.md](./quickstart.md): `next build` (type + static export
  must succeed), serve `out/` locally, check all 4 pages, count 20
  episodes, toggle FAQ items, test at 360/1440 px, crawl internal links,
  spot-check no-JS rendering (disable JS), and Lighthouse-style spot
  check for SC-006 (<2 s content visibility on throttled mobile).
- **Rationale**: Spec requests no automated test suite; quickstart
  provides verifiable pass/fail scenarios covering every Success
  Criterion.
- **Alternatives considered**: Introducing a test framework (rejected:
  not requested; Constitution II/YAGNI).

## Open items

None — all Technical Context entries resolved; no [NEEDS CLARIFICATION]
markers introduced.
