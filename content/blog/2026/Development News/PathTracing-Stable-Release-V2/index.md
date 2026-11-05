---
categories: "Development News"
author: "tebjan"
date: "2026-11-05"
title: "Build the scene, write the shader, present the frame"
description: "Three stable graphics packages bring real-time path tracing, a complete DirectX 12 shader pipeline and NVIDIA-enhanced output into vvvv gamma."
slug: "pathtracing-from-scene-to-screen-v2"
thumb: "thumb.png"
draft: true
---

Build a live, path-traced scene from meshes, GPU-generated geometry, SDFs and text. Write the DirectX 12 shaders that shape it. Present and record the result with DLSS, HDR and the rest of the output pipeline. The stable releases of VL.Nvidia.PathTracing, VL.Stride.DX12Bridge and VL.Nvidia.Streamline bring that entire workflow into vvvv gamma.

![A dense field of GPU-generated forms rendered with VL.Nvidia.PathTracing](hero.jpg)

## Build a path-traced scene

VL.Nvidia.PathTracing lets you assemble objects, lights and environments as nodes and change them while the patch runs. Stride meshes, GPU-generated meshes, shader-authored SDFs and text share the same path-traced scene. GPU instancers can create and animate large populations of objects without reading their geometry back through the CPU. Area, point and spot lights give those scenes a practical lighting vocabulary.

![Procedural forms, materials and instanced geometry in a path-traced scene](geometry-gallery.jpg)

The renderer is based on [NVIDIA RTXPT](https://github.com/NVIDIA-RTX/RTXPT), a project by [Filip Strugar](https://www.linkedin.com/in/filipstrugar/). This release moves to RTXPT 1.9, uses Shader Execution Reordering where supported, and traces every pixel by default for clean DLSS Ray Reconstruction output. DLSS resolution and the path-tracing quality profile remain independent choices in the patch.

## Write the DirectX 12 pipeline

VL.Stride.DX12Bridge is a graphics package in its own right. An HLSL file placed beside your patch becomes a vvvv node: its entry points determine the shader stages, its creative constants and resources become pins, and edits recompile while you work. You can build your own rendering and compute passes rather than being confined to the shaders in the examples.

The shader pipeline covers vertex, hull, domain, geometry and pixel stages; compute; amplification and mesh shaders; and DirectX Raytracing stages including ray generation, miss, hit, intersection and callable shaders. That means a procedural mesh shader, a compute simulation or a custom ray-traced effect can all be authored directly in HLSL and wired into a patch. The bridge also shares resources and synchronization between Stride's DirectX 11 renderer and DirectX 12, so textures and results can cross back into the rest of a vvvv project. You can install DX12Bridge on its own for this work.

## Present and record the frame

VL.Nvidia.Streamline supplies DLSS Super Resolution and Frame Generation, plus NVIDIA Image Scaling and the other Streamline features. PathTracing uses the same stack for DLSS Ray Reconstruction and Reflex. The DX12Bridge renderer can present to a window or texture, return the image to Stride, and record fixed-rate H.264, H.265, AV1 or ProRes video. HDR10/PQ presentation and ten-bit recording are available for a scene-linear source; SDR remains an option.

The three packages are available as [VL.Nvidia.PathTracing 0.8.0](https://www.nuget.org/packages/VL.Nvidia.PathTracing/0.8.0), [VL.Stride.DX12Bridge 0.8.0](https://www.nuget.org/packages/VL.Stride.DX12Bridge/0.8.0) and [VL.Nvidia.Streamline 1.0.0](https://www.nuget.org/packages/VL.Nvidia.Streamline/1.0.0). Install `VL.Nvidia.PathTracing` to bring in its two dependencies automatically, or install DX12Bridge or Streamline for a patch that uses them independently. The package help browser includes examples and shipped agent skills for the nodes and shader authoring. Path tracing requires Windows and an NVIDIA RTX GPU; an Ampere GPU or newer and a current Shader Model 6.9 driver are recommended.

For the evolving examples and discussion, see the [vvvv forum thread](https://forum.vvvv.org/t/vl-nvidia-pathtracing-real-time-path-tracing-in-vvvv-gamma/25110).
