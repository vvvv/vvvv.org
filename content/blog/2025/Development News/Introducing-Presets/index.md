---
categories: "Development News"
author: "joreg"
date: "2025-07-01"
title: "Introducing: Presets and Transitions"
description: "A complete cueing solution for your apps parameters"
---

Dear patchers!

Here's to introduce **Presets and Transitions**. Using presets you can take snapshots of any combination of [Public Channels](../Introducing-PublicChannels/index.md), store them in separate files and recall them again anytime. A simple recall will jump to the stored value. Using a transition, values will be smoothly converged to. 

**screenshot**

## Storing presets
There are two ways of storing presets: 
- Via the Channel Browsers "Preset Columns"
- Via a set of nodes

**screenshot**

Presets are stored in simple .xml files. One preset per file. Like this you can re-arrange/re-name presets right in the explorer also get a good view on changes when using version control.

## Recalling presets
There are two ways of recalling presets: 
- Via the Channel Browsers "Presets Panel"
- Via a set of nodes


Obviously, there is some more to transitions (curve, duration) you'll want to control (and you can!) but for simple scenarios the default transition should already allow for quick prototyping. One thing you can change easily, is global transition time:

---

Now that you have your public channels cued using presets, you'll want to send out the actual values of your parameters to the world. This is when you'll want to learn about [Bindings](../Introducing-Bindings/index.md).