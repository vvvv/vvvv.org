# visualprogramming.net (vvvv.org)

Hugo source of the vvvv website (vvvv.org). Blog posts live in `content/blog/<year>/<News|Dates>/<short-name>/index.md`; `README.md` explains post front matter, the media shortcodes (Mastodon, Pixelfed, Vimeo, YouTube, `pic`) and the local build.

## Local build

Install Hugo and Dart Sass on PATH, then `hugo server` in the repository root and open http://localhost:1313/. A full build can be blocked by unrelated legacy posts (for example a missing `user` shortcode); in that case preview an article in an isolated Hugo site that uses the repository blog layout.

## Writing blog posts and announcements

Draft and revise with the `minto-content-review` skill (`.agents/skills/minto-content-review/`). For posts by tebjan, also use `tebjan-vvvv-blog-voice` (`.agents/skills/tebjan-vvvv-blog-voice/`); its owner-specific voice and preservation rules take precedence over a fixed editorial structure. Lessons from earlier posts are in `tasks/lessons.md`; read them before editing an announcement. The rules that came out of them:

- Lead with the capability the reader gets and the visible workflow or result, not the implementation. Keep internal vocabulary (buffers, primitive types, internal example numbers) out unless the reader needs it to act.
- State a benchmark with its setup stated directly and its scope explicit. Do not turn a hardware-dependent result into a general frame-rate claim; give the durable capability and omit the number when hardware and scene decide it.
- When a project moves from announcement to release, re-read the latest forum thread before revising; new capabilities and clean renders replace the teaser material.
- Carry credits and creator links from the authoritative forum post into the technical paragraph rather than adding unrelated links.
- Keep installation in a short final section; hardware guidance is a durable general recommendation.
- Keep the opening's superlative attached to the feature and worded as editorial judgment, not as a universal guarantee. Cut secondary feature mentions the owner has asked to cut.
- Keep unapproved joke lines out of the article; offer wording options separately.
- Keep the full hero image and the square `thumb` resource separate: the article body uses the former, the site listing and social preview use the latter.

Task notes for the current work are in `tasks/todo.md`.
