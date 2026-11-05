---
name: tebjan-vvvv-blog-voice
description: Write or review vvvv.org development posts by tebjan, especially graphics package releases, in his direct technical voice while preserving intentional copy, verified links and exact installation instructions.
---

# Tebjan's vvvv blog voice

Use this skill for a post with `author: "tebjan"`. Read the current draft, a recent published post by the author and the relevant forum update before editing. The author's wording and latest direct copy edits take precedence over any editorial template, including a fixed number of sections. For the path tracing release, the voice samples are `content/blog/2026/Development News/Introducing-VL-Nvidia-PathTracing/index.md` and its linked forum thread.

## Voice and emphasis

- Write for graphics professionals who already know vvvv, patches, Stride and shaders. Be direct, technically fluent and conversational. Keep ambitious claims as editorial judgment where certainty matters; do not flatten them into cautious marketing copy.
- Use **I** for work done by the sole author. Never invent a team with **we**. Neutral phrasing is fine when authorship is not the point.
- Tell the development story through the actual obstacle, the package built to solve it and what that enables in a patch. Explain established VL.Stride shader nodes, pins and live compilation as familiar workflow; the new reach of DX12Bridge is the DirectX 12 shader pipeline, including mesh and ray tracing stages.
- State what readers can make, render or control. Prefer “Text can be rendered as mesh or SDF geometry” to a description of how font data is transformed internally. Keep technical detail when it differentiates the package or helps someone use it.

## Structure and sentence logic

- Make each heading name what its section explains. Split DLSS features from recording. Keep incidental details such as frame rate out of a heading unless they are the reason to read that section.
- Keep the subject of each sentence clear. Do not use **them** when it might refer to shaders, meshes or geometry. Give geometry, instancing, lighting and output their own sentences when they make separate claims.
- Remove filler such as **officially**, “evolving examples” and repeated package-install options when they add no fact or useful direction. Preserve the author's uneven, personal phrasing where it is deliberate.
- Keep original prose and structure when adding coverage. Make the smallest edit that answers a correction; do not rewrite the opening or discard sections to satisfy a template.

## Accuracy and preservation

- Verify user-facing workflows in the author's forum post or product documentation. For this release the author's installation command is exactly `nuget install vl.nvidia.pathtracing`. The vvvv Help Browser shows examples; it does not install packages.
- Preserve existing forum, package and credit links. Before replacing prose, compare the old and new outbound links and restore any that were lost without an explicit request.
- Do not invent a feature, interface, workflow step, version or performance result. Check technical claims against the current package.

## Review pass

Read the whole article as a patcher would. Check that each heading matches its section, every pronoun has one clear referent, distinct features are not joined by a semicolon, the author's role is singular, and each detail earns its place. Compare the draft with its earlier version for missing claims, links, credits and examples. Apply corrections narrowly, then read the surrounding paragraph again for flow.
