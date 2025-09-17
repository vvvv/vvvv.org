---
categories: "Development News"
author: "joreg"
date: "2025-09-16"
title: "Introducing: Support for PosiStageNet"
description: "An Open Protocol for On-Stage, Live 3D Position Data"
thumb: thumb.png
---

Dear patchers!

Stage lighting anyone? This might come in handy: [PosiStageNet](https://posistage.net/) or "PSN" for short: "An Open Protocol for On-Stage, Live 3D Position Data" developed by [VYV](https://www.vyv.ca/) in collaboration with [MA Lighting](https://www.malighting.com/).

[![](psn-logo.png)](https://posistage.net/)

The NuGet [VL.IO.PosiStageNet](https://www.nuget.org/packages/VL.IO.PosiStageNet) contains a **PSNClient** (to receive trackers) but probably more importantly a **PSNServer** that is as simple to use as this: Define your trackers with an ID, position, speed, acceleration, orientation and target position and send them to a client which will typically be a lighting desk that then controls e.g. lights to point at your trackers... 

![alt text](image.png)

---
For the sponsoring of this [open-source](https://github.com/vvvv/VL.IO.PosiStageNet) development we bow to [Refik Anadol Studio](https://refikanadol.com/).

If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!