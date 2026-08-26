# COMP4020 course-site template

A starter template for course-website prototypes in **COMP4020 / COMP8020
Agentic Coding Studio**. The course provisions a repo from this template for
each deliverable that uses it --- you don't create it yourself. The `start`
course skill clones it for you; from there, design your course and deploy the
site to GitHub Pages.

It ships as a working course website for **Slop University**, the course's
running fictional institution: an Astro build on the same neutral theme package
this course's own website uses, wearing the Slop identity. The structure is real
and the content is placeholder.

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

`mise` is what tutor support reproduces runtime problems with; any other manager
is fine if you match the Node and pnpm versions in `mise.toml`.

## What's here

- `src/content/` --- structured Markdown for `sessions`, `assessments`,
  `lectures` and `people`, validated against the schemas in
  `src/content.config.ts`. The small placeholder set is a working example;
  replace it incrementally and keep the checks green.
- `src/course-config.ts` --- the validated course record: SLOP code, title,
  description, tags, level, session and dates. The home page, navigation and
  JSON API all read it.
- `src/site-config.ts` --- site name, navigation, licence, and the Slop
  branding.
- `src/decks/` --- slide decks, as markdown, plus `theme.css`, which puts them
  in the same brand as the site.
- `src/assets/images/` --- starter home/social artwork. Replace it with
  course-specific work, or make a deliberate image-free treatment;
  `pnpm check:evidence` will not pass the placeholders.
- `spec/` --- the shipped course-data baseline (`data-integrity.test.ts`); the
  spec tests you write live alongside it.
- `.githooks/pre-commit` --- blocks any commit that contains something shaped
  like an API key, so your COMP4020 key can't end up in a public repo. Installed
  automatically by `pnpm install`.
- `CLAUDE.md`, `PROCESS.md`, `spec/README.md` and `reflections/README.md` ---
  each says what it is for.

`CLAUDE.md` carries the rest of what is fixed: the content model and the address
a ref shares with its file, page and JSON; the naming of teaching sessions; the
base path; the link-preview card; and the deck syntax.

## The generated course API

Every build emits a versioned `dist/api/index.json` and per-entry JSON. This is
platform plumbing rather than an API-design exercise. The future Slop catalogue
will use the course record and content nodes to filter and display published
courses, including their canonical `courses.slop.university/SLOPxxxx/` path. The
integration emits and validates this contract during the build; do not hand-edit
generated JSON.

See the course site for how the checks map to each week of the course.
