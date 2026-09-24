# BSDtech — Short Homepage ScrollCinema · Architecture V2

**Status:** `BSDTECH_SHORT_SCROLLCINEMA · ARCHITECTURE_V2_PENDING_APPROVAL`
**Date:** 2026-09-24
**Supersedes:** `ARCHITECTURE_REVIEW.md` (V1) wherever the two differ. V1 stays as the audit record: the asset inventory and the archive manifest.
**Scope of this document:** architecture only. No code, no generation, no credits spent, no website text changed.

---

## 1. Revised architecture

```
WordPress (unchanged theme, header, footer, Elementor)
│
└── Elementor Shortcode widget ──► [bsdtech_scrollcinema]
                                     │
        Plugin "BSDtech ScrollCinema" (normal, installable)
        ├── Settings page: CTA URLs / phone / WhatsApp / assets base / kill switch
        ├── Shortcode render: server-side fallback HTML (poster + copy + real CTA links)
        └── Conditional enqueue: CSS + JS only on pages containing the shortcode
                                     │
        Front-end module (vanilla JS, no framework, no GSAP)
        ├── tier select (desktop / mobile / reduced) BEFORE any frame request
        ├── pin engine: CSS sticky → verified at runtime → fallback chain (§4 below)
        ├── progress → scene map (scenes.json, piecewise-linear)
        ├── frame registry + windowed decode (createImageBitmap) → <canvas>
        ├── showroom compositor (1 plate + 4 real machine cutouts, 2.5D lateral move)
        ├── DOM overlays (copy, process line, CTA) timed from scenes.json
        └── analytics CustomEvents (bsdsc_*) + optional dataLayer push
```

What changed since V1:

| Area | V1 | V2 |
|---|---|---|
| Showroom | Flat 21:9 8-bay plate `1b1989ef` locked in | That plate is now **provisional reference only**. New minimal "4-pool gallery" composition (§1.1) |
| Ship → truck | Top-down match cut assumed invisible | **Engineered continuity** with a measured seam test (§7) |
| Weight | ~10 MB / ~5.7 MB stated | **Not a target.** Derived from a benchmark (§6) |
| Plugin | MU-plugin | **Normal installable plugin** (§4) |
| Pinning | Sticky + fixed fallback | Sticky with **runtime verification** + 3-step fallback chain, tested against Elementor wrapper patterns |
| Machines | Suggested candidates | **4 empty slots** (§8). Assignment is yours |
| Site copy | Flagged "distribuidor" as implying importer | Neutral flag register; **no assumption** (§1.3) |

### 1.1 Showroom re-evaluated

The showroom only has to say **"4 sectors · 1 manufacturing network"** in about 3–4 seconds.

| Option | What it is | Premium | Weight | Machine fidelity | Mobile | Verdict |
|---|---|---|---|---|---|---|
| A. Flat 8-bay elevation (`1b1989ef`) | Existing wide plate, 4 of 8 bays filled | Medium: built for 8, reads as a catalogue wall | ~0.6 MB | ✅ cutouts | Poor: very wide, tiny machines | Reference only |
| B. Long hall perspective (`c68fbec6` / aisle series) | Forward move down an aisle | High | Frames needed | ⚠️ perspective compositing onto a moving camera needs tracking | Medium | ✗ Too complex |
| C. Sequential hero cuts | 4 machines one after another on a neutral set | High | ~0.5 MB | ✅ | ✅ | Reads as slides, loses "one network" |
| **D. "Four-pool gallery" (recommended)** | One **minimal, dark graphite gallery wall**: long, low-lit, concrete floor with **4 soft light pools** and a thin accent line per sector. The camera **trucks laterally**; the 4 real machines stand in the pools; the far end opens to bright exterior light (the exit to export) | **High**: product-launch aesthetic, lots of negative space | **1 plate + 4 cutouts ≈ 0.4–0.6 MB, zero video frames** | ✅ real cutouts, never regenerated | ✅ **one machine per screen as the pan passes**: a natural fit for portrait | ✅ |

How D renders:
- Canvas parallax runs on three layers: back wall (×0.6), floor and machines (×1.0), and an optional foreground column (×1.4).
- Each machine gets a generated-in-code contact shadow and a subtle accent light line in its sector colour.
- Sector names are DOM labels.

**Scale caveat.** An injection moulding machine is physically many times larger than a pad printer. D uses **"hero scale"**: normalised display heights within about ±25 %, never true relative scale. That keeps all four readable. You'll judge this when the four assets are approved.

### 1.2 Isolation rules (confirmed)

- Every class is `bsdsc-…`, every custom property is `--bsdsc-…`, and the root is `#bsdtech-scrollcinema`.
- **No** selectors on `html`, `body`, `img`, `button`, `a`, `*`. **No** changes to header, footer, theme, routing or Elementor.
- One global only: `window.BSDScrollCinema`. Events are `bsdsc:*` CustomEvents dispatched on the section element.
- Scroll listening attaches to the **actual scroll container**, detected at runtime (it may not be `window`). It's passive and removed on `destroy()`.

### 1.3 Current website copy: flag register (no changes made)

These phrases are flagged for **possible ambiguity** only. "Distribuidor" doesn't automatically mean legal importer; the right wording depends on the actual transaction model.

| Where | Current text | Possible confusion |
|---|---|---|
| `index.html` meta + hero eyebrow | "BSDtech **distribuye e instala** equipos…" | A reader may infer BSDtech sells from its own imported stock |
| `index.html` footer | "**Distribuidor** de equipos de tampografía industrial" | Same |
| `index.html` feature card | "Consumibles **en stock**" | Suggests goods held in Spain. May be accurate for consumibles, just not for machines |
| Film (proposed) | "Tu empresa importa. Nosotros te acompañamos." | Consistent with the factual core |
| Film secondary (proposed) | "BSDtech España actúa como asesor comercial y coordinador. La importación se realiza a nombre del cliente." | **DRAFT. Needs commercial/legal review before publishing**; wording should match the actual role per transaction (advisor / intermediary / coordination) |

---

## 2. Final storyboard timeline (source material ≈ 18 s)

| # | Beat | Asset | Source time | Picture |
|---|---|---|---|---|
| 01 | Factory entry | **A** | 0.0 – 2.0 s | Heavy push toward the cleaned factory, shutter lifts, camera crosses the threshold |
| 02 | Workshop | **A** | 2.0 – 4.0 s | Continues down the aisle. Workers machining, welding, sheet-metal prep, assembly. Ends gliding **sideways past a steel column** (sets up the wipe) |
| 03 | 4 sectors | **S** (composite) | 4.0 – 7.0 s *(3 s equiv.)* | Lateral truck along the four-pool gallery: S01 → S02 → S03 → S04 → bright exit |
| 04 | Container / export | **B** | 7.0 – 8.5 s | Out of white exposure: container doors close, container lifts away |
| 05 | Container ship + import message | **B** | 8.5 – 12.0 s | Premium high aerial, large vessel on open sea, slow drift. **Main beat** |
| 06 | Turquoise container | **B** | 12.0 – 13.5 s | Slow descent onto the one **#04B3B1** container (turquoise from its first frame) |
| 07 | Transfer to truck | **C** (extension of B) | 13.5 – 15.0 s | Crane spreader lifts the same container; the camera follows it down onto a truck chassis |
| 08 | Truck | **C** | 15.0 – 16.5 s | Camera rises, elevated follow of the truck |
| 09 | Customer company | **C** | 16.5 – 18.0 s | Truck turns into a modern, unbranded industrial site and comes to rest |
| 10 | CTA | last frame of C | hold | Last frame held with a slow canvas scale of 1.00 → 1.03 |

## 3. Exact scroll percentage ranges

The track height is **provisional**: 600 vh desktop / 520 vh mobile, retuned after the benchmark. Percentages are of pinned progress.

| Progress | Beat | Source mapped | Emphasis |
|---|---|---|---|
| **0.0 – 7.0 %** | 01 Factory entry | A 0.0–2.0 s | short |
| **7.0 – 14.0 %** | 02 Workshop (+ column wipe at 13–14 %) | A 2.0–4.0 s | short |
| **14.0 – 25.0 %** | 03 Four sectors | S pan 0→1 | short-medium |
| **25.0 – 31.0 %** | 04 Container / export | B 0.0–1.5 s | short |
| **31.0 – 57.0 %** | 05 Ship + importer message | B 1.5–5.0 s | **LONGEST (26 %)** |
| **57.0 – 64.0 %** | 06 Turquoise container | B 5.0–6.5 s | medium |
| **64.0 – 71.0 %** | 07 Transfer to truck | C 0.0–1.5 s | medium |
| **71.0 – 78.0 %** | 08 Truck | C 1.5–3.0 s | medium |
| **78.0 – 85.0 %** | 09 Customer company | C 3.0–4.5 s | medium |
| **85.0 – 100 %** | 10 CTA hold | last frame | **HOLD (15 %)** |
| 100 % | Release | Sticky ends; the Elementor page continues | — |

HTML copy mapped to these ranges:

| Progress | Copy (ES master) |
|---|---|
| 0 – 14 % | none (optional scroll hint 0–3 %) |
| 16 – 25 % | **Cuatro sectores. Una red de fabricación.** Sector labels appear as each machine passes centre |
| 33 – 57 % | **Tu empresa importa.** (33 %) · **Nosotros te acompañamos.** (39 %) |
| 45 – 57 % | Secondary explanatory line: *DRAFT, pending review* |
| 48 – 85 % | Process line FABRICACIÓN → EXPORTACIÓN → IMPORTACIÓN → TU EMPRESA. Active dot follows progress |
| 79 – 100 % | **TU EMPRESA** label |
| 86 – 100 % | **DE CHINA. A TU EMPRESA.** |
| 89 – 100 % | Tu empresa importa. Nosotros te acompañamos. |
| 91 – 100 % | [WhatsApp] [Llamar] [Solicitar información] · *Habla con un asesor.* |

## 4. Plugin vs MU-plugin

| Criterion | Normal plugin | MU-plugin |
|---|---|---|
| Install from WP admin (zip upload) | ✅ | ✗ requires SFTP |
| Activate / deactivate / disable quickly | ✅ | ✗ always on; removal needs SFTP |
| Versioned updates | ✅ replace via zip (a GitHub updater can come later, optional) | ✗ manual file swap |
| Settings page for CTA values | ✅ natural | Possible, but unusual |
| Activation / uninstall hooks (defaults, cleanup) | ✅ | ✗ none |
| Can't be switched off by accident | ✗ | ✅ |
| Loads before normal plugins | irrelevant here | ✅ (not needed) |
| Visibility to the site owner | ✅ listed under Plugins | Hidden in a separate list |

**Recommendation: normal lightweight plugin.** The MU-plugin's only advantages (always on, early load) solve nothing this module needs. Accidental deactivation is harmless anyway: the shortcode then prints nothing, and the Elementor page continues normally.

Plugin contents (to be built later):

```
bsdtech-scrollcinema/                      (plugin folder = zip root)
├── bsdtech-scrollcinema.php               header, bootstrap
├── includes/
│   ├── class-settings.php                 Settings → BSDtech ScrollCinema
│   ├── class-shortcode.php                [bsdtech_scrollcinema] + fallback markup
│   └── class-assets.php                   conditional enqueue + poster preload
├── public/                                built module
│   ├── bsdtech-scrollcinema.js
│   ├── bsdtech-scrollcinema.css
│   └── config/{scenes.json,i18n.json}
├── media/v1/{desktop,mobile,showroom,posters}/…
├── uninstall.php                          deletes plugin options
└── readme.txt
```

**Settings (editable in WordPress):**
- WhatsApp number and prefilled message per language.
- Phone (`tel:`).
- "Solicitar información" URL.
- Sticky-header offset (px).
- Assets base URL (default = plugin `media/`; can point to uploads/CDN).
- dataLayer on/off.
- Kill switch: static fallback only.

Shortcode attributes can override these per page, e.g. `[bsdtech_scrollcinema lang="en" info_url="/en/contact/"]`.

**Conditional enqueue** (Elementor-aware; `has_shortcode()` alone misses Elementor content):
1. On `wp`: if the singular post's `post_content` **or** its `_elementor_data` meta contains `bsdtech_scrollcinema`, enqueue CSS in `<head>`, JS with `strategy => defer`, and a poster `<link rel=preload>` (desktop/mobile via `media`).
2. Safety net inside the shortcode render: if the shortcode appears somewhere not detected (Theme Builder template, popup), enqueue at render time. A tiny inline scoped `<style>` for the fallback block prevents layout shift.

**Media location:** frames ship **inside the plugin** (one install, one update, versioned `media/v1/`). If the host's upload limit rejects the zip, the "assets base URL" setting points to `/wp-content/uploads/bsdtech-scrollcinema/v1/` uploaded by SFTP. Frames never go through the Media Library.

**Security:**
- Values are escaped with `esc_url` / `esc_attr` and passed as `wp_json_encode` config.
- Settings require `manage_options` and use the Settings API, which provides nonces.

## 5. Elementor integration flow

1. **Plugins → Add New → Upload** `bsdtech-scrollcinema.zip` → Activate.
2. **Settings → BSDtech ScrollCinema:** fill WhatsApp, phone, info URL and sticky-header offset. Save.
3. **Edit homepage with Elementor:** add a Container directly under the header. Set it to:
   - Content width: Full width
   - Padding 0 · Margin 0
   - **Overflow: Default**
   - No Motion Effects, no Entrance Animation, no Sticky
4. Drop a **Shortcode** widget → `[bsdtech_scrollcinema]` → Update.
   - In the editor it renders the **static preview** (poster + copy + CTA). There's no pinning or frame loading inside the editor.
5. **Cache/optimisation plugin** (WP Rocket, LiteSpeed, Autoptimize, etc.):
   - Exclude `bsdtech-scrollcinema.js` from *Combine* and *Delay JS*.
   - The poster carries `skip-lazy` / `data-no-lazy` automatically.
   - Keep the `/media/` path cacheable.
6. **Language:** automatic from WordPress locale (`determine_locale()`, so WPML/Polylang work). Override with the `lang` attribute; English is the fallback.
7. **Verify** on the live front end: the plugin ships a checklist in `readme.txt`. The sticky self-test result shows in the browser console as `bsdsc: pin=sticky|fixed|transform|static`.

Nothing else changes in Elementor, the theme, header, footer or routing.

## 6. Performance benchmark plan

**Goal:** turn the V1 estimates into measured numbers, then recommend **frame rate · format · desktop resolution · mobile resolution**.

**Representative scene: the ship aerial (beat 05).** It's the worst case: water and wake are high-entropy textures that compress poorly, and it's the longest scroll span. That gives an upper bound.
- **Proxy source (zero credits):** an existing archived **1080p aerial** with similar texture (e.g. `661393b5`, 5 s, 1080p). The run is repeated on the real ship clip once it exists.

**Test matrix:**

| Axis | Values |
|---|---|
| Frame cadence | 24 (source) · 15 · 12 · 10 · 8 fps, **with and without fractional crossfade** between frames |
| Format | WebP q60 / q70 / q80 · AVIF cq ≈ 45 / 55 / 65 (if the toolchain and browsers support it) |
| Desktop resolution | 1920×1080 · 1600×900 · 1280×720 |
| Mobile resolution (3:4 crop) | 720×960 · 600×800 · 540×720 |

**Measured per cell:**

| Metric | How |
|---|---|
| Source duration, frame count | ffprobe |
| Avg / p95 frame size, total scene payload | file sizes after encode (cwebp / avifenc via ffmpeg) |
| Decode time avg / p95 | Headless Chromium (pre-installed Playwright): `createImageBitmap` timing, unthrottled, and **CPU-throttled 4× / 6×** as a mobile proxy |
| Canvas memory | backing store = css w × h × min(DPR, 2)² × 4 B |
| Decoded-frame memory | w × h × 4 B × window size (e.g. 720p = 3.69 MB/frame; window 16 ≈ 59 MB) |
| Mobile memory estimate | canvas + decode window + compressed bytes held; target module peak **< 150 MB** |
| First usable frame time | poster visible + first N frames of scene 01 decoded, under Chrome network throttling ("Fast 4G" and "Slow 4G") |
| Smoothness | scripted scroll at 3 speeds (slow read, normal, flick), captured to video. **Human A/B** of cadences side by side |

**Real devices (recommended, 15 minutes of your time):** open the benchmark demo URL on one recent iPhone and one mid-range Android. The page reports its own numbers. Chrome emulation is not a real phone.

**Acceptance thresholds** (proposed):
- Decode p95 ≤ 12 ms desktop / ≤ 25 ms at 4× throttle.
- First usable frame ≤ 1.5 s on Fast 4G.
- No visible stepping at normal scroll speed in the A/B review.
- Module peak memory < 150 MB on mobile.

**Output:** a short report with measured tables and the recommendation (FPS · format · desktop res · mobile res · window size · resulting scene and total payload). Reduced cadence is expected to win: slow cinematic moves plus crossfade hide stepping, and every source frame doesn't need to ship.

**Prerequisite:**
- This container currently **cannot reach the Higgsfield CDN**. Either add `d8j0ntlcm91z4.cloudfront.net` + `d2ol7oe51mr4n9.cloudfront.net` to the environment's allowed network domains, or put the proxy mp4 in the repo or another reachable place.
- ffmpeg/libwebp/libavif are installed as part of the benchmark step.

### Sticky robustness test (part of the same benchmark phase)

The demo harness wraps the module in each of these typical Elementor/theme patterns and records which pin mode works:

| Wrapper pattern | Sticky | `position: fixed` pin | Notes |
|---|---|---|---|
| `overflow: hidden` / `auto` on an ancestor | ✗ breaks | ✅ | Common on Elementor sections, theme `#page` |
| `overflow-x: hidden` on an ancestor | ✗ breaks | ✅ | Very common anti-scroll fix |
| `overflow: clip` | ✅ | ✅ | Doesn't create a scroll container |
| `html, body { overflow-x: hidden }` (body becomes the scroller) | ✅ relative to body | ⚠️ | Engine must listen on body, not window |
| `transform` / `will-change: transform` on an ancestor (Elementor motion effects, entrance animations) | ✅ | ✗ fixed becomes relative | Detected by an ancestor walk |
| `contain: paint / layout / strict` | ✅ | ✗ | Same |
| `filter`, `perspective`, `backdrop-filter` on an ancestor | ✅ | ✗ | Same |
| Elementor sticky header (fixed/sticky, overlaps) | ✅ with offset | ✅ with offset | `--bsdsc-top` from setting |
| iOS Safari dynamic toolbar | stage uses `100svh`, re-measured on resize | | |

**Fallback chain** (chosen automatically at init, re-verified on resize):
1. **Sticky**, runtime-verified: during the first pinned scroll, check that the stage `top` stays at the offset. If it drifts, it's broken.
2. **Fixed pin**, used only if no transform/contain/filter/perspective ancestor is found.
3. **Transform pin**: the stage stays absolute inside the track and gets `translateY` equal to the progress offset each rAF. Works in any container, with slightly more CPU.
4. **Static story**: no pin. Stacked stills + copy + CTA. Always works.

## 7. Transition method between every cinematic asset

**Seam acceptance test** for every junction between two different sources:
- Last vs first frame: **SSIM ≥ 0.92**.
- Mean colour **ΔE ≤ 2**.
- **Camera velocity continuity:** optical-flow magnitude and direction over the last 3 frames vs the first 3 differ by ≤ 15 %.
- Visual review scrubbing forwards **and backwards**.
- Anything failing is rejected before frame extraction. **No visible camera seam is accepted.**

| Junction | Method | Engineering |
|---|---|---|
| Factory → workshop | **In-camera** (single clip A) | No seam exists |
| Workshop → showroom | **Engineered wipe-by** | Clip A ends with the camera gliding sideways past a dark steel column that fills the frame for several frames. The showroom composite begins with a matching foreground column layer in canvas moving at the **same measured velocity**. The seam happens behind the occluder |
| Showroom → container | **Exposure threshold** | The pan ends on the gallery's bright exterior opening; canvas ramps exposure to white. Clip B's **generated start keyframe** begins over-exposed and settles, so B's frame 0 is near-white and the join is white-to-white |
| Container → ship | **In-camera** (clip B) | Doors close → pull up/out → aerial reveal |
| Ship → turquoise | **In-camera** (clip B) | The container is turquoise from B's first frame; no colour change on screen |
| **Ship / turquoise → truck** | **Primary: B. Seedance 2.5 `video_extension` (forward) of approved clip B.** Extension continues from B's final frames, so it inherits position **and** camera velocity: the crane lift of the same container, then down onto the truck chassis | Runtime treats B + extension as **one continuous frame sequence** (drop any duplicated overlap frames). **Fallback A:** B's last approved 1080p frame as `start_image` of C, matching position; velocity must pass the flow test, otherwise 3–4 frames of overlap blend. **Fallback C:** match cut only after both real frames pass the seam test. **The chosen method is reported with its seam measurements before final generation** |
| Truck → company | **In-camera** (clip C) | No seam |
| Company → CTA | Last frame held | DOM copy + CTA fade in. Canvas scale 1.00 → 1.03 |
| CTA → page | Sticky release | The next Elementor section scrolls in normally |

Remaining risks:
- Extension quality at 1080p hasn't been verified yet for this scene. The earlier extension `cad1c3ac` was 480p.
- The billing basis for extension (output seconds only?) must be confirmed before quoting.

## 8. Four machine placeholders

Nothing is assigned. Assignment is **your approval only**, and the machines are never AI-regenerated.

```json
{
  "S01_MACHINE": { "sector": "footwear_leather",  "accent": "#04B3B1", "asset": null, "approved": false },
  "S02_MACHINE": { "sector": "metalworking",      "accent": "#FF730E", "asset": null, "approved": false },
  "S03_MACHINE": { "sector": "plastic_injection", "accent": "#0019FF", "asset": null, "approved": false },
  "S04_MACHINE": { "sector": "pad_printing",      "accent": "#C7FF50", "asset": null, "approved": false }
}
```

**Slot requirements (per machine):**
- A real photo or render, ideally ≥ 2000 px on the long side, 3/4 front view.
- Plain or easily separable background, even lighting.
- Background removal (cut-out) is the **only** permitted processing: edges only, geometry and colours untouched. The result is reviewed by you before use.
- A display-height factor ("hero scale") is set per slot after you see the four together.

**Candidate pool** (unassigned; uploaded images from the old S01 brief, identity not visually verified):
`38eeb473 · f1674b17 · c81fc5f0 · 73af1201 · bfd27fc5 · cc5348be · 49d14e42 · bb478baa · e43e6ce4`, plus unknown recent uploads `8ea5f081 · 6ce99bcc · 4e80481d`.

## 9. Higgsfield generations still required

Nothing will be generated until each item is presented as SCENE / MODEL / WORKFLOW / DURATION / RESOLUTION / COST / PROMPT / RISKS and approved. No automatic retries.

Costs are observed from your transaction history: Seedance 2.5 = **9 cr/s at 1080p**, **2.5 cr/s at 480p**; image models 0.5–2.75 cr. The 720p rate hasn't been observed.

| # | Asset | Type / model (proposed) | Spec | Est. cost |
|---|---|---|---|---|
| G1 | Four-pool gallery **empty** plate (no machines, no text; bright exit at far end; a matching dark column variant for the wipe) | Image · GPT Image 2.5 or Kling O1 | ultra-wide 21:9, 2K | ~1–3 cr (+1–3 for a variant) |
| G2 | Clip **A**: factory entry → workshop with workers → sideways glide past a column | Video · Seedance 2.5 i2v, start = `6351d05c` | ~4 s · 1080p | ~36 cr (optional 480p draft ~10 cr) |
| G3 | Keyframe: over-exposed → container doors closing (B start) | Image | 16:9 2K | ~1–3 cr |
| G4 | Keyframe: descent end on turquoise container (B end / extension handoff) | Image | 16:9 2K | ~1–3 cr |
| G5 | Clip **B**: container → lift → ship aerial → turquoise descent | Video · Seedance 2.5, start G3 (+ end G4) | ~6.5 s · 1080p | ~59 cr (optional 480p draft ~16 cr) |
| G6 | Clip **C**: forward **extension** of B: crane transfer → truck → customer company | Video · Seedance 2.5 `video_extension` | ~4.5 s · 1080p | ~41 cr (billing basis to confirm) |
| G7 | 4 machine cut-outs from your approved real assets | Background removal | — | to quote |

| | Total |
|---|---|
| One clean pass (G1–G6) | **≈ 140–150 cr** |
| With 480p motion drafts | ≈ 170–180 cr |
| Current balance (24 Sep) | **83 cr** |

The benchmark (§6) needs **zero** generations.

## 10. Existing assets that can realistically be reused

| Asset | Realistic reuse |
|---|---|
| `6351d05c` cleaned factory exterior | ✅ **Start frame of clip A** (👁 verify no residual supplier text) |
| `0ad56ae1`, `f91a50b1` courtyard / shutter stills | ✅ Alternative keyframes for clip A |
| `122847fe` exterior → shutter → interior (480p, 6 s) | **Motion and prompt reference** for clip A. Not shippable at 480p for desktop; a Topaz test (3 cr) is possible but not recommended as final |
| `cad1c3ac` tail (480p) | Motion reference for workshop only |
| `661393b5` (1080p aerial, archived scene) | ✅ **Benchmark proxy**: zero credits |
| `1b1989ef`, `c68fbec6` showroom stills | Style/material **reference** for G1 only (provisional, per your instruction) |
| Machine candidate pool (9 + 3 uploads) | Source for S01–S04 slots **after your assignment** |
| Old brief rules (source fidelity, no supplier ID, no text, reversible-scroll camera language) | ✅ Carried into every new prompt |
| Repo code | None is cinematic. The static site stays untouched; the module is a new, separate plugin |

---

## Approvals requested

1. Showroom **option D** (four-pool gallery, lateral pan, hero scale).
2. Ship → truck: **video extension** primary, last-frame handoff as fallback, seam test as the gate.
3. Scroll ranges in §3 (provisional track heights until the benchmark).
4. Normal plugin + Elementor flow (§4–5).
5. Benchmark plan (§6), including network access to the Higgsfield CDN (or providing the proxy clip).
6. Budget route for §9 (current balance doesn't cover one clean 1080p pass).
