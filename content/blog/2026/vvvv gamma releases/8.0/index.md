---
date: "2026-11-23"
title: "vvvv gamma 8.0 release"
description: Release notes
categories: "vvvv gamma Releases"
author: joreg
thumb: vvvv80-thumb.png
draft: true
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

With this release we're bringing vvvv gamma back up to speed when it comes to developing applications for large-scale and interactive spaces. Our very own distributed rendering system dubbed "Boygrouping" makes it a breeze to live-code an application that runs distributed over any number of PCs. Develop on the main PC, and see changes applied live, on the big screen, without the need for any kind of deployment. Saves time, nerves and leaves a lot of space for play-testing with real user-input on-site. On top: No cumbersome setup required to get started.

Read all about [Boygrouping](https://thegraybook.vvvv.org/reference/hde/boygrouping.html) in vvvv's docs.

## Package Management

We've modularized vvvv to the max: The base download is now <40 MB with a 100 MB footprint when installed on disk! Any pack of nodes you don't find in the initial setup can be conveniently downloaded at the click of a button. 

This includes the convenience that when opening patches on a new PC for the first time, vvvv will now automatically download any required packs in the right version! 

The newly introduced Package Manager allows you to browse for available packs (including bare .NET NuGets) and choose to reference specific versions if required or simply update to the latest available version of a pack.

![Packman](packman.png)
<small>Packman: Be in control of your references</small>

Read all about [Packman](https://thegraybook.vvvv.org/reference/hde/packman.html) in vvvv's docs.

## Rive
[![Rive](rive-logo.png)](http://rive.app)
With the premium integration of [Rive](http://rive.app) you have access to an entirely new way of creating content and then seamlessly integrating it in your patches. Bi-directional data-binding allows you to read data from Rive files and probably even more relevant, write data into rives ViewModels. 

**fancy rive**

Resolution independent rendering allows you to scale Rive files to any screen size and since the Rive frame-step is handled by vvvv, it can even be synched across PCs.

[VL.Rive](https://www.nuget.org/packages/VL.Rive) comes with a bunch of help patches. On the help browsers "Learn" tab browse for "rive" to get started...

## Orbbec depth cameras

[![Orbbec](orbbec.png)](https://www.orbbec.com/)

With this release we extend the support for depth cameras by [Orbbec](https://www.orbbec.com/) to nearly their whole fleet. The revamped pack is now based on their latest  SDK (2.0) and fully implements support for color, IR, depth and IMU data for a wide range of devices. 

[VL.Devices.Orbbec](https://www.nuget.org/packages/VL.Devices.Orbbec/) comes with help patches that show different ways for rendering the depth data. On the help browsers "Learn" tab browse for "orbbec" to get started...

## Motion Capture
We've had a bit of a focus on supporting different motion capture solutions lately. Controlling skinned meshes aka "Avateering" with motion capture data is just a few clicks by now. So any motion capture solution can now be quite easily adapted. Here are the most recent packs, check out their help patches to learn more:

[![MOVIN](movin.svg)](https://www.movin3d.com/)
[VL.MOVIN](https://www.nuget.org/packages/VL.MOVIN)

[![OptiTrack](optitrack.avif)](https://www.optitrack.com/)
[VL.OptiTrack](https://www.nuget.org/packages/VL.IO.OptiTrack)

[![Captury](captury.png)](https://captury.com/)
[VL.Captury](https://www.nuget.org/packages/VL.Captury)

## Stereoscopic Rendering
Agreed, this one is a bit special interest as it requires rather unique hardware. But nevertheless this new feature opens up a whole new category of projects that can now be realized with vvvv. Think [Deep Space](https://ars.electronica.art/solutions/de/deepspace/)- or [CAVE](https://en.wikipedia.org/wiki/Cave_automatic_virtual_environment)-like interactive setups that require active stereoscopic rendering. Comlexity of setup: Close to zero:

See the helppatch: "HowTo Stereoscopic Rendering" that comes with VL.Stride to get started.

## Quality of patching
Two little additions to improve your daily patching:

1) You can now take links at their start or end and move them around. Specifically interesting if you have multiple connections to rewire:

**video**

2) 

Constant values are often hidden in a nodes input pins and can only be inspected when hovering. Placing an IOBox only to see a value often feels too bold. 

With this new feature, input pins can be configured to display a minimal read-only rendering of their current value. 

## Property node

rive, vst, ...

## Update to .NET10 and C# 14
![.NET](dotnet-logo.png)

vvvv is based on the [.NET](https://en.wikipedia.org/wiki/.NET) platform which in turn gets regular updates. With this release of vvvv we switch to the current long-term support release of .NET that is .NET 10. A .NET update generally means everything under the hood is running faster, more stable and with a smaller memory footprint. If this applies to your specific patches, is something only you can test. 

But also a .NET update always means support for new C# language features, like language version C# 14 this time.

If you want to learn more, here is the official [What's new in .NET 10](
https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-10/overview) article.

## Exporting Applications

With this release come 2 updates to vvvv's killer feature of application export:
- By default, an export is now "self contained", ie. it contains the .NET runtime which consequently does not have to be installed anymore manually on target PCs
- There is new nerdy option to use the experimental "Satori" Garbage Collector that in many scenarios will improve...

## Updated Libraries

vvvv is a rather modular environment, which makes stable releases like this actually a bit less exciting. A lot of updates to individual libraries don't have to wait for a major releases and instead can be used as they are ready. Here a listing of updates to individual libraries we've pushed since the 7.0 release:

- [VL.Audio](https://www.nuget.org/packages/VL.Audio)
- [VL.Audio.VST](https://www.nuget.org/packages/VL.Audio.VST)
- [VL.Devices.IDS](https://www.nuget.org/packages/VL.Devices.IDS)
- [VL.Devices.RealSense](https://www.nuget.org/packages/VL.Devices.RealSense)
- [VL.IO.ArtNet](https://www.nuget.org/packages/VL.IO.ArtNet)
- [VL.IO.OSC](https://www.nuget.org/packages/VL.IO.OSC)
- [VL.IO.MQTT](https://www.nuget.org/packages/VL.IO.MQTT)
- [VL.IO.TUIO](https://www.nuget.org/packages/VL.IO.TUIO)
- [VL.IO.WebServer](https://www.nuget.org/packages/VL.IO.WebServer)
- [VL.IO.Augmenta](https://www.nuget.org/packages/VL.Augmenta)
- [VL.CEF](https://www.nuget.org/packages/VL.CEF)
- [VL.DollarsMoCap](https://www.nuget.org/packages/VL.DollarsMoCap)
- [VL.MediaPipe](https://www.nuget.org/packages/VL.MediaPipe)
- [VL.ScreenRecorder](https://www.nuget.org/packages/VL.ScreenRecorder)
- [VL.Video](https://www.nuget.org/packages/VL.Video)

## Community efforts

And the above is only what we've released! But the [vvvv community](https://vvvv.org/community/) didn't sleep as well. The big focus on [extendability](https://thegraybook.vvvv.org/reference/extending/overview.html) we have with vvvv, starts to pay off and we're happy to see countless [new and updated packs](https://vvvv.org/packs/?c=All) every month. Following is a list of profile pages on nuget.org by all individuals and groups that have published libraries for use with vvvv since the last vvvv gamma stable release. In no particular order:

[red_os](https://www.nuget.org/profiles/red_os) - [murxylink](https://www.nuget.org/profiles/murxylink) - [wirmachenbunt](https://www.nuget.org/profiles/wirmachenbunt) - [anamirbast](https://www.nuget.org/profiles/anamirbast) - [microdee](https://www.nuget.org/profiles/microdee) - [bj-rn](https://www.nuget.org/profiles/bj-rn) - [antokhio](https://www.nuget.org/packages/VL.FFmpeg) - [sebescudie](https://www.nuget.org/packages/VL.Prometheus) - [sebl](https://www.nuget.org/profiles/sebl) - [tebjan](https://www.nuget.org/packages/VL.Nvidia.PathTracing) - [reaktant](https://www.nuget.org/profiles/reaktant) - [cnissidis](https://www.nuget.org/profiles/cnisidis) - [phlegma](https://www.nuget.org/profiles/phlegma) - [vultrakley](https://www.nuget.org/profiles/vultraklej) - [AristidesGarcia](https://www.nuget.org/profiles/AristidesGarcia) - [vincent.now](https://www.nuget.org/profiles/vincent.now) - [polysan](https://www.nuget.org/profiles/polysan)

These contributions are extremely valuable and we bow before every single one of you! Often those contributions are also demonstrated at a [vvvv meetup](https://www.youtube.com/watch?v=Npr0K63bKZc&list=PL2KeRstDQVRQUgSEa604MaS3HtA8UgPUt) that are expertly run by [The NODE Institute](https://thenodeinstitute.org/) in collaboration with [chk](https://vvvv.org/people/chk) and [ravazquez](https://vvvv.org/people/ravazquez).

## Licensing

As y'all know, vvvv has the best licensing model in the world:
- Free for non-commercial use without any restrictions
- Commercial use paid per company size (Indy, SME/Freelance, Big Fish)
- Actual monthly licenses

We trust you to make sure your commercial use is covered by a license. To check, [view your vvvv gamma licenses](https://store.vvvv.org/licenses). Requires to be logged in!

## What next

[roadmap](https://thegraybook.vvvv.org/roadmap/planned.html)

---

If you want to see some of the new features introduced in hands-on videos, please subscribe to our [tv channel](https://www.youtube.com/@vvvvTv42), where vvvvTv Season 3 has just started to air...

We wish you a very productivvvve time ahead! And if you have anything to say about this release, please meet us in the [forum](https://forum.vvvv.org/) or [chat](https://matrix.to/#/#vvvv:matrix.org), we're always curious to hear your thoughts.

Good patch,  
your devvvvs!
