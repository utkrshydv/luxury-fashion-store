import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";
import "./CollectionSection.css";

export default function CollectionSection({ category = "Women", label = "Featured Collection" }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ category, limit: 4 }).then((d) => setProducts(d?.items || [])).catch(() => {});
  }, [category]);

  if (!products.length) return null;

  const [featured, ...rest] = products;

  return (
    <section className="collection-section section">
      <div className="container">
        <div className="collection-section__header reveal">
          <p className="label">{label}</p>
          <h2 className="collection-section__title">{category}</h2>
          <Link to={`/collection/${category}`} className="btn-text">View All</Link>
        </div>

        <div className="collection-section__grid reveal">
          {/* Large featured card */}
          <div className="collection-section__feature">
            <ProductCard product={featured} />
          </div>
          {/* 3 smaller cards stacked */}
          <div className="collection-section__sidebar">
            {rest.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
