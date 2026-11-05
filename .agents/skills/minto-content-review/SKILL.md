---
name: minto-content-review
description: Use when drafting or revising technical, marketing, or decision-oriented prose that should lead with its conclusion, use exactly three supporting reasons, retain only relevant evidence, and pass a concise "so what?" review.
---

# Minto Content Review

Use this as a compact editorial pass for a draft, especially a technical announcement, blog post, proposal, or email.

## Workflow

1. Find the hidden core message. Write the one sentence the reader should remember.
2. Put that conclusion first.
3. Organize the argument around exactly three non-overlapping reasons. Make the three reasons collectively cover the claim.
4. Put only the evidence that supports each reason beneath it. Remove details that support none of the three.
5. Read every remaining claim with "So what?" If the sentence does not change the reader's understanding, confidence, or next action, cut it or attach it to evidence.
6. Preserve the author's voice and technical accuracy. Do not turn an opinion into a fact, and do not inflate "best" or "first" claims without evidence.
7. When an email version is requested, keep it to 150 words or fewer and use the same order: conclusion, three reasons, necessary evidence, next action.
8. Respect the audience's existing knowledge. Skip explanations of the host product, obvious workflows, and surrounding web-page context when the readers already use them.
9. Prefer ordinary paragraphs with concrete technical details over a rigid numbered framework when the piece is meant to read like an essay.
10. Avoid em dashes and contrast templates such as "not X but Y". State the positive claim directly and let the evidence carry the distinction.
11. Delete sentences that merely announce difficulty, importance, or an obvious user benefit. Keep the opening energetic only when it introduces a concrete technical tension or consequence.
12. Do not infer a feature's benefit from its name or from general domain knowledge. When source material is sparse, write less. Every technical claim must be traceable to the supplied source or an explicit user statement.
13. Run a logic pass over every factual sentence: identify the claim, its condition, its evidence, and its scope. Do not put a vague condition next to the concrete case that already supplies it, such as "with enough GPU power" followed by a named GPU benchmark. Do not turn a single measured result into a universal capability.
14. Run a reader-language pass over every technical noun. Remove implementation terms, internal test names, class names, and repository references unless the reader needs them to take the next action. Translate the mechanism into the visible result or workflow it enables. A public post must never use an internal example number as evidence.
15. Lead with the capability or experience being announced, not the vendor, library, renderer implementation, or dependency that provides it. Move stack details into the technical section unless the vendor itself is the subject of the announcement.
16. Keep the opening at the level of the reader's question. Lead with the general compute requirement and result when that is the point; place a specific benchmark machine later as supporting evidence rather than putting its model name in the first sentence.
17. Do not make a universal frame-rate or resolution promise from a benchmark whose outcome varies with the GPU, scene, or settings. Prefer the durable capability and workflow claim, or state the dependency explicitly without inventing a fixed number.

## Audience and voice

- Assume the reader is a graphics professional who already understands vvvv, patches, procedural scenes, shaders, and rendering terminology.
- Do not explain the host product, patch graphs, procedural scenes, or the surrounding website. Those explanations belong in documentation for newcomers.
- Lead with what the reader can make, see, or change. Use a concrete result, a meaningful expert question, or a direct announcement.
- Use recent vvvv blog posts and an existing project or forum announcement as the primary voice reference. Preserve directness, dry humour, concrete examples, and the author's level of confidence.
- Use current repository documentation for factual updates when an older forum post is being used for tone or historical context.

## Public announcement rules

- Do not open with a feature inventory or an acronym list. Put implementation details after the reader understands the work and the reason it matters.
- Do not call a concrete product an "experimental package" in the opening. Mention prerelease status only where it affects installation or expectations.
- Do not weaken a supported result with phrases such as "the early result showed the direction" or "it gives a glimpse" when the source provides a concrete claim. State the claim and its qualification directly.
- Keep public posts evergreen. Avoid fixed prerelease numbers, vvvv versions, driver versions, and hardware matrices. State durable requirements and link to live package documentation.
- A joke must add voice, not replace information. If agent skills or examples are mentioned, state precisely whether they ship with the package or live in the repository.
- Keep image alt text. Remove captions that merely describe what the image already shows; retain captions only when they add context, provenance, or a useful conclusion.
- Every sentence must add a fact, consequence, example, or movement in the argument. Cut staging, generic enthusiasm, filler, and AI-sounding summaries.

## Output shape

For a normal long-form draft:

- one clear conclusion in the opening paragraph;
- three headed sections, one per reason;
- evidence, examples, links, or screenshots under the relevant section;
- a short caveat or next step only when it is necessary to act responsibly.

For a review, report:

- the inferred core message;
- the proposed three reasons;
- overlaps, missing coverage, and orphaned details;
- the lines removed by the "So what?" check;
- an optional <=150-word email version.

## Technical writing guardrails

- Keep product names, versions, dates, capabilities, and performance claims verifiable.
- Separate a capability from a benchmark claim. "Supports path tracing" is not "runs at 120 fps."
- Put installation requirements and hardware caveats where they help the reader decide whether to try the thing.
- Use images as evidence: every image should have a useful alt text and a caption that explains why it is present.
- For an announcement, make the reader's next action obvious without adding a fourth argument.
