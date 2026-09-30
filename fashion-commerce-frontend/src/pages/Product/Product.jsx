import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct, getProducts } from "../../api/products";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Product.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

export default function Product() {
  const { id } = useParams();
  const { addToCart, loading: cartLoading } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [accordions, setAccordions] = useState({ details: true, fabric: false, shipping: false });
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    getProduct(id)
      .then((data) => {
        setProduct(data);
        setSelectedImg(0);
        setSelectedSize(data.available_sizes?.[0] || "");
        setSelectedColor(data.available_colors?.[0] || "");
        document.title = `${data.name} — Maison`;

        // Fetch related products from same category
        if (data.category) {
          getProducts({ category: data.category, limit: 5 })
            .then((res) => {
              const others = (res.items || []).filter((p) => p._id !== data._id).slice(0, 4);
              setRelated(others);
            })
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Product not found or unavailable.");
        setLoading(false);
      });
  }, [id]);

  const toggleAccordion = (key) => {
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAdd = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product._id, 1);
    } catch (err) {
      alert(err.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <main className="pdp-page">
        <div className="pdp-container">
          <div className="pdp-layout">
            <div className="collection-skeleton-img" style={{ height: "600px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="collection-skeleton-text" style={{ width: "30%" }} />
              <div className="collection-skeleton-text" style={{ width: "70%", height: "28px" }} />
              <div className="collection-skeleton-text" style={{ width: "40%", height: "20px" }} />
              <div className="collection-skeleton-text" style={{ width: "100%", height: "100px" }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="pdp-page">
        <div className="pdp-container" style={{ textAlign: "center", padding: "100px 20px" }}>
          <h1 className="pdp-title" style={{ marginBottom: "16px" }}>Creation Unavailable</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
            {error || "The requested piece could not be located in our catalog."}
          </p>
          <Link to="/collection" className="btn btn--outline">Return to Collection</Link>
        </div>
      </main>
    );
  }

  const images = (product.image_urls && product.image_urls.length > 0)
    ? product.image_urls
    : ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=900&q=85"];

  const hasDiscount = product.discount_percentage > 0;
  const isOutOfStock = product.stock_quantity <= 0 || product.status === "out_of_stock";
  const isLowStock = !isOutOfStock && product.stock_quantity <= 10;

  return (
    <main className="pdp-page">
      <div className="pdp-container">
        {/* Breadcrumb Navigation */}
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Maison</Link>
          <span>/</span>
          <Link to="/collection">Creations</Link>
          <span>/</span>
          <Link to={`/collection/${product.category.toLowerCase()}`}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: "var(--color-text)" }}>{product.name}</span>
        </nav>

        {/* Editorial Split Layout */}
        <div className="pdp-layout">
          {/* Gallery Column */}
          <div className="pdp-gallery">
            {images.length > 1 && (
              <div className="pdp-thumbnails" role="tablist" aria-label="Product Images">
                {images.map((img, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={selectedImg === i}
                    className={`pdp-thumb-btn${selectedImg === i ? " pdp-thumb-btn--active" : ""}`}
                    onClick={() => setSelectedImg(i)}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            <div className="pdp-main-image-wrap">
              <img
                src={images[selectedImg] || images[0]}
                alt={product.name}
                className="pdp-main-image"
              />
              {hasDiscount && (
                <span className="pdp-badge">-{Math.round(product.discount_percentage)}%</span>
              )}
            </div>
          </div>

          {/* Product Information Column */}
          <div className="pdp-info">
            <div>
              <p className="pdp-brand label">{product.brand}</p>
              <h1 className="pdp-title">{product.name}</h1>
            </div>

            {/* Pricing */}
            <div>
              <div className="pdp-pricing">
                <span className="pdp-price-final">{fmt(product.final_price)}</span>
                {hasDiscount && (
                  <span className="pdp-price-original">{fmt(product.price)}</span>
                )}
                {hasDiscount && (
                  <span className="pdp-discount-pill">Seasonal Reduction</span>
                )}
              </div>
              <p className="pdp-tax-note">
                SKU: {product.sku} — Taxes & luxury courier packaging included.
              </p>
            </div>

            {/* Size Selector */}
            {product.available_sizes && product.available_sizes.length > 0 && (
              <div>
                <div className="pdp-section-header">
                  <span className="pdp-selector-label">Size: {selectedSize}</span>
                  <button
                    type="button"
                    className="pdp-guide-link"
                    onClick={() => alert("Size & Fit Guide: Our silhouettes are cut true to standard European tailoring. For an oversized fit, select one size up.")}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="pdp-sizes-list" role="radiogroup" aria-label="Select Size">
                  {product.available_sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      role="radio"
                      aria-checked={selectedSize === sz}
                      className={`pdp-size-btn${selectedSize === sz ? " pdp-size-btn--selected" : ""}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.available_colors && product.available_colors.length > 0 && (
              <div>
                <div className="pdp-section-header">
                  <span className="pdp-selector-label">Color: {selectedColor}</span>
                </div>
                <div className="pdp-colors-list">
                  {product.available_colors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      className={`pdp-color-pill${selectedColor === col ? " pdp-color-pill--selected" : ""}`}
                      onClick={() => setSelectedColor(col)}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability */}
            <div className="pdp-stock-status">
              <span
                className={`pdp-stock-dot${
                  isOutOfStock ? " pdp-stock-dot--out" : isLowStock ? " pdp-stock-dot--low" : ""
                }`}
              />
              <span>
                {isOutOfStock
                  ? "Currently Sold Out"
                  : isLowStock
                  ? `Limited Availability — Only ${product.stock_quantity} pieces in atelier`
                  : "In Stock — Dispatched within 24 hours"}
              </span>
            </div>

            {/* CTA Button */}
            <div className="pdp-actions">
              <button
                className="btn btn--primary pdp-add-btn"
                onClick={handleAdd}
                disabled={isOutOfStock || adding || cartLoading}
              >
                {adding || cartLoading
                  ? "Adding to Bag..."
                  : isOutOfStock
                  ? "Sold Out"
                  : `Add to Bag — ${fmt(product.final_price)}`}
              </button>
            </div>

            {/* Editorial Accordions */}
            <div className="pdp-accordions">
              {/* Accordion 1: Details */}
              <div className={`pdp-accordion-item${accordions.details ? " pdp-accordion-item--open" : ""}`}>
                <button
                  type="button"
                  className="pdp-accordion-trigger"
                  onClick={() => toggleAccordion("details")}
                  aria-expanded={accordions.details}
                >
                  <span>Description & Silhouette</span>
                  <span className="pdp-accordion-icon">+</span>
                </button>
                {accordions.details && (
                  <div className="pdp-accordion-content">
                    <p>{product.description || "Designed with sculptural purity and architectural precision. Crafted with meticulous hand-finished hems and bespoke construction."}</p>
                    <ul style={{ marginTop: "12px", paddingLeft: "18px", listStyle: "circle" }}>
                      <li>Signature {product.brand} silhouette and cut</li>
                      <li>Tailored with high-density thread count</li>
                      <li>Category: {product.category}</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div className={`pdp-accordion-item${accordions.fabric ? " pdp-accordion-item--open" : ""}`}>
                <button
                  type="button"
                  className="pdp-accordion-trigger"
                  onClick={() => toggleAccordion("fabric")}
                  aria-expanded={accordions.fabric}
                >
                  <span>Composition & Care</span>
                  <span className="pdp-accordion-icon">+</span>
                </button>
                {accordions.fabric && (
                  <div className="pdp-accordion-content">
                    <p>Sustainably sourced natural fibers selected for durability, breathability, and luxurious handfeel.</p>
                    <p style={{ marginTop: "8px" }}>
                      <strong>Care instructions:</strong> Professional dry clean only. Steam iron at low temperature if necessary. Store folded in the provided breathable cotton garment pouch.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery & Returns */}
              <div className={`pdp-accordion-item${accordions.shipping ? " pdp-accordion-item--open" : ""}`}>
                <button
                  type="button"
                  className="pdp-accordion-trigger"
                  onClick={() => toggleAccordion("shipping")}
                  aria-expanded={accordions.shipping}
                >
                  <span>Complimentary Shipping & Returns</span>
                  <span className="pdp-accordion-icon">+</span>
                </button>
                {accordions.shipping && (
                  <div className="pdp-accordion-content">
                    <p>Complimentary insured courier delivery across India on all orders. Express delivery dispatched within 1–2 business days.</p>
                    <p style={{ marginTop: "8px" }}>
                      Complimentary returns and exchanges accepted within 14 calendar days from receipt, provided the security tag remains unbroken.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {related.length > 0 && (
          <section className="pdp-related">
            <h2 className="pdp-related__title">You May Also Admire</h2>
            <div className="collection-grid">
              {related.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
