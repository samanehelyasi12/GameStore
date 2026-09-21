# MASTER — Global Design System

**Project:** Premium AAA gaming store — Persian/RTL-first, cinematic, image-driven, modern and high-end.
**Scope:** Global tokens and component rules ONLY. No page layouts, no final UI components, no logic.
**Personality keywords:** near-black, deep blue, controlled purple, red accent, film-like imagery, strong hierarchy.
**Anti-patterns:** no generic SaaS look, no excessive neon, no excessive glow, no rainbow gradients, no pill-everything.

> This document replaces the previous placeholder. Page-specific overrides (if any) live in `design-system/overrides/` and must never contradict this file.

---

## 1. Fonts

Font files exist in `app/fonts/`. Do NOT load every weight or every cut. Weights listed below are the only ones to be loaded.

| Family | Role | Load | Skip (do not load) |
|---|---|---|---|
| **Mikhak** | Primary UI font — all body, navigation, inputs, buttons, small headings, meta, prices | `400 Regular`, `500 Medium`, `600 SemiBold`, `700 Bold`, `800 ExtraBold` | Thin, ExtraLight, Light, DS1 (Black/Bold), DS2 (SemiBold/Thin) |
| **Fanavari** | Display / cinematic headings — hero titles, page titles, section kickers, marketing numerals | `400 Regular`, `700 Bold` | any other weight |
| **Sahel** | Fallback ONLY — never a primary; keep in the fallback stack for glyphs Mikhak misses or for legacy raster fallback | not loaded | `Sahel-Light.ttf`, `Sahel-SemiBold.ttf`, `Sahel-Black.woff`, `Sahel-VF.ttf` are NOT to be loaded via `next/font` |

**Variable mapping (implementation-ready `next/font/local` reference):**

```ts
const mikhak = localFont({
  src: [
    { path: "./fonts/mikhak/Mikhak-Regular.ttf", weight: "400" },
    { path: "./fonts/mikhak/Mikhak-Medium.ttf", weight: "500" },
    { path: "./fonts/mikhak/Mikhak-SemiBold.ttf", weight: "600" },
    { path: "./fonts/mikhak/Mikhak-Bold.ttf", weight: "700" },
    { path: "./fonts/mikhak/Mikhak-ExtraBold.ttf", weight: "800" },
  ],
  display: "swap",
  variable: "--font-mikhak",
});

const fanavari = localFont({
  src: [
    { path: "./fonts/fanavari/Fanavari Regular.ttf", weight: "400" },
    { path: "./fonts/fanavari/Fanavari Bold.ttf", weight: "700" },
  ],
  display: "swap",
  variable: "--font-fanavari",
});
```

**Font stacks:**

```css
--font-sans: var(--font-mikhak), "Sahel", "Segoe UI", Tahoma, system-ui, sans-serif;
--font-display: var(--font-fanavari), var(--font-mikhak), "Sahel", system-ui, sans-serif;
```

- Body text always resolves through `--font-sans`.
- Display sizes resolve through `--font-display` (Fanavari first, Mikhak fallback).
- `letter-spacing` must be `0` (or inherit) for Persian/Arabic glyphs; only Latin display text may use `-0.02em`.

---

## 2. Color tokens

Media/image areas stay dark-tinted in BOTH themes (`--color-media`) so imagery always looks cinematic.

### 2.1 Dark theme (primary identity)

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#07090E` | Page background (near-black, blue-tinted) |
| `--color-surface` | `#0E131C` | Cards, panels, inputs |
| `--color-surface-raised` | `#141B27` | Modals, dropdowns, popovers |
| `--color-media` | `#0E131C` | Image/chrome backdrop (never-white) |
| `--color-overlay` | `rgba(3, 5, 9, 0.72)` | Hero scrim base / modal backdrop |
| `--color-text-primary` | `#F2F4F8` | Headings, primary text |
| `--color-text-secondary` | `#A9B2C1` | Body, descriptions |
| `--color-text-tertiary` | `#6B7484` | Meta, captions, placeholders |
| `--color-text-inverse` | `#FFFFFF` | Text on filled accent/danger buttons |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | Default card/input borders |
| `--color-border-strong` | `rgba(255, 255, 255, 0.16)` | Hover borders, dividers emphasis |

**Accent (deep blue):**

| Token | Value | Role |
|---|---|---|
| `--color-accent-400` | `#7E9FF5` | Accent TEXT/hover on dark (AA 8.4:1 vs canvas) |
| `--color-accent-500` | `#4F7CF0` | Accent default: rings, active indicators, icons, links |
| `--color-accent-600` | `#3E63DB` | Filled button background (AA 4.9:1 with white text) |
| `--color-accent-700` | `#3357C4` | Button hover |
| `--color-accent-800` | `#2A469F` | Button active |
| `--color-accent-subtle` | `rgba(79, 124, 240, 0.14)` | Secondary button bg, selected row bg |

**Secondary (controlled purple — minimal use):**

| Token | Value | Role |
|---|---|---|
| `--color-purple-400` | `#A78BFA` | Gradient partner, tiny highlights |
| `--color-purple-500` | `#8257E5` | Brand gradient end, active category accent |
| `--color-purple-subtle` | `rgba(130, 87, 229, 0.12)` | Overlay on selection chips |

**Red accent + status:**

| Token | Value | Role |
|---|---|---|
| `--color-red-400` | `#F2555A` | Red TEXT on dark (AA) |
| `--color-red-500` | `#E5484D` | Sale badge, errors, danger icons |
| `--color-red-600` | `#D22F3A` | Danger filled button bg (AA 4.9:1 with white) |
| `--color-red-subtle` | `rgba(229, 72, 77, 0.12)` | Error field bg / danger ghost hover |
| `--color-success` | `#3DD68C` | Success text/icon on dark |
| `--color-warning` | `#F5A524` | Warning text/icon on dark |
| `--color-gold-300` | `#F2C879` | Rating stars, "editor's choice", achievement numerals |

**Gradients (the ONLY approved gradients):**

| Token | Value |
|---|---|
| `--gradient-brand` | `linear-gradient(135deg, #4F7CF0 0%, #8257E5 100%)` |
| `--gradient-hero` | `linear-gradient(to top, rgba(3, 5, 9, 0.92) 0%, rgba(3, 5, 9, 0.55) 30%, rgba(3, 5, 9, 0) 60%)` |
| `--gradient-card` | `linear-gradient(to top, rgba(3, 5, 9, 0.9) 0%, rgba(3, 5, 9, 0.35) 42%, rgba(3, 5, 9, 0) 65%)` |

Rules: brand gradient only for hero-title highlight, active nav indicator, and premium badge. No rainbow, no repeating gradients, no animated gradients.

### 2.2 Light theme (true designed theme — not inversion)

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#F3F4F8` | Page background (cold paper, keeps blue identity) |
| `--color-surface` | `#FFFFFF` | Cards, panels, inputs |
| `--color-surface-raised` | `#FFFFFF` | Modals, dropdowns |
| `--color-media` | `#0E131C` | Image backdrop stays dark in light mode too |
| `--color-overlay` | `rgba(15, 18, 26, 0.55)` | Modal backdrop |
| `--color-text-primary` | `#161A22` | Headings |
| `--color-text-secondary` | `#4B5463` | Body |
| `--color-text-tertiary` | `#8A93A3` | Meta, placeholders |
| `--color-text-inverse` | `#FFFFFF` | Text on filled accent/danger buttons |
| `--color-border-subtle` | `rgba(15, 18, 26, 0.10)` | Default borders |
| `--color-border-strong` | `rgba(15, 18, 26, 0.20)` | Hover borders |

**Accent (identical family, luminance-tuned for AA on light):**

| Token | Value |
|---|---|
| `--color-accent-500` | `#3560E0` (links, AA 5.4:1 on white) |
| `--color-accent-600` | `#3E63DB` (filled button bg, AA 4.9:1 with white) |
| `--color-accent-700` | `#3357C4` (hover) |
| `--color-accent-800` | `#2A469F` (active) |
| `--color-accent-subtle` | `rgba(53, 96, 224, 0.10)` |

**Red + status (light):**

| Token | Value |
|---|---|
| `--color-red-500` | `#D93A3F` (text, AA) |
| `--color-red-600` | `#D22F3A` (danger button) |
| `--color-red-subtle` | `rgba(217, 58, 63, 0.10)` |
| `--color-success` | `#1E8E5C` |
| `--color-warning` | `#B9601E` |
| `--color-gold-500` | `#C79A2E` (stars on light) |

### 2.3 Theme consistency pairing

Every semantic role must exist in BOTH themes. Reference mapping (light values are tuned, never identical-inverted):

| Role | Dark | Light |
|---|---|---|
| canvas | `#07090E` | `#F3F4F8` |
| surface | `#0E131C` | `#FFFFFF` |
| text-primary | `#F2F4F8` | `#161A22` |
| text-secondary | `#A9B2C1` | `#4B5463` |
| text-tertiary | `#6B7484` | `#8A93A3` |
| border-subtle | white 8% | ink 10% |
| border-strong | white 16% | ink 20% |
| accent (fill) | `#3E63DB` | `#3E63DB` (identical by design) |
| accent (text/ring) | `#4F7CF0` / `#7E9FF5` | `#3560E0` |
| red fill | `#D22F3A` | `#D22F3A` (identical by design) |
| media backdrop | `#0E131C` | `#0E131C` (identical by design) |
| brand gradient | blue→purple | blue→purple (same, alpha-normalized) |

---

## 3. Typography

Base root size: `16px`. Body line-height `1.7` (Persian). Weights: Mikhak `400/500/600/700/800`, Fanavari `400/700`.

### 3.1 Type scale (implementation-ready)

| Token | Size clamp | Line-height | Weight / Font | Use |
|---|---|---|---|---|
| `--text-display-2xl` | `clamp(3.5rem, 6vw + 1rem, 4.75rem)` | `1.05` | Fanavari 700 | Hero H1 |
| `--text-display-xl` | `clamp(2.75rem, 4vw + 1rem, 3.5rem)` | `1.1` | Fanavari 700 | Page title / featured story title |
| `--text-display-lg` | `clamp(2.25rem, 3vw + 1rem, 3rem)` | `1.15` | Fanavari 700 | Section H1 |
| `--text-h2` | `clamp(1.75rem, 2vw + 1rem, 2.25rem)` | `1.25` | Fanavari 700 | Section title |
| `--text-h3` | `1.375rem` | `1.4` | Mikhak 600 | Card / block title |
| `--text-h4` | `1.125rem` | `1.45` | Mikhak 600 | Sub-title |
| `--text-lg` | `1.125rem` | `1.8` | Mikhak 400 | Hero lede, long intro |
| `--text-base` | `1rem` | `1.7` | Mikhak 400 | Default body |
| `--text-sm` | `0.875rem` | `1.65` | Mikhak 400 | Secondary text |
| `--text-xs` | `0.75rem` | `1.6` | Mikhak 500 | Meta, badges, captions (min size) |
| `--text-kicker` | `0.75rem` | `1.4` | Mikhak 600 | Overline labels — Latin: `uppercase`, `letter-spacing 0.14em`; Persian: no uppercase, `letter-spacing 0` |

**Usage rules:** Fonts/weights map 1:1 with the scale above. Never use Mikhak 800 below 16px, never use Fanavari below the `--text-h2` size except explicit marketing numerals.

### 3.2 Numerals & prices

- `font-variant-numeric: tabular-nums` for all prices, ratings, counts, order numbers.
- Pricing uses Latin digits with Persian thousands separators (e.g., `۳۹۹٬۰۰۰`) when currency is rial/toman; grid-aligned tabular numerals stay the rule.
- Number type sizes: price = `--text-base`/`--text-h4` weight 700 (dark) and weight 800 for sale emphasis.

---

## 4. Spacing

Base unit `4px`. Utility/`--space-*` tokens:

| Token | px | Token | px |
|---|---|---|---|
| `--space-0` | 0 | `--space-8` | 32 |
| `--space-1` | 4 | `--space-10` | 40 |
| `--space-2` | 8 | `--space-12` | 48 |
| `--space-3` | 12 | `--space-16` | 64 |
| `--space-4` | 16 | `--space-20` | 80 |
| `--space-5` | 20 | `--space-24` | 96 |
| `--space-6` | 24 | `--space-32` | 128 |

Silence padding: pattern `p-inline-{n} p-block-{n}`. Standard surface padding: cards `16/20/24`, modals `28`, hero `48/64/96` block.

---

## 5. Container & grid

| Token | Value | Use |
|---|---|---|
| `--container-page` | `1280px` | Page content rail |
| `--container-narrow` | `880px` | Long-form articles, auth forms |
| `--container-wide` | `1600px` | Media rails, full-bleed image rows |
| `--container-gutter` | `24px` (`16px` < 640px) | Inline page padding |

- 12-column grid. Column gap `24` (lg+), `16` (sm). Row gap `24`.
- Game/product rail: `repeat(auto-fill, minmax(176px, 1fr))`, gap `20` (lg+) / `16` (sm). Portrait cards `2:3`.
- Content spans: cards `4 cols` (lg), `2` (sm); feed list `1 col, max 880px`.
- Full-bleed sections span edge-to-edge; inner content re-aligns to `--container-page`.

---

## 6. Radius

| Token | Value | Use |
|---|---|---|
| `--radius-xs` | 4 | Small tags, dots |
| `--radius-sm` | 6 | Chips, small controls |
| `--radius-md` | 10 | Buttons, inputs, badges |
| `--radius-lg` | 14 | Cards (default) |
| `--radius-xl` | 20 | Modals, featured cards, media frames |
| `--radius-2xl` | 28 | Hero media frame, big feature tiles |
| `--radius-full` | 9999 | Avatars, indicators, count pills |

---

## 7. Shadows & elevation

Dark shadows are black-based + border reinforcement; light shadows are ink-based and softer. Elevation = surface-lightening + shadow, additive.

**Dark (`rgba(0,0,0,…)`):**

| Token | Value |
|---|---|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.30)` |
| `--shadow-sm` | `0 2px 6px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.24)` |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.24)` |
| `--shadow-lg` | `0 16px 40px rgba(0,0,0,0.42), 0 4px 12px rgba(0,0,0,0.30)` |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,0.50), 0 8px 20px rgba(0,0,0,0.34)` |
| `--shadow-accent` | `0 8px 28px rgba(62, 99, 219, 0.35)` (glow — hover-only) |

**Light (`rgba(15,18,26,…)`):**

| Token | Value |
|---|---|
| `--shadow-xs` | `0 1px 2px rgba(15,18,26,0.06)` |
| `--shadow-sm` | `0 2px 6px rgba(15,18,26,0.06), 0 1px 2px rgba(15,18,26,0.05)` |
| `--shadow-md` | `0 8px 24px rgba(15,18,26,0.10), 0 2px 8px rgba(15,18,26,0.06)` |
| `--shadow-lg` | `0 16px 40px rgba(15,18,26,0.14), 0 4px 12px rgba(15,18,26,0.08)` |
| `--shadow-xl` | `0 24px 64px rgba(15,18,26,0.18), 0 8px 20px rgba(15,18,26,0.10)` |
| `--shadow-accent` | `0 8px 24px rgba(53, 96, 224, 0.18)` (glow — hover-only) |

**Elevation ladder:** base (border-subtle + shadow-xs) → hover (border-strong + shadow-md) → overlay (surface-raised + shadow-lg) → modal (surface-raised + shadow-xl).

---

## 8. Accent & glow rules

- Glow (`--shadow-accent`) is reserved for: primary CTA hover, active nav indicator, focused game card that is the hero/featured item. Max one glow per "cluster" (hero CTA cluster counts as one).
- Glow blur `≤ 28px` (dark) / `≤ 24px` (light); alpha `≤ 0.35` dark / `≤ 0.18` light.
- Brand gradient usage cap: hero title highlight, active nav indicator, premium badge. Do not gradient entire buttons (solid accent-600 instead).
- No neon, no animated borders/glows, no multi-hue gradients. Red is for action/sale/danger only — never as a page-wide theme.

---

## 9. Component rules (tokens only, no implementation)

### 9.1 Buttons

| Variant | Background | Text | Border | Hover | Active |
|---|---|---|---|---|---|
| **primary** | accent-600 | text-inverse | none | accent-700 + `--shadow-accent` | accent-800, `translateY(1px)` |
| **secondary** | accent-subtle | accent-500 (dark) / accent-600 (light) | none | accent-subtle ↑ (`0.2`) | opacity 0.9 |
| **outline** | transparent | text-primary | border-strong | bg `rgba(255,255,255,0.04)` (dark) / ink 4% (light) | same, pressed |
| **ghost** | transparent | text-secondary | none | bg subtle, text-primary | pressed |
| **danger** | red-600 | white | none | red-700 | red-800 pressed |
| **premium** | gradient-brand | white | none | shadow-accent | scale 0.98 |

Sizes: `sm` 32px h · `md` 40px h · `lg` 48px h · `xl` 56px h (hero CTAs). Padding inline: `sm` 14 · `md` 20 · `lg` 24 · `xl` 32. Radius `--radius-md` (10). Label weight 500/600 (sm-md: 500, lg-xl: 600). Transitions 180ms. Full-width `w-full` only in mobile stacks and forms. Icon 18px, gap 8px; icon order flips automatically with `dir` (logical properties).

### 9.2 Inputs

- Height `44px` (touch), textarea min-height `120px`. Radius `--radius-md`. Padding `--space-4` inline.
- Background `--color-surface`, border `--color-border-subtle`, text `text-primary`. Placeholder `text-tertiary`.
- Focus: border/ring accent — `box-shadow: 0 0 0 2px` accent-500 (dark) / accent-600 (light); `outline: none`.
- Error: border red-500 + `--color-red-subtle` field tint + red helper text `--text-xs`.
- Disabled: 50% opacity, cursor not-allowed. Label `--text-sm` weight 500 `text-secondary`; helper `--text-xs` `text-tertiary`.
- Search variant: icon on `inline-start`, full height, equal side paddings.

### 9.3 Cards

- Base: bg `--color-surface`, border `--color-border-subtle`, radius `--radius-lg`, padding 16 (compact) / 20 (default) / 24 (feature).
- Hover: border-strong, `--shadow-md`, `translateY(-2px)`, 240ms standard ease.
- `feature-card` (hero/home feature): radius `--radius-xl`, image-led, `--gradient-card` scrim at bottom, content padding 24/28.
- `media-card`: image occupies full card, text overlays gradient (see Game-card rules), radius `--radius-lg`.

### 9.4 Navigation

- Sticky header: height `64px` (desktop) / `56px` (mobile). Background `color-mix(canvas 80%, transparent)`, backdrop blur `16px`, bottom border `--color-border-subtle`.
- Brand (logo) on `inline-start`, primary links center/`inline-end` → mobile: menu becomes full-height sheet from `inline-end`, width `320px`, surface-raised, shadow-xl.
- Link: `--text-sm` weight 500, `text-secondary` → hover `text-primary`. Active/link on page: `text-accent` (400 dark / 500 light) + 2px indicator bar (gradient-brand) on the reading-inline edge of an active item.
- Dropdown/menu panel: surface-raised, radius `--radius-lg`, `--shadow-lg`, 8px inline padding, items `40px` high.
- Count badge (cart, notifications): red-500 bg, white `--text-xs` weight 600, radius-full, 18px.

### 9.5 Game-card rules

- **Poster** `aspect-ratio: 2/3`, `object-fit: cover`, radius `--radius-lg`, overflow hidden.
- Image hover: `scale(1.06)` 600ms cinematic ease; overlay `--gradient-card` always present (bottom-weighted) in both themes.
- Top row: platform icons (18px, outlined, `text-secondary`) start side; rating `--color-gold` star + score (tabular) end side.
- Bottom: title `--text-h4` weight 600, max 2 lines, `text-primary`; meta line `--text-xs` `text-tertiary`.
- Price row: price `--text-h4` weight 700 `text-primary`; sale price uses red-400 (dark)/red-500 (light) + original strikethrough `text-tertiary`. Sale badge: red-500 solid, white, capsule, `--text-xs` weight 700.
- Hover overlay reveals primary `md` button (full-width bottom) + `translateY(-2px)` + shadow-md. Overlay CTA must be reachable by keyboard (focus-visible ring over the image).
- Achievements/editor's choice: gold dot + kicker on the top-start corner.

### 9.6 Hero rules

- Full-bleed, over `--container-wide` edge-to-edge. Min-height: `480px` (<640) · `560px` (sm–lg) · `640px` (lg+) · max `720px`.
- Layers: image `object-fit: cover` full-bleed → `--gradient-hero` scrim (strongest toward the reading edge) → content block at `inline-start`, max-width `640px`, aligned to `--container-page` with 48px inline padding.
- Composition: kicker (`--text-kicker`, accent-400/500) → `--text-display-2xl` Fanavari 700 in `text-primary` with optional gradient-brand highlight on one keyword → lede `--text-lg` `text-secondary` → CTA cluster (primary `xl` + secondary/outline `xl`), gap 16.
- Loading motion: image slow zoom `1.0 → 1.05` over 20s (see Motion); content pieces fade-up staggered 80ms. No auto-rotation; if a single hero has one story, no arrows are required.

---

## 10. Responsive breakpoints

| Breakpoint | Min width | Container | Gutter | Header | Game rail cols (min) | Main type step |
|---|---|---|---|---|---|---|
| `base` | 0 | fluid | 16 | 56px | auto-fill 1–2 | `--text-base` |
| `sm` | 640 | fluid | 16 | 56px | 2 | `--text-base` |
| `md` | 768 | fluid | 24 | 64px | 3 | `--text-base` |
| `lg` | 1024 | `--container-page` | 24 | 64px | 4 | `--text-base` |
| `xl` | 1280 | page + wide avail. | 24 | 64px | 5 | `--text-h2` sections |
| `2xl` | 1536 | 1280 (rail 1600 avail.) | 24 | 64px | 6 | full display scale |

- Proportional numeric spacing via themed clamps is attached in §3.1.
- Touch/desktop switch anchor: `lg`. Full navigation ⇒ mobile sheet at `< lg`.

---

## 11. RTL / Persian rules

- Document root: `<html dir="rtl" lang="fa">` (project default). All layout uses **logical properties**: `margin-inline-start`, `padding-inline`, `inset-inline-start/end`. Never `left`/`right`/`float` for layout or spacing.
- Text alignment defaults to `start`. Persian body `line-height ≥ 1.6` (we use 1.7), display `≥ 1.1` with `1.15` reserved for wider Latin fallback.
- Letter-spacing: `0` for Persian glyphs everywhere. Latin-only display may use `-0.02em`; never apply letter-spacing to mixed strings.
- Directional icons (arrows, chevrons, carousels, "go" glyphs) flip with `[dir="rtl"] { transform: scaleX(-1) }`. Non-directional icons (play, heart, cart) never flip.
- RTL composition assigns: kicker, primary CTA, and media scrim anchored to the reading (`inline-start`) edge; media can extend to `inline-end` edge — this is the cinematic asymmetry.
- Left/right floating is banned; grids must not hard-code column order (no `order` resets that break RTL reading).
- Persian copy uses the design token strings above; numerals follow §3.2.
- If the site ever serves LTR (or a flipped demo), swap only `dir`; every token is logical so no layout rewrite is needed.

---

## 12. Accessibility

| Rule | Spec |
|---|---|
| Body text contrast | `text-primary`/`secondary` vs canvas ≥ 4.5:1 (AA). Verified pairs listed in §2. |
| Accent text | dark: `#7E9FF5` on canvas = 8.4:1; light: `#3560E0` on white = 5.4:1. Links under 18px bold use these. |
| Button text | white on accent-600 = 4.9:1; white on red-600 = 4.9:1. |
| Focus-visible | `2px` accent ring + `2px` offset, shown for ALL interactive elements; ring = accent-500 (dark) / accent-600 (light). Never `outline: none` alone. |
| Touch targets | interactive targets ≥ `44×44px`; compact nav/secondary controls may be `40px` minimum. |
| Minimum type | text ≥ `12px`; `--text-xs` only for badges/captions/meta, never for body copy. |
| Color not sole signal | badges pair color + icon/text; sale uses "تخفیف" label + style; status always includes wording. |
| Imagery | meaningful `alt` in Persian; decorative images `alt=""`. Captions ≥ `--text-xs`. |
| Focus order | follows DOM reading order which is `dir`-aware; keyboard openable/closeable menus with `Esc` close. |
| Motion | `prefers-reduced-motion`: drop zoom/scale/translate — opacity-only transitions at near-0 duration. |
| Scrims | modal backdrop must remain ≥ 55% opacity so page content is visibly inert. |

---

## 13. Motion principles

**Durations:** `--dur-micro: 120ms` · `--dur-fast: 180ms` · `--dur-base: 240ms` · `--dur-panel: 400ms` · `--dur-slow: 600ms` · `--dur-cinema: 800ms` (entrance only).

**Easings:**

```css
--ease-fast: cubic-bezier(0.2, 0, 0, 1);
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-emphasized: cubic-bezier(0.2, 0.9, 0.1, 1); /* cinematic entrances */
--ease-exit: cubic-bezier(0.3, 0, 0.8, 0.3);
```

**Rules:**
- Animate `transform` + `opacity` only; never layout properties (`top`/`width`/`height`) except measured panel height.
- Interactive feedback:

| Action | Motion |
|---|---|
| Hover | translateY(-2px) + shadow swap, 240ms standard |
| Active/press | translateY(1px) / scale(0.98), 120ms fast |
| Entry (views/sections) | fade-up `translateY(16px) → 0` + opacity, 800ms emphasized, stagger 80ms, max ~10 items per viewport |
| Image hover | `scale(1.06)`, 600ms cinematic ease |
| Hero load | `scale(1.0 → 1.05)`, 20s linear, once; content fade-up 800ms |
| Sheet/modal | slide from inline-end + fade, 400ms emphasized; exit 240ms exit-ease |
- Reduced motion: all transforms removed; only opacity transitions, duration 0–1ms.

---

## 14. Implementation mapping (Tailwind v4 reference)

Token names above map directly to `@theme` variables when wiring the system:

```css
@theme {
  --color-canvas: #07090E;
  --color-surface: #0E131C;
  --color-surface-raised: #141B27;
  --color-media: #0E131C;
  --color-text-primary: #F2F4F8;
  --color-text-secondary: #A9B2C1;
  --color-text-tertiary: #6B7484;
  --color-accent-400: #7E9FF5;
  --color-accent-500: #4F7CF0;
  --color-accent-600: #3E63DB;
  --font-sans: var(--font-mikhak), "Sahel", "Segoe UI", Tahoma, system-ui, sans-serif;
  --font-display: var(--font-fanavari), var(--font-mikhak), system-ui, sans-serif;
  --radius-md: 10px;   /* ...repeats §6 */
  --shadow-md: 0 8px 24px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.24);
  /* + all §2, §4, §6, §7, §13 tokens */
}
```

Light mode: a `.light`/`[data-theme="light"]` layer re-declares the §2.2 surface/text/border/red tokens (accent fill stays constant). Components consume roles only — never raw hex.

---

## 15. Final system checklist

- [ ] Dark is the default; light is a designed theme with tuned values (not inversion) — §2.
- [ ] Every semantic role has a dark + light pair — §2.3.
- [ ] Only 5 Mikhak weights + 2 Fanavari weights are to be loaded; DS/extra weights skipped — §1.
- [ ] RTL is the default via logical properties; directional icons flip; letter-spacing 0 for Persian — §11.
- [ ] Responsive ladder covers base→2xl with concrete container/gutter/type steps — §10.
- [ ] Glow is capped and reserved; gradient library is exactly 3 approved entries — §8.
- [ ] Accessibility pairs meet 4.5:1 (AA) on text and 3:1 on UI; focus-visible defined — §12.
- [ ] Motion uses transform/opacity + reduced-motion policy — §13.
- [ ] Images always sit on dark-tinted media surfaces in both themes.
- [ ] No components, pages, or logic were created in this phase — tokens only.