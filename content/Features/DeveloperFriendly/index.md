---
title: "Developer Friendly"
weight: 6
---

vvvv is generally developer friendly. One can think of it as a development environment for the .NET ecosystem in which sense it is comparable to [Visual Studio](https://visualstudio.microsoft.com/) and [Rider](https://www.jetbrains.com/rider/). 

![The vvvv editor with tool windows](image.png)

The key difference is vvvv's focus on [visual live-programming](/features/visualliveprogramming/) which benefits applications that require [rapid prototyping](/features/rapidprototyping/) or have IO that goes beyond the standard mouse/keyboard/touch-screen.

### Multi-language

vvvv is a visual-first development environment. There isn't much that you couldn't express with vvvv's own [visual language VL](/features/visualliveprogramming/). It combines features known from object-oriented, functional as well as reactive programming and as such is quite versatile. 

But that's not all, vvvv also supports the following text languages:
<!--more-->
- You can [write parts of your apps using C#](/features/extendability/) or F#
- If you prefer Python, see how [CSnakes](https://github.com/tonybaloney/CSnakes) allows you to embed Python code into .NET projects
- For shader coding vvvv uses [SDSL](https://doc.stride3d.net/latest/en/manual/graphics/effects-and-shaders/shading-language/index.html) which is a superset of HLSL

### Version Control
One of the challenges with visual programming often is version control. We haven't solved this entirely but two aspects make vvvv quite version control friendly:
- Projects can easily be split into as many documents as feels appropriate for a project to prevent conflicts when working in teams
- Documents are saved in text format and can be merged using the [git mergetool](https://github.com/vvvv/MergeVLDocs) we provide
  
### Distributed Rendering
vvvv is built to facilitate the creation of [large-scale installations](/features/large-scale#distributed-rendering) out of the box. Orchestrate any number of PCs from a single primary to run your apps across numerous outputs. What others call [nDisplay](https://dev.epicgames.com/documentation/unreal-engine/ndisplay-overview-for-unreal-engine), we call "Boygrouping".

### Exposing parameters
Three things make it particularly easy in vvvv to quickly build control surfaces for parameters of an application:
- [Public Channels](https://thegraybook.vvvv.org/reference/hde/the_channelbrowser.html) to reason about app wide parameters   
- [RCP](http://rabbitcontrol.cc/) support to get an instant Web UI over public channels
- [Dear ImGui](https://github.com/ocornut/imgui) integration for building even complex control UIs in no time

### Debugging
vvvv comes with [a range of debug views](https://thegraybook.vvvv.org/reference/hde/debugging.html) that include a log view that helps identify issues in your patches and jump to the source of messages at a click.

Since VL compiles to C# using [Roslyn](https://github.com/dotnet/roslyn), it is possible to [attach a debugger](https://thegraybook.vvvv.org/reference/hde/debugging.html#attaching-visual-studio) and set break points in C# for advanced debugging purposes.

### Observability
The ability to observe the behavior of your applications over time, regarding logging and metrics is key when it comes to developing more complex projects. Being a development environment for .NET allows vvvv to take full advantage of all the features and technologies available in the .NET ecosystem. No need to reinvent the wheel, pushing structured data to a dashboard like [Grafana](https://grafana.com/) for analysis, is solved.

### Profiling
Here again, vvvv can leverage all the tooling available in the .NET ecosystem. This includes tools like the performance profiler [dotTrace](https://www.jetbrains.com/profiler/) and the memory profiler [dotMemory](https://www.jetbrains.com/dotmemory/).

### Modularity
When installing vvvv, you only get the most basic feature set. Any additional library you need is available as a quick install. The built-in package manager gives you one-click access to a wide range of [packs](https://vvvv.org/packs) built specifically for VL but also the whole [nuget.org](https://nuget.org) catalog of libraries.

### Open Source
While the core of vvvv (editor and compiler) are proprietary, all [libraries are open-source](https://github.com/vvvv). This means not getting stuck when you're facing a bug or missing a feature. In addition, being able to inspect libraries down to the bits is also a great learning resource. 
 
### Deployment
vvvv offers multiple [deployment options](/features/deployment/), including a commandline compiler. This allows to include the export of vvvv apps in automated build processes. 

### No DRM
Finally, what makes vvvv really friendly is the fact that it doesn't assume you want to steal it. Therefore it doesn't need any form of copy-protection (activation procedure, dongle,...) that always gets in your way when you least need it. 

Any installation of vvvv is a full, unrestricted version. No questions asked. And you simply [buy licenses as needed](https://store.vvvv.org/).