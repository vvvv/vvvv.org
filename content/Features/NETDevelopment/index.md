---
title: ".NET Development"
weight: 6
---

vvvv is a .NET development environment in a sense comparable to [Visual Studio](https://visualstudio.microsoft.com/) and [Raider](https://www.jetbrains.com/rider/). What they share is their capability to develop apps using libraries that are available in the .NET ecosystem.

![The vvvv editor with tool windows](image-4.png)

The key difference is vvvv's focus on [visual live-programming](/features/visualliveprogramming/) which benefits applications that require [rapid prototyping](/features/rapidprototyping/) or have IO that goes beyond the standard mouse/keyboard/touch-screen.

### Visual and textual code

While vvvv is a visual-first development environment, you can also choose to [write parts of your apps using C#](/features/extendability/). vvvv's [visual language VL](/features/visualliveprogramming/) is best at high/mid-level organization of code while text-code often excells at implementing fine-grained algorithms. The key is finding the right balance for yourself, which vvvv allows you to do. 

<!--more-->

### Runtime value inspection

To inspect the value of any variable in your app you don't need to pause the program, simply hover the element of interest with the mouse to see its value. 

### Familar tooling

The built-in package manager gives you one-click access to a wide range of packs built specifically for VL but also the whole [nuget.org](https://nuget.org) catalog of libraries.

A range of debug views includes a premium log view that helps identify issues in your patches and jump to the source of messages at a click.

Since VL compiles to C# using [Roslyn](https://github.com/dotnet/roslyn), it is even possible to attach a debugger and set break points in C# for advanced debugging purposes.