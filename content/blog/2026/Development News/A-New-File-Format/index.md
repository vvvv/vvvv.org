---
categories: "Development News"
author: "gregsn"
date: "2026-11-09"
title: "A New File Format - Sneak Preview"
slug: "a-new-file-format"
description: "Two languages in one language"
draft: true
---

Dear patchers!

We are happy to announce that we are working on a new file format for vvvv gamma. 

Yes, vvvv is about _visual_ programming. It's not about how it is stored on disc.

<div style="display: flex; gap: 1em;">
<img src="patch.png" alt="patch" style="width: calc(50% - 0.5em); height: auto;">
<img src="xml.png" alt="xml"  style="width: calc(50% - 0.5em); height: auto;">
</div>

### It's not about how it is stored on disc, or is it?

It turns out sometimes you get confronted with situations where you'd wish for an alternative text-based representation of your patches. 

And we could come up with some reasons that are mainly about handling bigger projects and libraries.
But the real benefit of having a more readable file format is a better interaction with LLMs. Let's be honest: this was the driving force here. Make it less cumbersome for an agent to make sense of patches.

### Approach and Design goals

If we'd have a better file format, we thought, agents would be able to make sense of patches without having vvvv running and maybe even human beings would sometimes like to skim through bigger files, trying to understand changes without the need for a tool.

But can we store all the information of a vl document in a *loss-less* way and make it human readable at the same time?
The answer is: It's tricky. 

So we looked at all the vl documents in the standard libraries - their model elements and properties - and tried to find a new representation for each type of element. And instead of only accepting a new loss-less representation we also allowed 
* an acceptable or even desireable loss of outdated or bloated information (repair)  
* a representation that even adds information (making things stick)

### Hybrid Development Environment
![Patch And Script](sideBySide.png)

While the emphasis will always be on the tangability of a programming, we didn't shy away from asking:
Can we make the text-based version in some cases more readable then the visual one? Or at least: are there aspects where the text-based version is more to the point?

### Accumulators as an example

Here is an example where four border control points get represented by one identifier. You see one identifier getting declared: `acc1`. It gets read and written back inside an `If` inside a `Foreach` loop. 
<div style="display: flex; gap: 1em;">
  <img src="acc1script.png"accumulator" style="width: 300; height: auto;">
  <img src="bcps.png" alt="layout" style="width: 40; height: auto;">
</div>

The text based representation doesn't mention those four region control points, just one variable `acc1`. Modify it deep in there and read back outside. A very different form of expression which is more natural for the textual form. And still it's the same thing. It is the direct representation of all those control points and the links in between.

The layout block contains all the missing information that is needed for the visual representation.   
Here you see where nodes are placed and how the original border bontrol points get materialized while referring to `acc1` declared up there in the semantic part. Most links are not mentioned here as they can be inferred already from the code.
<div style="display: flex; gap: 1em;">
  <img src="acc1layout.png" alt="layout" style="width: 300; height: auto;">
  <img src="bcps.png" alt="layout" style="width: 40; height: auto;">
</div>

### A Language with two representations

As we slowly tried to find representations for process nodes, stateful regions, instance operations... we tried to blend them well into a textual description of the program.

![Main Application](app.png)

Some things are descriptive in nature, others are meant to be read like in an imperative language where a lines' position also tells us something about _when_ nodes get called.

The goal was really to combine the best of two worlds and come up with a textual language that is tailored for our visual language and be exactly on par with its feature set and by that end up with ONE language that has TWO ways of representation.

There will be a grammar and introduction.

### Added information & lost information

* Execution order is encoded naturally. Up to now it was inferred and in some cases completely invisible.
* Code is organized per moment / instance operation. VL patches stored which elements got assigned to an operation and inferred the rest of the graph. Now those inferred result is what gets stored matching what you see - the color of a subgraph. We loose the information how it came to be. This makes nodes stick to their "color".
* The node browser has several ways to find a node. Those choices were stored to file. We now only store what node we ended up with, not the way it got searched for.

Regarding bits we lost about 80%. Expect the files to be much smaller.
![](filesize.png)

### Things to be worked on

We have proof of concept, but don't have the full workflow for the transition just yet. We need a merge tool, we need a decision on the file extension and how to convert existing patches and libraries.
Additionally we are working on tools for agentic coding where an agent can focus on the semantic part and vvvv will manage most of the layouting work.

### When?

After the upcoming 8 release. 
We will have a preview phase where we might still refine the syntax and work on how the transition will feel like. 

Thanks & happy patching! More on this soon!