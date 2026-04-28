---
title: Extendability
weight: 6
---

![](image.png)

### Two ways to extend vvvv:

#### Custom nodes

Custom nodes can be written in pure C#/.NET. No proprietary plugin-wrapping boilerplate code is needed. Any method written in C# is available as node in VL. 

This allows you to directly consume almost any .NET library from nuget.org, without having to write a single line of code.

- Browse the [full list of VL packs](https://vvvv.org/packs) available
- Learn about [extending vvvv](https://thegraybook.vvvv.org/reference/extending/overview.html) with your own nodes

#### Editor Extensions

Editor extensions allow you to extend the vvvv editor with your own tools. For a listing of available extensions, see [Extensions](https://vvvv.org/extensions). To create your own, see [Editor Extensions](https://thegraybook.vvvv.org/reference/extending/editor-extensions.html) in the Gray Book.