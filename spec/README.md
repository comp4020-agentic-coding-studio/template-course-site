# The spec

Every deliverable's spec — what the markers consider when they judge whether
your work matches what was required — is published on the course website, and
this repo's name tells you which one applies: the course API maps repo prefixes
to deliverables, and the `start` course skill walks your agent through pulling
the right one. The brief poses the problem; the spec is the fixed contract. Read
both on the site before you plan or build.

There are two supplied files here:

## Course coherence (small, shipped baseline)

`data-integrity.test.ts` checks only cross-page facts the content schemas and
build cannot: dated material stays inside the course period, any learning-
outcome IDs used by assessments exist, and the policy page retains its required
headings. The build already owns compilation, accessibility, internal links,
content references, API generation and deck compilation.

## A worked example (yours to replace)

`starter.test.ts` shows one course-specific check: assessment weights sum to
100. Adapt or replace it as your course takes shape. A fact about one course is
not a universal invariant.

## Your spec tests (yours to write)

Turning the week's published spec into tests is your work, not the template's.
Some spec lines are mechanically checkable — assert those here (any
`spec/*.test.ts` runs with `pnpm check`). Some only a person can judge; leave
those to the crit. There is no minimum test count. Select and justify the checks
that protect your design's real promises, and test **contracts** — what the page
must do, not how you happened to build it.

A green suite here is backpressure, not a mark: your tutor verifies the live
site against the published spec at the crit, and keeping your own tests green is
how you arrive with no surprises.
