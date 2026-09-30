import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const CATEGORIES = ["Men", "Women", "Kids", "Accessories"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, openCart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <nav className={`navbar${transparent ? " navbar--transparent" : " navbar--solid"}`}>
        <div className="navbar__left">
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/collection/${cat.toLowerCase()}`} className="navbar__link">
              {cat}
            </Link>
          ))}
        </div>

        <Link to="/" className="navbar__brand">
          MAISON
        </Link>

        <div className="navbar__right">
          <Link to="/search" className="navbar__icon" aria-label="Search" title="Search Atelier">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>

          <Link to="/orders" className="navbar__icon" aria-label="Orders" title="Orders & Atelier Archive">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <button
            className="navbar__icon navbar__cart-btn"
            onClick={openCart}
            aria-label="Cart"
            title="Shopping Bag"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cart.item_count > 0 && (
              <span className="navbar__cart-count">{cart.item_count}</span>
            )}
          </button>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}>
        <div className="mobile-menu__inner">
          <Link to="/collection" className="mobile-menu__link">
            All Creations
          </Link>
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/collection/${cat.toLowerCase()}`} className="mobile-menu__link">
              {cat}
            </Link>
          ))}
          <Link to="/orders" className="mobile-menu__link mobile-menu__link--sm">
            Client Archive & Orders
          </Link>
          <Link to="/search" className="mobile-menu__link mobile-menu__link--sm">
            Search Atelier
          </Link>
        </div>
      </div>
    </>
  );
}
