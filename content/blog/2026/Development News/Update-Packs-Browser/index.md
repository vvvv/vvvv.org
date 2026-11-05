---
categories: "Development News"
author: "joreg"
date: "2026-10-13"
title: "Update: Improvements for the Package manager"
description: "Now with file and .NET Framework references"
---

Round two!

We've [introduced Packman](https://vvvv.org/blog/2026/introducing-a-package-manager-for-vl-packs/) earlier.Now still in preview, but we have it basically feature complete. So here is what's new in latest previews:

## Dependencies are now References

![](references.png)

Where there used to be the "Dependencies" menu entry in the Document menu, you'll now see "References..." opening up the package manager to a page where you can manage all types of references. 

![](packman.png)

In addition to packs, you can now also manage file (.vl, .dll, .csproj) and .NET Framework Assembly references in the same place.

For all the details, see: [Managing References](https://thegraybook.vvvv.org/reference/hde/packman.html#managing-references).

## Custom NuGet sources

As you may know, [nuget.org](https://nuget.org) is only the default source for NuGets. But for in-house development you may want to have your own NuGet feed that serves private packs in addition to the public ones.

This is now supported and here is how it works [using a nuget.config file](https://thegraybook.vvvv.org/reference/hde/packman.html#custom-nuget-sources).

--- 

Ok, that's it. Now over to you. Keep in mind, at the time of writing, Packman is in preview and we still expect you to encounter issues with it. In this case, please don't hesitate to report them on the [forum](https://forum.vvvv.org/)!

Available for testing in [vvvv gamma 8.0 preview builds](/download).