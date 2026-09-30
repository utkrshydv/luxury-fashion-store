# DESIGN_RESEARCH.md

## Research Summary — Luxury Fashion Web Design

### Visual Observations from Reference Brands

#### Common Patterns Across All Luxury Sites

**Color Palettes**
- Background: warm off-white / ivory (#f5f0eb, #faf8f5) OR pure white (#ffffff) OR black (#0a0a0a)
- Text: deep black (#0a0a0a) or warm charcoal (#1a1a1a)
- No bright colors — any accent is muted (champagne gold, dusty rose, sage)
- Negative space is used as a luxury signal — large areas of nothing

**Typography**
- Display / heading: high-contrast serif (Didot, Bodoni, Garamond style) — large, confident, wide letter-spacing
- Body: clean geometric sans-serif (e.g. Futura, Helvetica) — small, precise
- Headlines are UPPERCASE or Title Case — never sentence case
- Extreme letter-spacing on nav items (e.g. "letter-spacing: 0.2em")
- Hierarchy: enormous display headline → medium sub-label → small body

**Navigation**
- Fully horizontal minimal bar — not boxed, no backgrounds
- Logo centered OR left-aligned
- Category links spaced out, uppercase, very small font
- Right side: search icon, account icon, cart count — icon-only, no labels
- Nav becomes sticky on scroll — stays thin and minimal
- On mobile: hamburger → full-screen overlay with large category links

**Hero Sections**
- Always full-viewport-height (100vh)
- Image or video fills the entire background — crops to fill
- Text overlay: 2–3 lines maximum, always minimal
- Copy pattern: "SEASON YEAR / HEADLINE" + single CTA button
- CTA is always text-based, never a filled button — just underlined text or outlined
- Image prioritized over text at all times

**Product Cards**
- Image ratio: portrait (2:3 or 3:4) — never square
- Primary image fills entire card — no padding inside card
- Name, price at bottom — small text, clean
- Hover: secondary image fades in (crossfade), not a slide
- Price format: show final_price only; if discounted, show original with strikethrough beside it
- No "Add to Cart" button on the grid — interaction is via the detail page
- No colored tags, badges, or borders

**Product Grids**
- NOT uniform 3-column grids — asymmetric compositions are preferred
- Large feature image (takes 2 grid columns) + 1 portrait beside it
- Or: 2-column for desktop (fewer items, larger)
- Let images breathe — don't pack rows tightly

**Whitespace**
- Section padding: 80px–160px top/bottom
- Container max-width: 1400px — generous margins on both sides
- Card grids: 40px–60px gap between items
- Typography: generous line-height (1.6–1.8)

**Animations**
- Fade-in on scroll (opacity 0 → 1, translateY 20px → 0)
- Image hover: 300–400ms crossfade to secondary image
- Page transitions: 400ms fade between routes
- Cart drawer: slides in from right (300ms ease)
- Menu: fade in (200ms) rather than slide
- NEVER: bounce, rotate, scale dramatically, flash, loop infinitely

---

### Design Principles That Signal "Luxury" vs Generic

| Luxury | Generic |
|--------|---------|
| Large negative space | Packed, content-dense layout |
| Portrait image ratio (2:3) | Square product images |
| Uppercase minimal nav | Dropdown mega-menus |
| Crossfade hover on product | Zoom-in hover or colored overlay |
| Text CTA (underline) | Filled rounded button |
| Editorial hierarchy (huge headline) | Equal-sized everything |
| Serif display font | System sans-serif |
| Restrained palette (2–3 tones) | Multiple competing colors |
| Images do the selling | Text does the selling |
| Intentional emptiness | Fill every space |

---

## Our Design Decisions

Based on this research, our site will use:

- **Brand name:** MAISON (placeholder — editorial feel)
- **Background:** warm off-white (#f7f4ef)
- **Text:** deep charcoal (#111111)
- **Accent:** muted warm gold (#c9a96e) — very sparingly
- **Display font:** Cormorant Garamond (Google Fonts, serif, high contrast)
- **Body font:** Inter (Google Fonts, clean, readable)
- **Image ratio:** 2:3 portrait throughout
- **Animation philosophy:** fade-in on scroll, 300ms crossfade hovers, nothing dramatic
