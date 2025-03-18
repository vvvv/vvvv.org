---
categories: "Development News"
author: "joreg"
date: "2025-03-18"
title: "Introducing: Support for Network Cameras by Axis"
description: "For your surveillance needs"
thumb: thumb.png
---

Dear patchers,

here is to introduce support for network cameras by [Axis](https://www.axis.com).

[![](logo.png)](https://www.axis.com)

*"As the industry leader in video surveillance, we develop and supply innovative network solutions that improve security, safety, operational efficiency, and business intelligence for our customers across the world."* and now plug'n'play with vvvv!

[![Axis Network Cameras](axis-cameras.png)](https://www.axis.com/products/network-cameras)

Based on their [VAPIX® APIs](https://developer.axis.com/vapix/) we've created the [VL.Devices.Axis](https://www.nuget.org/packages/VL.Devices.Axis) package, implementing a node for you to quickly access the stream of such a camera.

The API's for these cameras are vast. Currently only choosing a streams resolution, fps and toggling the IRCut filter are implemented. If you need support for a specific API, it can most likely be added without too much effort.

![](2025-03-18-13-58-17.png)


{{< box >}}
As of this writing VL.Devices.Axis is only availble as a pre-release version and requires special arguments for installation, see [Getting Started](https://github.com/vvvv/VL.Devices.Axis?tab=readme-ov-file#getting-started)!
{{< /box >}}

## Sponsor credits

For the sponsoring of this [open-source](https://github.com/vvvv/VL.Devices.Axis) development we bow to [Refik Anadol Studio](https://refikanadol.com/).

If you also have a request for custom development, [get in touch](mailto:devvvvs@vvvv.org)!