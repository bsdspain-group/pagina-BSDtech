# BSDtech — Short Homepage ScrollCinema · Architecture V2.1 (creative amendment)

**Status:** `BSDTECH_SHORT_SCROLLCINEMA · ARCHITECTURE_V2_1_PENDING_APPROVAL`
**Date:** 2026-09-24
**Amends:** `ARCHITECTURE_V2.md`. This file **replaces V2 §2, §3, §7, §9 and §10**. Everything else in V2 stands unchanged: the plugin, Elementor flow, benchmark, sticky fallback chain, machine slots and copy register.
**Inputs:** creative rules 22–27 (shared camera language, turquoise container protagonist, no over-animation, cloud occlusion transition, reuse existing masters, one journey).
No code, no generation, no credits spent.

---

## 0. What changes, in one table

| Topic | V2 | V2.1 |
|---|---|---|
| Ship → truck | Seedance `video_extension` from ship into truck (crane transfer) | **Two independent clips joined by a full-frame cloud occlusion.** No morph, no extension, no port operations |
| Ship / truck camera | Aerial descent, then elevated follow | **One shared "top-down tracking rig"** (§1) for both |
| Container / export beat | Dedicated clip B segment (doors closing, lift) | Carried by the ship shot: the turquoise container is on deck from the first frame. **No export clip** |
| Showroom → ship | White exposure into a generated start keyframe | White exposure **→ cloud reveal** onto the ship (the same cloud system used twice) |
| Customer company | Part of clip C | **Optional forward extension of the truck clip**: same rig, same scene, so extension is appropriate here |
| Container branding | Not specified | Plain turquoise roof in all generations. **Real logo composited later**, tracked per frame |
| Credits for new production | ≈ 140–150 | **≈ 80–120** (§6) |

---

## 1. Shared camera language: the "top-down tracking rig"

The ship and the truck don't need to match physically; the **camera** does. Both prompts, both masters and the seam test use this single spec.

| Parameter | Spec (both ship and truck) | Why |
|---|---|---|
| Pitch | **Nadir (straight down), tolerance ±3°** | "Almost identical top-down angle" |
| Roll / yaw | 0°, locked. **No rotation, no banking, no orbit** | Rule 24 |
| Travel axis | Vehicle travels **up the frame** (forward = screen top) | Same direction in both. Portrait-friendly: the mobile 3:4 crop needs no crop path |
| Camera height | Ground footprint ≈ **120 m frame width** (desktop 16:9) | Same height *feeling*. At this height the ship is a section of deck with sea on both sides, and the truck sits on a road with landscape |
| Container scale | 40 ft container (12.2 m) ≈ **10 % of frame width** in both | Same height ⇒ the container is the **same size on screen** in both. This is physically honest, so nothing to fake |
| Container anchor | Horizontal centre, **≈ 58 % from top** (lead room ahead), drift ≤ ±3 % | The eye stays on the same spot through the clouds |
| Tracking | Camera travels with the vehicle; **environment flows downward** at constant speed | One action per clip |
| Speed | Constant. No acceleration, no speed ramp | Screen flow speed is matched at build time by **scroll retiming** (§4) |
| Lens | Rectilinear, no distortion, **no tilt-shift / no miniature look**, deep focus | Top-down + shallow DOF reads as toys, not premium |
| Light | **Same sun direction and time in both**: warm late afternoon, sun from upper-left, long soft shadows toward lower-right | Continuity with the golden factory exterior; shadows give scale |
| Palette | Sea deep navy/blue-grey (**not teal**). Road neutral asphalt. Other containers muted (rust, grey, white, dark blue). **Turquoise container is the only saturated element** | Protagonist readability |
| Stability | Gimbal-locked, no shake, no zoom, no dolly-zoom | Rule 24 |
| Clip length | 4–5 s each | Short, lightweight |

**Consequence for the ship master image:** it must already follow this rig: nadir, travel up-frame, turquoise container at the anchor, correct light. 👁 **If your existing ship master doesn't** (e.g. oblique angle, different travel direction), it's used as a style reference and a rig-compliant ship master must be made from it (one image generation, §6).

---

## 2. Turquoise container: the protagonist

| Property | Rule |
|---|---|
| Colour | `#04B3B1` family. **Build-time colour lock:** the container roof is masked in each clip (HSV range + tracked quad) and its hue/saturation is normalised to the same target in ship and truck frames. The container matches even if the two generations drift slightly |
| Type / proportions | 40 ft high-cube, corrugated roof, standard corner castings. Same in both prompts, verified by bounding-box aspect ratio (±3 %) |
| Branding in pixels | **None.** Generated roofs are plain: no logo, no text, no markings |
| Real logo | The **original BSDtech logo file**, composited onto the roof: fixed orientation (reads bottom→top, the travel direction), fixed position, same in ship and truck |
| Logo method | Build step tracks the roof's 4 corners per frame (feature tracking; with a near-locked nadir camera this is near-static). Stores a tiny per-frame transform table (~2 KB per scene). The **canvas draws the logo at runtime** with that transform. The logo stays crisp, swappable and never AI-touched, and the table keeps it locked across both clips |
| Continuity devices | Same screen anchor, same scale, same colour, same logo placement across ship → clouds → truck → company |

---

## 3. Final storyboard timeline (≈ 17 s source)

| # | Beat | Source asset | Source time | One primary action |
|---|---|---|---|---|
| 01 | Factory entry | **Existing factory video** | 0.0 – 2.0 s | push through the shutter |
| 02 | Workshop | **Existing workshop video** | 2.0 – 4.0 s | continue down the aisle |
| 03 | 4 sectors / 4 real machines | **Existing showroom master image** + S01–S04 cutouts (canvas) | 4.0 – 7.0 s *(3 s equiv.)* | lateral glide past the four machines |
| 04 | White → cloud reveal | canvas: exposure to white, then cloud layers part | 7.0 – 8.0 s | reveal |
| 05 | Ship + container (export) + importer message | **Ship clip** (animated ship master) | 8.0 – 12.5 s | forward maritime travel |
| 06 | Turquoise container focus | same ship clip (copy clears; container is the only saturated block) | within 05, last ~1 s | (none added) |
| 07 | Cloud cover → reveal | canvas cloud layers over ship frames → **swap under full cover** → over truck frames | 12.5 – 13.5 s | cover and reveal |
| 08 | Truck | **Truck clip** (animated truck master) | 13.5 – 16.5 s | forward road travel |
| 09 | Customer company | **Optional forward extension** of the truck clip: the truck turns in and stops at the dock, same rig | 16.5 – 18.0 s | arrive |
| 10 | CTA | last frame held | hold | none (slow canvas scale 1.00 → 1.03 only) |

If the optional extension (09) is skipped, the truck clip itself must end inside the company site. That's one action ("drive in and stop"), still with the same rig.

---

## 4. Exact scroll percentage ranges

The track height is still provisional (600 vh desktop / 520 vh mobile) until the benchmark.

| Progress | Beat | Mapped to |
|---|---|---|
| **0 – 7 %** | 01 Factory entry | factory video |
| **7 – 14 %** | 02 Workshop (+ column wipe 13–14 %) | workshop video |
| **14 – 25 %** | 03 Four sectors | showroom pan 0 → 1 |
| **25 – 30 %** | 04 White → cloud reveal onto the ship | clouds out, ship frames start |
| **30 – 56 %** | **05 Ship + importer message** | ship clip. **Longest beat (26 %)** |
| **50 – 56 %** | 06 Turquoise container focus | ship clip tail (overlaps the end of 05) |
| **56 – 62 %** | 07 Cloud cover → swap → reveal | ship tail + truck head under the cloud layers. **Swap at 59 %** |
| **62 – 74 %** | 08 Truck | truck clip |
| **74 – 85 %** | 09 Customer company | extension (or truck clip tail) |
| **85 – 100 %** | 10 CTA hold | last frame |

**Retiming:** each clip is mapped to its scroll range with its own speed curve. At the cloud junction the **on-screen flow speed** (sea texture vs road texture, measured by optical flow) is equalised by retiming, so the "same camera" feels like it keeps travelling at the same pace even though a ship and a truck really move at different speeds.

**Copy timing** (ES master; changed rows only, the rest as V2 §3):

| Progress | Copy |
|---|---|
| 32 – 50 % | **Tu empresa importa.** (32 %) · **Nosotros te acompañamos.** (38 %) |
| 42 – 50 % | secondary explanatory line (*DRAFT, pending review*) |
| 46 – 85 % | process line FABRICACIÓN → EXPORTACIÓN → IMPORTACIÓN → TU EMPRESA. The active dot advances at 30 / 46 / 59 (clouds) / 74 % |
| 50 – 56 % | *no copy*: the turquoise container carries the frame alone |
| 56 – 62 % | *no copy* during the clouds |
| 76 – 100 % | **TU EMPRESA** label near the destination |
| 86 – 100 % | **DE CHINA. A TU EMPRESA.** / Tu empresa importa. Nosotros te acompañamos. / CTA ×3 |

Desktop copy sits in the **side negative space** (sea or landscape left and right of the travel axis), never over the container. On mobile, copy sits top and bottom with a soft gradient.

---

## 5. Transition method between every asset

| Junction | Method | Engineering + acceptance |
|---|---|---|
| Factory → workshop | In-camera (existing video) | 👁 verify the existing clip is continuous between both |
| Workshop → showroom | Engineered **column wipe-by** (V2 §7) | Occluder velocity matched to the measured camera speed |
| Showroom → ship | **Exposure to white → cloud reveal** | The showroom exit blooms to white; white cloud layers thin and part, revealing the ship rig from above. Covers the change from eye-level to top-down |
| **Ship → truck** | **Full-frame cloud occlusion** (rule 25) | See below |
| Truck → company | **Forward video extension** of the approved truck clip (same scene, same rig), or in-camera within the truck clip | Seam test on the extension boundary: SSIM ≥ 0.92, ΔE ≤ 2, flow continuity ≤ 15 % |
| Company → CTA | Last frame held | DOM copy + CTA |
| CTA → page | Sticky release | V2 §6 fallback chain |

### Cloud occlusion system (ship → truck, and reveal onto ship)

**Recommendation: canvas cloud layers, not a generated cloud video.**

| | Canvas cloud layers (recommended) | Generated cloud video |
|---|---|---|
| Control | Coverage curve and full-cover window exact, driven by scroll | Whatever the model produces |
| Reversible scroll | Perfect (pure function of progress) | Frame-bound |
| Occluding different sources | Drawn **over** the ship/truck frames; the underlying swap happens invisibly | An opaque video can't overlay; it would need a luma/alpha key (messy with sea gaps) |
| Weight | 3 sheets ≈ 0.4 MB desktop / 0.25 MB mobile | ≈ 1–1.5 MB of extra frames |
| Credits | 2–3 cloud texture stills (~1–3 cr each) | ~36–45 cr |

**How it works:**
1. **Sources:** 2–3 top-down cloud texture images generated **on pure black**. At build time, luminance becomes alpha, and the images are lit and tinted to the same sun direction and warmth as the rig.
2. **Layers:** near, mid and far sheets translate **downward** (the same direction as the ground flow), with the near layer fastest (parallax). **Translation only:** no zoom, no rotation (rule 24).
3. **Coverage curve over the 56–62 % range:**
   - 0 → 100 % over the first 40 %.
   - **100 % hold for the middle 20 %.** An opaque feathered "cloud core" layer guarantees total cover.
   - 100 → 0 % over the last 40 %.
4. **Swap** from ship frames to truck frames happens at the exact centre of the hold (59 %). Underlying frames **keep playing** up to and after the swap, so motion never freezes.
5. **Cloud shadows:** just before the cover and just after the reveal, a soft darkening in the cloud shapes is drawn on the sea/road, offset along the sun direction. This is cheap and sells the altitude.
6. **Container continuity:** the ship's last visible container position and the truck's first visible container position are the same screen anchor, scale and colour (§1–2). Where the clouds are thin, the eye picks the turquoise block up again in the same place.

**Acceptance test (automated, before approval of the frames):**

| Check | Threshold |
|---|---|
| Occlusion at swap | Render with the underlying frame replaced by magenta: **0 magenta pixels** at 59 % ± hold window |
| Container anchor | Ship-exit vs truck-entry container centre within **±3 % of frame**; size within **±3 %** |
| Container colour | Roof ΔE ≤ **3** after colour lock |
| Flow speed | Screen-space ground/sea flow before and after cover within **±15 %** after retiming |
| Direction | Flow vector angle difference ≤ **5°** |
| Light | Shadow direction difference ≤ **10°** (measured on container shadow) |
| Visual review | Scrub forwards and backwards at 3 scroll speeds |

---

## 6. Higgsfield generations still required

Presented one by one as SCENE / MODEL / WORKFLOW / DURATION / RESOLUTION / COST / PROMPT / RISKS before any spend. No automatic retries. Rates are observed from your history: Seedance 2.5 = 9 cr/s at 1080p, 2.5 cr/s at 480p; image models 0.5–2.75 cr.

| # | Asset | Model (proposed) | Spec | Est. cost | Condition |
|---|---|---|---|---|---|
| H1 | **Animate ship master** | Seedance 2.5 i2v, start = ship master | 4–5 s · 1080p · rig §1 | 36–45 cr | required |
| H0 | Rig-compliant ship master (from your master as reference) | Nano Banana Pro / GPT Image 2.5 | 16:9 2K | ~2–3 cr | only if the existing ship master isn't nadir / up-frame |
| H2 | Cloud texture sheets ×2–3 (top-down, on black) | GPT Image 2.5 / Kling O1 | 2K | ~2–8 cr | required |
| H3 | **Truck master image**, with the ship master as rig reference (same height, angle, light, container) | Nano Banana Pro / GPT Image 2.5 | 16:9 2K | ~2–6 cr (allow 2 attempts) | required |
| H4 | **Animate truck master** | Seedance 2.5 i2v, start = H3 | 3–4 s · 1080p | 27–36 cr | required |
| H5 | **Customer company arrival**: forward extension of H4 | Seedance 2.5 `video_extension` (forward) | 2–3 s · 1080p | 18–27 cr | optional (billing basis to confirm) |
| H6 | Background removal ×4 (S01–S04 real machines) | remove background | — | to quote | required, after your slot assignment |
| H7 | Topaz upscale of factory/workshop video | Topaz video | → 1080p | 3 cr per clip | only if the existing videos are 480p |

| | Credits |
|---|---|
| **Required (H1–H4, H6)** | **≈ 67–95 cr** |
| + optional arrival (H5) | ≈ 85–122 cr |
| Current balance (24 Sep) | 83 cr |

That's affordable if drafts are skipped. I'd suggest one 480p motion test of H1 (~10–12 cr) before the 1080p run, because it validates the rig on the most important shot.

**Removed from V2:** clip A regeneration, clip B (export + ship descent), keyframes G3/G4, the ship → truck extension, and the gallery plate G1 (your showroom master is used).

---

## 7. Existing assets: realistic reuse

| Asset | Status |
|---|---|
| **Factory video** | ✅ reuse. 👁 **Which file / ID?** In the Higgsfield history the entry clips `122847fe` / `cad1c3ac` are **480p**. If those are the ones, H7 (Topaz) or a benchmark check at desktop size decides whether they're sharp enough |
| **Workshop video** | ✅ reuse. 👁 **Which file / ID?** Also needed: confirm it contains believable workers (the old prompts said "don't focus on workers yet") |
| **Showroom master image** | ✅ reuse as the S03 plate. 👁 **Which one?** The newest Higgsfield showroom images are `1b1989ef` (flat, 8 zones) and `c68fbec6` (hall with right turn). If it's another file, please share it |
| **Ship master image** | ✅ reuse as H1 start frame. ⚠️ **Not found** in your Higgsfield generations or uploads, so please upload it (Higgsfield or repo). Then the rig check (§1) decides H0 |
| **Real BSDtech logo** | ✅ reuse for the container roof + UI. ⚠️ **Not found** in Higgsfield or the repo. Please provide the master (SVG preferred) |
| `6351d05c`, `0ad56ae1`, `f91a50b1` | Fallback keyframes for factory entry only |
| `661393b5` (1080p aerial) | Benchmark proxy (zero credits) |
| Machine candidate pool | For S01–S04 after your assignment |

**Estimated weight effect** (still subject to the benchmark):
- Removing clip B's export/descent (~1.5 s) and replacing the crane transfer with canvas clouds removes roughly **15–20 % of the frame payload** vs V2.
- The cloud system adds ~0.4 MB desktop / ~0.25 MB mobile.
- The logo transform tables are negligible.

---

## Needed from you

1. **The files:** factory video, workshop video, showroom master, **ship master image**, **real BSDtech logo**. Give Higgsfield IDs, or upload to Higgsfield or this repo.
2. Approve the **top-down rig spec** (§1), especially "travel up-frame" and "late-afternoon sun from upper-left".
3. Approve **canvas cloud layers** over a generated cloud video (§5).
4. Approve the **logo on the container roof**, composited from the real file with per-frame tracking (§2).
5. Is the **customer company arrival** (H5) an extension, or should the truck clip end inside the site?
6. Should a **480p motion test** of the ship (~10–12 cr) go first?
