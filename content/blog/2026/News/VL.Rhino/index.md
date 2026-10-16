---
date: "2026-05-29"
title: "VL.Rhino - Rhino & Grasshopper for vvvv, now available"
description: "Design your world in Rhino, make it interactive in vvvv."
categories: "News"
author: "wmc"
thumb: "hero-720.jpg"
---

Hey everyone,

after maintaining VL.Rhino.3dm for a while, I've built out a full professional version. It's available now: **VL.Rhino**.

![Overview](og-image.jpg)

Many of you probably know VL.Rhino.3dm for `.3dm` reading, no Rhino installation needed. VL.Rhino keeps that and adds a lot more to the workflow. It also comes with significantly improved geometry reading performance over the free version.

## What's new

One of the main additions is the **Grasshopper Live-Link** - bidirectional realtime communication between Grasshopper and vvvv via shared memory. Geometry, floats, vectors, and strings flow both ways. 

Beyond that:

- **PBR material pipeline** — Rhino materials → Stride, embedded textures extracted directly from the `.3dm`, no separate texture files needed
- **Camera & light export** — named views and lights as Stride entities
- **Geometry creation** — NURBS curves, surfaces, pipe and ribbon meshes from control points in vvvv
- **Blocks/Instances** — GPU instancing via per-geometry transform matrices
- **User Strings & layer metadata** — drive logic, filtering, and labeling directly from data embedded in your Rhino model
- **Rhino Compute integration** — connect to a local or cloud Compute server from vvvv
- **Skia path conversion** — Brep/Mesh/Curve edges → SKPath for 2D/UI contexts
- **Adaptive curve sampling** — chord deviation, tangent angle, edge length, recursion depth

No Rhino installation required for any of the above. The Grasshopper Live-Link and Rhino.Compute are the only feature that need Rhino 7 or 8 running alongside.

![Objects](feature-geo-800.jpg)

## The workflow idea behind it

In many studios there are two worlds: the designer working in Rhino, and the developer working in vvvv. VL.Rhino lets these two communicate properly. User Strings and layer hierarchies become the interface between disciplines - the 3D model carries not just geometry but meaning, usable in vvvv directly for filtering, logic, and interaction.

{{< youtube H12r-6Xc2Y8 >}}
## Pricing

Perpetual license, no subscriptions. Individual €99 / Studio €289 / Student €35 — all incl. VAT, one year of updates included.

{{< box >}}
More info and purchase: [vlrhino.com](https://vlrhino.com)
{{< /box >}}

Happy to answer questions and would love to see what you build with it.

The free VL.Rhino.3dm stays as is, just run "nuget install VL.Rhino.3dm" and try it. 

Moritz
