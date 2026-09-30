import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Collection.css";

const CATEGORIES = ["All", "Women", "Men", "Kids", "Accessories"];

const SUBTITLES = {
  All: "The complete repertoire — an uncompromising study in silhouette, textile, and timeless luxury.",
  Women: "Sculptural forms, fluid silks, and meticulous tailoring engineered for modern elegance.",
  Men: "Timeless tailoring, sartorial structure, and understated luxury crafted from noble fabrics.",
  Kids: "Gentle fabrics and refined craftsmanship designed with timeless innocence and grace.",
  Accessories: "Artisanal leather goods, sculpted silhouettes, and signature accents for the discerning eye.",
};

const PRICE_OPTIONS = [
  { id: "all", label: "All Prices" },
  { id: "under-1500", label: "Under ₹1,500", min: null, max: 1500 },
  { id: "1500-3000", label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { id: "3000-5000", label: "₹3,000 – ₹5,000", min: 3000, max: 5000 },
  { id: "above-5000", label: "Above ₹5,000", min: 5000, max: null },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest Arrivals", sort_by: "created_at", sort_order: "desc" },
  { id: "price-asc", label: "Price: Low to High", sort_by: "price", sort_order: "asc" },
  { id: "price-desc", label: "Price: High to Low", sort_by: "price", sort_order: "desc" },
  { id: "brand", label: "Brand: A to Z", sort_by: "brand", sort_order: "asc" },
];

export default function Collection() {
  const { category: rawCategory } = useParams();
  const navigate = useNavigate();

  // Normalize category parameter
  const activeCategory = CATEGORIES.find(
    (c) => c.toLowerCase() === (rawCategory || "").toLowerCase()
  ) || "All";

  const [priceRange, setPriceRange] = useState("all");
  const [sortKey, setSortKey] = useState("newest");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set document title
  useEffect(() => {
    document.title = `${activeCategory === "All" ? "Collection" : activeCategory} — Maison`;
  }, [activeCategory]);

  // Reset page when category or price changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory, priceRange, sortKey]);

  // Fetch products
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const priceConfig = PRICE_OPTIONS.find((p) => p.id === priceRange);
    const sortConfig = SORT_OPTIONS.find((s) => s.id === sortKey);

    const params = {
      page,
      limit: 12,
      sort_by: sortConfig.sort_by,
      sort_order: sortConfig.sort_order,
    };

    if (activeCategory !== "All") {
      params.category = activeCategory;
    }
    if (priceConfig?.min !== null && priceConfig?.min !== undefined) {
      params.min_price = priceConfig.min;
    }
    if (priceConfig?.max !== null && priceConfig?.max !== undefined) {
      params.max_price = priceConfig.max;
    }

    getProducts(params)
      .then((data) => {
        if (!cancelled) {
          setProducts(data.items || []);
          setTotal(data.total || 0);
          setTotalPages(data.pages || 1);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Unable to load collection.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeCategory, priceRange, sortKey, page]);

  const handleCategoryChange = (cat) => {
    if (cat === "All") {
      navigate("/collection");
    } else {
      navigate(`/collection/${cat.toLowerCase()}`);
    }
  };

  const handleResetFilters = () => {
    setPriceRange("all");
    setSortKey("newest");
    if (activeCategory !== "All") {
      navigate("/collection");
    }
  };

  const hasActiveFilters = priceRange !== "all" || sortKey !== "newest" || activeCategory !== "All";

  return (
    <div className="collection-page">
      {/* Editorial Header */}
      <header className="collection-hero">
        <p className="collection-hero__eyebrow label">Collection 2026</p>
        <h1 className="collection-hero__title">
          {activeCategory === "All" ? "All Creations" : activeCategory}
        </h1>
        <p className="collection-hero__subtitle">{SUBTITLES[activeCategory]}</p>
      </header>

      {/* Sticky Filter & Sort Toolbar */}
      <nav className="collection-toolbar" aria-label="Catalog Filters">
        <div className="collection-toolbar__inner">
          {/* Category Tabs */}
          <div className="collection-tabs" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  className={`collection-tab${isActive ? " collection-tab--active" : ""}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Controls: Price Range & Sort */}
          <div className="collection-controls">
            {/* Price Select */}
            <div className="collection-select-wrap">
              <label htmlFor="price-filter" className="collection-select-label">Price:</label>
              <select
                id="price-filter"
                className="collection-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="collection-select-wrap">
              <label htmlFor="sort-filter" className="collection-select-label">Sort:</label>
              <select
                id="sort-filter"
                className="collection-select"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Count */}
            <span className="collection-count">
              {loading ? "Updating..." : `${total} Pieces`}
            </span>
          </div>
        </div>
      </nav>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="collection-active-filters">
          {activeCategory !== "All" && (
            <span className="collection-active-filter-tag">
              Category: {activeCategory}
              <button onClick={() => navigate("/collection")} title="Remove category">×</button>
            </span>
          )}
          {priceRange !== "all" && (
            <span className="collection-active-filter-tag">
              {PRICE_OPTIONS.find((p) => p.id === priceRange)?.label}
              <button onClick={() => setPriceRange("all")} title="Remove price filter">×</button>
            </span>
          )}
          {sortKey !== "newest" && (
            <span className="collection-active-filter-tag">
              Sort: {SORT_OPTIONS.find((s) => s.id === sortKey)?.label}
              <button onClick={() => setSortKey("newest")} title="Reset sort">×</button>
            </span>
          )}
          <button className="collection-clear-btn" onClick={handleResetFilters}>
            Clear all
          </button>
        </div>
      )}

      {/* Main Catalog Content */}
      <main className="collection-main">
        {error ? (
          <div className="collection-empty">
            <h2 className="collection-empty__title">Unable to Load Collection</h2>
            <p className="collection-empty__desc">{error}</p>
            <button className="btn btn--outline" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="collection-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="collection-skeleton-card">
                <div className="collection-skeleton-img" />
                <div className="collection-skeleton-text collection-skeleton-text--short" />
                <div className="collection-skeleton-text collection-skeleton-text--med" />
                <div className="collection-skeleton-text collection-skeleton-text--short" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="collection-empty">
            <h2 className="collection-empty__title">No Pieces Found</h2>
            <p className="collection-empty__desc">
              We could not find any creations matching your selected filter criteria.
            </p>
            <button className="btn btn--outline" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="collection-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="collection-pagination">
                <button
                  className="collection-page-btn"
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  disabled={page === 1}
                  aria-label="Previous Page"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`collection-page-btn${p === page ? " collection-page-btn--active" : ""}`}
                    onClick={() => {
                      setPage(p);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="collection-page-btn"
                  onClick={() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  disabled={page === totalPages}
                  aria-label="Next Page"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
