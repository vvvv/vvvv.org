---
title: Media Server
weight: 3
---

When off-the-shelf media servers don't suite your needs, create your own with vvvv. All the components typically needed (video, audio, realtime graphics, lights, lasers) are there for you to customize and tailor to your specific use case. Combine with your own idea of a UI and finally export your media server as a windows app for easy [deployment](/features/deployment).

![Elbphilharmonie](sbb_mediaserver.png "Schnelle Bunte Bilder")

### Audio, Video, Lights and Lasers

- Image sequence playback (.dds files for best performance/quality)
- Video playback based on Microsoft Media Foundation <!-- or VLC -->
- [Projection Mapping](/features/largescale#projection-mapping) support via multiple thirdparty integrations
- Shader based image effects (TextureFX)
- Multichannel audio engine with [VST3](https://en.wikipedia.org/wiki/Virtual_Studio_Technology) audio plugin integration 
- Support for [protocols to control stage lights](https://vvvv.org/packs/?c=Devices#Lighting)
- Support for [Lasers](https://vvvv.org/packs/?c=Devices#Lasers) plus a set of nodes to generate paths with blanking
  
<!--more-->

### Realtime Graphics

- [Stride](https://stride3d.net/) based 3d/VR rendering engine 
- [Skia](https://skia.org/) based 2d rendering engine 
- [Rive](https://rive.app/) integration including bi-directional data-binding
- [CEF](https://www.nuget.org/packages/VL.CEF) for rendering web content

### Plugin Architecture

When building a large modular media server, at some point you'll want it to support a custom idea of plugins. Check out this [demo app with plugins](https://github.com/vvvv/AppWithPluginsDemo/) to learn how to set this up.

### User Interfaces

- [Dear ImGui](https://github.com/ocornut/imgui) for building custom bi-directional UIs
- [Various other solutions](http://vvvv.org/packs/?c=UI)

![Custom UI for the m-control Media Server](mbox_mediaserver3.png "m box")