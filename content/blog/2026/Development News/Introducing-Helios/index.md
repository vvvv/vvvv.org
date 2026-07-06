---
categories: "Development News"
author: "joreg"
date: "2026-07-06"
title: "Introducing: Support for the Helios Laser DACs"
description: "Including support for IDN compatible lasers!"
thumb: thumb.png
---

More Lasers!

In our ongoing quest to add premium support for dealing with lasers in vvvv, today we're happy to announce the support for the Helios Laser DACs by [Bitlasers](https://bitlasers.com). And that actually means a couple of new options:

- The [Helios Laser DAC](https://bitlasers.com/helios-laser-dac/) (USB, 12 bit XY, 8 bit color)
- The [HeliosPRO Laser DAC](https://bitlasers.com/heliospro-laser-dac/) (Network, 16 bit XY, 12 bit color)
- But also any Laser that supports the [IDN](http://ilda-digital.com/) protocol!

![](image.png)

So if you have one of the mentioned devices at hand, **[VL.Devices.Helios](https://www.nuget.org/packages/VL.Devices.Helios)** is the pack you want to get. If you don't have a Helios DAC yet, but are interested, consider this offer: 

{{< box >}}
[Bitlasers](https://bitlasers.com/) offers a **$10 discount** for vvvv users using the coupon "vvvv10".
{{< /box >}}

And here is how it works: VL.Devices.Helios supports control of multiple devices (via USB or Network) and is as simple to use as you can see here: 

![Helios at work](image-1.png)

In words: Create a spread of points and send them over to the selected device. Now obviously the part of "creating a spread of points" is the tricky one as you'll have to deal with corner points and blanking. So this is where the upcoming VL.LaserPath pack will come in and do all the heavy work for you. Stay tuned!

---

If you have a request for specific DAC to support, please [get in touch](mailto:devvvvs@vvvv.org)!