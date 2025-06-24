---
date: "2025-05-20"
title: "VL.OpenCV 4.0.0 is out now!"
description: "A new version of the VL.OpenCV library has been released"
categories: Dates
author: ravazquez
thumb: thumb.png
---
![](VL.OpenCV_4.0.0.gif)

VL.OpenCV, your goto library for all things Computer Vision has a new version out for you to try!

In this new 4.0.0 release, we have made quite a few breaking changes to keep things consistent with other libraries, as well as some quality-of-life improvements and a good old tidy-up.

# Highlights

- VideoIn devices have been refactored:
	- Pins have been renamed to better convey the way they work as well as to make them consistent with other video input libraries out there
	- All DSHOW as well as MediaFoundation devices are now supported (say hello to your virtual cameras and other previously unsupported devices)
	- Blocking and Reactive versions have been merged; now we have a new Blocking input pin that lets you decide how you want the node to behave (such cleanliness!)
- All nodes previously showing separate inputs or outputs for Width and Height, have been changed to use Int2 instead
- The Transformation pipeline from OpenCV to Stride has been thoroughly revisited and cleaned up by our transformation guru motzi. At last our Pose Estimation, SolvePnP and Projector Calibration worflows make proper sense! (now go and get some sleep motzi!)
- Categories have been moved around to make things more tidy and easier to find; this results in a cleaner node browser for everyone
- Some nodes that would throw an exception on the first frame have been fixed to circumvent this issue (FrameDelay, FrameDifference, OpticalFlow)
- The help browser help patches have been reorganized to help you finds things faster
- A helper tool that assists with the camera calibration process has been added as a help patch: Example Camera calibration (so handy!)
- A new AR demo application was also added as a help patch: Example AR Water molecule (see GIF above)

And many more changes you can read about in our [changelog](https://github.com/vvvv/VL.OpenCV/blob/main/Changelog.md) (see 3.1.0-preview, 4.0.0-preview and 4.0.0)

We know these are breaking changes in many cases, but they should be easy to fix if you have old patches lying around. We believe it's for the best and hopefully you'll agree.

# New vvvvTv episodes!

To celebrate this new release, we also put out two new vvvvTv episodes covering OpenCV:


### Introduction to OpenCV

{{< youtube fjw2m8w6RNU >}}

### AR using OpenCV with ArUco Markers

{{< youtube j7DWMET-qM8 >}}

So grab some popcorn and get watching!

And that's it for now, happy patching!