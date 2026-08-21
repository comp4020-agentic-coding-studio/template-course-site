# Slop University course site

Your starter repo for a course-website prototype: an Astro static site on
`astro-theme-university` (the theme this course's own website runs on) wearing
the Slop University brand, deployed to GitHub Pages. The deployed site is what
gets marked, not this repo.

The
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec, and this repo's name tells you
which deliverable applies. Read both before you plan or build.

The structure here is real and the content is placeholder. Designing the course
--- what it teaches, how it's assessed, what its teaching sessions are and what
they're called --- is the work.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Run `pnpm check` before you push and `pnpm check:evidence` before submission.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state.

## The content model

Content is Markdown with frontmatter under `src/content/`, in four collections
declared in `src/content.config.ts`: `sessions`, `assessments`, `lectures` and
`people`. Sessions and lectures carry dates and structured teacher references;
assessments carry dates, outcomes and marking models; people are the cast list.
The ordinary Markdown page at `src/pages/policies/index.mdx` is also copied into
the course API as a policy node.

The collection key is the whole address. `sessions/getting-started` is the file
`src/content/sessions/getting-started.md`, the page
`/sessions/getting-started/`, the JSON at `/api/sessions/getting-started.json`,
and the ref other pages use to link to it. Those four agree by construction, so
renaming one means renaming all of them.

`related:` frontmatter connects nodes. Entries are refs ---
`<collection>/<slug>`, or a bare slug for the same collection --- and the link
renders on both pages, so declare it on whichever side is convenient. **The
build fails on a ref that doesn't resolve**, which is the point: a dangling link
is caught before it ships, not after.

`src/course-config.ts` is the single source for the course record. Its strict
schema validates the `SLOPxxxx` code and level, title, 80--300 character
description, one to three tags, ANU-style session, year, teaching period and
optional learning outcomes. It feeds the home page, `/course/`, navigation and
`/api/index.json`, so fill it in first rather than restating those facts.

Two orthogonal flags live in every graph collection's schema. `published: false`
removes an entry from the production build entirely (no page, no listing, no
graph edge) while leaving it visible in `pnpm dev`, so you can stage content.
`draft: true` keeps the page visible and marks it as not yet final.

## Naming teaching sessions

Keep the collection key, refs and URL as `sessions`. Choose what students see
--- Labs, Studios, Workshops, Crits, or something else --- with `sessionLabels`
in `src/site-config.ts`. The stable
internal name is part of the catalogue contract; the visible language is a
course-design choice.

## Slides

A lecture can carry real slides. Decks live in `src/decks/` as `.deck.mdx` files
and build to `/decks/<name>/`, rendered by
[astromotion](https://github.com/ANUcybernetics/astromotion) --- markdown, with
`---` between slides. Its README has the rest of the syntax: slide classes,
backgrounds, speaker notes, QR codes, fragments, and components hydrated per
slide.

`src/decks/theme.css` is one import, and it should stay that way. The theme's
deck stylesheet derives its colours from the same brand tokens the site uses, so
a deck already matches the rest of the site; a colour restated there is how the
two start to disagree.

`pnpm decks:check` walks every slide in a headless Chrome and reports anything
that doesn't fit the canvas. Content overflows a slide silently, so run it
before you call a deck done.

A deck is not a content-collection entry, so it has no `related:` edges. Link it
from its lecture page with a markdown link (`[Slides](/decks/week-01/)`), which
the build rewrites for the base path.

## The base path

The site deploys to `https://<owner>.github.io/<repo>/`, so every internal URL
carries a `/<repo>/` prefix. `astro.config.ts` derives it at config time from
`GITHUB_REPOSITORY` (in CI) or the `origin` remote (locally), and
`scripts/pages-base.ts` holds that logic with tests in
`spec/pages-base.test.ts`.

Nothing to configure --- but a hand-written root-absolute link
(`href="/sessions/"`) in an `.astro` file skips Astro's base handling, works on
`localhost`, and 404s on the live site. Markdown links and the theme's
components are rewritten for you; the build's link checker catches the rest.

## The link-preview card

The image people see when a link to the site is shared comes from `socialImage:`
in `src/site-config.ts`, pointing at a `/src/assets/...` path; `socialImageAlt:`
describes it. Both are placeholders --- replace them and keep the picture
1200x630, or remove the imagery as part of a coherent image-free treatment. A
page with artwork of its own overrides the site-wide card with its
own `socialImage:` frontmatter key. The theme turns whichever applies into the
`og:image` the invariants look for, and re-encodes it to a JPEG, since the
scrapers still don't decode the formats the site serves to browsers.

## The checks

`pnpm check` runs type checking, the production build and its integrity checks,
the Vitest suite, and the deck fit check. `pnpm check:evidence` is a separate
gate before you ship: it checks process citations, the required reflection and,
for Assignment 2, remaining starter copy and imagery. CI adds the secret scan
and deploy. Read the failure.

`pnpm build` is itself several checks: it runs axe over every rendered page,
verifies internal links respect the base path, fails on a dangling content ref,
and emits the versioned API the catalogue ingests. `spec/data-integrity.test.ts`
checks its dates, teacher references, outcome IDs and policy shape.

`spec/README.md`, `PROCESS.md` and `reflections/README.md` are in this repo and
say what they are for.

## This file is yours

A starting point, not a rulebook. As you learn what your site needs --- a
convention the work has to hold to, a sensor that keeps catching you out, a fact
about the stack that is easy to get wrong --- write it down here. Growing this
file is the work.
