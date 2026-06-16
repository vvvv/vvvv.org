---
title: Extendability
weight: 7
---
vvvv is not a monolithic software. Its core is rather slim with many [optional packs](https://vvvv.org/packs) to augment its functionality. 

<div class="logos justified">
    <a href="https://thegraybook.vvvv.org/reference/extending/writing-nodes.html" target="_blank" title="Writing nodes using C#"><img src="/features/extendability/logos/csharp.png" alt="C#"/></a>
    <a href="https://thegraybook.vvvv.org/reference/extending/using-net-libraries.html" target="_blank" title="Using .NET Libraries"><img src="/features/extendability/logos/dotnet.png" alt=".NET"/></a>
    <a href="https://www.nuget.org/packages?q=tag%3Avl&prerel=true" target="_blank" title="Nuget"><img src="/features/extendability/logos/nuget.png" alt="Nuget"/></a>
</div>

If you're still missing a feature, here are your options:
- [Get in touch](mailto:devvvvs@vvvv.org), we offer custom feature development, support and consulting
- Help yourself by writing a custom node or an editor extension: 

### Custom nodes

The simplest way to create custom, reusable nodes is wrapping a group of nodes away in a new node. Do this for a bunch of nodes and create your own reusable pack of nodes which you can share on [nuget.org](http://nuget.org).  

Alternatively custom nodes can be written in pure C# or F#. No proprietary plugin-wrapping boilerplate code is needed. Any method written in code is available as node in VL, meaning simple nodes really just take a few lines of code.

If you know how to write code, [extending vvvv](https://thegraybook.vvvv.org/reference/extending/overview.html) with your own nodes is trivial.

<!--more-->

### Editor Extensions

Editor extensions allow you to extend the vvvv editor with your own tools. For a listing of available extensions, see [Extensions](https://vvvv.org/extensions). To create your own, see [Editor Extensions](https://thegraybook.vvvv.org/reference/extending/editor-extensions.html) in [The Gray Book](https://thegraybook.vvvv.org/).