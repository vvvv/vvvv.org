---
categories: "Development News"
author: "joreg"
date: "2025-07-01"
title: "Introducing: Channel Bindings"
description: "OSC, RCP, Midi, Redis,... your app parameters"
---

Dear patchers! 

Here's to introduce **Channel Bindings**. They offer a unified way to expose [Public Channels](../Introducing-PublicChannels/index.md) from your app and make them accessible by the outside world. Think easy connections to Midi, OSC, OSCQuery, RCP, Redis,...

## Adding Bindings
There are two ways of adding bindings to a public channel:
- Via the Channel Browsers "Binding" columns
- Using a BindTo... node

Either way you first need to establish the existence of a binding using already familiar nodes from packages like VL.IO.Midi, VL.IO.OSC,...

For OSC, eg. simply place an OSCServer or OSCClient node to get a new binding column in the channel browser:

**screenshot**

Once you have a binding column, you can activate individual bindings for public channels by simply clicking the according checkbox in the column. For all binding types (except Midi) this is already all you needed to do to get a default binding running. In case you want more finegrained control, you can tweak most bindings using the 🖊 button.

Alternatively you can establish bindings to channels (including non-public ones) using the BindTo... nodes coming with the respective IO packages. So for OSC, eg. use the BindToOSC node and you're done.

**screenshot**

Note that also multiple bindings are possible to a single channel. Like this you can e.g. define that a value that comes in via midi, should go out via OSC or the other way round.

## Removing Bindings
Unchecking a checkbox in a binding column or removing a BindTo... node removes the binding. 

