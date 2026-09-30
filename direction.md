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
| **Stage 6** | Product Detail Page (PDP) | **IN PROGRESS** | Editorial image gallery, size & color selectors, stock indicator, accordion for composition & care, Add to Cart flow. |
| **Stage 7** | Interactive Cart Experience | **PENDING** | Polished Cart Drawer + dedicated Cart route, quantity increments, optimistic updates, stock check warnings. |
| **Stage 8** | Seamless Checkout & Order Flow | **PENDING** | Multi-step minimalist checkout, shipping form, mock card payment, order creation via backend API, success receipt. |
| **Stage 9** | Order History & Tracking | **PENDING** | Order lookup by ID or customer email/ID, real-time status tracker (PENDING -> CONFIRMED -> PROCESSING -> SHIPPED -> DELIVERED). |
| **Stage 10** | Micro-interactions, Polish & Final Testing | **PENDING** | Smooth page transitions, image lazy-loading, toast notifications, responsive drawer and navigation audit. |

---

## Running the Application
- **Backend**: `uvicorn app.main:app --reload` (Port 8000)
- **Frontend**: `npm run dev` (Port 5173, proxied to port 8000 via `/api`)
- **API Docs**: `http://localhost:8000/docs`
