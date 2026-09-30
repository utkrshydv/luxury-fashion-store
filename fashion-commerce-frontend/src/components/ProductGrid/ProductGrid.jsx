import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({ title = "New Arrivals", category, limit = 8, showLink = true }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ category, limit, sort_by: "created_at", sort_order: "desc" })
      .then((d) => setProducts(d?.items || []))
      .catch(() => {});
  }, [category, limit]);

  if (!products.length) return null;

  return (
    <section className="product-grid-section section">
      <div className="container">
        <div className="product-grid-section__header reveal">
          <h2 className="product-grid-section__title">{title}</h2>
          {showLink && category && (
            <Link to={`/collection/${category}`} className="btn-text">View All</Link>
          )}
        </div>
        <div className="product-grid reveal">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
