---
date: "2025-08-21"
title: "vvvv gamma 7.0 release"
description: Release notes
categories: "vvvv gamma Releases"
author: joreg
thumb: vvvv70-thumb.jpg
---

![vvvv gamma 7.0 release](header-7.png)
<small>Artwork by Arístides García aka [lasal](https://vvvv.org/people/lasal)</small>
 
Here is to introduce **vvvv gamma 7.0** with all its pomp and glory. And make no mistake: This is not your parents vvvv!

{{< box >}}
__[Download vvvv gamma 7.0](http://vvvv.org/#Download)__  

- [Full Change Log](https://thegraybook.vvvv.org/changelog/7.x.html)
- [Get started](https://thegraybook.vvvv.org/reference/getting-started/overview.html)  
- [Buy a license](https://store.vvvv.org)

{{< /box >}}

Since the full change log is not easy to digest, we'll provide you with quick rundown of our personal release highlights:

## Patch Editor

### Workspace customization

<video controls src="workspace.mp4" title="" width="100%"></video>

The most obvious change with this release is the dockable user interface: Tabs of patches or tool windows like the Inspector, Debug Views, ... can now be freely arranged and docked to allow for a side-by-side view of tabs or multiple windows. However you arrange your workspace, it will survive a restart and you can always continue working exactly were you left. 

New [settings](https://thegraybook.vvvv.org/reference/hde/settings.html) supporting this feature: "Open previous windows" and "Open previous documents".

And as a cherry on top, the Quad menu now also has a "Recent..." entry that will give you quick access to your latest .vl documents.

### Snapping 

<video controls src="snapping.mp4" title="" width="100%"></video>

We heard you want to keep your patches tidy, so we give you snapping: While dragging elements in a patch around, they will now automagically align themselves to their neighbouring pins and nodes. This gives you cleaner patches by default and saves you a lot of time re-arranging things. 

New [settings](https://thegraybook.vvvv.org/reference/hde/settings.html) supporting this feature: "Snapping" and "Show snapping guides".

### Refactoring

<video controls src="grouping.mp4" title="" width="100%"></video>

One of the most requested features: Make it less clicks to refactor a bunch of nodes into one new custom node. Here goes:
- `CTRL` + `G` to group nodes to a process node
- `CTRL` + `ALT` + `G` to group nodes to an operation node
  
And while at it we came up with two related shortcuts that'll save you another bunch of clicks:
- `F2` on a node to rename it's definition: Like this you no longer have to open a nodes definition to rename it
- `CTRL` + `SHIFT` + `X` to cut a nodes definition: Like this you no longer have to navigate to a nodes definition in case you want to move it around <- pro-alert!

### Public Channels
![](channel-browser.png)

As an addition to "Channels", VL's dead-simple solution for bi-directional data-binding, "Public Channels" allow you to define channels that are "public" in the sense that you can access them by name from anywhere in your app. Like this they become app-wide parameters that allow you to define a control-surface for your patches. And you get an excellent overview of all your public channels in the new Public Channel Browser. 

For more details, please see our [Introduction to Public Channels](https://vvvv.org/blog/2025/introducing-public-channels/).

### Presets and Transitions
As soon as you start working with Public Channels, you'll find it convenient to use the new Preset system, that allows you to save the state of your public channels under a preset name and recall them anytime. Either by jumping to the values or smoothly transitioning to them. Via UI or programmatically (allowing you to build your own UIs on top). Sky is the limit. 

For more details, please see our [Introduction to Presets and Transitions](https://vvvv.org/blog/2025/introducing-presets-and-transitions/).

### Channel Bindings
And the other thing you'll find valuable as soon as you start working with Public Channels is the fact that you can easily bind any of them to external data sources. Think one-click exposure via OSCQuery, OSC, MIDI, Redis (and more protocols still to come). Again via UI or programmatically via a set of nodes. 

For more details, please see our [Introduction to Channel Bindings](https://vvvv.org/blog/2025/introducing-channel-bindings/).

### Type Editor

<video controls src="typeeditor.mp4" title="" width="100%"></video>

Specifying nested type annotations was a bit of a drag up until now. Here you see how the new type editor auto-completes types when pressing the `TAB` key and has support even for nested types.

### Comments and IOBoxes

<video controls src="emoji.mp4" title="" width="100%"></video>

Adding comments to your patches makes them more understandable to others and your future self. You can now not only prettify your comments using emojis 👀 (by typing 🪟 + `.`), but we've also added new shortcuts to much quicker let you change their size. Try these from big to small:

`ALT` + `1`, `2`, `3`, `4`, `5`, `6`

Path IOBoxes are now automatically created when drag-dropping in a file or folder from the Explorer.

Float IOBoxes default to a precision of 2. Changing the precision involved a couple of annoying clicks. Now there are shortcuts to quickly add/remove digits:

`CTRL` + `+`, `-`

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
- Has a new option to ignore unhandled exceptions at runtime: So far by default unhandled exceptions would result in a popup and halt the application. This can now be disabled, which would only write those exceptions to the log.
- Has a new option to ignore errors at compile time: There are cases where you are aware of errors in your patch that you simply want to ignore for the time being and still be able to export

## Commandline Compiler

![](vvvvc.png)

While so far exporting your patches was only possible via the Application Exporter UI, you can now also export apps via the commandline, ie. without the need to open vvvv itself.

For more details, please see our [Introduction to vvvvc.exe](https://vvvv.org/blog/2025/introducing-vvvvc.exe/).

## Arm builds

![](arm.png)

With the advent of Arm-based Windows Laptops we now also offer dedicated builds for this architecture in order to run at full speed also on such devices. As a side effect, vvvv now also runs at close to native speeds when run on Apple Silicon hardware. 

For more details, please see our [Introduction to running vvvv on arm](https://vvvv.org/blog/2025/introducing-vvvv-on-arm-for-windows-and-mac-phase-1/2/).

## New VL features
Regions are a powerful language concept in VL. And the fact that you can even come up with your own, is actually quite crazy. If you're curious, now is a good time to learn all about them, as we've improved and simplified the API for creating [custom regions](https://thegraybook.vvvv.org/reference/extending/custom-regions.html). 

And unrelated but also new: When using process nodes that stem from classes or records: You can now make their State Output visible even when not enabled by the creator of the node!

## New libraries

As ya'll know, vvvv is not a monolithic tool, with features, but a development environment with libraries that you can install and update independently as needed. Following is a list of new libraries since vvvv's last major release.

### Support for VST audio plugins

![](vst.png)

Audio in vvvv got a big bump with the seamless integration of support for VST3 audio plugins. Any VST3 plugin can now be used as just another node, with audio in/out and parameter and MIDI input pins. 

Needless to say this also works when exporting your patches allowing you to build complex standalone audio tools!

For more details, please see our [Introduction to the support of VST3 audio plugins](https://vvvv.org/blog/2024/introducing-support-for-vst3-audio-plugins/).

### Effortless avateering

<video controls src="lankydude.mp4" title="" width="100%"></video>

Controlling virtual characters with vvvv has been a tough nut, but this nut is cracked and we're committed to adding simple introductions on how to do so for all skeleton tracking options available with vvvv. 


As of this writing, your first option is using [DollarsMoCap](https://vvvv.org/blog/2025/introducing-dollarsmocap/) but you can expect support for Kinects, Orbbec's Femtos and StereLab's ZED devices soon.

### Orbbec Femto depth cameras
![](orbbec-logo.svg)

You can now use Femto Bolt and Mega cameras by Orbbec with the node-set known from AzureKinect devices. For details, please see [Introducing Support for Orbbec Femto devices via K4A](https://vvvv.org/blog/2025/introducing-support-for-orbbec-femto-devices-via-k4a).

### Axis network cameras
![](axis-logo.png)

Need to access and control a network camera by Axis? We have you covered! For details, please see [Introducing support for Networks cameras by Axis](https://vvvv.org/blog/2025/introducing-support-for-network-cameras-by-axis/).

### Slamtec Lidars
![](slamtec-logo.png)

Want to work with the data sensed by one of the Lidars of Slamtec? Easy! For details, please see [Introducing support for RPLidar devices](https://vvvv.org/blog/2024/introducing-support-for-rplidar-devices-by-slamtec).

### Blueiot realtime location system
![](blueiot-logo.svg)

Need a stable ID tracking people in a large space? Try this: [Introducing Blueiot realtime location system](https://vvvv.org/blog/2024/introducing-blueiot-real-time-location-system/).

## Updated Libraries
  
So the above was all new stuff. Now here are some highlights of changes to existing libraries for this release:

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
- We've updated the underlying Chrome engine to version 132
- There are now convenient WebLayer (for Skia) and WebRenderer (for Stride) nodes that let you render content with arbitrary 2d transformations and still have mouse input working
- We've added an example of how you can inject your own mouse/keyboard/touch notifications for the WebLayer nodes
  
### VL.OpenEXR
- Now supports more compression formats (including DWAA and DWAB)
- Now supports scanline based and tiled images
- Now supports sequential and randomized line order (use randomized to allow for parallel, ie. much faster writing)

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

[AristidesGarcia](https://www.nuget.org/profiles/AristidesGarcia) - [anamirbast](https://www.nuget.org/profiles/anamirbast) - [tebjan](https://www.nuget.org/profiles/tebjan) - [bj-rn](https://www.nuget.org/profiles/bj-rn) - [phlegma](https://www.nuget.org/profiles/phlegma), [sebl](https://www.nuget.org/profiles/sebl) - [antokhio](https://www.nuget.org/profiles/antokhio) - [D21s](https://www.nuget.org/profiles/D21s) - [3e8.studio](https://www.nuget.org/profiles/3e8.studio) - [cnisidis](https://www.nuget.org/profiles/cnisidis) - [wirmachenbunt](https://www.nuget.org/profiles/wirmachenbunt) - [sebescudie](https://www.nuget.org/profiles/sebescudie) - [mhusinsky](https://www.nuget.org/profiles/mhusinsky) - [chkworks](https://www.nuget.org/profiles/chkworks) 

These contributions are extremely valuable and we bow before every single one of you! Often those contributions are also demonstrated at a [vvvv meetup](https://www.youtube.com/watch?v=Npr0K63bKZc&list=PL2KeRstDQVRQUgSEa604MaS3HtA8UgPUt) that are expertly run by [The NODE Institute](https://thenodeinstitute.org/) in collaboration with [chk](https://vvvv.org/people/chk) and [ravazquez](https://vvvv.org/people/ravazquez).

## Licensing
The release of a new vvvversion is always a good moment to make sure you still have a valid license for commercial use. To check, [view your vvvv gamma licenses](https://store.vvvv.org/licenses). Requires to be logged in!

In case, you simply [buy a license](https://store.vvvv.org/) the moment you start working on a commercial project. And don't forget: We also have monthly options!

---

We wish you a very productivvvve time ahead. And should you have thoughts on this release, we`d would love to read them in the comments. 

Good patch,  
your devvvvs!