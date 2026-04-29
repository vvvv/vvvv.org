---
title: Extendability
weight: 6
---

![](image.png)

vvvv is not a monolithic software. Its core is rather slim with many [optional packs](https://vvvv.org/packs) to augment its functionality. 

If you're still missing a feature, here are your options:
- [Get in touch](mailto:devvvvs@vvvv.org), we're available for custom development
- Help yourself by writing a custom node or an editor extension 

## Custom nodes

Custom nodes can be written in pure C#/.NET. No proprietary plugin-wrapping boilerplate code is needed. Any method written in C# is available as node in VL, meaning simple nodes really just take a few lines of code.

If you know how to write code, [extending vvvv](https://thegraybook.vvvv.org/reference/extending/overview.html) with your own nodes is trivial.

## Editor Extensions

Editor extensions allow you to extend the vvvv editor with your own tools. For a listing of available extensions, see [Extensions](https://vvvv.org/extensions). To create your own, see [Editor Extensions](https://thegraybook.vvvv.org/reference/extending/editor-extensions.html) in the Gray Book.