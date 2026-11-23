---
categories: "Development News"
author: "joreg"
date: "2026-11-17"
title: "Update: Adding support for TUIO 2.0"
description: "For your multi-touching needs!"
thumb: tuio_logo.png
---

Dear touchers of multiples!

Here's to announce an update to your trusted [VL.IO.TUIO](https://www.nuget.org/packages/VL.IO.TUIO) pack which adds support for the [TUIO 2.0 protocol](https://www.tuio.org/?tuio20).

![](tuio_logo.svg)

TUIO 1 and 2 are really two separate, incompatible  protocols. This means that 2 doesn't replace 1 but is now simply available as a separate set of nodes in the same pack. Here is how this looks in a patch:

![Tuio 2.0](image.png)

And a reminder while we have you reading: vvvv also comes with both a TUIO Simulator and Monitor extension, since vvvv gamma 8.0, available as a convenient one-click install via the [Extensions](https://thegraybook.vvvv.org/reference/hde/extensions.html) menu!

The simulator supports multi-touch cursors and multiple objects (TUIO 1.1 only for now) for quick and convenient testing:

![](image-2.png)

## Credits

The TUIO 2.0 implementation is based on the [TuioNet](https://github.com/InteractiveScapeGmbH/TuioNet) library provided by [Interactive Scape](https://www.interactive-scape.com/). 

If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!