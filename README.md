# COMP4020 course-site template

A starter template for course-website prototypes in **COMP4020 / COMP8020
Agentic Coding Studio**. The course provisions a repo from this template for
each deliverable that uses it --- you don't create it yourself. The `start`
course skill clones it for you; from there, design your course and deploy the
site to GitHub Pages.

It ships as a working course website for **Slop University**, the course's
running fictional institution: an Astro build on the same neutral theme package
this course's own website uses, wearing the Slop identity. The structure is real
and the content is placeholder. Deciding what the course is, and what shape its
content takes, is your job.

## CI and Pages only turn on when you ship

Your repo starts private, and both CI jobs (`check` and `deploy`) are gated on
it being public. While private, a push to `main` runs nothing in CI ---
`pnpm check` (below) is your feedback loop until then. When you're ready, the
course's `/ship` skill flips the repo public, turns on GitHub Pages, and
dispatches the deploy for you; there's nothing to configure in the Pages
settings yourself. From that point, every push to `main` builds and deploys, and
the deploy step prints your live URL and checks it returns 200.

## What gets marked

The deployed site is the deliverable, assessed live in Chrome at two fixed
viewports --- see the course website's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#marking-environment)
for the details.

## Quick start

```sh
mise install       # supported path: install the template's Node and pnpm
pnpm install
pnpm dev             # local dev server
pnpm check           # types, build integrity and the small course spec
pnpm check:evidence  # final submission gate
```

`mise` is the course's recommended runtime manager. If you use another manager
or the official installers, that is fine: provide the Node and pnpm versions in
`mise.toml`, then run the same commands. Tutor support reproduces runtime
problems with mise.

## The base path is worked out for you

A project site on GitHub Pages is served from
`https://<owner>.github.io/<repo>/`, not from the root, so every internal link
and asset URL needs that prefix. `astro.config.ts` derives it at config time ---
from `GITHUB_REPOSITORY` in CI, falling back to your `origin` remote --- so a
local build and the deployed one agree without you setting anything.

The consequence worth knowing: a hand-written `href="/sessions/"` in an `.astro`
file bypasses Astro's base handling and 404s on the live site while working
perfectly on `localhost`. Use the theme's components and markdown links, which
are rewritten for you, and let the build's link checker catch the rest.

## What's here

- `src/content/` --- structured Markdown for `sessions`, `assessments`,
  `lectures` and `people`. The small placeholder set is a working example;
  replace it incrementally and keep the checks green.
- `src/content.config.ts` --- the schemas those collections validate against.
- `src/course-config.ts` --- the validated course record: SLOP code, title,
  description, tags, level, session and dates. The home page, navigation and
  JSON API all read it. Change its dates alongside the placeholder sessions,
  lectures and assessments that use them so the course remains internally
  consistent.
- `src/pages/` --- the generated home page, listings and detail routes, an
  ordinary Markdown policies page, and a 404.
- `src/components/` --- the card grids the listing pages render.
- `src/decks/` --- slide decks, as markdown. One placeholder deck at
  `/decks/week-01/`, and `theme.css`, which puts them in the same brand as the
  site. The build compiles decks but cannot see whether a slide fits or stays
  legible.
- `src/site-config.ts` --- site name, navigation, licence, and the Slop
  branding.
- `src/assets/images/` --- starter home/social artwork. Replace it with
  course-specific work, or make a deliberate image-free treatment.
- `spec/` --- what the checks are for (`README.md`) and the shipped course-data
  baseline (`data-integrity.test.ts`); the spec tests you write live alongside
  them.
- `CLAUDE.md` --- orients whoever works in this repo, you or a coding agent: the
  content model, the base path, and what the checks mean. Yours to grow.
- `PROCESS.md` --- a template for your process overview, showing the
  cited-moment format. Replace it with your own; `pnpm check:evidence` verifies
  your citations resolve. It also reports every authored starter fragment still
  carrying a `STARTER_CONTENT` comment; remove each comment when that fragment
  has genuinely been replaced.
- `.github/workflows/checks.yml` --- the CI sensors that run on every push once
  your repo is public, and the GitHub Pages deploy.
- `.githooks/pre-commit` --- blocks any commit that contains something shaped
  like an API key, so your COMP4020 key can't end up in a public repo. Installed
  automatically by `pnpm install`.

The internal collection and URL stay `sessions`; choose the human-facing label
(`Studios`, `Labs`, `Crits`, and so on) in `src/site-config.ts`. Stable internal
names keep the course API uniform enough for the Slop catalogue to ingest.

## The generated course API

Every build emits a versioned `dist/api/index.json` and per-entry JSON. This is
platform plumbing rather than an API-design exercise. The future Slop catalogue
will use the course record and content nodes to filter and display published
courses, including their canonical `courses.slop.university/SLOPxxxx/` path. The
integration emits and validates this contract during the build; do not hand-edit
generated JSON.

See the course site for how the checks map to each week of the course.
