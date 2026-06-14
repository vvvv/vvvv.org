---
title: Large-scale
weight: 1
---

vvvv is built to run large-scale interactive spaces. No matter the number of PCs involved, it is your single entry-point to build and run distributed systems.

![Living Architecture: Ghery](LivingArchitecture2.jpg "Refik Anadol Studio")

### Distributed Rendering

When a single PC is not enough to render the number of outputs you need, simply scale your app across multiple PCs. An upcomming feature called "Boygrouping" keeps all your render machines n'sync. Any change to the program on the main PC is immediately replicated on all connected clients. Combined with vvvv's [live programming approach](features/visualLiveprogramming/) this gets rid of most of the overhead that comes with creating distributed applications.

<!--more-->

### Projection Mapping

Large-scale often means projection-mapping. Since requirements here are rather diverse, vvvv comes with support for different options: 

The following projector auto-calibration systems are integrated:
- [VIOSO](https://vioso.com)
- [Scalable Display Systems](https://www.scalabledisplay.com/)
<!-- - [Screenberry](https://screenberry.com/) -->
- If you need any other existing system integrated, don't hesitate to [get in touch](mailto:devvvvs@vvvv.org).

Alternatively vvvv also ships with tooling that help you build custom projection mapping workflows. See the [Projection Mapping](/packs/?c=Projection%20Mapping) section in the packs browser for all options. 

### LED Walls

When a single PC is not enough to drive a LED wall and perfect frame sync is needed across multiple PCs, vvvv supports the use of NVIDIA Quadro Sync cards to seamlessly drive large LED screens. 

### Lasers & Lighting

Apart from outputting to screens or projectors, vvvv allows you to create laser and light shows that go beyond playing back predefined animations. Realtime control for both technologies is available via a range of packs you can find in the following categories:

- [Lighting](/packs/?c=Devices#Lighting)  <!--(Art-Net, DMX, sACN, PosiStage) -->
- [Lasers](/packs/?c=Devices#Lasers) <!-- (LaserAnimation Sollinger, Ether Dream, Helios, Moncha, LaserCube) plus a set of nodes to generate paths with blanking -->

![Polytopes 2025](ExperiensS-66599_PhotoStephaneSbyBalmy.jpg "ExperiensS x 665.99, Photo: Stéphane Sby Balmy")
