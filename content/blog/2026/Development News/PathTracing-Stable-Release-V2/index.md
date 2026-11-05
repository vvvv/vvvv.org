---
categories: "Development News"
author: "tebjan"
date: "2026-11-05"
title: "From Scene to Screen: VL.Nvidia.PathTracing"
description: "Bring GPU-generated meshes, shader-authored shapes and text into a path-traced vvvv scene, then carry the result through Stride, Frame Generation, recording and HDR."
slug: "pathtracing-from-scene-to-screen-v2"
thumb: "thumb.png"
draft: true
---

Real-time path tracing is now available in vvvv gamma. VL.Nvidia.PathTracing may well be the best real-time path tracer in the world right now.

![A procedural scene rendered with VL.Nvidia.PathTracing](hero.jpg)

## GPU-generated geometry, SDFs, text and area lights

Compute and mesh shaders can send GPU-generated geometry straight to the path tracer. The scene can also contain Stride meshes and shader-authored SDFs. Text can be rendered as mesh or SDF geometry, with font, glyph and instancing support. Mesh and SDF instancers follow the same parameter pattern. For lighting, there are point and spot lights, plus sampled area lights shaped as rectangles, disks and tubes.

![Procedural shapes, materials and instanced geometry in the path tracer](geometry-gallery.jpg)

<!-- The film is awaiting the owner's scene design.
<figure class="article-video">
  <video controls loop muted playsinline preload="metadata" poster="./procedural-scene-poster.jpg" aria-label="A procedural scene rendered with VL.Nvidia.PathTracing" style="display:block;width:100%;height:auto;">
    <source src="./procedural-scene-film.mp4" type="video/mp4">
    Your browser does not support HTML video.
  </video>
  <figcaption>A procedural scene rendered in real time.</figcaption>
</figure>
-->

## Bring Stride textures in, and the rendered image back

File and video textures, TextureFX outputs and render targets can feed path-traced materials. Use TextureRenderer and ToDX11Texture in the same render host to bring the rendered image back into Stride.

## DLSS Super Resolution and Frame Generation

Streamline Frame Generation works alongside DLSS Ray Reconstruction. Choose from five NVIDIA quality profiles independently of DLSS resolution; settings are saved with the patch. The Basic and Pro HUDs show render timings, GPU and memory use, and presented FPS including generated frames.

[VL.Nvidia.Streamline](https://www.nuget.org/packages/VL.Nvidia.Streamline/1.0.0) is how these NVIDIA features reach the path tracer. It also makes DLSS Super Resolution, Reflex and NVIDIA Image Scaling available in vvvv. Installing PathTracing brings Streamline and DX12Bridge along automatically.

## Video recording and HDR10 output

Record a DirectX 12 window or standalone texture renderer. The recorder supports a fallback encoder and can recover output after an interrupted capture. For compatible displays, choose HDR10/PQ with Rec.2020 conversion and ten-bit presentation; SDR is also available. For HDR10 video, the recorder can use ten-bit H.265 or AV1 output.

## DX12Bridge connects Stride to RTXPT and opens the full shader pipeline

Stride's renderer uses DirectX 11, while RTXPT needs DirectX 12. To bring path tracing into vvvv, I built [VL.Stride.DX12Bridge](https://www.nuget.org/packages/VL.Stride.DX12Bridge/0.8.0). It lets the two renderers share textures and buffers, so Stride content can feed the path tracer and the finished image can return to the rest of the patch.

For shaders, I kept the familiar VL.Stride workflow: shader files appear as nodes, values become pins, and compilation works both in the editor and in a running patch. DX12Bridge extends that workflow to the full DirectX 12 pipeline. You can write vertex, hull, domain, geometry, pixel and compute shaders, the newer amplification and mesh stages, and the complete DirectX Raytracing set: ray generation, miss, closest-hit, any-hit, intersection and callable. Your own rendering passes, compute simulations and ray-traced effects can all be wired into a vvvv patch.

## RTXPT 1.9, Shader Execution Reordering and per-pixel tracing

The 0.8.0 release uses RTXPT 1.9, with Shader Execution Reordering where supported. Tracing every pixel is now the default for clean DLSS Ray Reconstruction output. DLSS resolution and path-tracing quality remain independent settings in the patch.

## Install VL.Nvidia.PathTracing

Install or update [VL.Nvidia.PathTracing 0.8.0](https://www.nuget.org/packages/VL.Nvidia.PathTracing/0.8.0) with:

```text
nuget install vl.nvidia.pathtracing
```

Its dependencies are installed automatically. The Help Browser includes examples for GPU meshes, SDFs, text, area lights and recording.

The package includes agent skills for its nodes, examples and shader authoring. They give coding agents package-specific context when helping build a scene.

### Requirements

- Windows 10 or 11 and an NVIDIA RTX GPU; Ampere (RTX 30 series) or newer is recommended.
- A current NVIDIA Game Ready or Studio driver.

Free for personal, non-commercial use. Commercial use requires a license. NVIDIA SDK binaries have additional license terms.

The renderer is based on [NVIDIA RTXPT](https://github.com/NVIDIA-RTX/RTXPT), a project by [Filip Strugar](https://www.linkedin.com/in/filipstrugar/).

For more details and discussion, see the [vvvv forum thread](https://forum.vvvv.org/t/vl-nvidia-pathtracing-real-time-path-tracing-in-vvvv-gamma/25110).
