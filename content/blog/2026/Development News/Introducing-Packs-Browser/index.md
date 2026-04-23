---
categories: "Development News"
author: "joreg"
date: "2026-01-14"
title: "Introducing: An online browser for VL Packs"
description: "For everyone to see what you're patching with"
---

Hello World!

Since ya'll've been wondering what you can do with vvvv, what libraries, protocols, devices,.. it supports, we wanted to provide you with a little tool to browse all the beautiful packages that are being maintained by the vvvv community.

Introducing: **http://vvvv.org/packs**

<video width=100% controls autoplay>
    <source src="packs.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

You get the idea: It's basically a convenient replacement for browsing [nuget.org](http://nuget.org). But here we show you only NuGets that have been specifically tailord for vvvv.

And yes, we're also working on a package manager that's built into vvvv and will allow you to reference NuGets at the click of a button (replacing the current manual install workflow), will auto-restore any missing NuGets and help you with resolving version conflicts. More on that one later...

And remember: If you're looking for a pack and can't find it, we can most likely add it [on demand](https://thegraybook.vvvv.org/reference/libraries/on-demand.html)!

## Call to action for NuGet owners

If you maintain a NuGet, this is a good moment to polish your package for visibility:
- Make sure your packs have a tag "VL" to have it picked up by the browser 
- Add a unique [Icon](https://learn.microsoft.com/en-us/nuget/reference/nuspec#icon), make it 512x512 so we can display them nicely in certain places
- Make sure to have a meaningful [description](https://learn.microsoft.com/en-us/nuget/reference/nuspec#description)
- Add a [Sponsorship Link](https://learn.microsoft.com/en-us/nuget/nuget-org/package-sponsorship-on-nuget-org) if applicable
- [Categorize your NuGet](https://thegraybook.vvvv.org/reference/extending/publishing.html#categorize-the-pack), so it shows up in the browser accordingly
- And while at it, just for completeness, consider adding yourself to the [Github](https://vvvv.org/people/?section=connections&type=github) and [NuGet](https://vvvv.org/people/?section=connections&type=nuget) connections via [your profile](https://vvvv.org/edit-profile/)

In the rare case that you have a pack that is no longer meant to be used (e.g. because it has a better alternative), please mark it as "Deprecated" in your [nuget.org Manage Packages](https://www.nuget.org/account/Packages) page.