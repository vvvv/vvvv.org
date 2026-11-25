---
categories: "Development News"
author: "joreg"
date: "2026-11-18"
title: "Introducing: Rive - Interactive Vector Graphics & UI"
description: "High quality and highly performant"
thumb: thumb.png
---

Dear patchers!

Remember [Lottie](https://vvvv.org/blog/2022/introducing-lottie/) or even [Flash](https://en.wikipedia.org/wiki/Macromedia_Flash_8)? Those, on steroids and complete with a two-way data binding for interaction with your patches. And then some...

Enter: 

[![](rive-logo.png)](https://rive.app/)

A new way to design, build and ship User Interfaces and more... and now a first-class citizen in vvvv!

Watch their 2026 showreel to get an idea of what to expect:

{{< youtube nRlXWz4PRow >}}

Rive and vvvv play very well together in two aspects:
- We're integrating Rive's native renderer, meaning what you get is not a texture but a resolution independent rendering of the Rive content right into your scene
- Rive's [Data Binding](https://rive.app/docs/editor/data-binding/overview) integrates perfectly with the VL way of manipulating data 

And here is how using rive looks in a patch: 

<video width=100% controls autoplay>
    <source src="rivvvve.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

Getting bi-directional access to data of a ViewModel internal to a rive file takes only a few clicks using the Property node. It returns a Channel and allows you to read and write data as needed. The pack comes with a series of help patches demonstrating, among other things, data binding with lists and images!

These two episodes of vvvvTv dive deeper:  
🍿S03E04: [Introduction to Rive Engine](https://youtube.com/live/onLMADROe7o)  
🍿S03E05: [Data Binding with Rive Engine](https://youtube.com/live/XCJIkjQkIus)

## Feature highlights

Of the [Rive runtime features](https://rive.app/docs/feature-support) here are the most valuable ones supported by [VL.Rive](https://www.nuget.org/packages/VL.Rive):

✅ GPU Canvas  
✅ Scripting  
✅ Data Binding incl. Lists and Images  
✅ Vector Feathering  
✅ Layouts  
✅ Text Input  
✅ Text Follow Path  
✅ N-Slicing  

## How can I try it?

- [Get vvvv gamma](https://vvvv.org/download/) >= 8.0 (preview)
- Open the Help Browser (F1)
- Select the "Learn" tab and search for "rive"
- At the very bottom find the "Rive" entry and click the download button
- Check the now available help patches...

## Credits
Many thanks go to Rive for their great support, helping us with a smooth integration into vvvv!

For the sponsoring of this development we bow to [Refik Anadol Studio](https://refikanadol.com/).

If you also have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!
