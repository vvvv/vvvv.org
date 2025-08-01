---
categories: "Development News"
author: "joreg"
date: "2025-07-24"
title: "Introducing: Presets and Transitions"
description: "A complete cueing solution for your apps parameters"
---

Dear patchers!

Here's to introduce **Presets** and **Transitions**. Using presets you can take snapshots of any combination of [Public Channels](../introducing-public-channels/), store and recall them again anytime. A simple recall will jump to the stored value. Using a transition, values will be smoothly converged to. 

![](presets.png)
<center><small>A preset column to store, and the Presets Panel to trigger snapshots</small></center>

## Storing presets
There are two ways to store presets: 
- Via the Channel Browsers "Preset Columns"
- Via a set of nodes

![](preset-columns.png)

<center><small>Multiple preset columns can be used in parallel, allowing you to capture and manipulate presets.</small></center>

Every preset is stored in small .xml file in a folder called "Presets" next to the main active .vl document. This allows you to re-arrange/re-name presets right in the explorer. Also this is good for version control where you get a good view on changes.

To learn about storing presets programmatically from within a patch check out the help patch of the "StorePreset" node.

## Recalling presets
There are two ways to recall presets: 
- Via the Channel Browsers "Presets Panel"
- Via a set of nodes

![](presets-panel.png)

The Presets Panel shows a list of all available presets. Here you can quickly transition to or jump to any of the them, but also rename them, add descriptions or delete them.

Obviously, there is some more to transitions (curve, duration) you'll want to control (and you can!) but for simple scenarios the default transition should already allow for quick prototyping. 

To learn about recalling presets programmatically from within a patch, check out the help patches of the "RecallPreset" and "TriggerPreset" nodes.

---

Now that you have your public channels cued using presets, you'll want to send out the actual values of your parameters to the world. This is when you need to learn about [Bindings](../introducing-channel-bindings/).