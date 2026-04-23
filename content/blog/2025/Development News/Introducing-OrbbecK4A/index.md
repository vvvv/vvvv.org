---
categories: "Development News"
author: "joreg"
date: "2025-07-09"
title: "Introducing: Support for Orbbec Femto devices via K4A"
description: "Adding body tracking for Bolt and Mega cameras"
thumb: thumb.png
---

Dear patchers!

Here's to give you an update on vvvv's support for camera devices by [Orbbec](https://www.orbbec.com/):

- We have a new package out today: [VL.Devices.AzureKinect.Femto](https://www.nuget.org/packages/VL.Devices.AzureKinect.Femto/0.0.2-alpha) to support [Femto Bolt](https://www.orbbec.com/products/tof-camera/femto-bolt/) and [Femto Mega](https://www.orbbec.com/products/tof-camera/femto-mega/) time-of-flight depth cameras via the [OrbbecSDK-K4A-Wrapper](https://github.com/orbbec/OrbbecSDK-K4A-Wrapper/tree/orbbecsdk_k4a_wrapper_v2.0). 
- We have a preview available of [VL.Devices.Orbbec](https://www.nuget.org/packages/VL.Devices.Orbbec/0.0.14-alpha) supporting all recent devices via the unified [OrbbecSDK v2](https://github.com/orbbec/OrbbecSDK_v2) (as of this writing only supports pointcloud output)
- And just for completeness: We've long had support for the (now legacy) original [Astra](https://www.orbbec.com/products/structured-light-camera/astra-series/) series

![](orbbec-femto.png)

So what's new today is a convenience pack that allows you to use the Femto devices with the exact same node-set you're already familiar with, if you've been using an AzureKinect device so far.

To understand the relationship between the AzureKinect and the Femto cameras, this article gives a good overview: [How to Choose Your Camera? Femto Mega/Bolt/AKDK?](https://3dclub.orbbec3d.com/t/how-to-choose-your-camera-femto-mega-bolt-akdk/3963)

In vvvv, **VL.Devices.AzureKinect** and **VL.Devices.AzureKinect.Femto** are now drop-in replacements for each other, meaning if you had a patch working with the AzureKinect, but going forward want to use it with a Femto Bolt or Mega, you can simply change the reference to this new pack (restart vvvv) and you're done. If there wasn't one caveat: ColorControls (Brightness, Contrast,..) for the AzureKinect, Femto Bolt and Femto Mega are different, as explained in the helppatch of the AzureKinect node! So you'll have to adjust those settings manually.

## Bodytracking
Yes, VL.Devices.AzureKinect.Femto also supports bodytracking. While there used to be a separate VL.Devices.AzureKinect.Body package, we have now retired this. 

Both VL.Devices.AzureKinect and its sibling VL.Devices.AzureKinect.Femto now include the bodytracking node set. 

---
If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!