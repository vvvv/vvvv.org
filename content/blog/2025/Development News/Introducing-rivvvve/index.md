---
categories: "Development News"
author: "joreg"
date: "2025-04-01"
title: "Introducing: Rive"
description: "A new way to design and integrate User Interfaces"
---

Dear patchers!

Remember [Lottie](https://vvvv.org/blog/2022/introducing-lottie/)? That, but interactive and with a two-way data binding right into your patches. And then some...

Introducing: [Rive](https://rive.app/) "A new way to Design, build, and ship User Interfaces" ... and now a first-class citizen in vvvv!

Watch their intro video to get an idea of what to expect:

{{< youtube mMpik32gkt4 >}}

Rive and vvvv play very well together in two aspects:
- We're integrating Rive's native DX11 renderer, meaning what you get is not a texture but a resolution independent rendering of the Rive content
- Rive's [Data Binding](https://rive.app/docs/editor/data-binding/overview) capabilities allow you to connect data directly to datatypes in VL 

Here is how this looks in a patch

Many thanks go to Rive for their great support, helping us with a smooth integration in vvvv!

## How do i get it?

nuget install VL.Rive -pre

## Sponsor credits

For the sponsoring of this development we bow to [Refik Anadol Studio](https://refikanadol.com/).

If you also have a request for custom development, [get in touch](mailto:devvvvs@vvvv.org)!