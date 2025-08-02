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

Since the full change log is not easy to digist, we'll provide you with quick rundown of our personal release highlights:

## Patch Editor

### Workspace customization
The most obvious change with this release is the dockable user interface: Tabs of patches or tool windows like the Inspector, Debug Views, ... can now be freely arranged and docked to allow for a side-by-side view of tabs or multiple windows. However you arrange your workspace, it will survive a restart and you can always continue working exactly were you left. As a cherry on top, the Quad menu now also has a Recent... entry that will give you quick access to your latest .vl documents.

*image*

### Snapping 
We heard you want to keep your patches tidy, so we give you snapping: While dragging elements in a patch around they will now automagically align themselves to their neighbouring pins and nodes. This gives you cleaner patches by default and saves you a lot of time re-arranging things. 

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
https://vvvv.org/blog/2025/introducing-public-channels/

### Presets and Transitions
https://vvvv.org/blog/2025/introducing-presets-and-transitions/

### Channel Bindings
https://vvvv.org/blog/2025/introducing-channel-bindings/

### Property Metadata
A for now rather advanced topic that shall become more relevant later: You can now add metadata to properties via the Inspektor. Read all we have to say about this so far, here: [Metadata]()

### Comments
Adding comments to your patches makes them more understandable to others and your future self. You can now not only prettify your comments using emojis but we've also added new shortcuts to let you quickly change their size:
- Alt 1, 2, 3, 4, 5
 
*mp4*

### IOBoxes
Float precision shortcut

*mp4*

### Helpbrowser 
links: readme, sponsor, chat

*image*

## New Settings

## Exporter updates

## vvvvc
https://vvvv.org/blog/2025/introducing-vvvvc.exe/

## arm builds
https://vvvv.org/blog/2025/introducing-vvvv-on-arm-for-windows-and-mac-phase-1/2/

## New libraries
### Support for VST audio plugins
https://vvvv.org/blog/2024/introducing-support-for-vst3-audio-plugins/

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