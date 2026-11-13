---
date: "2026-11-10"
title: "vvvv gamma 8.0 release"
description: Release notes
categories: "vvvv gamma Releases"
author: joreg
thumb: vvvv80-thumb.png
---

![vvvv gamma 8.0 release](vvvv8-blog.jpg)
<small>Artwork by [Juan Hurlé](https://vvvv.org/people/juanhurle)</small>
 
Here is to introduce **vvvv gamma 8.0**, ready for visual live-coding at scale powered by "Boygrouping", much simplified dependency management and some more...

{{< box >}}
__[Download vvvv gamma 8](http://vvvv.org/#Download)__  

- [Full Change Log](https://thegraybook.vvvv.org/changelog/8.x.html)
- [Get started](https://thegraybook.vvvv.org/reference/getting-started/overview.html)  
- [Buy a license](https://store.vvvv.org)

{{< /box >}}

So let's unwrap this release and let us give you an overview of what's new:

## Distributed Rendering

![Dataland by Refik Anadol Studio, 2026](<Gallery A – Data Pavilion_07.png>)
<small>[Dataland](https://dataland.art/) by [Refik Anadol Studio](http://refikanadolstudio.com): 42 PCs powering 84 4k projectors for a seamless ouput.</small>

With this release we're bringing vvvv gamma back up to speed when it comes to developing applications for large-scale and interactive spaces. Our very own distributed rendering system dubbed "Boygrouping" makes it a breeze to live-code an application that runs distributed over any number of PCs. Develop on the main PC, and see changes applied live, on the big screen, without the need for any kind of deployment. Saves time, nerves and leaves a lot of space for play-testing with real user-input on-site.

On top: It is not rocket science to set this up and use. Read all about [Boygrouping](https://thegraybook.vvvv.org/reference/hde/boygrouping.html) in vvvv's docs.

## Package Management

We've modularized vvvv to the max: The base download is now <40 MB with a 100 MB footprint when installed on disk! Any pack of nodes you don't find in the initial setup can be conveniently downloaded at the click of a button. 

This includes the convenience that when opening patches on a new PC for the first time, vvvv will now automatically download any required packs in the right version! 

![Packman]()
<small>Packman: Be in control of your references</small>

The newly introduced Package Manager allows you to browse for available packs (including bare .NET NuGets) and choose to reference specific versions if required or simply update to the latest available version of a pack.

Read all about it in the [Packman](https://thegraybook.vvvv.org/reference/hde/packman.html) section in our blog.

## Rive

## Orbbec

## Stereoscopic Rendering
Agreed, this one is a bit special interest as it requires rather unique hardware. But nevertheless this new feature opens up a whole new category of projects that can now be realized with vvvv. Think [Deep Space](https://ars.electronica.art/solutions/de/deepspace/) or [CAVE](https://en.wikipedia.org/wiki/Cave_automatic_virtual_environment) like interactive setups that require active stereoscopic rendering. Comlexity of setup: Close to zero:

See the helppatch: 

## Patch Editor

### Workspace customization

<video controls src="workspace.mp4" title="" width="100%"></video>

The most obvious change with this release is the dockable user interface: Tabs of patches or tool windows like the Inspector, Debug Views, ... can now be freely arranged and docked to allow for a side-by-side view of tabs or multiple windows. However you arrange your workspace, it will survive a restart and you can always continue working exactly were you left. 

New [settings](https://thegraybook.vvvv.org/reference/hde/settings.html) supporting this feature: "Open previous windows" and "Open previous documents".

And as a cherry on top, the Quad menu now also has a "Recent..." entry that will give you quick access to your latest .vl documents.

## Exporting Applications
- default now self contained
- satori
- installer?
- vvvvc?

## Arm builds

![](arm.png)

With the advent of Arm-based Windows Laptops we now also offer dedicated builds for this architecture in order to run at full speed also on such devices. As a side effect, vvvv now also runs at close to native speeds when run on Apple Silicon hardware. 

For more details, please see our [Introduction to running vvvv on arm](https://vvvv.org/blog/2025/introducing-vvvv-on-arm-for-windows-and-mac-phase-1/2/).

## New VL features

## New libraries

As ya'll know, vvvv is not a monolithic tool, with features, but a development environment with libraries that you can install and update independently as needed. Following is a list of new libraries since vvvv's last major release.

orbbec
https://www.nuget.org/packages/VL.IO.PosiStageNet
https://www.nuget.org/packages/VL.DeepSpace
https://www.nuget.org/packages/VL.HardwareMonitor
https://www.nuget.org/packages/VL.Devices.Moncha
https://www.nuget.org/packages/VL.IO.OptiTrack
https://www.nuget.org/packages/VL.Devices.Helios
https://www.nuget.org/packages/VL.IO.NFC
https://www.nuget.org/packages/VL.Captury
movin

## Updated Libraries
  
So the above was all new stuff. Now here are some highlights of changes to existing libraries for this release:

https://www.nuget.org/packages/VL.MediaPipe
https://www.nuget.org/packages/VL.IO.WebServer
https://www.nuget.org/packages/VL.DollarsMoCap
https://www.nuget.org/packages/VL.IO.OSC
https://www.nuget.org/packages/VL.Devices.IDS
https://www.nuget.org/packages/VL.Audio
https://www.nuget.org/packages/VL.Audio.VST
https://www.nuget.org/packages/VL.IO.MQTT
https://www.nuget.org/packages/VL.Augmenta
https://www.nuget.org/packages/VL.IO.TUIO
https://www.nuget.org/packages/VL.ScreenRecorder
https://www.nuget.org/packages/VL.Devices.RealSense
https://www.nuget.org/packages/VL.CEF
https://www.nuget.org/packages/VL.IO.ArtNet
https://www.nuget.org/packages/VL.Video


### VL.Stride

<video controls src="gizmo.mp4" title="" width="100%"></video>

A new node "Location" allows for manipulating entities (including Undo) in Edit Mode (`F4`). Gizmos are always rendered on top and can get resized via `Shift` + mousewheel.

With much gratitude we've acceppted the following pull requests:

- [VL.ImGui.Stride.Viewports](https://github.com/vvvv/VL.StandardLibs/pull/673) by [kopffarben](https://vvvv.org/people/kopffarben)
- [Custom present call](https://github.com/vvvv/VL.StandardLibs/pull/691) by [tonfilm](https://vvvv.org/people/tonfilm)
- [Asset Url optional output on asset loading nodes](https://github.com/vvvv/VL.StandardLibs/pull/686) by [sebescudie](https://vvvv.org/people/sebescudie)

[More changes](https://thegraybook.vvvv.org/changelog/7.x.html#stride).

### VL.Skia

<video controls src="skia.mp4" title="" width="100%"></video>

Skia rendering can now be extended into the titlebar and the renderer can be set to be always on top. [More changes](https://thegraybook.vvvv.org/changelog/7.x.html#skia).

### VL.Audio 
AudioPlayer now applies automatic resampling if the files sample rate doesn't match the engines samplerate. [More changes](https://github.com/vvvv/VL.Audio/commits/main/).

### VL.OpenCV
A new maintainance release is out, see: [VL.OpenCV 4.0 is out](https://vvvv.org/blog/2025/vl.opencv-4.0.0-is-out-now/)

And it has been featured in the following vvvvTv episodes:
- [Introduction to OpenCV](https://www.youtube.com/live/fjw2m8w6RNU)
- [AR using OpenCV with ArUco Markers](https://www.youtube.com/live/j7DWMET-qM8)

### VL.CEF
For rendering websites in vvvv we've updated the underlying Chrome engine to version 132. Plus some more changes, see: [Update: VL.CEF improvements](https://vvvv.org/blog/2025/update-vl.cef-improvements/).
  
### VL.OpenEXR
Reading and writing OpenEXR textures in vvvv got greatly improved, see [Update: VL.OpenEXR improvements](https://vvvv.org/blog/2025/update-vl.openexr-improvements/).

### Devices
The following device libraries got new releases:
- [Industrial cameras by The Imaging Source](https://vvvv.org/blog/2024/introducing-support-for-the-imaging-sources-industrial-cameras/) got a stable release
- [Industrial cameras by IDS](https://vvvv.org/blog/2024/introducing-support-for-industrial-cameras-by-ids-imaging/) got a stable release
- [ZED Stereo cameras by Stereolabs](https://vvvv.org/blog/2024/introducing-support-for-zed-stereo-cameras-by-stereolabs/) got a stable release
- [Leap Motion Controllers by UltraLeap](https://vvvv.org/blog/2024/introducing-support-for-new-ultraleap-devices/) now supports latest devices
- [VL.Augmenta](http://nuget.org/packages/vl.augmenta) now supports their new WebSocket based protocol including pointcloud streaming and zones

### Networking
The following libraries finally got a stable release and have been discussed in a [vvvvTv season 2](https://www.youtube.com/playlist?list=PLBTgwgsWWcT8eDfjAg299o7paRqkd2Zdi) episode:

- [VL.IO.MQTT](https://www.nuget.org/packages/VL.IO.MQTT) as featured in [Networking with MQTT](https://www.youtube.com/live/h_TQFUN8EQ0)
- [VL.IO.WebSocket](https://www.nuget.org/packages/VL.IO.WebSocket) as featured in [Talking to an API](https://www.youtube.com/live/TTvkQgGZfZw) and [Multiplayer Installation](https://www.youtube.com/live/GtKx2v5Egxw) and [Controlling an app via a WebUI](https://www.youtube.com/live/DR1ay0WR418)
- [VL.IO.WebServer](https://www.nuget.org/packages/VL.IO.WebServer) as featured in [Serving a WebUI for mobile access](https://www.youtube.com/live/mhczdsRKmaE)

## Community efforts
The big focus on [extendability](https://thegraybook.vvvv.org/reference/extending/overview.html) we have with vvvv, makes it possible for everyone to contribute to its ecosystem of libraries. And many of you do! Following is a list of profile pages on nuget.org by all individuals and groups that have published libraries for use with vvvv since the last vvvv gamma stable release. In no particular order:

[red_os](https://www.nuget.org/profiles/red_os) - [murxylink](https://www.nuget.org/profiles/murxylink) - [wirmachenbunt](https://www.nuget.org/profiles/wirmachenbunt) - [anamirbast](https://www.nuget.org/profiles/anamirbast) - [microdee](https://www.nuget.org/profiles/microdee) - [bj-rn](https://www.nuget.org/profiles/bj-rn) - [antokhio](https://www.nuget.org/packages/VL.FFmpeg) - [sebescudie](https://www.nuget.org/packages/VL.Prometheus) - [sebl](https://www.nuget.org/profiles/sebl) - [tebjan](https://www.nuget.org/packages/VL.Nvidia.PathTracing) - [reaktant](https://www.nuget.org/profiles/reaktant) - [cnissidis](https://www.nuget.org/profiles/cnisidis) - [phlegma](https://www.nuget.org/profiles/phlegma) - [vultrakley](https://www.nuget.org/profiles/vultraklej) - [AristidesGarcia](https://www.nuget.org/profiles/AristidesGarcia) - [vincent.now](https://www.nuget.org/profiles/vincent.now)

These contributions are extremely valuable and we bow before every single one of you! Often those contributions are also demonstrated at a [vvvv meetup](https://www.youtube.com/watch?v=Npr0K63bKZc&list=PL2KeRstDQVRQUgSEa604MaS3HtA8UgPUt) that are expertly run by [The NODE Institute](https://thenodeinstitute.org/) in collaboration with [chk](https://vvvv.org/people/chk) and [ravazquez](https://vvvv.org/people/ravazquez).

## Licensing
The release of a new vvvversion is always a good moment to make sure you still have a valid license for commercial use. To check, [view your vvvv gamma licenses](https://store.vvvv.org/licenses). Requires to be logged in!

In case, you simply [buy a license](https://store.vvvv.org/) the moment you start working on a commercial project. And don't forget: We also have monthly options!

---

We wish you a very productivvvve time ahead. And should you have thoughts on this release, we`d would love to read them in the comments. 

Good patch,  
your devvvvs!
