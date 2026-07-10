---
categories: "Development News"
author: "joreg"
date: "2026-07-10"
title: "Introducing: Support for Captury"
description: "Highend markerless rigid body and skeleton tracking"
thumb: "thumb.jpg"
---

Dear capturers of motion!

If you really mean it, then this is for you: vvvv now supports markerless full-body tracking by [The Captury](https://captury.com).

[![](image-1.png)](http://captury.com)

Check out their showreel to see what they offer:

{{< youtube "lWAYdADOYbY" >}}

Based on their [RemoteCaptury](https://github.com/thecaptury/RemoteCaptury) library we've built [VL.Captury](https://www.nuget.org/packages/VL.Captury), a pack that allows you to receive tracked Skeletons, ArTags, Props and Cameras streamed by their [Captury Live](https://captury.com/real-time-processing/) software.

Usage in vvvv needs no words:

![](image.png)

VL.Captury also comes avateering support out of the box, meaning the Skeleton data received from Captury Live can directly be applied to rigged models in vvvv. 

<video width=100% controls autoplay>
    <source src="captury.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

## How do i get it?

Simply [install as usually](https://thegraybook.vvvv.org/reference/hde/managing-nugets.html):

    nuget install VL.Captury -pre

If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!