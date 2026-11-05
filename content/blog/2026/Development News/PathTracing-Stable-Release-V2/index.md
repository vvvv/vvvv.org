---
categories: "Development News"
author: "tebjan"
date: "2026-10-19"
title: "From Scene to Screen: VL.Nvidia.PathTracing"
description: "Bring GPU-generated meshes, shader-authored shapes and text into a path-traced vvvv scene, then carry the result through Stride, Frame Generation, recording and HDR."
slug: "pathtracing-from-scene-to-screen-v2"
thumb: "hero.jpg"
draft: true
---

Real-time path tracing is now officially available in vvvv gamma. VL.Nvidia.PathTracing is the best real-time path tracer in the world right now.

![A procedural scene rendered with VL.Nvidia.PathTracing](hero.jpg)

## More ways to build a scene

Compute and mesh shaders can send GPU-generated meshes straight to the path tracer, without a CPU readback. Combine them with Stride meshes and shader-authored SDFs. Text nodes turn font and layout data into path-traced geometry. Mesh and SDF instancers share the same parameter pattern; sampled rectangle, disk and tube lights add area lighting alongside point and spot lights.

![Procedural shapes, materials and instanced geometry in the path tracer](geometry-gallery.jpg)

<figure class="article-video">
  <video controls loop muted playsinline preload="metadata" poster="./procedural-scene-poster.jpg" aria-label="A procedural scene rendered with VL.Nvidia.PathTracing" style="display:block;width:100%;height:auto;">
    <source src="./procedural-scene-film.mp4" type="video/mp4">
    Your browser does not support HTML video.
  </video>
  <figcaption>A procedural scene rendered in real time.</figcaption>
</figure>

## Bring Stride textures in, and the rendered image back

File and video textures, TextureFX outputs and render targets can feed path-traced materials. Use TextureRenderer and ToDX11Texture in the same render host to bring the rendered image back into Stride.

## Shape the final image

Streamline Frame Generation works alongside DLSS Ray Reconstruction. Choose from five NVIDIA quality profiles independently of DLSS resolution; settings are saved with the patch. The Basic and Pro HUDs show render timings, GPU and memory use, and presented FPS including generated frames.

Record a DirectX 12 window or standalone texture renderer at a fixed frame rate. The recorder supports a fallback encoder and can recover output after an interrupted capture. For compatible displays, choose HDR10/PQ with Rec.2020 conversion and ten-bit presentation; SDR is also available.

## Try it out

Install or update [VL.Nvidia.PathTracing 0.7.0](https://www.nuget.org/packages/VL.Nvidia.PathTracing) in the vvvv Help Browser or from NuGet. Select this package; its dependencies are installed automatically. Help Browser examples cover GPU meshes, SDFs, text, area lights and recording.

The package includes agent skills for its nodes, examples and shader authoring. They give coding agents package-specific context when helping build a scene.

### Requirements

- Windows 10 or 11 and an NVIDIA RTX GPU; Ampere (RTX 30 series) or newer is recommended.
- NVIDIA drivers with Shader Model 6.9 support.

Free for personal, non-commercial use. Commercial use requires a license. NVIDIA SDK binaries have additional license terms.

The renderer is based on [NVIDIA RTXPT](https://github.com/NVIDIA-RTX/RTXPT), a project by Filip Strugar.