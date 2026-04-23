---
categories: "Development News"
author: "joreg"
date: "2025-12-03"
title: "Update: Avateering support for Kinect2 cameras"
description: "Keeping legacy devices alive!"
thumb: thumb.png
---

Say what?

You read that right: In our effort to bringing effortless avateering to the world, we're extending support back in time. Don't let your Kinect2 devices collect any more dust. Put them back to some prototyping use.

<video width=100% controls autoplay>
    <source src="kinect2.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

This update to the [VL.Devices.Kinect2](https://www.nuget.org/packages/VL.Devices.Kinect2) package adds a new set of nodes that allow you to set up the controlling of a rigged 3d mesh via the Kinec2's body tracking capabilities in no time. Check out the help patch "HowTo Avateer a rigged mesh" that's shipping with this release to learn more!

But curb your enthusiasm! The Kinect2 being a legacy device clearly shows in tracking quality when you compare to the alternative options available today:

- [VL.DollarsMocap](https://www.nuget.org/packages/VL.DollarsMocap) supporting [Dollars MONO](https://www.dollarsmocap.com/mono) and [Dollars DEEP](https://www.dollarsmocap.com/deep)
- [VL.Devices.ZED](https://www.nuget.org/packages/VL.Devices.ZED) supporting ZED stereo cameras by [Stereolabs](https://www.stereolabs.com/)
- [VL.Devices.Azurekinect.Femto](https://www.nuget.org/packages/VL.Devices.Azurekinect.Femto) supporting Femto Bolt/Mega cameras by [Orbbec](https://www.orbbec.com/)
- [VL.Devices.Azurekinect](https://www.nuget.org/packages/VL.Devices.Azurekinect) supporting legacy AzureKinect cameras by Microsoft
- [VL.IO.OptiTrack](https://www.nuget.org/packages/VL.IO.OptiTrack) supporting high-end marker, rigid-body and skeleton tracking via the NatNet protocol by [OptiTrack](https://optitrack.com/)

If you have a request for custom development, don't hesitate to [get in touch](mailto:devvvvs@vvvv.org)!