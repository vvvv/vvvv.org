---
categories: "Development News"
author: "joreg"
date: "2025-07-18"
title: "Introducing: Effortless Avateering"
description: "It can hardly get any simpler"
draft: true
---

Dear Avatars!

Controlling a 3d avatar with a tracked skeleton used to be a hard nut. That nut is cracked! We divvvved deep into the topic and are happy to finally present you with a solution that you can pull up within a few minutes at any party. Check these 3 nodes:

**shot**

1) **DollarsMoCap**: A tracking source. The "DollarsMoCap" node here is just one of the many skeleton tracking options we will support. You can replace it with any other solution like Kinect, ZED, Orbbec that provides skeletal tracking data.

2) **FileModel**: This node loads loads your rigged model. Any rigged model really. 

If you want to load models with materials/textures, this part is a bit more involved. Please refer to the helppatch of DollarsMoCap for details.

3) **ApplySkeleton**: This is where the magic happens and the tracking data is applied to the models skeleton.

When working with models from [Mixamo](https://www.mixamo.com/) or [RocketBox](https://github.com/microsoft/Microsoft-Rocketbox/) you're good to go, as we provide ready joint mappings for those. 

In case you use a custom rig, you simply have to provide a mapping of your rig against the default vvvv skeleton. This is a one-time mapping per rig and will work with all tracking sources!

---
If you have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!