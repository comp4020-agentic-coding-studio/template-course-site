import { execFileSync } from "node:child_process";
import { defineConfig } from "astro/config";
import courseGraph from "astro-course-anu";
import universityTheme from "astro-theme-university";
import { courseMeta } from "./src/course-config.ts";
import { graphCollections } from "./src/site-config.ts";
import { resolveDeployment } from "./scripts/pages-base.ts";

/** The origin remote, or undefined outside a git checkout. */
function gitOrigin(): string | undefined {
  try {
    return execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return undefined;
  }
}

// Derived, never hardcoded --- see scripts/pages-base.ts for why.
const { site, base } = resolveDeployment(process.env, gitOrigin);

export default defineConfig({
  site,
  base,
  // Pages build as directories, so every route URL ends in a slash. Saying so
  // explicitly makes Astro emit matching links, which keeps the canonical URL
  // and what a visitor clicks in agreement --- otherwise each click costs a
  // 301 on GitHub Pages.
  trailingSlash: "always",
  integrations: [
    universityTheme({
      defaultLayout: "src/layouts/PageLayout.astro",
      // The whole brand swap: three colour tokens and a set of lockups. Never
      // import astro-theme-anu here --- the ANU identity is not yours to wear.
      brandCss: "astro-theme-slop/slop.css",
      imageFormat: "avif",
      llmsTxt: true,
    }),
    courseGraph({
      collections: graphCollections.map((key) => ({ key })),
      timezone: "Australia/Canberra",
      course: courseMeta,
    }),
  ],
});
