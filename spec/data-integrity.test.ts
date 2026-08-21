import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
  body?: string;
}

interface CourseApi {
  schemaVersion: number;
  canonicalUrl?: string;
  course: {
    code: string;
    startDate: string;
    endDate: string;
    learningOutcomes: string[];
  };
  nodes: ApiNode[];
}

const api = JSON.parse(
  readFileSync(resolve("dist/api/index.json"), "utf8"),
) as CourseApi;
const dateOnly = (value: unknown): string => String(value).slice(0, 10);

describe("course data integrity", () => {
  it("publishes a versioned, canonical catalogue feed", () => {
    expect(api.schemaVersion).toBe(1);
    expect(api.canonicalUrl).toBe(
      `https://courses.slop.university/${api.course.code}/`,
    );
  });

  it("keeps every scheduled date inside the teaching period", () => {
    const dated = api.nodes.filter((node) =>
      ["sessions", "lectures", "assessments"].includes(node.type),
    );
    for (const node of dated) {
      const raw = node.type === "assessments" ? node.meta?.due : node.meta?.date;
      const date = dateOnly(raw);
      expect(date, `${node.id} has no date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(date >= api.course.startDate, `${node.id} falls before teaching starts`).toBe(
        true,
      );
      expect(date <= api.course.endDate, `${node.id} falls after teaching ends`).toBe(true);
    }
  });

  it("resolves every teaching-team reference to a person", () => {
    const people = new Set(
      api.nodes
        .filter((node) => node.type === "people")
        .map((node) => node.id.replace(/^people\//, "")),
    );
    const taught = api.nodes.filter((node) =>
      ["sessions", "lectures"].includes(node.type),
    );
    for (const node of taught) {
      const teachers = node.meta?.teachers as string[];
      expect(teachers.length, `${node.id} names no teacher`).toBeGreaterThan(0);
      for (const teacher of teachers) {
        expect(people.has(teacher), `${node.id} names missing person ${teacher}`).toBe(true);
      }
    }
  });

  it("accepts only learning-outcome IDs that exist", () => {
    const ids = new Set(api.course.learningOutcomes.map((_, index) => `LO${index + 1}`));
    for (const assessment of api.nodes.filter((node) => node.type === "assessments")) {
      const outcomes = (assessment.meta?.outcomes ?? []) as string[];
      for (const outcome of outcomes) {
        expect(ids.has(outcome), `${assessment.id} names missing outcome ${outcome}`).toBe(true);
      }
    }
  });

  it("publishes the one policy page through the API", () => {
    const policies = api.nodes.filter((node) => node.type === "policies");
    expect(policies).toHaveLength(1);
    const body = JSON.parse(
      readFileSync(resolve("dist/api/policies/index.json"), "utf8"),
    ).body as string;
    for (const heading of [
      "## Late work",
      "## Extensions",
      "## Academic integrity",
      "## Getting help",
    ]) {
      expect(body).toContain(heading);
    }
  });
});
