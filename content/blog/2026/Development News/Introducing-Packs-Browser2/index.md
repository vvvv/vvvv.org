---
categories: "Development News"
author: "joreg"
date: "2026-06-22"
title: "Introducing: A package manager for VL Packs"
description: "Or as we call him: Packman"
---

Patchers!

One of vvvv's strengths is its high modularity by providing most of its functionality as optional [packs](https://vvvv.org/packs/). Especially useful for when you [export apps](https://thegraybook.vvvv.org/reference/hde/exporting.html), since typically you want your deployments to be as slim as possible, ie. really only including libraries that you're using.

So, granularity with packs is great, but as so often, flexibility also comes with some overhead of managing it: Packs come in different versions, can depend on each other and be compatible amongst each other and vvvv itself, or not. 

Up until now, managing those intricacies was up to you, using a simple commandline tool to install and update packs. Today we're introducing **Packman** who will help you a great deal with organizing the packs used by your apps. So please clear all your assumptions about managing packs in vvvv because once again: Everything you know is wrong!

Available for testing in [vvvv gamma 8.0 preview builds](/download)!

![Everyone: Packman](image.png)

{{< box >}}

**Highlights**
- A single click to download and reference VL packs 
- Auto-download referenced packs when opening projects
- Fine-grained, central package version management

{{< /box >}}

## Basic Usage

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

![](image-1.png)

In case you want to update, simply choose the new version via the dropdown:

![](image-2.png)

vvvv will now download and reference this new version but also ask you to restart: 

![](image-3.png)

The reason for the required restart is that vvvv cannot replace the version of a pack at runtime. So only a restart makes sure that the newly selected version of the pack is loaded! 

## Version mismatches

A version mismatch warning generally shows up for referenced packs if the version you've chosen does not match the version of the pack that is currently loaded.

![](image-4.png)

This can happen under different circumstances:
- If you see this warning after you've just changed the version of a pack, a restart is required to make sure the newly selected version of the pack is loaded
- In case multiple of your documents explicitly reference a different version of a pack you'll have to sort things and decide on one version for your whole project (see "Reference no specific version" below)
- If the warning shows up on a pack that has the "Built-In" tag, you need to understand the role of those packs, read on:
  
## Built-in packs

vvvv ships with a range of packs that it needs itself to run. You can see those listed in the Built-in section:

![](image-5.png)

The exact version of those packs is defined per version of vvvv and cannot be changed! So if you have a version mismatch with one of those, you loose. In such cases, the only thing that helps is choosing "No specific version", read on:

## Reference no specific version

In order to reduce "Version mismatch" warnings with built-in packs and help managing versions of packs across multiple documents there is a special feature: When referencing a pack, you can choose "Don't use specific version". This means that you're delegating the decision as to which exact version of a pack is loaded.  

![](image-6.png)

Generally this option is the default for packs that have the "Built-In" tag, as for those, the decision regarding the exact version has already been made for you.

The other situation where this is useful, is larger projects with multiple VL documents that reference the same pack. In such scenarios this feature allows you to centrally manage the version of packs for multiple documents. Simply make sure to only choose specific versions of packs in your main .vl document. In all other documents, referenced by the main document, choose "Don't use specific version". 

## Vulnerabilities

nuget.org (the default package repository vvvv gets packs from) maintains a list of packs with [known vulnerabilities](https://learn.microsoft.com/en-us/nuget/api/vulnerability-info) present in individual packs.

When installing a pack, vvvv checks against that list and informs you in case you've chosen an vulnerable version. Keep an eye on the [Log](https://thegraybook.vvvv.org/reference/hde/debugging-log.html) when adding a pack and look out for warnings like the following, to be aware of issues:

![alt text](image-7.png)

## Custom nuget source

nuget.org is only the default package repository, but you can also host your private packs on other servers. In order for Packman to know about those, you can simply specify them via commandline parameter, when launching vvvv, like so:

    vvvv.exe --package-repositories http://mycustomnugetfeed

Obviously, packs from your private feeds will not show up in the listing of curated VL packs but when searching in the Packmans ".NET NuGets" section, they will appear.

## Quick VL pack reference

The best thing about Packman is that in the end you will not even need it that much! If you already know the name of a VL pack you want to reference, you can simply add it via the Nodebrowser. Check this: 

<video width=100% controls autoplay>
    <source src="nfc.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

Type the name of any pack in the nodebrowser, select it and you're done. Any VL pack found in Packman or in the [online packs browser](https://vvvv.org/packs/) can be added like this.

Say what? What does this do exactly? Two things: 
- Downloads the preferred (see below) version of the pack
- References this version of the pack with your active VL document

Want to remove the pack again? Same trick:

<video width=100% controls autoplay>
    <source src="nfc2.mp4" type="video/mp4">
    Your browser does not support the video tag.  
</video>

So when do you now still need Packman? 
- To adjust versions for referenced packs
- To get more information about a VL packs
- To reference .NET NuGets (ie. packs that are not specifically made for VL) 

## Preferred version of a pack

The question may arise: When you simply choose to add a reference of a pack via the Nodebrowser, without specifying a version, what version will you get? The answer: vvvv has an idea of a preferred version per pack and here is how that's computed:

- Start assuming the latest stable version of the pack
- Check the [package-constraints](https://github.com/vvvv/PublicContent/blob/master/package-constraints.txt) file for known limitations of the pack regarding the running version of vvvv
- Settle on the latest available stable version of a pack that is not constrained by the package-constraints

Note how this information is also visualized in the version dropdown of each pack. If vvvv is aware of any incompatibilities between a specific version of a pack and the running instance of vvvv you'll see those "Stop" sign icons, meaning those versions will not work with the current vvvversion.

![](image-11.png)

Keep in mind that the package-constraints file is edited by humans like you. So the information it provides is only as accurate as it is communaly maintained. 

## Favorites

Despite the sheer number of packs available, you may realize that often you only use the same. To give you quick access to those, we've added the idea of favorite packs. You can star packs in the Packman or Helpbrowser:

![](fav.png)

And then get quick access to those in a separate listing:

![](image-8.png)

Little caveat: If you've used favorites in the Helpbrowser before, those will not be transferred to the new system automatically.

## Support developers

Also please pay extra attention to this special listing: 

![](image-9.png)

Packs don't appear out of thin air. They are made and maintained by your fellow patchers. If a pack is useful to you, please support the creator! 

## Install packs via Helpbrowser

There is more. Remember how previously you'd have to find a pack, install it and only then get access to its help patches via the Helpbrowser?

Now, when searching in the Helpbrowser, it also looks for packs that might fit you term and displays those in a separate section labeled "More Packs". If find anything here, you can one-click download the pack and get instant access to its helps.

Note the difference: if you download a pack here, it is simply available offline, it is not yet referenced with any of your documents!

## HDE Extensions

There is a special type of packs we call "Extensions". They provide added functionality for vvvv the "hybrid development environment" itself, ie. they are not tied to any of your projectts. 

Those extension packs can now be installed via the new "Extensions" tab in Settings:

![](image-10.png)

<image>

Ok, that's it. Now over to you.

Available for testing in [vvvv gamma 8.0 preview builds](/download)!