---

description: "Task list template for feature implementation"
---

# Tasks: Modern Podcast Website

**Input**: Design documents from `/specs/001-podcast-website/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md)
(required for user stories), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/ui.md](./contracts/ui.md),
[quickstart.md](./quickstart.md)

**Tests**: No automated test tasks — the spec does not request a test
suite. Validation is manual/browser-based via
[quickstart.md](./quickstart.md) (run in the Polish phase).

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Include exact file paths in descriptions

## Path Conventions

- Single Next.js project at repository root: `src/`, `public/`
- Paths are repository-root-relative

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and static-export configuration

- [X] T001 Scaffold Next.js static-export project: create `package.json`
  (scripts: `dev`, `build`), `next.config.ts` with `output: 'export'`,
  `images.unoptimized: true`, `trailingSlash: true`, `tsconfig.json`,
  `.gitignore`; install dependencies
- [X] T002 [P] Create global stylesheet with design tokens (color palette,
  type scale, spacing scale via CSS custom properties) in
  `src/styles/globals.css`
- [X] T003 [P] Define shared types (`Episode`, `FaqItem`, `SiteIdentity`,
  `Host`) per data-model in `src/types.ts`
- [X] T004 [P] Add placeholder assets: site + episode artwork SVGs in
  `public/images/`, short mock audio clips in `public/audio/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data and shell that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create site identity data (podcast name, tagline, language,
  artwork) + host record + `featuredEpisodeId` in `src/data/site.ts`
- [X] T006 Create mock catalog of exactly 20 episodes (all fields per
  data-model: id, number, title, releaseDate, duration, short/long
  description, artwork, audio) with a build-time count assertion in
  `src/data/episodes.ts`
- [X] T007 Create at least 6 FAQ items covering listen/find/schedule/
  contact topics in `src/data/faq.ts`
- [X] T008 Build root layout with header navigation linking all four
  routes (/, /episodes/, /about/, /faq/) and footer in
  `src/app/layout.tsx`
- [X] T009 [P] Create shared `EpisodeCard` component (number, title,
  release date, duration, short description, artwork + alt) in
  `src/components/EpisodeCard.tsx`
- [X] T010 [P] Create shared `EpisodePlayer` component using native
  `<audio controls>` with a non-broken fallback state on playback error
  in `src/components/EpisodePlayer.tsx`

**Checkpoint**: Foundation ready — data modules, shared components, and
site shell complete; user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Discover the podcast on the landing page (Priority: P1) 🎯 MVP

**Goal**: Elegant landing page presenting the podcast identity and one
featured episode with a working listen action

**Independent Test**: Open `/` — identify podcast name + tagline + featured
episode title/artwork/play action within 5 s; activate play without
leaving the site (quickstart V2)

### Implementation for User Story 1

- [X] T011 [US1] Build landing hero section (podcast name, tagline,
  artwork) in `src/app/page.tsx`
- [X] T012 [US1] Create featured episode section that resolves
  `featuredEpisodeId` from `src/data/site.ts` against the catalog and
  renders it in `src/components/FeaturedEpisode.tsx`
- [X] T013 [US1] Wire the featured listen action to `EpisodePlayer`
  (opens/plays in place, clear failure state) in `src/app/page.tsx` and
  `src/components/FeaturedEpisode.tsx`

**Checkpoint**: At this point, User Story 1 is fully functional and
testable independently (MVP — deploy/demo ready)

---

## Phase 4: User Story 2 - Browse the episode catalog (Priority: P2)

**Goal**: Episodes page showing exactly 20 episodes with full metadata,
newest first, each selectable to a working player/detail view

**Independent Test**: Open `/episodes/` — count 20 entries with number,
title, date, duration, short description; select any episode → player
opens and plays mock audio (quickstart V3)

### Implementation for User Story 2

- [X] T014 [US2] Build episodes list page rendering all 20 entries via
  `EpisodeCard`, ordered newest first (episode number descending), in
  `src/app/episodes/page.tsx`
- [X] T015 [US2] Implement episode selection → detail/player view showing
  long description + artwork + `EpisodePlayer` in
  `src/components/EpisodeDetail.tsx` and wire selection state in
  `src/app/episodes/page.tsx`

**Checkpoint**: User Stories 1 AND 2 both work independently

---

## Phase 5: User Story 3 - Learn about the podcast (Priority: P3)

**Goal**: About page with podcast description and host information

**Independent Test**: Open `/about/` — podcast description and host
name/bio visible (quickstart V4)

### Implementation for User Story 3

- [X] T016 [US3] Build about page with podcast description and host
  name/bio from `src/data/site.ts` in `src/app/about/page.tsx`

**Checkpoint**: User Story 3 independently functional

---

## Phase 6: User Story 4 - Get answers from the FAQ (Priority: P3)

**Goal**: FAQ page with at least 6 inline expandable/collapsible Q&A items

**Independent Test**: Open `/faq/` — ≥6 questions; toggle each answer
open/closed with keyboard; answers cover listen/find/schedule/contact
(quickstart V4)

### Implementation for User Story 4

- [X] T017 [US4] Build FAQ page listing all items from `src/data/faq.ts`
  in `src/app/faq/page.tsx`
- [X] T018 [US4] Implement keyboard-accessible expand/collapse accordion
  row (Enter/Space toggle, visible focus, independent per item) in
  `src/components/FaqItem.tsx`

**Checkpoint**: All user stories independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Constitution III quality gates + spec success criteria

- [ ] T019 [P] Responsive pass: mobile-first layout, `clamp()` type,
  ≥44 px touch targets, no horizontal scroll at 360 px, across
  `src/styles/globals.css`, `src/app/*.tsx`, `src/components/*.tsx`
- [ ] T020 [P] Accessibility pass: heading order, alt text on all
  meaningful images, keyboard operability + visible focus on interactive
  elements in `src/app/*.tsx` and `src/components/*.tsx`
- [ ] T021 [P] Optimize assets: compress episode artwork images and mock
  audio files in `public/images/` and `public/audio/`
- [ ] T022 [P] Link and asset check: crawl all four pages for broken
  internal links and missing assets (0 failures) per quickstart V1 in
  `specs/001-podcast-website/quickstart.md`
- [ ] T023 Run static-export build and full end-to-end validation
  (`npm run build` → serve `out/`, quickstart V1–V9) per
  `specs/001-podcast-website/quickstart.md`
- [ ] T024 [P] Verify no-JS content rendering and <2 s landing content
  visibility under throttled mobile (quickstart V6, V8); fix regressions
  in `src/app/*.tsx` if found

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all
  user stories
- **User Stories (Phase 3–6)**: All depend on Foundational completion
  - US1 (P1) → MVP; US2 (P2), US3 (P3), US4 (P3) proceed after
    Foundational, independently of each other
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: After Foundational — no dependencies on other
  stories
- **User Story 2 (P2)**: After Foundational — uses shared `EpisodeCard`
  / `EpisodePlayer` from Phase 2; independent of US1
- **User Story 3 (P3)**: After Foundational — independent of US1/US2
- **User Story 4 (P3)**: After Foundational — independent of US1–US3

### Within Each User Story

- Data consumption before page rendering
- Components before page wiring
- Story complete before moving to next priority (or run P3s in parallel)

### Parallel Opportunities

- Setup: T002, T003, T004 can run in parallel
- Foundational: T005, T006, T007 in parallel; T009, T010 in parallel after
  T003
- After Foundational: US1, US2, US3, US4 can be worked in parallel (all
  touch different files: `src/app/page.tsx` vs
  `src/app/episodes/page.tsx` vs `src/app/about/page.tsx` vs
  `src/app/faq/page.tsx`)
- Polish: T019–T022, T024 in parallel (T023 runs last)

---

## Parallel Example: User Story 1

```bash
# Launch together (after Foundational phase):
Task: "T011 Build landing hero section in src/app/page.tsx"
Task: "T012 Create FeaturedEpisode component in src/components/FeaturedEpisode.tsx"

# Then integrate:
Task: "T013 Wire listen action in src/app/page.tsx (depends on T011, T012, T010)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: quickstart V1 (nav), V2 (featured), V5 (360/1440)
5. Deploy/demo if ready — static `out/` directory is the deliverable

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → validate (quickstart V1–V2) → **MVP deliverable**
3. Add US2 → validate (V3) → deliver
4. Add US3 and US4 (parallel) → validate (V4) → deliver
5. Polish → full quickstart V1–V9 + build gate (V9 data integrity)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (landing)
   - Developer B: US2 (episodes)
   - Developer C: US3 + US4 (about + FAQ)
3. Stories complete and integrate independently (shared shell from T008)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable via quickstart
  scenarios
- Verify static export (`npm run build`) passes before final validation
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that
  break independence
