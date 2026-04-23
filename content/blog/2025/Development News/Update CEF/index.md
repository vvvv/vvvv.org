---
categories: "Development News"
author: "joreg"
date: "2025-08-24"
title: "Update: VL.CEF improvements"
description: "For your web rendering needs"
thumb: thumb.png
---

Web people!

As you know, vvvv has great support for rendering web content. But also interacting with the content via JavaScript is a breeze as one of the help patches demonstrates. That's not news.

<video controls src="cef.mp4" width="100%"></video>

Now here is the news:
- We've updated the underlying Chrome engine to version 132
- There are now convenient WebLayer (for Skia) and WebRenderer (for Stride) nodes that let you render content with arbitrary 2d transformations and still have mouse input working
- We've added an example of how you can inject your own mouse/keyboard/touch notifications for the WebLayer nodes

You can make use of these changes today by installing either of the two NuGets:
- [VL.CEF.Skia](https://www.nuget.org/packages/VL.CEF.Skia)
- [VL.CEF.Stride](https://www.nuget.org/packages/VL.CEF.Stride)

{{< box >}}
⚠️ If you get an error or simply no output, you're likely running on a laptop with a dual GPU system. Please see [troubleshooting](https://github.com/vvvv/VL.CEF?tab=readme-ov-file#troubleshooting) for solutions. ⚠️
{{< /box >}}

## Sponsor credits

For the sponsoring of the latest updates to this [open-source](https://github.com/vvvv/VL.CEF) development we bow to:
- [3e8.studio](http://3e8.studio)
- Nils Weger aka [phlegma](https://vvvv.org/people/phlegma), Manutchehr Ghassemlou, Christine Mayerhofer aka [ravel](https://vvvv.org/people/ravel)
 
If you also have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!