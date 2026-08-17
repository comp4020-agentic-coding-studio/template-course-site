import { defineSiteConfig } from "astro-theme-university/types";
// The Slop University identity: lockups, crest, favicon. Paired with
// `brandCss: "astro-theme-slop/slop.css"` in astro.config.ts, which sets the
// three colour tokens the theme derives everything else from.
import { slopBranding } from "astro-theme-slop";

/** Collections that participate in the content graph. The same list goes to
 *  `courseGraph()` in astro.config.ts and to the render-time helpers, so the
 *  graph and the pages can never disagree about which collections exist. */
export const graphCollections = ["topics", "sessions", "assessments", "lectures"];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: "Lectures", href: "/lectures/" },
    { text: "Sessions", href: "/sessions/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "Topics", href: "/topics/" },
    { text: "People", href: "/people/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
});
