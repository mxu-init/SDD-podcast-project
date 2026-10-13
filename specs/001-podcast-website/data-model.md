# Phase 1: Data Model — Modern Podcast Website

**Date**: 2026-10-02 | **Plan**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

All entities are static, build-time data modules (`src/data/`) — no
persistence, no state transitions. Shapes below are the source of truth
for implementation types in `src/types.ts`.

## Entities

### Episode

Represents one of the 20 catalog items (Key Entity: Episode).

| Field | Type | Required | Validation / Rules |
|-------|------|----------|--------------------|
| `id` | string (kebab-case slug) | ✅ | Unique across catalog; URL-safe |
| `number` | integer 1–20 | ✅ | Unique; 1 = newest; ordering newest-first per US2 |
| `title` | string | ✅ | Non-empty; layout must tolerate long titles (edge case) |
| `releaseDate` | ISO date string `YYYY-MM-DD` | ✅ | Valid date; newer episodes have equal-or-later dates |
| `duration` | string (e.g. `"42:15"`) | ✅ | Non-empty, `mm:ss` or `h:mm:ss` |
| `shortDescription` | string | ✅ | Shown in list entries (FR-004) |
| `longDescription` | string | ✅ | Shown in player/detail view |
| `artwork` | path string | ✅ | Points to `public/images/...`; file must exist; non-empty `alt` text required by UI |
| `audio` | path string | ✅ | Points to `public/audio/...` placeholder file (mock audio, FR-005) |

**Catalog invariant**: exactly 20 Episode records (FR-003). A data-module
assertion (build/dev-time check) fails fast if count ≠ 20.

### FeaturedEpisode

Not a separate record — a reference (Key Entity: Featured Episode).

| Field | Type | Required | Validation / Rules |
|-------|------|----------|--------------------|
| `featuredEpisodeId` | string (Episode `id`) | ✅ | MUST match an existing catalog `id` (spec assumption: featured is one of the 20) |

Resolved at build time into the landing page's featured section (FR-002).

### FaqItem

| Field | Type | Required | Validation / Rules |
|-------|------|----------|--------------------|
| `id` | string slug | ✅ | Unique |
| `question` | string | ✅ | Non-empty |
| `answer` | string (may contain simple paragraphs) | ✅ | Non-empty; answer stays on-site (SC-005) |

**Catalog invariant**: at least 6 FaqItem records (FR-007). Coverage
required by US2 acceptance: how to listen, where to find episodes,
release schedule, contact (spec US4-AC3).

### PodcastIdentity (Site)

| Field | Type | Required | Validation / Rules |
|-------|------|----------|--------------------|
| `name` | string | ✅ | Shown in header + landing hero (FR-002, SC-001) |
| `tagline` | string | ✅ | Shown on landing hero |
| `artwork` | path string | ✅ | Local file; alt text required |
| `language` | string (BCP-47, e.g. `en`) | ✅ | Spec assumption: English |

### Host/Creator

| Field | Type | Required | Validation / Rules |
|-------|------|----------|--------------------|
| `name` | string | ✅ | About page (FR-006) |
| `bio` | string | ✅ | Short bio, non-empty |
| `avatar` | path string | ✅ | Local file; alt text required |

**Cardinality**: exactly 1 host (spec assumption).

## Relationships

```text
PodcastIdentity ──1:1── Host/Creator
PodcastIdentity ──1:1── featuredEpisodeId ──N:1── Episode (member of 20-item catalog)
Episode catalog: 20 items, ordered by number desc (newest first)
FaqItem catalog: ≥6 items, display order as authored
```

## Validation Summary (from spec requirements)

| Rule | Source |
|------|--------|
| Exactly 20 episodes; all required fields present | FR-003, FR-004 |
| Featured reference resolves to a catalog episode | FR-002 + Assumption |
| ≥6 FAQ items, each Q&A expandable | FR-007 |
| No external URLs required to display content | FR-009 |
| All referenced local assets exist (no 404s) | FR-012, SC-003 |
| Episodes ordered newest-first | US2-AC4 |

## State Transitions

None. Content is immutable at runtime; the only transient UI state is
which episode is selected for playback and which FAQ item is expanded —
view-state only, never persisted.
