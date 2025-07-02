---
categories: "Development News"
author: "joreg"
date: "2024-05-07"
title: "Update: VL.CEF improvements"
description: "For your web rendering needs"
thumb: thumb.png
---

Web people!

As you know, vvvv has great support for rendering web content. But also interacting with the content via JavaScript is a breeze as one of the help patches demonstrates. That's not news.

![alt text](image.png)

Now here is the news:
- We've updated the underlying Chrome engine to version 132
- There are now convenient WebLayer (for Skia) and WebRenderer (for Stride)nodes that let you render content with arbitrary 2d transformations and still have mouse input working
- We've added an example of how you can inject your own mouse/keyboard/touch notifications for the WebLayer nodes

You can make use of these changes today by installing either of the two NuGets:
- [VL.CEF.Skia](https://www.nuget.org/packages/VL.CEF.Skia)
- [VL.CEF.Stride](https://www.nuget.org/packages/VL.CEF.Stride)
 
## Sponsor credits

For the sponsoring of the latest updates to this [open-source](https://github.com/vvvv/VL.CEF) development we bow to:
- [3e8.studio](http://3e8.studio)
- christine, nils
 
If you also have a request for custom development, [get in touch](mailto:devvvvs@vvvv.org)!