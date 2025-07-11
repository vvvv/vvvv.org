---
categories: "Development News"
author: "joreg"
date: "2025-04-01"
title: "Introducing: DollarsMoCap"
description: "A new way to track a skeleton"
---

Dear trackers of skeletons!

There are many options for skeleton trackings you can use with vvvv:
- Kinect (the original one)
- Kinect 2
- Azure Kinect
- Orbbec
- ...

Those options all require the according specific depth camera. Now here is a new option that doesn't require additional hardware and tracks a single 3d skeleton (including fingers and face!) even from a simple webcam: 

[Dollars Mono](https://www.dollarsmocap.com/mono) by [Dollars MoCap](https://www.dollarsmocap.com/)

{{< youtube gBbKCGwMFeY >}}

The above demo of their technology shows quite well the quality of tracking you can expect.

Many thanks to the creator of Dollars MoCap for the great support and helping us along the way of implementing this for vvvv. 

## How do i get it?

As of this writing, requires latest vvvv gamma 7.0 preview builds. Then install as usual:

    nuget install VL.DollarsMoCap -pre

---
If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!