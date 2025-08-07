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

### Snapping 
We heard you want to keep your patches tidy, so we give you snapping: While dragging elements in a patch around, they will now automagically align themselves to their neighbouring pins and nodes. This gives you cleaner patches by default and saves you a lot of time re-arranging things. 

*mp4*

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

### Comments
Adding comments to your patches makes them more understandable to others and your future self. You can now not only prettify your comments using emojis but we've also added new shortcuts to lmuch quicker let you change their size:
- Alt 1, 2, 3, 4, 5
 
*mp4*

### Type Editor
Specifying nested type annotations was a bit of a drag up until now. Here you see the new type editor in action that has auto-completion for even nested types:

*mp4*

### IOBoxes
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

## New Settings

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

For those of you who want to run vvvv 
https://vvvv.org/blog/2025/introducing-vvvv-on-arm-for-windows-and-mac-phase-1/2/

## New libraries
### Support for VST audio plugins

For more details, please see our [Introduction to the support of VST3 audio plugins](https://vvvv.org/blog/2024/introducing-support-for-vst3-audio-plugins/).

### Effortless avateering
https://vvvv.org/blog/2025/introducing-dollarsmocap/

- https://vvvv.org/blog/2024/introducing-blueiot-real-time-location-system/
- https://vvvv.org/blog/2024/introducing-support-for-rplidar-devices-by-slamtec/
- https://vvvv.org/blog/2024/introducing-support-for-new-ultraleap-devices/
- https://vvvv.org/blog/2025/introducing-support-for-network-cameras-by-axis/
- https://vvvv.org/blog/2025/introducing-support-for-orbbec-femto-devices-via-k4a/
- https://vvvv.org/blog/2024/introducing-support-for-new-ultraleap-devices/

## Updated Libraries
  
So the above was all the new stuff. Now here is an overview of the changes to existing libraries for this release:

- VL.Stride
- VL.Skia
- VL.ImGUI
- VL.Audio improvements
- VL.OpenCV: https://vvvv.org/blog/2025/vl.opencv-4.0.0-is-out-now/
- https://vvvv.org/blog/2024/introducing-support-for-the-imaging-sources-industrial-cameras/
- https://vvvv.org/blog/2024/introducing-support-for-industrial-cameras-by-ids-imaging/
- https://vvvv.org/blog/2024/introducing-support-for-zed-stereo-cameras-by-stereolabs/

- VL.CEF update
- mqtt, websocket, webserver, now stable
- openexr
- augmenta now with pointcloud and zones

## New VL features
- custom regions

## Community efforts
The big focus on [extendability](https://thegraybook.vvvv.org/reference/extending/overview.html) we have with vvvv, makes it possible for everyone to contribute to its ecosystem of libraries. And many of you do! Following is a list of profile pages on nuget.org by all individuals and groups that have published libraries for use with vvvv since the last vvvv gamma stable release. In no particular order:

[AristidesGarcia](https://www.nuget.org/profiles/AristidesGarcia), [anamirbast](https://www.nuget.org/profiles/anamirbast), [tebjan](https://www.nuget.org/profiles/tebjan), [bj-rn](https://www.nuget.org/profiles/bj-rn), [phlegma](https://www.nuget.org/profiles/phlegma), [sebl](https://www.nuget.org/profiles/sebl), [antokhio](https://www.nuget.org/profiles/antokhio), [D21s](https://www.nuget.org/profiles/D21s), [3e8.studio](https://www.nuget.org/profiles/3e8.studio), [cnisidis](https://www.nuget.org/profiles/cnisidis), [wirmachenbunt](https://www.nuget.org/profiles/wirmachenbunt), [sebescudie](https://www.nuget.org/profiles/sebescudie), [mhusinsky](https://www.nuget.org/profiles/mhusinsky), [chkworks](https://www.nuget.org/profiles/chkworks) 

**check re standardlibs and other PRs**

Further we'd like to highlight the following users who continuously provide materials to learn from:

- [Christoph Ignaz Kirmaier](https://www.3e8.studio/) aka "chk" maintains his [VL.TheBigBang](https://www.nuget.org/packages/VL.TheBigBang) pack which he describes as: "A tutorial series of 42 chapters, covering all nodes and techniques to get you started with the visual programming environment vvvv"
- [Toby Knyvett]() aka "tobyk" maintains his [VL.ExtendedTutorials](https://www.nuget.org/packages/VL.ExtendedTutorials) pack with a series of [video tutorials](https://www.youtube.com/@TobyKLight) covering various topics, like Mutability (Record vs Class), Solving Cyclic problems and a vector matrix maths tutorial series 
- levoxtrip
  
All of the above (and those we might have missed) are immensely valuable and we as the developers of vvvv bow before every single one of you!

## Licensing
The release of a new version is always a good moment to make sure you still have a valid license for commercial use. To check, log into your account on vvvv.org and then view [your vvvv gamma licenses](https://store.vvvv.org/licenses).

In case, you simply [buy a license](https://store.vvvv.org/) the moment you start working on a commercial project. Don't forget that we also have monthly options!

---

We hope this release suits you well and would love to hear your thoughts on it in the comments. 

Good patch,  
your devvvvs!