# BSDtech — Short Homepage ScrollCinema · Architecture Review

**Status:** `BSDTECH_SHORT_SCROLLCINEMA · ARCHITECTURE_REVIEW_PENDING`

> **Superseded in part by [`ARCHITECTURE_V2.md`](ARCHITECTURE_V2.md)**. This file stays as the audit record: asset inventory (A) and archive manifest (B).
**Date:** 2026-09-24
**Scope source:** "NEW HOMEPAGE SCROLLCINEMA MASTER SCOPE — SHORT / DYNAMIC / SALES-FOCUSED"
**Nothing in this review was generated, coded, deployed or paid for.** Higgsfield was only *read*: generation history, uploads, prices and balance.

---

## 0. Audit baseline: what actually exists

| Location | Contents | Relevance |
|---|---|---|
| Repo `bsdspain-group/pagina-BSDtech` (all 3 branches) | Static HTML prototype of the site: `index.html`, 4 sector pages, `plantilla-maquina.html`, `contacto.html`, `css/style.css`, `css/machine-template.css`, `js/main.js`, `assets/favicon.svg` | **No ScrollCinema code, frames, videos or cinematic assets are in any branch.** |
| Higgsfield account (read-only) | 30 videos, 29 images, 28 uploaded media. Balance **83 credits** (Plus) | This is where all of the old cinematic work lives. |
| Real BSDtech logo master | **Not found** in the repo. The header uses the text `BSD<span>tech</span>` as a stand-in, and `favicon.svg` is a drawn "B" | Needed as SVG before any branded overlay. |

> ⚠️ **Visual verification is still needed.** This container's network policy blocks the Higgsfield CDN hosts (`d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net`), and ffmpeg isn't installed. The assessments below come from each generation's prompt, model, resolution, duration and media lineage. **I haven't watched the clips.** Marks: ✅ = safe from metadata, 👁 = needs your eyes.
>
> If an old runtime prototype (a JS engine, frame extractor or 8‑machine showroom UI) exists outside this repo, for example on a local machine, share it and I'll add it to sections N and O.

---

## A. Existing assets that can be reused

| ID (Higgsfield) | What it is | Res / dur | Use in new film | Verdict |
|---|---|---|---|---|
| `6351d05c` (upload) | Cleaned factory exterior still (supplier signage removed via `e42076b8` / `7e8184a3`, sky replaced via `ba06accd`) | 2K still | **Start frame of Scene 01.** The master reference for the factory | ✅ Reuse. 👁 Check no KINGRICH/Chinese text remains |
| `122847fe` | Factory exterior → shutter opens → camera enters the interior | **480p**, 6 s | Best match for "start directly at the factory". Candidate for Scene 01 | 👁 Motion reference only. 480p is too soft for desktop frames. Re-render at 1080p from the same start frame and prompt, or upscale with Topaz (3 cr) and judge |
| `cad1c3ac` | Continuation: district aerial → descends → shutter opens → workshop aisle | **480p**, 18 s | Its *tail* (~last 8–10 s) covers entry + workshop | 👁 The head is aerial (archive). The tail is usable only as a motion/composition reference at 480p |
| `c62d5d2a` | Courtyard → closed shutter (never opens) | 480p, 8 s | Too slow and too long for a 2–3 s beat | Archive (reference only) |
| `0ad56ae1`, `f91a50b1` (uploads) | Courtyard wide shot / close shutter framing stills | stills | Alternative start/end keyframes for Scene 01 | ✅ Keep as keyframes |
| `1b1989ef` | Flat frontal 21:9 showroom elevation: empty bays plus a **large loading shutter at the far right** | 2688×1152 | **Showroom plate.** Its right-hand loading door is a natural exit into "export" | ✅ Strong candidate. 👁 Designed for 8 bays; only 4 will be filled |
| `c68fbec6` | Long hall, 21:9, 8 bays on both sides | 2688×1152 | Alternative showroom plate | Secondary |
| 9 uploads used as "real machine" refs in the S01 brief: `38eeb473 f1674b17 c81fc5f0 73af1201 bfd27fc5 cc5348be 49d14e42 bb478baa e43e6ce4` | Very likely the real machine photos | stills | Pick **one per sector**, then remove the background → real PNG/WebP cutouts | 👁 **You pick the 4 representatives** |
| `8ea5f081`, `6ce99bcc`, `4e80481d` (uploaded 23 Sep, never used) | Unknown | stills | ? | 👁 Tell me what these are (logo? new machines?) |
| Existing site design tokens | `#14161a` dark, typography stack | — | Module UI base (scoped copies, not shared) | ✅ |

## B. Old scenes to archive and remove from the active runtime

Archive, **don't delete**. They move to an `archive/legacy-long-cinema/` manifest, and the new runtime never references them.

| Old scene | Higgsfield IDs | Reason |
|---|---|---|
| SC01 Clouds | `4ea5f43a` (src) · `b4bb0a02 dfdd6eea 75156ee5 b5bafc40 5300ac19` | No sky intro |
| SC02 China | `de7a8821` (src) · `0b0b5c49 f52953f0 fa309229 87d385f3 2a701506 a33f50cf` | No China map |
| SC03 Zhejiang | `025bde3c` (src) · `a1e3a9a7 11463122 e7d4ea82` | Removed |
| SC04/05 Wenzhou | `09cfe825 449f5994 b6cd50bc` (src) · `98bf821b ac6569ea cb8ff2bb 51245b5f 661393b5` | Removed |
| SC06 Industrial district | `d5b89731` (src) · `bdccd8e4` + Topaz `593cbd78 761acbd9` | Removed. Kept only as the parent of `cad1c3ac` |
| SC07/08A approach | `c62d5d2a` | Too long |
| S01 footwear "master brief" videos | `09ee35c4 0f41471a bd3a070c b26c56b8` | Machines were *generated* inside video. **This breaks the four-machine rule (§8)** |
| SC09 8‑bay Technology Hall perspective series | `22dc7cd2 e4426c99 8eef40bb 9586d920 18f3b688 422f0226 c6967592 dcdb8227 32367da2 898e6c06 66495aa2 08db8605 cf261902 a9722710 cde22c37 f9b40753 b00e0201 0f412650 e33dc83d 8480e7be d60981c5 f86f7ad1 8c699d1e 632c0c82` | The 8‑machine interactive showroom is removed |
| `selectedMachine` interaction, packing, logistics, arrival, installation, after-sales | (never generated) | Out of homepage scope |
| `cbaedfac` (desk/monitor 9:16) | — | Unrelated to the project |

## C. Storyboard: 17 s source

```
t(s)  0 ────── 2.5 ──── 4.5 ───── 6.5 ── 8.0 ────────── 11.5 ── 13.0 ──── 15.0 ──── 17.0 [HOLD]
      FACTORY   WORKSHOP  SHOWROOM  EXPORT  SHIP (aerial)   TURQ.   TRUCK     TU EMPRESA  CTA
```

| # | Beat | Source time | Picture | Meaning |
|---|---|---|---|---|
| 01 | Factory entry | 0.0–2.5 | Low, heavy push toward the cleaned factory (`6351d05c`). The shutter lifts and the camera crosses the threshold | Origin, manufacturing |
| 02 | Workshop | 2.5–4.5 | Same move continues down the aisle. Workers doing real work (machining, welding, sheet-metal prep, assembly), no posing, minimal sparks | "This is where machinery comes from" |
| 03 | Four-sector showroom | 4.5–6.5 | Camera emerges into the showroom plate. **4 real machine cutouts** composited in canvas (2.5D push). A subtle accent light per sector | Breadth, 4 sectors |
| 04 | Export | 6.5–8.0 | The loading door flares → **container doors swing shut** (tight shot, dark steel) → container lifted / crane silhouette | The machine leaves origin |
| 05 | Container ship | 8.0–11.5 | Premium high aerial of a large container vessel on open sea, slow drift. **The main message beat** | International, credible |
| 06 | Turquoise container | 11.5–13.0 | Camera descends toward one **turquoise (#04B3B1)** container in the stack and ends **top‑down, tight** on it | "This one is yours" |
| 07 | Truck | 13.0–15.0 | **Match cut** on the same top‑down framing → the container is now on a truck chassis. The camera rises and follows the truck | Same shipment, moving to you |
| 08 | Your company | 15.0–17.0 | The truck turns into a modern, unbranded industrial site and slows at the dock | Destination |
| 09 | CTA hold | (last frame) | Final frame holds with a slow canvas scale of 1.00→1.03 | Read, understand, click |

## D. Clip / asset structure

Continuity comes before clip count. The transitions are designed around what AI video does reliably:
continuous camera moves **inside** a clip, and designed cuts **between** clips.

| Asset | Content | Source dur | Generation method | Notes |
|---|---|---|---|---|
| **A** | Factory entry → workshop | ~4.5 s | Seedance 2.5 i2v, start = `6351d05c` | Reuses the prompt DNA of `122847fe`, adds workers. Its last frame is extracted as the key for the showroom |
| **S** | Showroom | ~2 s equivalent | **No video.** Still plate (`1b1989ef` or a 16:9 regen) + 4 real machine cutouts, animated in canvas | Guarantees machine fidelity. Costs ~0 credits |
| **B** | Container doors close → lift → ship aerial → descent to the turquoise container, ending top‑down | ~6.5 s | Seedance 2.5 i2v with start keyframe (container doors) and end keyframe (top‑down turquoise container) | One continuous shot: export + ship + turquoise |
| **C** | Top‑down turquoise container on truck → rise → follow → company site → stop | ~4 s | Seedance 2.5 i2v, start = the **same top‑down crop** as B's last frame, recoloured onto a truck chassis | The match cut hides the clip boundary |
| Keyframes | Container doors, top‑down turquoise on ship, top‑down turquoise on truck, final company frame | stills | GPT Image 2.5 / Kling O1 / Nano Banana (0.5–2.75 cr each) | Locking start/end frames cheaply cuts the number of video retries |

That's 3 generated clips (~15 s) plus 1 composited plate (~2 s), ≈ 17 s in total.

## E. WordPress + Elementor integration architecture

**Delivery:** a tiny must-use plugin, `bsdtech-scrollcinema.php` (~40 lines), plus a static module folder uploaded by **SFTP**.
**Never use the Media Library for frames.** It would create thumbnails for ~300 images.

```
/wp-content/uploads/bsdtech-scrollcinema/v1/   ← static module (immutable, versioned)
/wp-content/mu-plugins/bsdtech-scrollcinema.php ← registers shortcode + enqueues only where used
```

The mu-plugin does three things:
1. Registers the shortcode `[bsdtech_scrollcinema]` and outputs the mount markup. It sets `data-lang` from `determine_locale()` (WPML/Polylang aware) and `data-assets-base` from the upload URL.
2. Enqueues `bsdtech-scrollcinema.css` / `.js` **only when the shortcode renders**, with `'strategy' => 'defer'`. No other page is affected.
3. Adds `<link rel="preload" as="image">` for the correct poster (desktop or mobile via `media` attr) on that page only.

**In Elementor:** one full‑width container, padding 0, **Overflow: Default**, containing a **Shortcode widget** with `[bsdtech_scrollcinema]`. No theme or Elementor changes.

Rendered mount contract:

```html
<section id="bsdtech-scrollcinema" class="bsdsc"
         data-lang="es"
         data-assets-base="https://bsdtech.es/wp-content/uploads/bsdtech-scrollcinema/v1/"
         data-offset-top="0"            <!-- sticky header height, px -->
         data-datalayer="true">         <!-- optional GTM push -->
  <script type="application/json" class="bsdsc-config">
    { "cta": {
        "whatsapp": "https://wa.me/34XXXXXXXXX?text=…",
        "phone":    "tel:+34XXXXXXXXX",
        "info":     "/contacto/?origen=scrollcinema" } }
  </script>
  <!-- server-rendered fallback: poster <img> + H2 + importer copy + 3 CTA <a> -->
</section>
```

- **CTA links, phone numbers and texts are editable from WordPress** (inline JSON / shortcode attributes). Nothing is hard-coded in the engine.
- **The server-rendered fallback HTML is the baseline.** JS only *enhances* it. If JS fails, or is blocked or delayed, visitors still see poster + message + working CTA links. That covers §41 and SEO.
- **Global API:** exactly one global, `window.BSDScrollCinema = { init(el, opts), destroy(el), version }`. Auto-init targets `#bsdtech-scrollcinema` / `[data-bsdsc]` only.
- **Elementor editor:** if `elementorFrontend.isEditMode()`, it renders the static fallback only. No pinning, no frame loading.
- **Re-init safety:** `destroy()` removes listeners, `IntersectionObserver`/`ResizeObserver`, rAF, and bitmaps (`ImageBitmap.close()`). `init()` is idempotent per element.
- **Caching plugins (WP Rocket, LiteSpeed, etc.):** exclude `bsdtech-scrollcinema.js` from *combine* and *delay JS*. Exclude the poster from lazy-load (the class `skip-lazy` plus `data-no-lazy="1"` is output automatically). Frames: `Cache-Control: public, max-age=31536000, immutable`. The `/v1/` path is the cache buster.

## F. File / folder structure

```
bsdtech-scrollcinema/                  (new top-level folder in this repo)
├── src/
│   ├── index.js            entry, auto-init, public API
│   ├── engine.js           scroll → progress → frame index (rAF, passive listeners)
│   ├── renderer.js         canvas draw, cover-fit, crop path, frame crossfade
│   ├── loader.js           scene registry, priority queue, prefetch, memory window
│   ├── showroom.js         plate + 4 machine cutouts (2.5D)
│   ├── overlays.js         DOM copy/CTA timing from scenes.json
│   ├── events.js           analytics CustomEvents (+ optional dataLayer)
│   ├── i18n.js             lang resolve + fallback EN
│   └── styles.css          ALL rules under #bsdtech-scrollcinema / .bsdsc-*
├── config/
│   ├── scenes.json         scenes, frame counts, scroll ranges, crop paths, copy timing
│   └── i18n.json           es / en / it / pt
├── dist/                   built output (esbuild, no framework)
│   ├── bsdtech-scrollcinema.js
│   └── bsdtech-scrollcinema.css
├── assets/
│   ├── desktop/<scene>/0001.webp …
│   ├── mobile/<scene>/0001.webp …
│   ├── showroom/{plate-desktop,plate-mobile,m-s01,m-s02,m-s03,m-s04}.webp
│   ├── posters/{desktop,mobile,final-desktop,final-mobile,reduced-*}.webp
│   └── brand/bsdtech-logo.svg      (real master, supplied by BSDtech)
├── tools/
│   ├── extract-frames.sh   ffmpeg: master mp4 → graded, cropped WebP sequences per tier
│   └── measure.mjs         size/decoding benchmark → report
├── wordpress/
│   └── bsdtech-scrollcinema.php   mu-plugin (shortcode + enqueue)
├── demo/index.html         standalone test page (fake header/footer to test isolation)
├── archive/legacy-long-cinema/MANIFEST.md   IDs from section B
└── README.md               integration guide for WordPress / Elementor
```

Build tooling is **esbuild only**, as a dev dependency. Runtime dependencies: **none**.

## G. Scroll timeline (percent of pinned progress)

Pinned track height is **600 vh desktop / 520 vh mobile**, i.e. ~5 / ~4.2 viewport heights of travel.

| Progress | Beat | Source frames | Weight |
|---|---|---|---|
| 0 – 8 % | 01 Factory entry | A 0–2.5 s | short |
| 8 – 16 % | 02 Workshop | A 2.5–4.5 s | short |
| 16 – 27 % | 03 Showroom (4 sectors) | S plate, 2.5D | short |
| 27 – 34 % | 04 Export | B 0–1.5 s | short |
| **34 – 60 %** | **05 Ship + importer message** | B 1.5–5.0 s | **LONG (26 %)** |
| 60 – 68 % | 06 Turquoise container | B 5.0–6.5 s | medium |
| 68 – 78 % | 07 Truck | C 0–2 s | medium |
| 78 – 85 % | 08 Your company | C 2–4 s | medium |
| **85 – 100 %** | **09 CTA hold** | last frame (+1.03 scale) | **HOLD (15 %)** |
| 100 % | release | sticky ends, normal Elementor page continues | — |

The mapping is piecewise-linear from scroll progress to scene time. It's defined in `scenes.json`, so pacing can be retuned without code changes.

## H. HTML copy timing

The copy below is Spanish master copy. EN / IT / PT live in `i18n.json`, and English is the fallback.

| In → out (progress) | Element | Copy (ES) |
|---|---|---|
| 0 – 16 % | — | *(no text; optional small scroll hint for the first 3 %)* |
| 18 – 27 % | H2 | **Cuatro sectores. Una red de fabricación.** |
| 20 – 27 % | 4 sector labels, staggered, each with its accent rule | Calzado y marroquinería `#04B3B1` · Metalurgia `#FF730E` · Inyección de plástico `#0019FF` · Tampografía `#C7FF50` |
| 36 – 60 % | H2 (line 1, then line 2 at 42 %) | **Tu empresa importa.** / **Nosotros te acompañamos.** |
| 46 – 60 % | Small body | BSDtech España actúa como asesor comercial y coordinador. La importación se realiza a nombre del cliente. |
| 50 – 60 % | Process line (thin rule, 4 dots, no boxes) | FABRICACIÓN → EXPORTACIÓN → IMPORTACIÓN → TU EMPRESA. The active dot follows progress (import = 60–68 %, company = 78 %+) |
| 80 – 100 % | Label near the destination | **TU EMPRESA** |
| 86 – 100 % | H1-size | **DE CHINA. A TU EMPRESA.** |
| 89 – 100 % | Sub | Tu empresa importa. Nosotros te acompañamos. |
| 91 – 100 % | CTA row + small line | [Hablar por WhatsApp] [Llamar] [Solicitar información] · *Habla con un asesor.* |

**Legal copy guardrails** (enforced in `i18n.json` review):
- Never "importamos", "nos encargamos de la aduana" or "incluye aranceles".
- Always use the verbs *asesorar*, *acompañar*, *coordinar*. The client is the grammatical subject of *importar*.

⚠️ **Conflict in the existing site copy.** `index.html` says "BSDtech **distribuye** e instala equipos", the footer says "Distribuidor de equipos", and a feature card says "Consumibles **en stock**". In Spanish commercial language, *distribuidor* suggests that BSDtech buys and imports. Please review the WordPress homepage copy so it doesn't contradict the film. (I haven't touched it.)

## I. Desktop / mobile asset strategy

| | Desktop tier | Mobile tier |
|---|---|---|
| Selection | `matchMedia('(min-width: 900px) and (hover: hover)')` **and** not `saveData` | everything else |
| Frame size | 1280×720 (canvas upscales on large screens; soft motion tolerates it). A 1600×900 tier is added only if the benchmark stays under ~80 KB/frame | **720×960 (3:4)**, cropped from the 16:9 masters |
| Composition | full 16:9, `object-fit: cover` behaviour | per-scene **crop path** (`cropX` keyframes in `scenes.json`) that follows the subject (door, ship, container, truck) |
| Frames | ~170 | ~130 |
| Scroll span | 600 vh | 520 vh |
| Showroom | plate 1920 wide + 4 cutouts @ ~700 px | plate crop + cutouts arranged 2×2 |

- The desktop master never loads on mobile, because the tier is decided **before** any frame request.
- `saveData` or `effectiveType` of 2g/3g → reduced-motion experience (posters + copy + CTA, ~300 KB).
- **Generation implication:** every prompt asks for the key subject to stay inside the **central 45 % vertical band**, so a single 16:9 master can serve both tiers. That saves paying for separate 9:16 masters.

## J. Estimated page weight

These are estimates from typical photoreal WebP ratios, **not measurements** (see K for the benchmark gate).

| Category | Desktop | Mobile | When |
|---|---|---|---|
| JS (engine, gzipped) | ~9–12 KB | same | deferred |
| CSS (gzipped) | ~3 KB | same | head |
| Poster (LCP) | ~90 KB | ~55 KB | immediate, preloaded |
| Critical frames (scene 01, first ~30) | ~1.6 MB | ~1.0 MB | after `load` / idle, or when the section is within 1.5 viewports |
| Remaining frames | ~7.8 MB | ~4.2 MB | progressive, next-scene prefetch |
| Showroom plate + 4 cutouts | ~0.45 MB | ~0.3 MB | with scene 02 |
| Final poster + reduced-motion stills | ~0.25 MB | ~0.15 MB | lazy |
| **Total if fully scrolled** | **≈ 10 MB** | **≈ 5.7 MB** | |
| **Blocking first paint** | **≈ 100 KB** | **≈ 65 KB** | |

For comparison: the equivalent 1080p H.264 video would be ~5–7 MB desktop. Frames cost roughly 1.5× the bytes, but those bytes load progressively and never block the page (see K).

## K. Engine recommendation: frame sequence vs runtime capture

**Recommendation: A. Pre-extracted WebP frame sequences → canvas.** AVIF gets reconsidered only after the benchmark.

| Criterion | A. Pre-extracted WebP frames | B. One-time browser decode + frame cache |
|---|---|---|
| Download | ~10 MB / 5.7 MB | ~5–7 MB / ~2.5 MB ✅ |
| Time to first interactive frame | first ~30 frames, only ~1 MB ✅ | the whole video must download and be decoded first |
| Decode path | `createImageBitmap` off-main-thread, per frame, in a window ✅ | `<video>` seek-and-capture needs ~170 sequential seeks at 50–150 ms each on phones = **8–25 s of jank**. WebCodecs needs an MP4 demuxer (~80 KB) plus a fallback path for older iOS |
| Memory | only a sliding window of decoded bitmaps (~±24 frames ≈ 90 MB desktop, ≈ 60 MB mobile) ✅ | decoded frames are 3.7 MB each at 720p. They must be re-encoded or windowed, so B ends up doing A's job at runtime |
| iOS Safari | robust ✅ | inline/muted/offscreen video quirks, and memory kills on older iPhones |
| WordPress hosting | plain static files, CDN-cacheable, no range requests needed ✅ | needs correct byte-range serving. Some hosts and CDNs break it |
| Engineering | simple registry ✅ | two decoders and many edge cases |

B wins only on bytes, and that saving is paid for in startup time, jank and fragility on the devices that matter most.

**Frame tricks that keep A light:**
- **Variable frame density.** Frames are allocated by motion, not by scroll share. The ship beat gets a long scroll but a slow camera, so it uses ~10 fps of frames plus **fractional crossfade**: the canvas draws frame *n*, then frame *n+1* at alpha = fraction. Slow shots stay smooth with fewer frames.
- **Hold beat = 1 frame.** The CTA hold spends zero extra bytes.
- **Showroom = 5 images**, not a frame sequence.

**Benchmark gate before implementation.** Once the masters exist, `tools/measure.mjs` encodes each scene at WebP q60/70/80 and AVIF q50/60, reporting KB/frame and decode ms/frame on a mid-range Android and an iPhone. The final format and quality are chosen from that report. I can't measure now: no masters exist in the new format, and this container can't reach the Higgsfield CDN.

**No GSAP.** Pinning is CSS `position: sticky` inside a tall track, plus one passive scroll listener feeding rAF. That saves ~27 KB gzipped and avoids pin-spacer conflicts with Elementor.
- Fallback: at init the engine walks up the ancestors. If a theme wrapper has `overflow: hidden/auto` (which breaks sticky), it switches to a `position: fixed` pin driven by the same progress value.
- GSAP can be added later behind the same `engine.js` interface if you want it.

## L. Higgsfield assets still required

Prices below are **observed from your transaction history**, not guessed.
- Seedance 2.5: **1080p = 9 cr/s**, **480p = 2.5 cr/s**.
- Topaz video upscale: 3 cr.
- Nano Banana Pro: 2 cr. Kling O1 Image: 0.5 cr. GPT Image 2.5: 1–2.75 cr.
- The 720p price hasn't been observed yet. I'll check it before quoting.

| # | Asset | Model | Dur/Res | Est. cost |
|---|---|---|---|---|
| L1 | Keyframe: container doors closing (no text) | Kling O1 / GPT Image 2.5 | 16:9 2K | ~1–3 cr |
| L2 | Keyframe: top-down turquoise container in ship stack | same | 16:9 2K | ~1–3 cr |
| L3 | Keyframe: same top-down turquoise container on truck chassis (L2 as reference) | Nano Banana Pro / Kling O1 | 16:9 2K | ~2 cr |
| L4 | Keyframe: final company site, truck at dock, no signage | same | 16:9 2K | ~1–3 cr |
| L5 | Showroom plate at 16:9 with 4 bays (only if `1b1989ef` doesn't crop well) | GPT Image 2.5 | 2K | ~3 cr |
| L6 | 4 machine cutouts (background removal on your real photos) | remove_background | — | small (to quote) |
| V‑A | Factory entry → workshop with workers | Seedance 2.5 i2v | 5 s · 1080p | **45 cr** |
| V‑B | Doors → ship aerial → turquoise top-down | Seedance 2.5 start+end | 7 s · 1080p | **63 cr** |
| V‑C | Truck top-down → follow → company | Seedance 2.5 start+end | 4–5 s · 1080p | **36–45 cr** |
| | **One clean pass** | | | **≈ 155–165 cr** |

**Budget reality.** One clean 1080p pass costs more than your current 83 credits, and it doesn't include retries. Two ways forward:
1. **Draft-then-final (recommended).** Motion drafts at 480p (≈ 40 cr for all three), approve the motion, then 1080p finals (≈ 150 cr). This needs a top-up.
2. **Economy.** 480p finals + Topaz upscale (≈ 40 + 9 cr). This fits the balance, but desktop sharpness is at risk. It's acceptable for mobile and needs your visual judgement for desktop.

Following §33, each generation will first be presented as **SCENE / MODEL / WORKFLOW / DURATION / RESOLUTION / COST / PROMPT / RISKS**, with no automatic retries.

## M. Transition strategy

| From → to | Technique | Why it works |
|---|---|---|
| Factory → workshop | **In-camera**: one continuous move through the shutter (clip A) | Proven in `122847fe` / `cad1c3ac` |
| Workshop → showroom | **Light-threshold transition**: clip A ends pushing into a bright doorway; canvas crossfades over ~2 % progress to the showroom plate, whose own light matches | No AI morphing, and the real machines stay untouched |
| Showroom → export | 2.5D push toward the **plate's loading shutter** (right side of `1b1989ef`) → white-hot light bloom → clip B opens on container doors closing | The door is a shared motif: showroom exit = container entry |
| Export → ship | **In-camera** (clip B): doors close → pull up and out → aerial reveal of the vessel | Pull-back reveals feel premium and scale up naturally |
| Ship → turquoise container | **In-camera** (clip B): slow descent onto a container that is **turquoise from the first frame** (never recoloured mid-shot) | No colour morphing; the eye finds the only saturated block |
| Turquoise container → truck | **Top-down match cut**: B ends and C starts on identical framing of the same turquoise roof | The cut is invisible because the colour block, position and scale match |
| Truck → company | **In-camera** (clip C): rise, follow, arrive, slow to rest | The last frame becomes the CTA hold |
| Company → page | Sticky release after the hold; the CTA stays in the flow above the next Elementor section | Clear ending, no trap |

## N. Existing code to keep

The repo has no cinematic code. From the static site prototype:
- `css/style.css` design values (dark `#14161a`, font stack, radius). These are **copied** into scoped `--bsdsc-*` tokens. They're never imported globally.
- `contacto.html` + `initConsultaForm()` query-param pattern (`?sector=`). This is a good model for the "Solicitar información" CTA → `/contacto/?origen=scrollcinema`, which WordPress forms can pre-fill.
- The site pages themselves stay as they are. They're the WordPress porting prototype and are outside ScrollCinema scope.

## O. Code to delete or deprecate

- **Nothing in this repo needs deletion.** The new module lives in its own `bsdtech-scrollcinema/` folder and touches no existing file.
- **Don't reuse in the module:**
  - `css/style.css` global rules (`*`, `html`, `body`, `img`, `a`, `ul`, `section`, `h1–h4`, `p`). These are exactly the patterns §22 forbids. They're fine for the prototype site but must never ship with the module.
  - `js/main.js` `DOMContentLoaded` global init pattern and `setInterval` counters. The module uses a single namespaced init.
- Deprecated at the architecture level: the entire long "sky → China → … → after-sales" runtime plan, the `selectedMachine` interaction and the 8-machine showroom (manifest in section B).

---

## Style isolation: how the module stays out of Elementor's way (and vice versa)

1. Every selector is prefixed with `#bsdtech-scrollcinema` or `.bsdsc-`. There are no element selectors at root level, and custom properties are all `--bsdsc-*`.
2. **Inbound** leakage (theme `h2`/`button`/`a` styles) is neutralised with an ID-scoped reset such as `#bsdtech-scrollcinema .bsdsc-copy :is(h2,p,a){all:unset}`, followed by explicit module typography.
   - The module doesn't use `@layer`, because unlayered theme CSS would outrank layered module CSS.
   - ID-level specificity wins over typical Elementor/theme class selectors without needing `!important`.
3. Events are `CustomEvent('bsdsc:<name>')` dispatched on the section element. No listeners are attached to `document` except one passive scroll/resize pair, which is removed on `destroy()`.

## Analytics (§39)

`bsdsc:event` is dispatched on the section with `detail = { name, lang, tier, progress }`.

Event names: `bsdsc_start`, `bsdsc_factory`, `bsdsc_showroom`, `bsdsc_ship`, `bsdsc_import_message`, `bsdsc_truck`, `bsdsc_complete`, `bsdsc_whatsapp_click`, `bsdsc_phone_click`, `bsdsc_info_click`.

Each fires once per page view. If `data-datalayer="true"` and `window.dataLayer` exists, the engine also pushes `{event: name, …}`. No other provider coupling.

## Accessibility (§40)

- `prefers-reduced-motion: reduce` → no pin, no frames. Shows 3 stacked stills (factory, ship, company) + the same copy + the same CTA.
- The canvas is `aria-hidden="true"` and has no essential text.
- CTAs are real `<a>` elements in DOM order and are focusable during the pin. Focusing a CTA while it's hidden scrolls to the hold range.
- Copy layers are real text in a single `aria-live="off"` region with correct heading order.

---

## Decisions needed from you

1. **Pick the 4 machine photos** (one per sector) from the uploads listed in A, and say what `8ea5f081 / 6ce99bcc / 4e80481d` are.
2. **Send the real BSDtech logo** (SVG preferred).
3. **Budget path for L:** draft-then-final (needs a top-up) or 480p + Topaz.
4. Confirm the **scroll pacing** in G (600 vh desktop / 520 vh mobile, 26 % on the ship message, 15 % hold).
5. Confirm the **legal copy**, and whether the WordPress homepage "distribuye / distribuidor / en stock" wording will be revised.
6. Confirm **no GSAP** (CSS sticky engine), or require GSAP.
7. Optional: let this environment reach the Higgsfield CDN so I can pull the clips and run the frame benchmark here.
