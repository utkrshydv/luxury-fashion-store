# DESIGN_SYSTEM.md

## Color Palette

```css
--color-bg:         #f7f4ef;   /* warm off-white — primary background */
--color-bg-dark:    #111111;   /* deep black — hero, dark sections */
--color-text:       #111111;   /* primary text */
--color-text-muted: #6b6b6b;   /* secondary text, labels, prices */
--color-accent:     #c9a96e;   /* muted warm gold — very sparingly */
--color-border:     #e5e0d8;   /* subtle warm grey for dividers */
--color-white:      #ffffff;
```

## Typography

**Fonts (Google Fonts):**
- Display: `Cormorant Garamond` — weights 300, 400, 500
- Body: `Inter` — weights 300, 400, 500

```css
/* Display — hero, section headings, product names */
font-family: 'Cormorant Garamond', Georgia, serif;
font-size: clamp(3rem, 8vw, 9rem);
font-weight: 300;
letter-spacing: 0.02em;
line-height: 1.05;

/* Sub-labels — category labels, season tags */
font-family: 'Inter', sans-serif;
font-size: 0.7rem;
font-weight: 400;
letter-spacing: 0.25em;
text-transform: uppercase;

/* Body — descriptions, cart, nav */
font-family: 'Inter', sans-serif;
font-size: 0.875rem;
font-weight: 300;
line-height: 1.7;

/* Price */
font-family: 'Inter', sans-serif;
font-size: 0.85rem;
font-weight: 400;
letter-spacing: 0.05em;

/* Nav links */
font-family: 'Inter', sans-serif;
font-size: 0.7rem;
font-weight: 400;
letter-spacing: 0.2em;
text-transform: uppercase;
```

## Spacing

```css
--space-xs:   0.5rem;   /*  8px */
--space-sm:   1rem;     /* 16px */
--space-md:   2rem;     /* 32px */
--space-lg:   4rem;     /* 64px */
--space-xl:   8rem;     /* 128px */
--space-xxl:  12rem;    /* 192px */

/* Section padding */
section: padding-top: var(--space-xl); padding-bottom: var(--space-xl);

/* Container */
max-width: 1440px;
padding: 0 var(--space-lg);  /* 64px side margins */
```

## Grid

```css
/* Product grid — desktop */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 2.5rem;

/* Product grid — tablet */
grid-template-columns: repeat(2, 1fr);

/* Product grid — mobile */
grid-template-columns: repeat(2, 1fr);
gap: 1rem;

/* Feature / editorial grid */
grid-template-columns: 2fr 1fr;  /* large image left, portrait right */
```

## Image Ratios

```css
/* Product card — portrait (all product images) */
aspect-ratio: 2 / 3;
object-fit: cover;

/* Hero — full viewport */
height: 100vh;
object-fit: cover;
object-position: center top;

/* Editorial — landscape */
aspect-ratio: 16 / 9;
```

## Buttons / CTAs

```css
/* Primary CTA — text only, underlined */
.btn-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
}

/* Add to Bag — outlined */
.btn-outlined {
  border: 1px solid var(--color-text);
  padding: 1rem 2rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: transparent;
  transition: all 0.2s ease;
}
.btn-outlined:hover {
  background: var(--color-text);
  color: var(--color-white);
}

/* Dark — for hero section */
.btn-outlined-light {
  border-color: var(--color-white);
  color: var(--color-white);
}
```

## Product Card

```css
.product-card {
  position: relative;
  cursor: pointer;
}

/* Image container — 2:3 ratio */
.product-card__image-wrap {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.product-card__img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: opacity 0.35s ease;
}

/* Secondary image — crossfade on hover */
.product-card__img--secondary {
  position: absolute;
  inset: 0;
  opacity: 0;
}
.product-card:hover .product-card__img--secondary { opacity: 1; }
.product-card:hover .product-card__img--primary   { opacity: 0; }

/* Card info */
.product-card__info {
  padding: 1rem 0 0;
}
.product-card__name  { font-size: 0.85rem; font-weight: 300; }
.product-card__brand { font-size: 0.7rem; color: var(--color-text-muted); letter-spacing: 0.1em; text-transform: uppercase; }
.product-card__price { font-size: 0.85rem; margin-top: 0.25rem; }
.product-card__price--original { text-decoration: line-through; color: var(--color-text-muted); margin-right: 0.5rem; }
```

## Navigation

```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.5rem var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s ease;
}

/* Transparent over hero, white after scroll */
.navbar--transparent { background: transparent; color: white; }
.navbar--solid       { background: var(--color-bg); color: var(--color-text); border-bottom: 1px solid var(--color-border); }
```

## Animation Tokens

```css
--transition-fast:   0.2s ease;
--transition-base:   0.3s ease;
--transition-slow:   0.5s ease;
--transition-slide:  0.35s cubic-bezier(0.4, 0, 0.2, 1);

/* Scroll reveal */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* Cart drawer */
.cart-drawer { transform: translateX(100%); transition: transform var(--transition-slide); }
.cart-drawer.open { transform: translateX(0); }
```

## Responsive Breakpoints

```css
/* Mobile first */
--bp-sm:  640px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1280px;
--bp-2xl: 1440px;
```
