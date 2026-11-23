---
categories: "Development News"
author: "joreg"
date: "2026-11-23"
title: "Introducing: Support for Markerless Motion Capture by MOVIN"
description: "Plug'n'play body tracking and avateering"
thumb: "thumb.png"
---

Lucky you!

You've just got another option to choose from when it comes to motion capturing: We're happy to introduce high-end plug'n'play skeletal tracking by [MOVIN](https://movin3d.com).

[![](movin.svg)](http://movin3d.com)

Here is their promo video to give you an idea:

{{< youtube "FN8E385PfMo" >}}

Usage in vvvv is as trivial as you'd expect. [VL.MOVIN](https://www.nuget.org/packages/VL.MOVIN) comes with avateering support out of the box, meaning the Skeleton data received can directly be applied to rigged models in vvvv. Connect a couple of nodes, or start from the provided help patch and you're good to get creative!

<video width=100% controls autoplay>
    <source src="movin.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

## How do i get it?

Simply [install as usually](https://thegraybook.vvvv.org/reference/hde/managing-nugets.html):

    nuget install VL.MOVIN -pre

If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!