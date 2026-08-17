import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// A worked page-specific test, not an invariant. It describes the starter
// content set so there is a concrete example to replace with tests for the
// week's published spec.
//
// Both of these are real contracts of a course website rather than facts about
// the template, so they are worth keeping as you replace the content --- but
// they are yours to change. See spec/README.md.

const NEXT_STEP =
  "Adapt it to your own course, or delete it and write tests for this week's published spec — see spec/README.md.";

function page(path: string): Document {
  const full = resolve("dist", path);
  return new JSDOM(readFileSync(full, "utf8")).window.document;
}

describe("starter content", () => {
  it("lists every assessment on the assessment page", () => {
    const listed = page("assessments/index.html").querySelectorAll("main a[href*='/assessments/']");
    expect(
      listed.length,
      `The assessment listing links to no assessment pages. ${NEXT_STEP}`,
    ).toBeGreaterThan(0);
  });

  it("declares assessment weights that sum to 100", () => {
    const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8"));
    const weights = api.nodes
      .filter((node: { type: string }) => node.type === "assessments")
      .map((node: { meta?: { weight?: number } }) => node.meta?.weight ?? 0);

    expect(weights.length, `No assessments in the content graph. ${NEXT_STEP}`).toBeGreaterThan(0);
    expect(
      weights.reduce((sum: number, weight: number) => sum + weight, 0),
      `Assessment weights must sum to 100. ${NEXT_STEP}`,
    ).toBe(100);
  });
});
