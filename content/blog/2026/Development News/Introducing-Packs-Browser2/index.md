---
categories: "Development News"
author: "joreg"
date: "2026-01-14"
title: "Introducing: A package manager VL Packs"
description: ""
---

Patchers!

One of vvvv's strengths is its high modularity by providing most of its functionality as optional [packs](https://vvvv.org/packs/). Especially useful for when you [export apps](https://thegraybook.vvvv.org/reference/hde/exporting.html), since typically you want your deployments to be as slim as possible, ie. really only including libraries that you're using.

So, granularity with packs is great, but as so often, flexibility also comes with some overhead of managing it: Packs come in different versions, can depend on each other and be compatible amongst each other and vvvv itself, or not. 

Up until now, managing those intricacies was up to you, using a simple commandline tool to install and update packs. Today we're introducing **Packman** who will help you a great deal with organizing the packs used by your apps. So please clear all your assumptions about managing packs in vvvv because once again: Everything you know is wrong!

![alt text](image.png)

{{< box >}}

Highlights:
- A single click to download and reference VL packs 
- Auto-download referenced packs when opening projects
- Fine-grained, central package version management

{{< /box >}}

For basic usage there is not much you need to know:
- Open Packman using Ctrl + F3
- Find the pack you want to use
- Click the blue "Add" button to download and reference it to your active document
- Done
  
If you now save your vl document and open it on another PC, vvvv will automatically download all referenced packs.

Where does vvvv download packs to? The beauty: You don't have to care (somewhere in a system nuget cache). 

That's mostly what you need to know for a start. 

## Updates 

Next thing you may encounter is that a new version was released for a pack that you reference. Packman will hint this to you like:

<image>

In case you want to update, simply choose the new version via the dropdown

<image>

vvvv will now download and reference this new version but also ask you to restart. The reason for the required restart is that vvvv cannot unload the previous version of the pack at runtime. So only a restart makes sure that the newly selected version of the pack is loaded! 

## Version missmatches

A version missmatch warning generally shows up for referenced packs if the version you've chosen does not match the version of the pack that is currently loaded.

This can happen under different circumstances:
- If you see this warning after you've just changed the version of a pack, a restart is required to make sure the newly selected version of the pack is loaded
- In case multiple of your documents explicitly reference a different version of a pack you'll have to sort things and decide on one version for your whole project (see "Reference no specific version" below)
- If the warning shows up on a pack that has the "Built-In" tag, you need to understand the role of those packs, read on:
  
## Built-in packs

vvvv ships with a range of packs that it needs itself to run. You can see those listed in the Built-in section:

<image>

The exact versions of those packs is defined per version of vvvv and cannot be changed! So if you have a version missmatch with one of those, you loose. 

## Reference no specific version

In order to reduce "Version missmatch" warnings with built-in packs and help managing versions of packs across multiple documents there is a special feature: When referencing a pack, you can choose "Don't use specific version". This means that you're delegating the decision as to which exact version of a pack is loaded.  

Generally you'd use this option for packs that have the "Built-In" tag, as in those cases the decision regarding the exact version has already been made for you.

The other situation where this is useful, is larger projects with multiple vl documents that reference the same pack. In such scenarios this feature allows you to centrally manage the version of packs for multiple documents. Simply make sure to only choose specific versions of packs in your main .vl document. In all other documents, referenced by the main document, choose "Don't use specific version". 

## Vulnerabilities

nuget.org (the default package repository vvvv gets packs from) maintains a list of packs with [known vulnerabilities](https://learn.microsoft.com/en-us/nuget/api/vulnerability-info). 

- see it in the dropdown
- see it in buildresult warning, and log

## Custom nuget source

nuget.org is only the default package repository, but you can also host your private packs on other servers. In order for packman to know about those...



## The best thing about Packman

The best thing about Packman is that in the end you will not even need it that much! Using VL packs is now so simple that you won't even notice. Check this: Type the name of any pack in the nodebrowser, select it and you're done. 

gif

Say what? What does this do exactly? Two things: 
- Downloads the preferred (see below) version of the pack
- References this version of the pack with your active vl document

Want to remove the pack again? Same trick:

gif

So once you know what VL pack you need, this is now the quickest way to use it. So when do you now need Packman? 
- To get more information about a VL packs
- To reference .NET packs 
- To adjust versions for referenced packs


custom nuget.config
custom nuget server
test issue with packs being incompatible due to dependencies being built-in

## Preferred version of a pack

The question may arise: When you simply choose to add a reference of a pack, without specifying a version, what version will you get? The answer: vvvv has an idea of a preferred version per pack and here is how that's computed:

- Start assuming the latest stable version of the pack
- Check the [package-constraints](https://github.com/vvvv/PublicContent/blob/master/package-constraints.txt) file for known limitations of the pack regarding the running version of vvvv
- Settle on the latest available stable version of a pack that is not constrained by the package-constraints

See visualization of non-good packs in version dropdown

Keep in mind that the package-constraints file is edited by humans like you. So the information it provides is only as accurate as it is communaly maintained. 

## Favorites

Despite the sheer number of packs available, you may realize that often you only use the same. To give you quick access to those, we've added the idea of favorite packs. You can star packs in the Packman or Helpbrowser and will always get quick access to them. 

Little caveat: If you've used favorites in the Helpbrowser before, those will not be transferred to the new system automatically.

## Support developers

packs to sponsor

## Install packs via Helpbrowser

find packs via helpbrowser -> they are not referenced with a project!

## HDE Extensions

There is a special type of packs we call "Extensions". They provide added functionality for vvvv the development environment itself. Those extension packs can be installed via the new "Extensions" tab in Settings:

<image>

available in 8.0-preview 