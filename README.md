# Kimi K3.1 Pro Creator Starter Kit

A public, mobile-friendly companion to The AGI Guide's Kimi ad, styled after The AGI Edge.

## Audience outcome

One rough content idea becomes an approved 30-second Reel script, a six-shot filming plan, and a caption through a suggested ten-minute drafting workflow.

- Three copyable prompts with explicit placeholders and expected outputs.
- A brief form personalizes all three prompts locally; it sends no data to Kimi or a server.
- One-click sample brief, full keyboard tab controls, and clipboard fallback.
- Downloadable prompt pack, ten-minute worksheet, and a complete editorial worked example.
- Public reading, personalization, copying, and downloads require no account.

Kimi is a separate service; this kit does not claim free K3.1 Pro access, a trial, or unlimited usage. See SOURCES.md for the official setup sources reviewed on October 28, 2026.

## Preview

Serve `dist/` with any static HTTP server:

```
python3 -m http.server 8787 --directory dist
```

There is no build step or backend. The site uses Google Fonts with local fallbacks. Inputs stay in memory until the page is closed or reloaded.

## Campaign destination

All three conversion links use the exact supplied URL, including intentionally empty UTM values:

```
http://kimi.ai?utm_campaign=TR_YqObYt0Y&utm_content=&utm_medium=Instagram&utm_source=CH_pzQ7f4g6&utm_term=
```

`dist/app.js` defines the canonical destination. HTML anchors also contain it so links work without JavaScript. When updating the campaign, update both locations. Official-source citations point directly to Kimi documentation; they are informational links rather than conversion buttons.

## Downloads

The ZIP in `dist/` contains the three prompt templates, a worksheet, a worked example, and the MIT license. The worked example was written for this guide; it is not a recorded Kimi session or a promise of identical output. Regenerate `dist/prompts.txt` from the `prompts` object in `dist/app.js` and rebuild the ZIP after template changes.

## Hosting and GitHub

Production configuration is in `.openai/hosting.json`. Source is mirrored to this GitHub repository. A GitHub push alone does not deploy the Site. Save and publish the matching source revision through Sites after editing.

This website does not modify Instagram or ManyChat automation. Use the public production URL as that automation's destination.

MIT licensed. Independent guide; not official Kimi documentation.
