<!--
Sync Impact Report
- Version change: template (unversioned) → 1.0.0 (initial ratification)
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. Static-Only Delivery (NON-NEGOTIABLE)
  - [PRINCIPLE_2_NAME] → II. Simplicity & Template Reuse
  - [PRINCIPLE_3_NAME] → III. Baseline Quality Gate (NON-NEGOTIABLE)
  - Principle slots 4 and 5 removed: reduced to 3 principles per "bare
    minimum" scope (template placeholders dropped, not deferred)
- Added sections: Static App Constraints, Development Workflow, Governance
- Removed sections: none (all template sections retained and filled)
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ verified — Constitution Check
    defers to this file; gates filled at plan time, no edits needed
  - .specify/templates/spec-template.md ✅ verified — no mandatory sections
    added or removed by this constitution
  - .specify/templates/tasks-template.md ✅ verified — no principle-driven
    task types (observability, versioning) introduced
  - .specify/templates/commands/*.md ✅ n/a — directory does not exist;
    .opencode/commands/*.md reference the constitution generically
  - AGENTS.md ✅ verified — no principle references to update
- Follow-up TODOs: none
-->

# Mi Podcast Constitution

## Core Principles

### I. Static-Only Delivery (NON-NEGOTIABLE)

- The deliverable MUST be static files (HTML, CSS, JavaScript, images, media)
  servable by any static file server or hosting provider with no
  server-side execution.
- Backend runtimes, server-side rendering, databases, and authenticated API
  endpoints MUST NOT be introduced. Content data (episodes, show notes,
  media URLs) MUST be embedded in the source or shipped as static files
  (HTML, JSON, or RSS) updated by editing files.
- Rationale: the project is defined as a static web app; any server
  component would break the deployment model.

### II. Simplicity & Template Reuse

- Work MUST start from the existing project/template files; the template's
  structure and styles MUST be reused before new code is written.
- New dependencies, frameworks, or build tooling MUST NOT be added unless a
  requirement cannot be met with plain HTML/CSS/JavaScript, and any
  addition MUST be justified in the plan's Complexity Tracking table.
- Features MUST have a clear, single purpose; speculative or
  not-yet-requested functionality MUST NOT be built (YAGNI).
- Rationale: a static site stays cheap to maintain only while it stays
  simple.

### III. Baseline Quality Gate (NON-NEGOTIABLE)

A change is not done until all of the following hold:

- Pages render correctly on both mobile and desktop viewports
  (responsive layout).
- Markup is semantic and accessible at a minimum: ordered headings, alt
  text on meaningful images, interactive elements keyboard-operable with
  visible focus.
- All internal links, assets, and media references resolve — no broken
  paths, including relative paths used by static hosting.
- Core page content is readable with JavaScript disabled; assets
  (images, audio) are optimized and large media is lazy-loaded.
- Rationale: this is the quality floor that keeps the site usable for
  every visitor.

## Static App Constraints

- **Stack**: plain HTML, CSS, and JavaScript only. No server, database, or
  authentication.
- **Content**: podcast episodes, show notes, and media URLs live in the
  site source and are updated by editing files.
- **Third-party embeds** (audio/video players, analytics) are allowed only
  as optional enhancements; the page MUST remain usable if they fail to
  load.
- **Browser support**: the latest two major versions of Chrome, Firefox,
  Edge, and Safari.
- **Performance**: pages MUST load their core content without JavaScript
  execution; image and audio assets MUST be compressed before being added
  to the repo.

## Development Workflow

- Every change MUST be verified locally in a browser (opened directly or
  via a local static server) before it is considered complete.
- `/speckit.plan` output MUST pass the Constitution Check against this
  constitution before implementation begins, and again after design.
- Internal links and asset references MUST be re-checked before delivery
  (manual review or a link checker).
- Changes MUST be small and focused, organized by user story so each story
  stays independently deliverable and testable.

## Governance

- This constitution supersedes ad-hoc practices in this repository; when in
  conflict, this document wins. All plans and reviews MUST verify
  compliance with its principles.
- **Amendments**: proposed in writing, applied to this file with a Sync
  Impact Report, and dependent templates updated in the same change.
- **Versioning policy**: semantic versioning — MAJOR for principle
  removals or backward-incompatible redefinitions; MINOR for new or
  materially expanded principles/sections; PATCH for wording
  clarifications and non-semantic refinements.
- **Compliance review**: the Constitution Check gate in
  `.specify/templates/plan-template.md` MUST be re-run at plan time and
  after design; violations MUST be justified in the Complexity Tracking
  table or the approach changed to comply.
- Runtime development guidance lives in `AGENTS.md` and the current plan.

**Version**: 1.0.0 | **Ratified**: 2026-10-02 | **Last Amended**: 2026-10-02
