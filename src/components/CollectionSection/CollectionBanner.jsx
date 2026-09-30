import { Link } from "react-router-dom";
import "./CollectionBanner.css";

export default function CollectionBanner({ category = "Men", image, subtitle = "" }) {
  const src = image || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85&auto=format&fit=crop";
  return (
    <section className="collection-banner">
      <div className="collection-banner__media">
        <img src={src} alt={category} className="collection-banner__img" />
        <div className="collection-banner__overlay" />
      </div>
      <div className="collection-banner__content reveal">
        {subtitle && <p className="label collection-banner__sub">{subtitle}</p>}
        <h2 className="collection-banner__title">{category}</h2>
        <Link to={`/collection/${category}`} className="btn-outlined btn-outlined--light">
          Shop {category}
        </Link>
      </div>
    </section>
  );
}
