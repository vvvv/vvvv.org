---
title: Large-scale & Interactive
weight: 1
---

![Large-scale interactive spaces](image.png "Refik Anadol Studio")

vvvv is built to run large-scale interactive spaces. No matter the number of PCs involved, vvvv coordinates them with a feature called "Boygrouping" that allows for programming and running applications across multiple PCs. Any change to the program on the main PC is immediately duplicated on all connected clients. Combined with vvvv's [live programming approach](../VisualLiveProgramming/) this removes most overhead of creating distributed applications.

<!--more-->

![Boygroup](boygroup-schema.png)

### Pojection Mapping

Large-scale often means projection-mapping. Since requirements here are very diverse, vvvv comes with support for different options. vvvv integrates the following auto-clibration systems:
- [VIOSO](https://vioso.com)
- [Scalable Display Systems](https://www.scalabledisplay.com/)
- [Screenberry](https://screenberry.com/) 
- If you need any other existing system integrated, don't hesitate to [get in touch](mailto:devvvvs@vvvv.org).

Alternatively vvvv also ships with tooling that help you build custom projection mapping workflows. See the [Projection Mapping](https://vvvv.org/packs/?c=Projection%20Mapping) section in the packs browser for all options. 

### Interaction
	
For capturing interaction with crowds, vvvv supports the following tracking systems which give you individual peoples position in very large spaces:
- [Augmenta](https://augmenta.tech/) 
- [BlueIOT](https://www.blueiot.com/)
  
Further, a range depth sensors and lidars is supported that allow you to create custom solutions, see the [Devices section](http://localhost:1313/packs/?c=Devices#Depth%20Cameras) in the packs browser for all options.

###	Motion Capture

Full-body, professional skeletal motion capture is supported via the following systems:
- [OptiTrack]()
- [Captury]()

Further, a range of lower-cost options are available, see the [Motion Capture](http://localhost:1313/packs/?c=Motion%20Capture) section of the packs browser.
