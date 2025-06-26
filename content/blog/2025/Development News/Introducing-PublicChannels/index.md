---
categories: "Development News"
author: "joreg"
date: "2025-07-01"
title: "Introducing: Public Channels"
description: "An app wide parameter store"
---

Dear patchers!

Here's to introduce **Public Channels**. They allow you to define app-wide public named parameters. To get an overview of those, use the new Channel Browser: It lists and allows editing of all your public channels, allows you to store and re-call snapshots of their values using [Presets](../Introducing-Presets/index.md) and with just a few clicks allows you to expose them to the world via the idea of [Bindings](../Introducing-Bindings/index.md).  

**screenshot**

(Yes, this is what we've been talking about for a while now under the code name "Global Channels")

## Creating a public channel

There are different ways to create a public channel:
- Via the Channel Browsers + button
- Using a PublicChannel node
- There is also a way to automatically create them from properties, which we'll introduce separately

Either way you define a name and type to establish the Channel which is now globally available under the given name in all your app. Being a channel, this also means you get bi-directional ie. read/write access to it.

**screenshot**

## Persistence of public channels

Definitions of channels are saved in a separate file called "publicchannels.xml" that is referenced to your main document. This means that on opening a document you can rest assured that all your public channels are available in the first frame. Also this is great for version control where you'll see diffs of your changes to anything public channel related, in a central spot.

## Deleting a public channel

There is only one way to delete a public channel: In the Channel Browser UI, find the 🗑 button to remove a channel.

**screeenshot**

The next thing that comes to mind now is how it would be great if you could store snapshots of the current values of your public channels and later recall those. Enter: [Presets](../Introducing-Presets/index.md). 