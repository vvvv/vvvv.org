---
categories: "Development News"
author: "joreg"
date: "2026-08-20"
title: "Introducing: VL.DeepSpace"
description: "For use in the Ars Electronica Deep Space"
thumb: thumb.png
---

Special interest!

Are you developing applications for an [Ars Electronica Deep Space](https://ars.electronica.art/solutions/de/deepspace/)? Read on!

While it has always been possible to create content for the Deep Space with vvvv, with the recent addition of support for [Stereoscopic Rendering](https://vvvv.org/blog/2026/introducing-support-for-stereoscopic-rendering/), it is now also possible to use the Deep Space's active-stereo rendering capabilities.

To simplify things to the max, with [VL.DeepSpace](https://www.nuget.org/packages/VL.DeepSpace/) we provide a pack that provides a node-set to work with the Deep Space specific Wall/Floor setup and its laser-based floor tracking. The synchronization of values between wall and floor PCs is easily handled via vvvv's [Public Channel Bindings](https://thegraybook.vvvv.org/reference/hde/bindings.html).

**image**

### Getting started
It is basically zero-setup: You start from a working template and add your own content:

- Download the latest [vvvv gamma 8.0 preview](/download)
- Open the [Help Browser](https://thegraybook.vvvv.org/reference/hde/findinghelp.html), search for "deepspace", download the pack and check out the samples
- Take one of the samples and save them in a local work folder to modify it

### Boygrouping
vvvv's upcomming distributed rendering feature called "Boygrouping" will make developing for the Deep Space even more practical. Follow this blog to be the first to learn about its availability. Coming soon™.

### Live Demo at Ars Electronica 2026
At this years [Ars Electronica festival](https://ars.electronica.art/negotiatinghumanity/en/) in Linz there will be 2 live demos of vvvv in the Deep Space:

- Wednesday morning
- Friday as part of the Deep Space community meeting


---

Sounds good but you still find something missing? We do offer custom support. Please [get in touch](mailto:devvvvs@vvvv.org)!