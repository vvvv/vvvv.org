---
categories: "Development News"
author: "joreg"
date: "2024-04-01"
title: "Introducing: vvvvc.exe"
description: "A commandline compiler for your patches"
---

Dear patchers!

We've just added some icing to one of vvvv's killer features: While you've been exporting your patches to standalone executables via the built-in Application Exporter UI for a while already, there is now also a commandline option for doing so:

![](2025-03-31-20-37-13.png)

## Why is this interesting? 

Build Automation! Not the sexiest of topics but for those who have to deal with it, the commandline compiler can ease a lot of pain. 

Consider repeatedly building and publishing an app. You want to automate as many of the steps involved in order to save time and prevent making different mistakes each time you do it. Now you don't need to open vvvv anymore for building a .vl file and simply can export an app from the commandline or as part of a larger script that manages your build/publish pipeline.

## What is it exactly?

It really is just the same thing as the Exporter UI you're already familiar with but only as a standalone commandline executable called `vvvvc.exe`. This means all the arguments you can call this compiler with are the same as for the UI. 

To remind yourself of the options, simply call:

    vvvvc --help

And please consult The Gray Book on [Exporting Applications](https://thegraybook.vvvv.org/reference/hde/exporting.html) for more details on the options.

## Does it auto-restore NuGets?

Not at this point, meaning you'll have to make sure all NuGets your patches reference are already installed. 

But with Package Manager planned for a later 7.x release, we're aiming to have this solved as well.

## How do i get it?

It ships with the usual vvvv installer. Available for testing in [latest previews](https://vvvv.org/download/). As always, we appreciate your thoughts and prayers!

## Sponsor credits

For the sponsoring of this [open-source](https://github.com/vvvv/VL.Devices.Axis) development we bow to [Refik Anadol Studio](https://refikanadol.com/).

If you also have a request for custom development, [get in touch](mailto:devvvvs@vvvv.org)!