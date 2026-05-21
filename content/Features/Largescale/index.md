---
title: Large-scale
weight: 1
---

vvvv is built to run large-scale interactive spaces. No matter the number of PCs involved.

![Living Architecture: Ghery](image.png "Refik Anadol Studio")

## Distributed Rendering

When a single PC is not enough to render the number of outputs you need, simply scale your app across multiple PCs. A feature called "Boygrouping" keeps all your render machines n'sync. Any change to the program on the main PC is immediately replicated on all connected clients. Combined with vvvv's [live programming approach](../VisualLiveProgramming/) this removes most overhead of creating distributed applications.

## Pojection Mapping

Large-scale often means projection-mapping. Since requirements here are rather diverse, vvvv comes with support for different options. 

<!--more-->

The following projector auto-calibration systems are integrated:
- [VIOSO](https://vioso.com)
- [Scalable Display Systems](https://www.scalabledisplay.com/)
- [Screenberry](https://screenberry.com/) 
- If you need any other existing system integrated, don't hesitate to [get in touch](mailto:devvvvs@vvvv.org).

Alternatively vvvv also ships with tooling that help you build custom projection mapping workflows. See the [Projection Mapping](/packs/?c=Projection%20Mapping) section in the packs browser for all options. 

## LED walls

When a single PC is not enough to drive a LED wall and perfect frame sync is needed across multiple PCs, vvvv supports the use of NVIDIA Quadro Sync cards to seamlessly drive large LED screens. 

## Lasers & Lighting

Apart from outputting to screens or projections, vvvv allows you to create laser and light shows that go beyond playing back predefined animations. Realtime control for both media is available via a range of packs you can find in the following categories:

- [Lasers](/packs/?c=Devices#Lasers)
- [Lighting](/packs/?c=Devices#Lighting)