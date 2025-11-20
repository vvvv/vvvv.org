---
categories: "Development News"
author: "joreg"
date: "2025-11-19"
title: "Update: Avateering support for Orbbec Femto cameras"
description: "Based on OrbbecSDK-K4A-Wrapper 2.0.11"
thumb: thumb.png
---

Dear avatars!

Here's to announce an update to the [VL.Devices.Azurekinect.Femto](https://www.nuget.org/packages/VL.Devices.Azurekinect.Femto) pack which gives access to [Orbbec](https://www.orbbec.com) Femto Bolt and Mega devices via their [K4A-Wrapper](https://github.com/orbbec/OrbbecSDK-K4A-Wrapper). 

Two things:
- Now based on latest [K4A-Wrapper 2.0.11](https://github.com/orbbec/OrbbecSDK-K4A-Wrapper/releases/tag/v2.0.11)
- Now supports avateering of rigged meshes 

<video width=100% controls autoplay>
    <source src="azure.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

This update adds a new set of nodes that allow you to set up the controlling of a rigged 3d mesh via AzureKinect's body tracking capabilities in no time. Check out the help patch "HowTo Avateer a rigged mesh" that's shipping with this release to learn more.

And yes, there is also an update to [VL.Devices.Azurekinect](https://www.nuget.org/packages/VL.Devices.Azurekinect) which brings the same avateering support also to the legacy AzureKinect devices.

If you have a request for custom development, don't hesitate to [get in touch](mailto:devvvvs@vvvv.org)!