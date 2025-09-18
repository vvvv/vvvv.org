---
categories: "Development News"
author: "joreg"
date: "2025-07-18"
title: "Introducing: DollarsMoCap"
description: "Probably the simplest way to achieve full body tracking"
thumb: "logo.png"
---

Dear body trackers!

There are many options for skeleton tracking you can use with vvvv:
- [Kinect](https://www.nuget.org/packages/VL.Devices.Kinect) (the original one)
- [Kinect 2](https://www.nuget.org/packages/VL.Devices.Kinect2)
- [Azure Kinect](https://www.nuget.org/packages/VL.Devices.AzureKinect)
- [Femto Bolt & Mega](https://www.nuget.org/packages/VL.Devices.AzureKinect.Femto)
- [ZED](https://www.nuget.org/packages/VL.Devices.ZED)
- [Nuitrack](https://www.nuget.org/packages/VL.Devices.Nuitrack)
- [Ultraleap](https://www.nuget.org/packages/VL.Devices.Ultraleap)

But those options all require the according specific depth camera, which you might not always at hand. Now here is a new option that doesn't require additional hardware and tracks a single 3d skeleton (including fingers and face!) even from a simple webcam: 

Introducing: **[Dollars MONO](https://www.dollarsmocap.com/mono)** by [Dollars MoCap](https://www.dollarsmocap.com/)

Watch this demo of their technology to get an idea of the quality of tracking you can expect:

{{< youtube gBbKCGwMFeY >}}

When running Dollars MONO on the same PC as vvvv, all you have to do is activate the "vvvv Streaming" option you can find under `Settings > Stream`:

![](streaming.png) 

In vvvv you need the [VL.DollarsMoCap](https://www.nuget.org/packages/VL.DollarsMoCap) NuGet that comes with a node called `DollarsMoCap` that receives the data.

To control an avatar with that data, all you need to do is load a rigged model and provide a joint mapping, ie. a spread of joint names the model comes with, that aligns with the joint names as returned by DollarsMoCap. This takes about 5 minutes to set up and then works for all models that use the same skeleton.

<video width=100% controls autoplay>
    <source src="lankydude.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

Many thanks go out to Kan Feng, the creator of Dollars MoCap, for the great support and helping us along the way of implementing this for vvvv!

## How do i get it?

As of this writing, requires latest [vvvv gamma 7.0 preview](https://vvvv.org/download/) builds. Then install as usual:

    nuget install VL.DollarsMoCap

{{< box >}}
If you want to use Dollars MONO beyond it's free trial limitations, Dollars MoCap offers a **25% discount on the [Dollars MONO Lifetime License](https://store.dollarsmocap.com/products/mono)** by using the coupon code "vvvv" on checkout!
{{< /box >}}


If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!