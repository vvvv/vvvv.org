---
categories: "Development News"
author: "joreg"
date: "2025-11-20"
title: "Introducing: Support for OptiTrack"
description: "Highend Rigid Body and Skeleton tracking"
thumb: "optitrackmocap_logo.jpg"
---

Dear trackers of bodies and other things!

Here's to introduce support for rigid body and skeleton tracking by [OptiTrack](https://optitrack.com).

[![](image.avif)](https://optitrack.com)


*"The World’s Most Precise Motion Capture. Optical motion capture technology trusted by researchers, innovators, and industry leaders from around the world."* ...and now effortlessly accessible in vvvv. 

Based on their [NatNet SDK](https://optitrack.com/software/natnet-sdk) we've implemented [VL.IO.OptiTrack](https://www.nuget.org/packages/VL.IO.OptiTrack) a NuGet that allows you to receive any data like Markers, RigidBodies and Skeletons streamed by their [Motive](https://optitrack.com/software/motive/) application.

It is trivial to use in vvvv. With just a few clicks you've set up a connection and receive the desired items:

![](image.png)

It also comes out of the box with support for Avateering, meaning the Skeleton data received from Motive can directly be applied to rigged models in vvvv. 

<video width=100% controls autoplay>
    <source src="lankydude.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

## How do i get it?

Simply [install as usually](https://thegraybook.vvvv.org/reference/hde/managing-nugets.html):

    nuget install VL.IO.OptiTrack -pre

If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!