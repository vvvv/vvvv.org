---
categories: "Development News"
author: "joreg"
date: "2026-06-04"
title: "Introducing: Support for the Moncha Laser DAC"
description: "For your lasering needs"
thumb: thumb.png
---

Dear lovvvvers of lasers!

It is finally happening: vvvv gets premium support for controlling lasers!

When we say "controlling lasers" that means two things:
- Support for different hardware laser DACs that connect a PC to a laser
- A convenient set of nodes to generate points to send out the DAC

This first pack (in a series of a couple of more to come) adds support for one specific series of laser DACs, namely the [Moncha](https://www.showtacle.jp/v18/lasershowsoftware/hardware/moncha/). Not sure if you can still buy them but if you find one for cheap second-hand, you now have a modern way to drive

So if you have such a device at hand, **[VL.Devices.Moncha](https://github.com/vvvv/VL.Devices.Moncha)** is the pack you want to get. It supports control of multiple devices and is as simple to use as you can see here: 

![Moncha at work](moncha-patch.png)

In words: Create a spread of points and send them over to the selected device. Now obviously the part of "creating a spread of points" is the tricky one and this is where the upcomming VL.LaserPath pack will come in and do all the heavy work for you. Stay tuned!

---
For the sponsoring of this [open-source](https://github.com/vvvv/VL.Devices.Moncha) development we bow to [ggml](/people/ggml) and [colorsound](/people/colorsound).

If you have a request for specific DAC to support, please [get in touch](mailto:devvvvs@vvvv.org)!