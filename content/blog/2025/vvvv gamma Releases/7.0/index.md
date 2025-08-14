---
date: "2025-08-02"
title: "vvvv gamma 7.0 release"
description: Release notes
categories: "vvvv gamma Releases"
author: joreg
thumb: vvvv60-thumb.jpg
---

![vvvv gamma 7.0 release](vvvv60-400px.jpg)
 
Here is to introduce **vvvv gamma 7.0**, 

{{< box >}}
__[Download vvvv gamma 7.0](http://vvvv.org/#Download)__  

- [Full Change Log](https://thegraybook.vvvv.org/changelog/7.x.html)
- [Get started](https://thegraybook.vvvv.org/reference/getting-started/overview.html)  
- [Buy a license](https://store.vvvv.org)

{{< /box >}}

Since the full change log is not easy to digest, we'll provide you with quick rundown of our personal release highlights:

## Patch Editor

### Workspace customization
The most obvious change with this release is the dockable user interface: Tabs of patches or tool windows like the Inspector, Debug Views, ... can now be freely arranged and docked to allow for a side-by-side view of tabs or multiple windows. However you arrange your workspace, it will survive a restart and you can always continue working exactly were you left. As a cherry on top, the Quad menu now also has a "Recent..." entry that will give you quick access to your latest .vl documents.

*image*

Open previous windows
Open previous documents

### Snapping 
We heard you want to keep your patches tidy, so we give you snapping: While dragging elements in a patch around, they will now automagically align themselves to their neighbouring pins and nodes. This gives you cleaner patches by default and saves you a lot of time re-arranging things. 

*mp4*

Snapping
Show snapping guides

### Refactoring
One of the most requested features: Make it less clicks to refactor a bunch of nodes into one new custom node. Here goes:
- `CTRL + G` to group nodes to a process node
- `CTRL + SHIFT + G` to group nodes to an operation node
  
And while at it we came up with two related shortcuts that'll save you another bunch of clicks:
- `F2` on a node to rename it's definition: Like this you no longer have to open a nodes definition to rename it
- `CTRL + SHIFT + X` to cut a nodes definition: Like this you no longer have to navigate to a nodes definition in case you want to move it around <- pro-alert!

*mp4*

### Public Channels
An addition to Channels, VL's dead-simple solution for bi-directional data-binding: Allow you to define channels that are "public" in the sense that you can access them by name from anywhere in your app. Like this they become app-wide parameters that allow you to define a control-surface for your patches. And you get an excellent overview of all your public channels in the new Public Channel Browser. 

For more details, please see our [Introduction to Public Channels](https://vvvv.org/blog/2025/introducing-public-channels/).

### Presets and Transitions
As soon as you start working with Public Channels, you'll find it convenient to use the new Preset system, that conveniently allows you to save the state of your public channels under a preset name and recall them anytime. Either by jumping to the values or smoothly transitioning to them. Via UI or programmatically (allowing you to build your own UIs on top). Sky is the limit. 

For more details, please see our [Introduction to Presets and Transitions](https://vvvv.org/blog/2025/introducing-presets-and-transitions/).

### Channel Bindings
And the other thing you'll find valuable as soon as you start working with Public Channels is the fact that you can easily bind any of them to external data sources. Think one-click exporuse via OSCQuery, OSC, MIDI, Redis (and more protocols still to come). Again via UI or programmatically via a set of nodes. 

For more details, please see our [Introduction to Channel Bindings](https://vvvv.org/blog/2025/introducing-channel-bindings/).

### Type Editor
Specifying nested type annotations was a bit of a drag up until now. Here you see the new type editor in action that has auto-completion for even nested types:

*mp4*

### Comments and IOBoxes
Adding comments to your patches makes them more understandable to others and your future self. You can now not only prettify your comments using emojis but we've also added new shortcuts to lmuch quicker let you change their size:
- Alt 1, 2, 3, 4, 5
 
*mp4*

IOBoxes default to a precision of 2 by default. Changing the precision involved a couple of annoying clicks. Now there are shortcuts to add/remove digits:

*mp4*

### Helpbrowser 

![](helpbrowser.png)

In the help browsers Learn tab where you find help to all the packs you have installed, the packs didn't have links back to their online readme. This is now shown for all packs. Plus, packs can also have 4 more optional buttons:
- Website: Link to a website covering the pack
- Source: Link to the packs source repository
- Sponsor!: Link to a page where this pack can be supported
- Chat: Link to a dedicated chat room

To learn how to provide those links for your packs, please refer to [Providing Help](https://thegraybook.vvvv.org/reference/extending/providing-help.html).

## Application Exporter

![](exporter.png)

3 little improvements for the Exporter:
- Can now export console apps also for MacOS in addition to Windows and Linux
- Has a new option to ignore unhandled exeptions at runtime: So far by default unhandled exceptions would result in a popup and halt the application. This can now be disabled, which would only write those exceptions to the log.
- Has a new option to ignore errors at compile time: There are cases where you are aware of errors in your patch that you simply want to ignore for the time being and still be able to export

## Commandline Compiler

![](vvvvc.png)

While so far exporting your patches was only possible via the Application Exporter UI, you can now also export apps via the commandline, ie. without the need to open vvvv itself.

For more details, please see our [Introduction to vvvvc.exe](https://vvvv.org/blog/2025/introducing-vvvvc.exe/).

## arm builds

![](arm.png)

With the advent of Arm-based Windows Laptops we now also offer dedicated builds for this architecture in order to run at full speed also on such devices. As a side effect, vvvv now also runs at close to native speeds when run on Apple Silicon hardware. 

For more details, please see our [Introduction to running vvvv on arm](https://vvvv.org/blog/2025/introducing-vvvv-on-arm-for-windows-and-mac-phase-1/2/).

## New VL features
- custom regions

## New libraries

As ya'll know, vvvv is not a monolithic tool, with features, but a development environment with libraries that you can install and update independently as needed. Following is a list of new libraries since vvvv's last major release.

### Support for VST audio plugins

Audio in vvvv got a big bump with the seamless integration of support for VST3 audio plugins. Any VST3 plugin can now be used as just another node, with audio in/out and parameter and MIDI input pins. 

*image*

Needless to say this also works when exporting your patches allowing you to build complex standalone audio tools!

For more details, please see our [Introduction to the support of VST3 audio plugins](https://vvvv.org/blog/2024/introducing-support-for-vst3-audio-plugins/).

### Effortless avateering

Controlling virtual characters with vvvv has been a tough nut, but this nut is cracked and we're committed to adding simple introductions on how to do so for all skeleton tracking options available with vvvv. 

*image*

As of this writing, your first option is using [DollarsMoCap](https://vvvv.org/blog/2025/introducing-dollarsmocap/) but you can expect support for Kinects, Orbbec's Femtos and StereLab's ZED devices soon.

### Orbbec Femto depth cameras

You can now use Femto Bolt and Mega cameras by Orbbec with the node-set known from AzureKinect devices. For details, please see [Introducing Support for Orbbec Femto devices via K4A](https://vvvv.org/blog/2025/introducing-support-for-orbbec-femto-devices-via-k4a).

### Axis network cameras

Need to access and control a network camera by Axis? We have you covered! For details, please see [Introducing support for Networks cameras by Axis](https://vvvv.org/blog/2025/introducing-support-for-network-cameras-by-axis/).

### Lidars by Slamtec

Want to work with the data sensed by one of the Lidars of Slamtec? Easy! For details, please see [Introducing support for RPLidar devices](https://vvvv.org/blog/2024/introducing-support-for-rplidar-devices-by-slamtec).

### Position tracking by Blueiot

Need a stable ID tracking people in a large space? Try this: [Introducing Blueiot realtime location system](https://vvvv.org/blog/2024/introducing-blueiot-real-time-location-system/).

## Updated Libraries
  
So the above was all new stuff. Now here is are some highlights of changes to existing libraries for this release:

### VL.Stride
Adds Location aka Gizmo for manipulating entities and controlling values, to be used in Edit Mode (F4).

https://github.com/vvvv/VL.StandardLibs/pull/673
https://github.com/vvvv/VL.StandardLibs/pull/691
https://github.com/vvvv/VL.StandardLibs/pull/686

[All changes](https://thegraybook.vvvv.org/changelog/7.x.html#stride)

### VL.Skia
Adds FromSharedHandle for Skia which in turn is getting used by texture/mesh viewers. [All changes](https://thegraybook.vvvv.org/changelog/7.x.html#skia)

### VL.ImGUI

Adds dockable windows to Stride backend (thanks [kopffarben](https://vvvv.org/people/kopffarben)). [All changes](https://thegraybook.vvvv.org/changelog/7.x.html#imgui)

### VL.Audio 
AudioPlayer now applies automatic resampling if the files sample rate doesn't match the engines samplerate. [All changes](https://github.com/vvvv/VL.Audio/commits/main/)

### VL.OpenCV
A new maintainance release is out, see: [VL.OpenCV 4.0 is out](https://vvvv.org/blog/2025/vl.opencv-4.0.0-is-out-now/)

And it has been featured in the following vvvvTv episodes:
- [Introduction to OpenCV](https://www.youtube.com/live/fjw2m8w6RNU)
- [AR using OpenCV with ArUco Markers](https://www.youtube.com/live/j7DWMET-qM8)

### VL.CEF
- We've updated the underlying Chrome engine to version 132
- There are now convenient WebLayer (for Skia) and WebRenderer (for Stride)nodes that let you render content with arbitrary 2d transformations and still have mouse input working
- We've added an example of how you can inject your own mouse/keyboard/touch notifications for the WebLayer nodes
  
### VL.OpenEXR
- Supports all compression formats
- Supports scanline based and tiled images
- Supports sequential and randomized line order (user randomized to allow for parallel writing)

### Devices
The following device libraries got new releases:
- [Industrial cameras by The Imaging Source](https://vvvv.org/blog/2024/introducing-support-for-the-imaging-sources-industrial-cameras/) got a stable release
- [Industrial cameras by IDS](https://vvvv.org/blog/2024/introducing-support-for-industrial-cameras-by-ids-imaging/) got a stable release
- [ZED Stereo cameras by Stereolabs](https://vvvv.org/blog/2024/introducing-support-for-zed-stereo-cameras-by-stereolabs/) got a stable release
- [Leap Motion Controllers by UltraLeap](https://vvvv.org/blog/2024/introducing-support-for-new-ultraleap-devices/) now support latest devices
- [VL.Augmenta](http://nuget.org/packages/vl.augmenta) Now supports their new WebSocket based protocol including pointcloud streaming and zones

### Networking IO
The following finally got a stable release and have been discussed in a [vvvvTv seson 2](https://www.youtube.com/playlist?list=PLBTgwgsWWcT8eDfjAg299o7paRqkd2Zdi) episode:

- [VL.IO.MQTT](https://www.nuget.org/packages/VL.IO.MQTT) as featured in [Networking with MQTT](https://www.youtube.com/live/h_TQFUN8EQ0)
- [VL.IO.WebSocket](https://www.nuget.org/packages/VL.IO.WebSocket) as featured in [Talking to an API](https://www.youtube.com/live/TTvkQgGZfZw) and [Multiplayer Installation](https://www.youtube.com/live/GtKx2v5Egxw) and [Controlling an app via a WebUI](https://www.youtube.com/live/DR1ay0WR418)
- [VL.IO.WebServer](https://www.nuget.org/packages/VL.IO.WebServer) as featured in [Serving a WebUI for mobile access](https://www.youtube.com/live/mhczdsRKmaE)

## Community efforts
The big focus on [extendability](https://thegraybook.vvvv.org/reference/extending/overview.html) we have with vvvv, makes it possible for everyone to contribute to its ecosystem of libraries. And many of you do! Following is a list of profile pages on nuget.org by all individuals and groups that have published libraries for use with vvvv since the last vvvv gamma stable release. In no particular order:

[AristidesGarcia](https://www.nuget.org/profiles/AristidesGarcia), [anamirbast](https://www.nuget.org/profiles/anamirbast), [tebjan](https://www.nuget.org/profiles/tebjan), [bj-rn](https://www.nuget.org/profiles/bj-rn), [phlegma](https://www.nuget.org/profiles/phlegma), [sebl](https://www.nuget.org/profiles/sebl), [antokhio](https://www.nuget.org/profiles/antokhio), [D21s](https://www.nuget.org/profiles/D21s), [3e8.studio](https://www.nuget.org/profiles/3e8.studio), [cnisidis](https://www.nuget.org/profiles/cnisidis), [wirmachenbunt](https://www.nuget.org/profiles/wirmachenbunt), [sebescudie](https://www.nuget.org/profiles/sebescudie), [mhusinsky](https://www.nuget.org/profiles/mhusinsky), [chkworks](https://www.nuget.org/profiles/chkworks) 

These contributions are extremely valuable and we bow before every single one of you! Often those contributions are also demonstrated at a [vvvv meetup](https://www.youtube.com/watch?v=Npr0K63bKZc&list=PL2KeRstDQVRQUgSEa604MaS3HtA8UgPUt) that are expertly run by [The NODE Institute](https://thenodeinstitute.org/) in collaboration with [chk](https://vvvv.org/people/chk) and [ravazquez](https://vvvv.org/people/ravazquez).

## Licensing
The release of a new version is always a good moment to make sure you still have a valid license for commercial use. To check, [view your vvvv gamma licenses](https://store.vvvv.org/licenses). Requires login!

In case, you simply [buy a license](https://store.vvvv.org/) the moment you start working on a commercial project. Don't forget that we also have monthly options!

---

We hope this release suits you well and would love to hear your thoughts on it in the comments. 

Good patch,  
your devvvvs!