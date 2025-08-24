---
categories: "Development News"
author: "joreg"
date: "2025-08-23"
title: "Update: VL.OpenEXR improvements"
description: "A treat for your textures"
thumb: thumb.webp
---

Texturers!

Here is to announce quite an update to [VL.OpenEXR](https://www.nuget.org/packages/VL.OpenEXR), a NuGet to read and write [OpenEXR](https://openexr.com) image files. 

[![](openexr-logo.webp)](https://openexr.com)

The OpenEXR specification is quite a beast, with a wide range of options. This update adds some important features which essentially allow you to read more types of .exr files and give you more options when writing them:

- When reading an image can now read individual parts and windows
- Can now read and write more compression formats (including DWAA and DWAB)
- Can now read and write scanline based and tiled images
- Can now read and write sequential and randomized line order (use randomized to allow for parallel, ie. much faster writing!)
 
## Sponsor credits

For the sponsoring of this [open-source](https://github.com/vvvv/VL.Devices.Axis) development we bow to [Refik Anadol Studio](https://refikanadol.com/).

If you also have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!