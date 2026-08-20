---
categories: "Development News"
author: "joreg"
date: "2026-08-20"
title: "Introducing: VL.DeepSpace"
description: "For use in the Ars Electronica Deep Space"
thumb: thumb.png
---

[![](CE_DeepSpace_by_AE.png)](https://ars.electronica.art/solutions/de/deepspace/)

Special interest!

Are you developing applications for an [Ars Electronica Deep Space](https://ars.electronica.art/solutions/de/deepspace/)? Read on!

While it has always been possible to create content for the Deep Space with vvvv, with the recent addition of support for [Stereoscopic Rendering](https://vvvv.org/blog/2026/introducing-support-for-stereoscopic-rendering/), it is now also possible to use the Deep Space's active-stereo rendering capabilities.

To simplify things to the max, with the new [VL.DeepSpace](https://www.nuget.org/packages/VL.DeepSpace/) pack we provide a node-set to work with the Deep Space specific Wall/Floor setup and its laser-based floor tracking. The synchronization of values between wall and floor PCs is easily handled via vvvv's [Public Channel Bindings](https://thegraybook.vvvv.org/reference/hde/bindings.html).

![](image.png)

### Getting started
It is basically zero-setup: You start from a working template and add your own content:

- Download the latest [vvvv gamma 8.0 preview](/download)
- Open the [Help Browser](https://thegraybook.vvvv.org/reference/hde/findinghelp.html), search for "deepspace", download the pack and check out the samples
- Take one of the samples and save them in a local work folder to modify it

### Boygrouping
vvvv's upcomming distributed rendering feature called "Boygrouping" will make developing for the Deep Space even more practical. You develop on a laptop connected to the 2 PCs and any change you make is instantly replicated on the big screen. No need to compile a program and distribute it to the target machines. Follow this blog to be the first to learn about its availability. Coming soon™.

### Live Demos at Ars Electronica 2026
At this years [Ars Electronica festival](https://ars.electronica.art/negotiatinghumanity/en/) in Linz there will be 2 live demos of vvvv in the Deep Space:

- Wednesday, September 9: 11:00 - 11:30 [Live-programming Deep Space 8K with vvvv](https://ars.electronica.art/negotiatinghumanity/en/view/live-programming-deep-space-8k-with-vvvv-3a338ddb450c8193b667deec448c483f/)
- Friday, September 11: 17:00 – 18:00 as part of [Endless Possibilities](https://ars.electronica.art/negotiatinghumanity/en/view/endless-possibilities-30038ddb450c8324a91681957a452f56/) a meetup for the worldwide Deep Space community

---

Sounds good but you still find something missing? We do offer custom support. Please [get in touch](mailto:devvvvs@vvvv.org)!