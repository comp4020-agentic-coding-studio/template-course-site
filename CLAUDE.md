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
- Run `pnpm check` before you push.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state.

## The content model

Content is markdown with frontmatter under `src/content/`, in four collections
declared in `src/content.config.ts`: `sessions`, `assessments`, `lectures` and
`people`. The first three join a content graph; `people` is the cast list.

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

`src/course-config.ts` holds the course record --- code, title, teaching dates,
description, learning outcomes. It's validated at config time and it feeds both
the site and `/api/index.json`, so fill it in early.

Two orthogonal flags live in every graph collection's schema. `published: false`
removes an entry from the production build entirely (no page, no listing, no
graph edge) while leaving it visible in `pnpm dev`, so you can stage content.
`draft: true` keeps the page visible and marks it as not yet final.

## Renaming the sessions collection

`sessions` is a deliberately bland name for the teaching sessions, because
choosing what they are --- labs, tutes, workshops, studios, crits --- is part of
designing the course. Renaming it touches five places, and the build fails until
all five agree:

1. the directory `src/content/sessions/`
2. the `sessions:` key in `src/content.config.ts`
3. the entry in `graphCollections` in `src/site-config.ts`, and the matching nav
   link
4. the route directory `src/pages/sessions/`
5. every `related:` ref pointing at `sessions/...`, across all collections

Do it as one change and run `pnpm check`. A half-finished rename fails loudly
rather than shipping a broken listing, so this is a good task to direct an agent
through end to end.

Adding a collection --- a reference layer of topic pages, say, if your course
wants one --- is the same five places in reverse.

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
describes it. Both are placeholders --- replace them, and keep the picture
1200x630. A page with artwork of its own overrides the site-wide card with its
own `socialImage:` frontmatter key. The theme turns whichever applies into the
`og:image` the invariants look for, and re-encodes it to a JPEG, since the
scrapers still don't decode the formats the site serves to browsers.

## The checks

`typecheck`, `build`, `spec`, `lint`, `tests`, `evidence`, `links`, `secrets`,
`deploy`. Run `pnpm check`. Read the failure.

`pnpm build` is itself several checks: it runs axe over every rendered page,
verifies internal links respect the base path, and fails on a dangling content
ref.

`spec/README.md`, `PROCESS.md` and `reflections/README.md` are in this repo and
say what they are for.

## This file is yours

A starting point, not a rulebook. As you learn what your site needs --- a
convention the work has to hold to, a sensor that keeps catching you out, a fact
about the stack that is easy to get wrong --- write it down here. Growing this
file is the work.
