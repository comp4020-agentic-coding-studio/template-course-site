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

  // The image people see when a link to this site is shared --- on Slack, in a
  // message, on the hall-of-fame gallery. Replace the placeholder; 1200x630 is
  // the size every scraper expects, and the theme re-encodes it to a JPEG card.
  // A page with artwork of its own overrides this with a `socialImage:`
  // frontmatter key (a `/src/assets/...` path) and a `socialImageAlt:`.
  socialImage: "/src/assets/images/card.png",
  socialImageAlt: "Slop University",
});
