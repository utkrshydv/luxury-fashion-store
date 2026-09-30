import { Link } from "react-router-dom";
import "./ProductCard.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

export default function ProductCard({ product }) {
  const { _id, name, brand, final_price, price, discount_percentage, image_urls, category } = product;
  const primary   = image_urls?.[0] || "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80";
  const secondary = image_urls?.[1] || primary;
  const hasDiscount = discount_percentage > 0;

  return (
    <Link to={`/product/${_id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img src={primary}   alt={name} className="product-card__img product-card__img--primary"   loading="lazy" />
        <img src={secondary} alt={name} className="product-card__img product-card__img--secondary" loading="lazy" />
        {hasDiscount && (
          <span className="product-card__badge">-{Math.round(discount_percentage)}%</span>
        )}
      </div>
      <div className="product-card__info">
        <p className="product-card__brand label">{brand}</p>
        <p className="product-card__name">{name}</p>
        <p className="product-card__price">
          {hasDiscount && <span className="product-card__price--original">{fmt(price)}</span>}
          <span>{fmt(final_price)}</span>
        </p>
      </div>
    </Link>
  );
}
