import type { CourseMetaInput } from "astro-course-anu";

// The course record: the facts a handbook entry would carry. Validated by
// courseMetaSchema at config time (a typo'd field fails the build) and emitted
// as the `course` block on /api/index.json.
//
// This is the first file to rewrite. Everything here is placeholder --- the
// course you are designing goes in its place.
export const courseMeta = {
  code: "SLOP1000",
  title: "Course Title Goes Here",
  session: "Semester 1, 2027",
  startDate: "2027-02-22",
  endDate: "2027-05-28",
  description:
    "One paragraph on what this course is and who it is for. It is the " +
    "line a prospective student reads before anything else, so write it " +
    "last, once you know what the course actually turned out to be.",
  learningOutcomes: [
    "state what a graduate of this course can do that they could not do before",
    "write one outcome per genuinely distinct capability, not one per week",
    "start each with a verb somebody could assess",
  ],
} satisfies CourseMetaInput;
