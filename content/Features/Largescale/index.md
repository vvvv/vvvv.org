---
title: Large-scale
weight: 1
---

![Living Architecture: Ghery](image.png "Refik Anadol Studio")

vvvv is built to run large-scale interactive spaces. No matter the number of PCs involved.

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

## LED Synchronization

Using professional Quadro Sync cards by Nvidia, multiple PCs outputs can be VSynced to seamlessly drive large LED screens. In those setups 

## Lasers & Lighting

![Lasers](Fluidic-WhiteVoid.png "WhiteVoid: Fluidic")

vvvv allows you to create laser shows that go beyond playing back predefined animations. A comfortable set of nodes to generate geometric primitives and complex 2d paths allows you to direct any number of lasers. 

- [Lasers](/packs/?c=Devices#Lasers) - list of supported laser hardware
- [Lighting](/packs/?c=Devices#Lighting) - list of supported lighting hardware