# Maison — Luxury Fashion E-Commerce Frontend

## Project Overview & Vision
A high-end luxury fashion e-commerce experience built with React (Vite) and connected to the high-performance FastAPI + MongoDB backend running at `http://localhost:8000`.

The aesthetic is inspired by elite luxury houses (Celine, The Row, Bottega Veneta, Saint Laurent):
- Monochromatic, high-contrast typography with Cormorant Garamond serif headers and clean Inter body.
- Generous editorial whitespace and confident minimalism.
- Subtle luxury micro-interactions, sleek slide-out cart drawer, and sticky navigation.
- Real-time cart state, inventory validation, and seamless checkout.

---

## Master Roadmap & Progress Tracker

| Stage | Milestone / Focus | Status | Details |
|---|---|---|---|
| **Stage 1** | Visual Research & Luxury Inspiration | **DONE** | Researched Celine, The Row, SSENSE, Zara Studio. Documented in `DESIGN_RESEARCH.md`. |
| **Stage 2** | Design System & Token Architecture | **DONE** | Established design tokens, color palette, typography, grid system in `DESIGN_SYSTEM.md` & `src/styles/global.css`. |
| **Stage 3** | Project Scaffold & API Client Layer | **DONE** | Vite + React scaffold, React Router, client wrappers (`products`, `cart`, `orders`, `inventory`). |
| **Stage 4** | Editorial Homepage & Global Navigation | **DONE** | Sticky luxury Navbar, Hero banner, Featured curation, Editorial story section, Newsletter, Luxury Footer. |
| **Stage 5** | Catalog & Collection Listing | **DONE** | Category filters (All, Women, Men, Kids, Accessories), Price filter, Sort dropdown, Active tag badges, Skeleton shimmers, Empty states, Search atelier page with popular tags. |
| **Stage 6** | Product Detail Page (PDP) | **DONE** | Split editorial layout, interactive image thumbnails, size & color selectors, stock indicator, Add to Bag CTA, bespoke accordions, related creations. |
| **Stage 7** | Interactive Cart Experience | **DONE** | Polished Cart Drawer + dedicated `/cart` route, complimentary courier threshold progress bar, quantity increment/decrement, clear bag. |
| **Stage 8** | Seamless Checkout & Order Flow | **DONE** | Multi-step minimalist checkout, client & shipping details, delivery options, simulated card authorization, order placement API, confirmation receipt. |
| **Stage 9** | Order History & Tracking | **DONE** | Client Archive & Order Tracking page (`/orders`), direct lookup by Reference ID, 4-step milestone visual tracker (Pending -> Confirmed -> Shipped -> Delivered), items breakdown. |
| **Stage 10** | Polish, Micro-interactions & Final Testing | **DONE** | Automatic `ScrollToTop` router synchronization, custom 404 Atelier page, desktop Client Archive nav icon, preconnected luxury fonts, SEO meta tags. |

---

## Architecture & Technology Stack
- **Frontend Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS Design Tokens (Custom properties, HSL/Hex, modular responsive layout)
- **Routing**: React Router DOM (v7)
- **State Management**: React Context (`CartContext`) with persistent LocalStorage client identity (`X-User-ID`)
- **Backend API**: FastAPI + Async MongoDB (Pymongo AsyncDatabase)
- **Build Quality**: Verified with Vite production build (`npm run build`, 64 modules in <350ms)

---

## How to Test the Entire Application

1. **Verify Backend**:
   - Backend is running on `http://localhost:8000`.
   - Docs available at `http://localhost:8000/docs`.

2. **Verify Frontend**:
   - Frontend is running on `http://localhost:5173`.
   - All `/api/*` calls are proxied to `http://localhost:8000/*`.

3. **User Flow to Test**:
   - **Browse**: Visit `http://localhost:5173/`, explore the Hero and Featured items.
   - **Collections**: Click "Women", "Men", or "Accessories" in the Navbar. Test sorting and price filters.
   - **Search**: Click the Search icon in the header, search for "Blazer", "Jeans", or click suggestion tags.
   - **Product Detail**: Click on any product card. Try changing sizes, colors, and opening the accordions.
   - **Add to Cart**: Click "Add to Bag". Watch the cart drawer slide out with real subtotal and free shipping progress.
   - **View Bag**: Go to `/cart` or click checkout in drawer.
   - **Checkout**: Fill in shipping information or use the prefilled details, select delivery speed, and click "Place Order".
   - **Confirmation & Orders**: Review the confirmation receipt with the Order Reference ID. Click "View All Orders" to see your order with the real-time milestone progress tracker!
