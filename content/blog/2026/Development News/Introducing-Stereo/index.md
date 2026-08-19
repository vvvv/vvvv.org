---
categories: "Development News"
author: "joreg"
date: "2026-08-20"
title: "Introducing: Support for stereoscopic rendering"
description: "For active glasses based 3d viewing"
thumb: thumb.png
---

Dear renderers!

We're happy to announce that vvvv now has native support for **stereoscopic rendering**! 

### The bad news
It's nothing for the casual user of vvvv, as it requires quite some specialized hardware:

- Nvidia RTX card with Stereo support (see Stereo option in the control panel)
- Active 3d glasses + IR or RF sender 
- Projectors supporting sequential stereo or a 120fps display
  
### The good news
If you have the hardware, it's trivial to use: You simply connect the new **StereoSettings** node to the SceneWindow and configure it as shown in its help patch:
- Specify the viewers position 
- Specify the transformation describing the screen the viewer is looking at

The non-trivial computation of the two off-axis cameras for the left and right eye is handled for you.

![](image.png)

Now any element drawn between the viewers position and the screen will seemingly be floating before the screen, other elements will feel like they are inside the screen.
  
If you have a head-tracking option at hand, you can simply attach it to the viewers position for the full 3d experience... 

Over to you! Available for testing in [vvvv gamma 8.0 preview builds](/download).

---

Sounds good but you still find something missing? We do offer custom support. Please [get in touch](mailto:devvvvs@vvvv.org)!