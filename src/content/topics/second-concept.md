---
title: Second concept
description: A second placeholder topic, here so the listing page, the filter and the related block all have something to work with
tags:
  - example
links:
  - label: Astro content collections
    url: https://docs.astro.build/en/guides/content-collections/
---

Replace this page too. It exists so the topics listing renders more than one
card, the filter has something to filter, and the related block at the foot of
[First concept](/topics/first-concept/) has an edge to draw.

## Declaring a connection

The `related:` frontmatter takes refs: a bare slug for a topic in this
collection, `<collection>/<slug>` for anything else. Declare it on whichever
side is convenient --- the related block renders it from both ends. A ref that
does not resolve fails the build, which is the point.

## External links

The `links:` frontmatter takes `{label, url}` pairs. They render in the same
block as related content and appear in the API, but they are not graph edges ---
nothing outside this site can be a node.
