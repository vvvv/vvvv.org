---
title: Extendability
weight: 6
---

<div class="logos justified">
    <a href="" target="_blank" title="C#"><img src="/features/extendability/logos/csharp.png" alt="C#"/></a>
    <a href="" target="_blank" title=".NET"><img src="/features/extendability/logos/dotnet.png" alt=".NET"/></a>
    <a href="https://nuget.org" target="_blank" title="Nuget"><img src="/features/extendability/logos/nuget.png" alt="Nuget"/></a>
</div>

vvvv is not a monolithic software. Its core is rather slim with many [optional packs](https://vvvv.org/packs) to augment its functionality. 

If you're still missing a feature, here are your options:
- [Get in touch](mailto:devvvvs@vvvv.org), we offer custom feature development, support and consulting
- Help yourself by writing a custom node or an editor extension 

## Custom nodes

Custom nodes can be written in pure C#/.NET. No proprietary plugin-wrapping boilerplate code is needed. Any method written in C# is available as node in VL, meaning simple nodes really just take a few lines of code.

If you know how to write code, [extending vvvv](https://thegraybook.vvvv.org/reference/extending/overview.html) with your own nodes is trivial.

## Editor Extensions

Editor extensions allow you to extend the vvvv editor with your own tools. For a listing of available extensions, see [Extensions](https://vvvv.org/extensions). To create your own, see [Editor Extensions](https://thegraybook.vvvv.org/reference/extending/editor-extensions.html) in the Gray Book.