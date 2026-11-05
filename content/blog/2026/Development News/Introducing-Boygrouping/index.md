---
categories: "Development News"
author: "joreg"
date: "2026-10-22"
title: "Introducing: Distributed Rendering aka Boygrouping"
description: "Live programming at scale"
thumb: thumb.png
---

Dear synchronized swimmers!  
Boygrouping is back!

Debuted in 2001 with [vvvv beta](https://beta.vvvv.org/using-vvvv/boygrouping/), Boygrouping is vvvv's distributed rendering system. It allows you to live-code at scale: Develop and run a project on a single PC while having any number of PCs connected that follow along every code change and render individual views of a scene [n'sync](https://en.wikipedia.org/wiki/NSYNC).

![Typical boygrouping setup](boygrouping.png)

Boygrouping is essential especially for developing large-scale interactive experiences where you want to develop on premise with real user input rather than "offline" and with simulated or recorded input.

Getting started is trivial, **[docs are here](https://thegraybook.vvvv.org/reference/hde/boygrouping.html).**  
Available for testing in **[vvvv gamma 8.0 preview builds](/download)**!  

![Dataland by Refik Anadol Studio, 2026](<Gallery A – Data Pavilion_07.png>)
The currently largest boygroup is running at [Dataland](https://dataland.art/), spanning 42 PCs powering 84 4k projectors, with vvvv gamma.

![Cyberhelvetia by MESO, 2002](image.png)
Blast of the past: The first ever boygroup was running at the [Cyberhelvetia pavilion](https://meso.design/en/projects/expo02-switzerland-cooperative-multisensory-media-space-for-national-expo) in 2002, with vvvv beta. 

## Small-scale use

Indeed, boygrouping is not only useful for large-scale immersive environments. Whenever you need to develop/run an app that is spanning multiple PCs, boygrouping can help. 

Even if it is only about saving time during production, think:
- A museum running entirely different apps, on different PCs: You can develop them all live, from a single PC and have each client PC only run parts of a patch they are assigned to...
- A single touch screen application that you want to develop while in fullscreen

## Licensing

Every client PC dancing along in a vvvv boygroup needs a device license, in addition to the developers licenses. You may still eventually turn to running your app as an [export](https://thegraybook.vvvv.org/reference/hde/exporting.html) but at any period of time the boygrouping feature is in use, it needs to be covered by a device license per client PC. Note that for your financial convenience we offer [monthly](https://store.vvvv.org/products/vvvv-gamma-device-license-monthly) or [annual](https://store.vvvv.org/products/vvvv-gamma-device-license-annual) device licenses.

So please give it a spin and let us know what you think!  
Available for testing in **[vvvv gamma 8.0 preview builds](/download)**!  
[Docs are here](https://thegraybook.vvvv.org/reference/hde/boygrouping.html).

---

Sounds good but you still find something missing? We do offer custom support and development. Please [get in touch](mailto:devvvvs@vvvv.org)!