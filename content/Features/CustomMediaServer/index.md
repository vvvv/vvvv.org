---
title: Media Server
weight: 3
---

When off-the-shelf media servers don't suite your needs, create your own with vvvv. All the components typically needed (video, audio, realtime graphics, lights, lasers) are there for you to customize and tailor to your specific needs. Combine with your own idea of a UI and finally export your media server as a windows app for easy [deployment](/features/Deployment).

![Elbphilharmonie](sbb_mediaserver.png "Schnelle Bunte Bilder")

## Audio, Video, Lights and Lasers

- Video playback based on Microsoft Media Foundation or VLC
- Image sequence playback (.dds files for best performance/quality)
- [Projection Mapping](../LargescaleInteractive#Projection%20Mapping) support via multiple thirdparty integrations
- Shader based image effects (TextureFX)
- Multichannel audio engine
- [VST3](https://en.wikipedia.org/wiki/Virtual_Studio_Technology) audio plugin integration 
- Art-Net, DMX, sACN for controlling stage lights
- [LaserAnimation Sollinger](https://laseranimation.com/), [Ether Dream Laser DAC](https://ether-dream.com/), [Helios Laser DAC](https://bitlasers.com/helios-laser-dac/), [Moncha Laser DAC](https://www.showtacle.jp/v18/lasershowsoftware/hardware/moncha2/) for Laser output

## Realtime Graphics

- [Stride](https://stride3d.org/) based 3d rendering engine 
- [Skia](https://skia.org/) based 2d rendering engine 
- [Rive](https://rive.app/) integration including bi-directional data-binding
- [CEF]() for rendering web content

## User Interfaces

- [Dear ImGui](https://github.com/ocornut/imgui) for building custom bi-directional UIs
- [Various other solutions](http://vvvv.org/packs/?c=UI)

## Plugin Architecture

When building a large modular media server, at some point you'll want it to support a custom idea of plugins. Check out this [demo app with plugins](https://github.com/vvvv/AppWithPluginsDemo/) to learn how to set this up.

![m-control Media Server](mbox_mediaserver3.png "m box")