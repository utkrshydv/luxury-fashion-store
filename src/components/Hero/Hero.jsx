import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800&q=85&auto=format&fit=crop"
          alt="Autumn Winter Collection"
          className="hero__img"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <p className="hero__season label">Autumn / Winter 2026</p>
        <h1 className="hero__headline">The New<br />Form</h1>
        <Link to="/collection/Women" className="btn-outlined btn-outlined--light hero__cta">
          Discover Collection
        </Link>
      </div>

      <div className="hero__scroll-hint">
        <span className="label">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
