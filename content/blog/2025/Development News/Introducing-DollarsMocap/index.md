---
categories: "Development News"
author: "joreg"
date: "2025-07-11"
title: "Introducing: DollarsMoCap"
description: "Probably the simplest way to achieve full body tracking"
thumb: "logo.png"
---

Dear body trackers!

There are many options for skeleton tracking you can use with vvvv:
- [Kinect](https://www.nuget.org/packages/VL.Devices.Kinect) (the original one)
- [Kinect 2](https://www.nuget.org/packages/VL.Devices.Kinect2)
- [Azure Kinect](https://www.nuget.org/packages/VL.Devices.AzureKinect)
- [Orbbec Femto](https://www.nuget.org/packages/VL.Devices.AzureKinect.Femto)
- [ZED](https://www.nuget.org/packages/VL.Devices.ZED)

But those options all require the according specific depth camera, which you might not always have around. Now here is a new option that doesn't require additional hardware and tracks a single 3d skeleton (including fingers and face!) even from a simple webcam: 

Introducing: **[Dollars Mono](https://www.dollarsmocap.com/mono)** by [Dollars MoCap](https://www.dollarsmocap.com/)

Watch this demo of their technology to get an idea of the quality of tracking you can expect:

{{< youtube gBbKCGwMFeY >}}

To use the tracking data in vvvv to control an avatar, all you need to do is load a rigged model and provide a joint mapping, ie. a spread of joint names the model comes with, that aligns with the joint names as returned by DollarsMoCap.

![](applyskeleton.png)

Many thanks go out to Kan Feng, the creator of Dollars MoCap, for the great support and helping us along the way of implementing this for vvvv!

## How do i get it?

As of this writing, requires latest [vvvv gamma 7.0 preview](https://vvvv.org/download/) builds. Then install as usual:

    nuget install VL.DollarsMoCap -pre

---
If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!