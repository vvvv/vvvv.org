---
categories: "Development News"
author: "joreg"
date: "2025-05-02"
title: "Introducing: vvvv on Arm for Windows and Mac, Phase 1/2"
description: "For your energy efficient CPU"
thumb: thumb.png
---

Say what? 

You may have heard of those new Arm-based Windows laptops that have been popping up recently. Running vvvv on those was no fun, because due to the different CPU architecture, vvvv would run in an emulated mode and thus feel rather sluggish. 

[![](vvvv-on-arm.png)](https://vvvv.org/download/)

Until now: The new Arm-builds of vvvv bring a massive performance boost to Arm-based Windows PCs. So just make sure to get the right download and you're good to go!

## What about Macs?

Indeed. Recent Macs that run on Apple silicon are also Arm-based. So if using [Parallels Desktop for Mac](https://www.parallels.com/de/products/desktop/) is an option for you, you now have quite a good option to run vvvv on your Mac. We're testing this on a Mac mini with M4 chip and it feels really snappy. 

![](vvvv-on-mac.png)

For details on how to get going, see our article: [Running vvvv on a Mac](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-mac.html).


## The caveat
We're rolling out Arm-builds of vvvv in two phases:
- Phase 1: Without support for our 3d engine VL.Stride (now)
- Phase 2: With support for VL.Stride (still to come)
  
Unfortunately though, even after Phase 2, you'll not get the full feature-set of vvvv with the Arm-builds, since not all libraries will work on Arm out of the box and libraries supporting some special hardware might never work since they depend on the device makers support for Arm. 

For a list of limitations, please see the "Limitations" section in our article: [Running vvvv on an Arm CPU](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-arm.html).

If you have a requirement for a specific library to run on Arm, [get in touch](mailto:devvvvs@vvvv.org)!