---
categories: "Development News"
author: "joreg"
date: "2025-05-02"
title: "Introducing: vvvv on Arm for Mac and Windows, Phase 1/2"
description: "An apple a day..."
thumb: thumb.png
---

Say what? 

You read that right, **vvvv now runs on Macs**!

Well sort of. You excuse the slight clickbait nature of this headline, but we genuinely think this is not too bad of an option. Hear us out:

Thanks to the new Arm-builds of vvvv, it now performs smoothly when run via [Parallels Desktop for Mac](https://www.parallels.com/de/products/desktop/) on recent Apple silicon chips. We're testing this on a Mac mini with M4 chip and it really feels snappy. So if using Parallels is an option for you, you now have quite a good option to start diving into vvvv on your Mac. 

![](vvvv-on-mac.png)

For details on how to get going, see our article: [Running vvvv on a Mac](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-mac.html).

But the Arm architecture is also a thing now in the Windows world and therefore the new Arm-builds of vvvv also bring a massive performance boost to Arm-based Windows PCs.

## The caveat
We're rolling out Arm-builds of vvvv in two phases:
- Phase 1: Without support for our 3d engine VL.Stride **<- now**
- Phase 2: With support for VL.Stride <- still to come
  
Unfortunately though, even after Phase 2, you'll not get the full feature-set of vvvv with the Arm-builds, since not all libraries will work on Arm out of the box and libraries supporting some special hardware might never work since they depend on the device makers support for Arm. 

For a list of limitations, please see the "Limitations" section in our article: [Running vvvv on an Arm CPU](https://thegraybook.vvvv.org/reference/best-practice/vvvv-on-arm.html).

If you have a requirement for a specific library to run on Arm, [get in touch](mailto:devvvvs@vvvv.org)!