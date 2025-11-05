---
categories: "Development News"
author: "joreg"
date: "2025-11-05"
title: "Update: Avateering support for StereoLabs ZED cameras"
description: "Based on ZED SDK 5.1"
thumb: thumb.jpg
---

Dear avatars!

Here's to announce an update to the [VL.Devices.ZED](https://www.nuget.org/packages/VL.Devices.ZED) NuGet, adding effortless avateering support. 

<video width=100% controls autoplay>
    <source src="zed.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

This update adds a new set of nodes that allow you to set up the controlling of a rigged 3d mesh via ZED's body tracking capabilities in no time. Check out the help patch "HowTo Avateer a rigged mesh" that's shipping with this release to learn more.

And while at it, we also updated to the latest version [5.1 of the ZED SDK](https://www.stereolabs.com/en-de/blog/introducing-zed-sdk-51-pushing-robotics-multi-camera-perception-further-than-ever), so be sure to install that version!

## Is there more?

The ZED SDK is vast and while you can already access all of it using the raw APIs, here is a list of things that we haven't yet wrapped for your convenience:

* [Positional Tracking](https://www.stereolabs.com/docs/positional-tracking)
* [Global Localization](https://www.stereolabs.com/docs/global-localization)
* [Spatial Mapping](https://www.stereolabs.com/docs/spatial-mapping)
* [Object Detection](https://www.stereolabs.com/docs/object-detection)
* [Fusion](https://www.stereolabs.com/docs/fusion/overview)

If you have a request for custom development, don't hesitate to [get in touch](mailto:devvvvs@vvvv.org)!