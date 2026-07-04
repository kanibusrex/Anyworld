# ✦ Anyworld

**Roleplay in any story ever told — and the AI runs entirely in your browser.**

Anyworld is a single-page, text-based roleplay game. Name any fandom (a book, show, game, or movie) — or invent your own universe — and a living narrator sets the scene, voices every character, and keeps action and dialogue in balance while **you** decide what happens next.

**▶ Play it: https://kanibusrex.github.io/Anyworld/**

No account. No API key. No server. The language model is downloaded once and runs locally on your device via [WebLLM](https://github.com/mlc-ai/web-llm) + WebGPU — so your stories never leave your browser.

## Features

- **Adapts to any fandom** — honors each world's canon, tone, and characters; or build an original setting.
- **Auto-balanced storytelling** — every reply weaves together vivid action/description and in-character dialogue.
- **You stay in control** — the narrator never speaks or acts for your character.
- **100% local & private** — runs on your GPU; nothing is sent to any server.
- **Pick your model** — choose from any WebLLM model, tune creativity and response length in Settings.
- **Handy extras** — streaming responses, Stop / Regenerate, `OOC:` out-of-character asides, and your adventure is saved in your browser.

## Requirements

- A browser with **WebGPU**: recent **Chrome** or **Edge** on desktop is best. **Safari on iOS 18+** also works.
- The first adventure downloads the model once (≈2 GB for the default on desktop), then it's cached and works offline.

### 📱 On iPhone / phones

On-device AI is heavy for phones, so Anyworld automatically uses a **smaller model** (≈1 GB) on mobile. It works best on a recent device (e.g. iPhone 15/16) and is best considered experimental — if it stalls or the tab crashes, play on a laptop or desktop for the full-quality model. You can also add `?mobile=1` to the URL to force the lightweight mobile mode on any device.

> Note: the smaller local models used here know fandom canon less deeply and write rougher prose than large cloud models. That's the trade-off for being completely keyless and private.

## Run it locally

It's just one file. Serve the folder with any static server, e.g.:

```sh
python3 -m http.server 8137
# then open http://localhost:8137
```

(WebGPU requires a secure context — `localhost` and `https://` both qualify.)

## Built with

- [WebLLM](https://github.com/mlc-ai/web-llm) (`@mlc-ai/web-llm`) for in-browser inference
- Vanilla HTML/CSS/JS — no build step, no dependencies to install
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) & [Spectral](https://fonts.google.com/specimen/Spectral)
