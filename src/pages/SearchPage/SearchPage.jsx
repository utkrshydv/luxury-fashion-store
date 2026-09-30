import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./SearchPage.css";

const POPULAR_SEARCHES = ["Linen", "Blazer", "Jeans", "Sweater", "Dress", "Leather", "Hoodie"];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    document.title = query ? `Search: "${query}" — Maison` : "Search — Maison";
  }, [query]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const performSearch = (searchTerm) => {
    const term = searchTerm.trim();
    if (term.length < 2) {
      setResults([]);
      setTotal(0);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchParams({ q: term });

    searchProducts({ q: term, limit: 20 })
      .then((data) => {
        setResults(data.items || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to complete search.");
        setLoading(false);
      });
  };

  // If initial query exists in URL on mount
  useEffect(() => {
    if (initialQuery.trim().length >= 2) {
      performSearch(initialQuery);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    performSearch(term);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setTotal(0);
    setHasSearched(false);
    setSearchParams({});
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <h1 className="search-header__title">Search the Atelier</h1>

        <form onSubmit={handleSubmit} className="search-input-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search by piece, fabric, style..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="6" />
              </svg>
            </button>
          )}
        </form>

        <div className="search-suggestions">
          <span className="search-suggestions__label">Popular:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              className="search-tag"
              onClick={() => handleSuggestionClick(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </header>

      {/* Results Meta */}
      {hasSearched && (
        <div className="search-results-meta">
          <span className="search-results-count">
            {loading ? "Searching..." : `${total} Result${total === 1 ? "" : "s"} for "${query}"`}
          </span>
          {hasSearched && (
            <button className="collection-clear-btn" onClick={handleClear}>
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Main Results Grid */}
      <div className="search-grid-wrap">
        {error ? (
          <div className="search-empty">
            <h2 className="search-empty__title">Search Error</h2>
            <p className="search-empty__desc">{error}</p>
          </div>
        ) : loading ? (
          <div className="collection-grid" style={{ marginTop: "var(--space-xl)" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="collection-skeleton-card">
                <div className="collection-skeleton-img" />
                <div className="collection-skeleton-text collection-skeleton-text--short" />
                <div className="collection-skeleton-text collection-skeleton-text--med" />
              </div>
            ))}
          </div>
        ) : hasSearched && results.length === 0 ? (
          <div className="search-empty">
            <h2 className="search-empty__title">No Creations Found</h2>
            <p className="search-empty__desc">
              We could not find any pieces matching &ldquo;{query}&rdquo;. Discover our core collections instead.
            </p>
            <div className="search-empty__links">
              <Link to="/collection/women" className="btn btn--outline">Women</Link>
              <Link to="/collection/men" className="btn btn--outline">Men</Link>
              <Link to="/collection/accessories" className="btn btn--outline">Accessories</Link>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="collection-grid" style={{ marginTop: "var(--space-xl)" }}>
            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
