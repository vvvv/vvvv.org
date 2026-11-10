---
categories: "Development News"
author: "gregsn"
date: "2026-11-09"
title: "A New File Format - Sneak Preview"
slug: "a-new-file-format"
description: "Two languages in one language"
---

Dear patchers!

We are happy to announce that we are working on a new file format for vvvv gamma.

Yes, vvvv is about _visual_ programming. It's not about how it is stored on disk.

<div style="display: flex; gap: 1em;">
  <img src="patch.png" alt="Patch" style="width: calc(50% - 0.5em); height: auto;">
  <img src="xml.png" alt="XML" style="width: calc(50% - 0.5em); height: auto;">
</div>

### It's not about how it is stored on disk, or is it?

It turns out that sometimes you are confronted with situations where you'd wish for an alternative, text-based representation of your patches.

We could come up with some reasons that are mainly about handling bigger projects and libraries.
But the real benefit of a more readable file format is better interaction with LLMs. Let's be honest: this was the driving force here. We wanted to make it less cumbersome for an agent to make sense of patches.

### Approach and design goals

If we had a better file format, we thought, agents would be able to make sense of patches without having vvvv running. Maybe even human beings would sometimes like to skim through bigger files and understand changes without the need for a tool.

But can we store all the information of a VL document in a _lossless_ way and make it human-readable at the same time?
The answer is: it's tricky.

So we looked at all the VL documents in the standard libraries, their model elements and properties, and tried to find a new representation for each type of element. Instead of only accepting a new lossless representation, we also allowed:

- an acceptable or even desirable loss of outdated or bloated information (repair)
- a representation that even adds information (making things stick)

### Hybrid development environment

![Patch and script side by side](sideBySide.png)

While the emphasis will always be on the tangibility of programming, we didn't shy away from asking:
Can we make the text-based version more readable than the visual one in some cases? Or at least: are there aspects where the text-based version is more to the point?

### Accumulators as an example

Here is an example where four border control points are represented by one identifier. You see one identifier being declared: `acc1`. It is read and written back inside an `If` inside a `Foreach` loop.

<div style="display: flex; gap: 1em;">
  <img src="acc1script.png" alt="Accumulator script" style="width: 300px; height: auto;">
  <img src="bcps.png" alt="Border control points" style="width: 40px; height: auto;">
</div>

The text-based representation doesn't mention those four border control points, just one variable `acc1`. You modify it deep inside and read it back outside. This is a very different form of expression, which is more natural for text. And still it's the same thing: a direct representation of all those control points and the links in between.

The layout block contains all the missing information that is needed for the visual representation.
Here you see where nodes are placed and how the original border control points get materialized while referring to `acc1`, declared up there in the semantic part. Most links are not mentioned here, as they can already be inferred from the code.

<div style="display: flex; gap: 1em;">
  <img src="acc1layout.png" alt="Accumulator layout" style="width: 300px; height: auto;">
  <img src="bcps.png" alt="Border control points" style="width: 40px; height: auto;">
</div>

### A language with two representations

As we slowly found representations for process nodes, stateful regions, instance operations and more, we tried to blend them well into a textual description of the program.

![Main application](app.png)

Some things are descriptive in nature, others are meant to be read like in an imperative language, where a line's position also tells us something about _when_ nodes get called.

The goal was to combine the best of two worlds: a textual language that is tailored to our visual language and exactly on par with its feature set. In the end, that gives us **one** language with **two** representations.

There will be a grammar and an introduction.

### Added and lost information

- **Execution order** is encoded naturally. Up to now it was inferred and in some cases completely invisible.
- **Code is organized per moment / instance operation.** VL patches stored which elements were assigned to an operation and inferred the rest of the graph. Now that inferred result is what gets stored, matching what you see: the color of a subgraph. We lose the information of how it came to be, which makes nodes stick to their "color".
- **Node browser choices are no longer stored.** The node browser has several ways to find a node, and those choices used to be written to file. We now only store which node you ended up with, not how you searched for it.

Regarding bytes, we lost about 80%. Expect the files to be much smaller.

![File size comparison](filesize.png)

### Things to be worked on

We have a proof of concept, but not the full workflow for the transition just yet. We still need:

- a merge tool
- a decision on the file extension
- a way to convert existing patches and libraries

Additionally, we are working on tools for agentic coding, where an agent can focus on the semantic part and vvvv manages most of the layouting work.

### When?

After the upcoming 8 release.
We will have a preview phase where we might still refine the syntax and work on how the transition will feel.

Thanks & happy patching! More on this soon!
