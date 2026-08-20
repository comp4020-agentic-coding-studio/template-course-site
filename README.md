# COMP4020 course-site template

A starter template for course-website prototypes in **COMP4020 / COMP8020
Agentic Coding Studio**. The course provisions a repo from this template for
each deliverable that uses it --- you don't create it yourself. The `start`
course skill clones it for you; from there, design your course and deploy the
site to GitHub Pages.

It ships as a working course website for **Slop University**, the course's
running fictional institution: an Astro build on the same theme package this
course's own website uses, wearing the Slop identity instead of the ANU one. The
structure is real and the content is placeholder. Deciding what the course is,
and what shape its content takes, is your job.

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
pnpm dev        # local dev server
pnpm check      # most of what CI runs (links, secrets, evidence and deploy are CI-only)
pnpm build      # produce dist/ (what gets deployed)
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

- `src/content/` --- the content, as markdown with frontmatter: `sessions`,
  `assessments`, `lectures` and `people`. Two entries each, all obviously
  placeholder. Delete them and write your own.
- `src/content.config.ts` --- the schemas those collections validate against.
- `src/course-config.ts` --- the course record (code, title, teaching dates,
  learning outcomes). Placeholder; make it yours first, since the site header
  and the JSON API both read it.
- `src/pages/` --- one listing page and one detail route per collection, plus
  the home page and a 404.
- `src/components/` --- the card grids the listing pages render.
- `src/decks/` --- slide decks, as markdown. One placeholder deck at
  `/decks/week-01/`, and `theme.css`, which puts them in the same brand as the
  site. `pnpm decks:check` reports slides whose content doesn't fit.
- `src/site-config.ts` --- site name, navigation, licence, and the Slop
  branding.
- `src/assets/images/` --- the hero images. Generated for this template; replace
  them with your own if the course you design wants a different look.
- `spec/` --- what the checks are for (`README.md`), the shipped invariants
  (`invariants.test.ts`), and a replaceable worked example (`starter.test.ts`);
  the spec tests you write live alongside them.
- `CLAUDE.md` --- orients whoever works in this repo, you or a coding agent: the
  content model, what the checks mean, and how to work here. Yours to grow.
- `PROCESS.md` --- a template for your process overview, showing the
  cited-moment format. Replace it with your own; `pnpm check:evidence` verifies
  your citations resolve.
- `.github/workflows/checks.yml` --- the CI sensors that run on every push once
  your repo is public, and the GitHub Pages deploy.
- `.githooks/pre-commit` --- blocks any commit that contains something shaped
  like an API key, so your COMP4020 key can't end up in a public repo. Installed
  automatically by `pnpm install`.

The teaching sessions ship as a collection called `sessions` because no name
would be neutral. Labs, tutes, workshops, studios, crits: what you call them,
and what they are, is part of designing the course. `CLAUDE.md` has the rename
checklist --- it's a good first task to direct an agent through, because the
build fails until every reference agrees.

See the course site for how the checks map to each week of the course.
