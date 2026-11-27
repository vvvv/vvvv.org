---
categories: "Development News"
author: "joreg"
date: "2026-11-27"
title: "Update: Support for more Orbbec depth cameras"
description: "Based on the Orbbec v2 SDK"
thumb: thumb.png
---

Dear visionaries!

Here's to give you an update on vvvv's support for camera devices by [Orbbec](https://www.orbbec.com/):

[![](image.png)](https://www.orbbec.com/)

So far we had the [VL.Devices.AzureKinect.Femto](https://www.nuget.org/packages/VL.Devices.AzureKinect.Femto/) pack, supporting the [Femto Bolt](https://www.orbbec.com/products/tof-camera/femto-bolt/) and [Femto Mega](https://www.orbbec.com/products/tof-camera/femto-mega/) devices. Including Bodytracking. 

Today we're releasing the updated **[VL.Devices.Orbbec](https://www.nuget.org/packages/VL.Devices.Orbbec)** pack which is based on their new [OrbbecSDK v2](https://github.com/orbbec/OrbbecSDK_v2) and allows you to read:
* Color
* Depth
* Infrared
* PointCloud 
* IMU data

For drawing the PointCloud buffer, the pack ships with 2 examples: One using instancing, the other one using a custom shader. 

In a patch there isn't much to see. It takes only 2 nodes to access any of the provided data:

![](image-1.png)

Thanks to support by Orbbec we've been able to test with a Gemini 335 and both Femto models. But the [list of supported models](https://github.com/orbbec/OrbbecSDK_v2#open-source-orbbec-sdk) is much longer. Except: Support for the LiDARs is still missing at this point! 

## How can I try it?

- [Get vvvv gamma](https://vvvv.org/download/) >= 8.0 (preview)
- Open the Help Browser (F1)
- Select the "Learn" tab and search for "orbbec"
- At the very bottom find the "Devices.Orbbec" entry and click the download button
- Check the now available help patches...

---
If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!