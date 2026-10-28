# Kimi Starter Kit

A public, mobile-friendly follow-up to The AGI Guide's Kimi Space Race ad.

## Audience deliverable

- Three copyable prompts: Space Explorer, a first website, and a research brief.
- A working, self-contained HTML Space Explorer, with planet selection, pause, speed, and reset controls.
- Downloadable ZIP with the HTML project, prompt pack, walkthrough, and MIT license.
- A live demo for mobile visitors.

Design follows The AGI Edge: Geist typography, white and warm-gray surfaces, large tight headings, rounded controls, and subtle borders.

## Local preview

Serve `dist/` with any static HTTP server, e.g. `python3 -m http.server 8787 --directory dist`.

There is no build step. The main page uses Google Fonts with local fallback fonts; the downloadable demo has no external dependencies.

## Campaign destination

Every Kimi link uses this exact URL, including intentionally empty UTM values:

```
http://kimi.ai?utm_campaign=TR_YqObYt0Y&utm_content=&utm_medium=Instagram&utm_source=CH_pzQ7f4g6&utm_term=
```

`dist/app.js` defines the canonical value. HTML anchors also contain it so links work without JavaScript. When updating the destination, update both the JS constant and all HTML anchors, then rebuild the ZIP if the demo changes.

## Hosting and source

The Sites production configuration is in `.openai/hosting.json`. Source is mirrored to this GitHub repository for review and editing. A GitHub push alone does not deploy this Site; a matching source revision must also be saved and published through Sites.

## Scope

This kit does not require an email gate or API key. It does not install or modify Instagram DM automation. It is an independent guide, not official Kimi documentation. The starter is original to this guide, rather than a claim to reproduce the exact ad project. The orbital scene is illustrative and not to scale.

MIT licensed. Kimi and The AGI Edge branding remain associated with their respective owners.
