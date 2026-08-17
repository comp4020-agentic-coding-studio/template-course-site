import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { courseNodeSchema, definePeopleCollection } from "astro-course-anu/schemas";

// Four collections join the content graph (topics, sessions, assessments,
// lectures) and one does not (people). Each graph collection's key is its whole
// address: the on-disk directory, the URL segment, the /api/ path segment, and
// the `related:` ref prefix all agree. Renaming one is therefore a rename in
// five places --- see CLAUDE.md, which walks through renaming `sessions`.
//
// Every collection here shares `courseNodeSchema`: title, description, tags,
// related, links, published, draft, spec. Type-specific fields are added on
// top. `.loose()` lets a frontmatter field through untyped, so you can add one
// and render it before deciding it belongs in the schema.

const weekSchema = z.coerce.number().int().min(1).max(13);

const courseNodeLoader = (dir: string) =>
  glob({ pattern: ["**/*.{md,mdx}", "!**/CLAUDE.md"], base: `src/content/${dir}` });

export const collections = {
  // Reusable chunks of course content: one concept, tool or activity each.
  // Everything that is not a session, an assessment or a lecture goes here.
  topics: defineCollection({
    loader: courseNodeLoader("topics"),
    schema: courseNodeSchema.loose(),
  }),

  // The recurring teaching slot. What it is actually called --- lab, tute,
  // workshop, studio, seminar, crit --- is a design decision this template
  // deliberately leaves to you.
  sessions: defineCollection({
    loader: courseNodeLoader("sessions"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        repo: z.url().nullish(),
      })
      .loose(),
  }),

  // Graded work. `due` is a date (a bare `2027-04-12` is read in the site
  // timezone set in astro.config.ts); `weight` is a percentage of the course.
  assessments: defineCollection({
    loader: courseNodeLoader("assessments"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        due: z.coerce.date().nullish(),
        weight: z.coerce.number().nullish(),
      })
      .loose(),
  }),

  // One entry per lecture. These are metadata pages, not slide decks: the body
  // is the lecture's own content, and the graph edges say which topics it
  // covers.
  lectures: defineCollection({
    loader: courseNodeLoader("lectures"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema.nullish(),
      })
      .loose(),
  }),

  // The cast: whoever teaches, tutors or guests. Not a graph collection --- the
  // factory bakes in Astro's image() so `photo:` resolves through the image
  // pipeline.
  people: definePeopleCollection(),
};
