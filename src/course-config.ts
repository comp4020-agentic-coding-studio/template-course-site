import type { CourseMetaInput } from "astro-course-anu";
import { z } from "astro/zod";

export const COURSE_SESSIONS = [
  "Semester 1",
  "Semester 2",
  "Summer",
  "Autumn",
  "Winter",
  "Spring",
] as const;

const allowedCode = /^SLOP([1-4]|[6-8])\d{3}$/;

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000 or 6000–8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.enum(COURSE_SESSIONS),
    year: z.number().int().min(2026).max(2200),
    level: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(6),
      z.literal(7),
      z.literal(8),
    ]),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
    learningOutcomes: z.array(z.string().trim().min(1)).default([]),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
    for (const field of ["startDate", "endDate"] as const) {
      if (!course[field].startsWith(`${course.year}-`)) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: `must fall in ${course.year}`,
        });
      }
    }
  });

// The single source of truth for the course record. The generated homepage,
// /course/ page, navigation label and /api/index.json all read this object.
// Replace every placeholder value, but keep the shape: the catalogue ingests
// this API contract when the course is published.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP1000",
  title: "Course Title Goes Here",
  session: "Semester 1",
  year: 2027,
  level: 1,
  startDate: "2027-02-22",
  endDate: "2027-05-28",
  description:
    "One concise paragraph explaining what this course is, who it is for, " +
    "and why somebody would choose to spend a semester taking it.",
  tags: ["replace me"],
  learningOutcomes: [
    "state what a graduate of this course can do that they could not do before",
    "write one outcome per genuinely distinct capability, not one per week",
    "start each with a verb somebody could assess",
  ],
}) satisfies CourseMetaInput;

export const learningOutcomes = courseMeta.learningOutcomes.map(
  (description, index) => ({ id: `LO${index + 1}`, description }),
);
