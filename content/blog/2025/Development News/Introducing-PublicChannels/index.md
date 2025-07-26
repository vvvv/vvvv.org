---
categories: "Development News"
author: "joreg"
date: "2025-07-24"
title: "Introducing: Public Channels"
description: "An app wide parameter store"
---

Dear patchers!

Here's to introduce **Public Channels**. They allow you to define app-wide public, named parameters. To get an overview of those, use the new **Channel Browser**: It lists and allows editing of all your public channels, allows you to store and re-call snapshots of their values using **[Presets](../introducing-presets-and-transitions/index.md)** and with just a few clicks allows you to expose them to the world via the idea of **[Bindings](../introducing-channel-bindings/index.md)**.

Yes, this is what we've been talking about for a while now under the code name "Global Channels". And yes, you can test-drive all of this now in the latest [vvvv gamma 7.0 previews](https://vvvv.org/download/).

![](channel-browser.png)
<center><small>The Channel Browser (Ctrl+F4) with a list of channels, their values, a preset column, a binding column and the Presets Panel</small></center>

## Creating a public channel

To create a public channel use the PublicChannel node and give it a path and type. In the simplest case the path is just a name, but it can also contain slashes "/" allowing you to organize public channels in the Channel Browser.

![](public-channels.png)

Once defined like this, the value of a public channel can be controlled via the Channel Browser or from another PublicChannel node given the same path. And being a channel, this also means you get bi-directional ie. read/write access to it!

## Finding PublicChannel nodes
In larger projects with many public channels it can get tricky to remember where all instances of the PublicChannel nodes are. Rigthclicking a public channel in the browser shows you all of them and lets you jump to them.

![](finding-nodes.png)

## Persistence of public channels

Definitions of channels are saved in a separate file with the same name as the active main .vl document but with the file ending ".pc". Like this, when opening a .vl document that has a sibling .pc file, you can rest assured that all public channels are available in the first frame.

Also this is great for version control where you'll see diffs of your changes to public channels in a central spot.

## Removing a public channel

When removing a PublicChannel node, the corresponding channel is *not* automatically removed. The only way to remove a public channel is via the Channel Browser: Rightclick a channel and click "Remove". If now no PublicChannel node is left referencing that channel, it will be gone.

To remove all public channels that are no longer referenced by a PublicChannel node at once, use the "Remove unused channels" entry in the Channel Browsers edit menu:

![](edit-menu.png)

---

The next thing that comes to mind now is how it would be great if you could store snapshots of the current values of your public channels and later recall those. Enter: [Presets](../introducing-presets-and-transitions/index.md). 