---
categories: "Development News"
author: "joreg"
date: "2025-12-01"
title: "Introducing: Plugins for your vvvv apps"
description: "Your vvvv app can now load .dlls!"
---

Dear deVLopers!

Here is a little bigger one: Remember one of vvvv's killer features? Exactly, **[Application Export](https://thegraybook.vvvv.org/reference/hde/exporting.html)**. Meaning, you can then export and deploy your patches just like any other Windows application. At no extra cost. Zero limitations there.

Then also remember that we've recently introduced **[vvvvc, a commandline compiler](https://thegraybook.vvvv.org/reference/hde/exporting.html#the-commandline-compiler)**, for your patches, allowing you to integrate the application export in your build automation pipeline. 

## And now this: Plugins

Imagine the app you exported and deployed already could be modified/enhanced without you having to re-deploy it entirely. 

How? Because you designed your app in a modular way where you thought about the main app as a host to individual plugins that can be loaded at runtime. So if a plugin needs update, just ship the plugin. If you have new plugins for your app, just ship those. Or deploy your main app to different clients but each client only gets the plugins they need... 

Sounds complicated? It would be indeed, if we wouldn't provide a ready to use template for you. 

## How do i get started?

We have prepared a github repo that you can use as a template: [AppWithPluginsDemo](https://github.com/vvvv/AppWithPluginsDemo).

It demonstrates a most simplistic but fully working example:

![](image.png)

An application that can host plugins based on different datatypes:
- Skia Layer
- Texture
- AudioSignal
  
For each of those types of plugins the app shows a drop-down allowing you to choose between different plugins to be executed. Each type of plugin has its own interface to implement. These interfaces are entirely up to your own design, those provided are mere minimal examples. Plugins implementing your interfaces can be developed and exported individually. 

Here is a quick demo of the app as presented at the recent vvvv meetup. Skip to 1:08:16:

{{< youtube "96h-UvwgSvA?t=4096" >}}

Read the repositories readme carefully! There are a lot details to getting this to work properly in production. If you have questions, feel free to open an issue on the repository.

## Sponsor credits

For the sponsoring of this development we bow to [spacemusic.com](http://spacemusic.com) and [hansen.ch](http://hansen.ch).

If you also have a request for custom development, please [get in touch](mailto:devvvvs@vvvv.org)!