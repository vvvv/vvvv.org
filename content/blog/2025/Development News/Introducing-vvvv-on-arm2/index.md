---
categories: "Development News"
author: "joreg"
date: "2025-10-28"
title: "Update: vvvv on Arm for Windows and Mac, Phase 2/2"
description: "vvvv Arm builds now including VL.Stride"
thumb: thumb.png
---

Continuing from [Phase 1](https://vvvv.org/blog/2025/introducing-vvvv-on-arm-for-windows-and-mac-phase-1/2/) here is to introduce promised Phase 2/2:

**vvvv gamma Arm builds now support VL.Stride!**

This means that if you're running vvvv on an Arm-based Windows laptop or on Apple Silicon via [Parallels Desktop](https://www.parallels.com/de/products/desktop/) and you get the right download (preview for now)...

[![](vvvv-on-arm.png)](https://vvvv.org/download/)

...you'll have VL.Stride available and thus get the full vvvv experience, including 3d rendering! 

### Limitations

Caveats remain:
- Individual libraries/devices may not (yet) have Arm support, see [Running vvvv on an Arm](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-arm.html)
- Arm CPUs often will not be accompanied by Nvidia GPUs. Non-Nvidia GPUs though seem to be much closer following the official specs, when it comes to shader programming. This will lead to the impression that things working on a machine with an Nvidia GPU are broken on a machine with a non-Nvidia GPU, when in fact most often the program is actually broken to begin with, only Nvidia GPUs still manage to run them. So really the code needs to be fixed to be valid on all GPUs!

### Running on Apple Silicon
[Running vvvv Arm builds on a Mac](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-mac.html) via Parallels Desktop does not have any extra limitations! It will be very close to as good as running vvvv on a native Windows Arm PC or if there was a native macOS version of vvvv. 

![](vvvv-on-mac2.png)

If you have a requirement for a specific library to run on Arm, please [get in touch](mailto:devvvvs@vvvv.org)!