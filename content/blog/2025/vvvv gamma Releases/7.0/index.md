---
date: "2025-07-18"
title: "vvvv gamma 7.0 release"
description: Release notes
categories: "vvvv gamma Releases"
author: joreg
thumb: vvvv70-thumb.jpg
draft: true
---

![vvvv gamma 7.0 release](vvvv60-400px.jpg)
 
Here is to introduce **vvvv gamma 7.0**, 

{{< box >}}
__[Download vvvv gamma 7.0](http://vvvv.org/#Download)__  

- [Full Change Log](https://thegraybook.vvvv.org/changelog/7.x.html)
- [Get started](https://thegraybook.vvvv.org/reference/getting-started/overview.html)  
- [Buy a license](https://store.vvvv.org)

{{< /box >}}

If you don't have time for the following long-read, here are quick links to the release highlights:

- Multiple editor windows
- Effortless data-binding and presets
- Support for VST Audio plugins
- Support for interactive Rive animations

Let's dive right into what you get with this update:

helpbrowser links: readme, sponsor, chat

## Editor
- Windowing
- Snapping
- Session Management
recent docs

## Channels, Presets, Transitions

## Bindings

VST

Rive

- VL.Axis
- VLC
- blueiot
- rplidar
- Ultraleap?
- orbbec

## vvvvc

## arm builds


## Inspector
pad metadata

## New Settings

## New VL features

## New Standard Libraries
vvvv's famously fully [open-source standard libraries](https://github.com/vvvv/VL.StandardLibs) got some substantial additions. Here's an overview:

![](newlibs-logos.png)


## Additional New Libraries

![](additionallibs-logos.png)

But that's not all! While not shipping as part of the standard libraries, here are a bunch of new libraries that you can install on demand:

- VL.Axis
- VLC
- blueiot
- rplidar
- VST
- Ultraleap?
- orbbec

- [VL.ScalableDisplay](https://www.nuget.org/packages/VL.ScalableDisplay) adds support for automatic projector calibration by [Scalable Display Technologies](https://www.scalabledisplay.com/)
- [VL.Augmenta](https://www.nuget.org/packages/VL.Augmenta) adds support for people tracking by [Augmenta](https://augmenta.tech/)
- [VL.Devices.TheImagingSource](https://www.nuget.org/packages/VL.Devices.TheImagingSource) adds support for industrial cameras by [The Imaging Source](https://www.theimagingsource.com/)
- [VL.Devices.IDS](https://www.nuget.org/packages/VL.Devices.IDS) adds support for industrial cameras by [IDS Imaging](https://ids-imaging.com/) using their new [IDS Peak SDK](https://de.ids-imaging.com/ids-peak.html)
- [VL.Devices.ZED](https://www.nuget.org/packages/VL.Devices.ZED/) adds support for stereo cameras by [StereoLabs](https://www.stereolabs.com/)   
- [VL.MediaPipe](https://www.nuget.org/packages/VL.MediaPipe) adds support for hand-, face- and pose-tracking, object-detection and image-segmentation from a live video stream via [Google's MediaPipe](https://mediapipe-studio.webapps.google.com)
  
## Updated Standard Libraries
So the above was all the new stuff. Now here is an overview of the changes to existing libraries shipping with vvvv, for this release:

- VL.Audio improvements
- VL.CEF update
- mqtt, websocket, webserver
- openexr
- zed 
- augmenta

- **VL.Stride**, vvvv's 3d rendering library has the following new features
  - We've updated to [Stride 4.2](https://www.stride3d.net/blog/announcing-stride-4-2-in-dotnet-8/)
  - Shaders can now be organized in subfolders, their name must still be globally unique though
  - The PostFX pipeline is now completely flexible in that you're no longer limited to using the pre-existing PostFX but you can completely patch the whole pipeline with your own shaders! See "HowTo Create Custom PostFX" and "HowTo Use pre-defined effect in Custom PostFX" in the Help Browser
  - TextureFX have moved to a separate pack VL.Stride.TextureFX
  - TextureFX RGBA inputs are now of type ComputeColor
  - And then [some more](https://thegraybook.vvvv.org/changelog/6.x.html#vlstride)
- **VL.Skia**, vvvv's 2d rendering library. Not many changes, see [change log](https://thegraybook.vvvv.org/changelog/6.x.html#vlskia)
- **VL.ImGui**, the rapid UI building library
  - Adds a backend for directly rendering in VL.Stride (thanks [kopffarben](https://github.com/kopffarben))
  - Has a small breaking change and some more, see [change log](https://thegraybook.vvvv.org/changelog/6.x.html#vlimgui)
- **VL.Video**, the MediaFoundation based video playback library has a breaking change, see [change log](https://thegraybook.vvvv.org/changelog/6.x.html#vlvideo)
- **VL.Audio**, vvvv's audio playback, analysis and synthesis library 
  - Comes with a simplified workflow for FFT analysis (see helppatch) 
  - Comes with a new Visualizer extension (thanks [chk](https://github.com/chkworks))
- **VL.IO.TUIO** now supports the 2.5D and 3D profiles

## Additional Updated Libraries
- [VL.CEF](https://github.com/vvvv/VL.CEF), allowing to render websites in both Skia and Stride:
  - Updated to use CEF 103.0.0
- [VL.IO.RCP](https://www.nuget.org/packages/VL.IO.RCP), the quickest way to expose parameters to control them e.g. via a web browser
  - Now has nodes to directly work with Channels 

## Community efforts
The big focus on [extendability](https://thegraybook.vvvv.org/reference/extending/overview.html) we have with vvvv, makes it possible for everyone to contribute to its ecosystem of libraries. And many of you do! Following is a list of profile pages on nuget.org by all individuals and groups that have published libraries for use with vvvv since the last vvvv gamma stable release. In no particular order:

[AristidesGarcia](https://www.nuget.org/profiles/AristidesGarcia), [chkworks](https://www.nuget.org/profiles/chkworks), [gegenlicht](https://www.nuget.org/profiles/gegenlicht), [natan.sinigaglia](https://www.nuget.org/profiles/natan.sinigaglia), [KairosResearchLab](https://www.nuget.org/profiles/KairosResearchLab), [bj-rn](https://www.nuget.org/profiles/bj-rn), [gamingrobot](https://www.nuget.org/profiles/gamingrobot), [sebl](https://www.nuget.org/profiles/sebl), [mhusinsky](https://www.nuget.org/profiles/mhusinsky), [texone](https://www.nuget.org/profiles/texone), [TheFuseLab](https://www.nuget.org/profiles/TheFuseLab), [domj](https://www.nuget.org/profiles/domj), [TobyKLight](https://www.nuget.org/profiles/TobyKLight), [cnisidis](https://www.nuget.org/profiles/cnisidis), [sunep](https://www.nuget.org/profiles/sunep), [torinos-yt](https://www.nuget.org/profiles/torinos-yt), [kopffarben](https://www.nuget.org/profiles/kopffarben), [sebescudie](https://www.nuget.org/profiles/sebescudie), [wirmachenbunt](https://www.nuget.org/profiles/wirmachenbunt), [domj](https://www.nuget.org/profiles/domj), [AdamZeke](https://www.nuget.org/profiles/AdamZeke), [ANDAND](https://www.nuget.org/profiles/ANDAND)

Further we'd like to highlight the following users who continuously provide materials to learn from:

- [Christoph Ignaz Kirmaier](https://www.3e8.studio/) aka "chk" maintains his [VL.TheBigBang](https://www.nuget.org/packages/VL.TheBigBang) pack which he describes as: "A tutorial series of 42 chapters, covering all nodes and techniques to get you started with the visual programming environment vvvv"
- [Toby Knyvett]() aka "tobyk" maintains his [VL.ExtendedTutorials](https://www.nuget.org/packages/VL.ExtendedTutorials) pack with a series of [video tutorials](https://www.youtube.com/@TobyKLight) covering various topics, like Mutability (Record vs Class), Solving Cyclic problems and a vector matrix maths tutorial series 
- [Takuma Nakata](https://www.takumanakata.com/) creates [video tutorials](https://www.youtube.com/user/takumatn) exploring various aspects of vvvv, recently mostly VL.Fuse
- [Dominik Jančík](https://www.domj.net/) aka "domj" creates [Schema](https://schema.scenic.tools/), which he calls "a playful visual environment for behavior programming with focus on physical devices and spatial relations". It is built with vvvv from the ground up and [open-source](https://github.com/domjancik/scnq-schema) for you to explore and learn from. You may even catch him do some [live-coding](https://www.youtube.com/@domjancik)
- [Randal Vazquez](https://github.com/ravazquez) aka "ravazquez" has released two little games for you to explore and learn from: [VL.Snake](https://github.com/ravazquez/VL.Snake) and [VL.Breakout](https://github.com/ravazquez/VL.Breakout)
  
And let's not forget about the hours of learning content created by different individuals that are now available via The NODE Institute:
- [Course recordings, Winter 23/24](https://thenodeinstitute.org/ws23-vvvv-intermediates/)
- [ Course recordings, Summer 23](https://thenodeinstitute.org/vvvv-intermediates-summer-2023/)

All of the above (and those we might have missed) are immensely valuable and we as the developers of vvvv bow before every single one of you!

## What Next?

In case you wonder why the above doesn't mention "global channels" and "bindings" as huge new features: True, one of the things we've been working on recently are "global channels" which allow you to bind data from external sources (Redis, OSC, RCP,...) quickly to parameters in your patch. 

While they are already shipping with this release, we're still hiding all related nodes behind the "experimental" aspect, since we're not happy with all the details of this whole topic yet. This means that we still expect breaking changes going forward and don't have documentation yet other than some helppatches in the Help Browser. More still to come...

Apart from regular 6.x bug-fix releases, we'll also add a few more features in the 6.x branch. Please consult our [living roadmap](https://thegraybook.vvvv.org/roadmap/planned.html) for details.

## Licensing
The release of a new version is always a good moment to make sure you still have a valid license for commercial use. To check, log into your account on vvvv.org and then view [your vvvv gamma licenses](https://store.vvvv.org/licenses).

In case, you simply [buy a license](https://store.vvvv.org/) the moment you start working on a commercial project. Don't forget that we also have monthly options!

---

We hope this release suits you well and would love to hear your thoughts on it in the comments. 

Good patch,  
your devvvvs!
