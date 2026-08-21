# The spec

Every deliverable's spec — what the markers consider when they judge whether
your work matches what was required — is published on the course website, and
this repo's name tells you which one applies: the course API maps repo prefixes
to deliverables, and the `start` course skill walks your agent through pulling
the right one. The brief poses the problem; the spec is the fixed contract. Read
both on the site before you plan or build.

The checks in this directory come in three kinds:

## Invariants (shipped, always on)

`invariants.test.ts` asserts things that are true of any good website, however
you build it and whatever the week's brief asks: a navigation landmark, exactly
one top-level heading, a document language, a real title, a meta description, an
`og:image` card, a mobile viewport, and alt text on images. They run against the
**built** site (`dist/`), so they check what actually ships. Keep them green;
don't delete them.

Three of them --- the card, the navigation landmark and the single top-level
heading --- skip slide decks. A deck is a different genre of page: one document
holding a `<section>` per slide, each with its own heading, and no site chrome
around it. The build runs its own structural checks over decks instead.

The description and the card are what a link to your site looks like when
someone shares it. The card check is presence only: a path that doesn't resolve
shows up in the course gallery, not as a red check, so look at the deployed head
when you add pages.

## Course-data integrity (shipped, always on)

`data-integrity.test.ts` protects the shared plumbing: API version and canonical
URL, dates within the teaching period, teacher refs that resolve to people,
valid learning-outcome IDs, and the required policy headings. Keep it. These
are structural facts every course and the future catalogue depend on.

## A worked example (yours to replace)

`starter.test.ts` shows two course-specific spec tests: the assessment listing
links to every assessment, and assessment weights sum to 100. Both read the
built site — one the HTML, one the course API. Adapt or replace them as your
course takes shape. A fact about one course is not a universal invariant.

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
