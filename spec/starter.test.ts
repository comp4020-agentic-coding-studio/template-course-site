import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// A worked page-specific test, not an invariant. It describes the starter
// content set so there is a concrete example to replace with tests for the
// week's published spec.
//
// This is a real contract of the starter course rather than a fact about the
// template. Adapt or replace it as your own course takes shape.

const NEXT_STEP =
  "Adapt it to your own course, or delete it and write tests for this week's published spec — see spec/README.md.";

describe("starter content", () => {
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
