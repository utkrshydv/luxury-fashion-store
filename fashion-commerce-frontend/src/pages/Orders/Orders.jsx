import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listOrders, getOrder } from "../../api/orders";
import "./Orders.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

const STATUS_STEPS = ["pending", "confirmed", "shipped", "delivered"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Direct Lookup by ID
  const [searchId, setSearchId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    document.title = "Order History & Tracking — Maison";
    window.scrollTo(0, 0);

    listOrders({ limit: 20 })
      .then((data) => {
        setOrders(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unable to fetch order history.");
        setLoading(false);
      });
  }, []);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearchLoading(true);
    setSearchError(null);
    setSearchedOrder(null);

    try {
      const order = await getOrder(searchId.trim());
      setSearchedOrder(order);
    } catch (err) {
      setSearchError(err.message || `No order found with reference "${searchId}".`);
    } finally {
      setSearchLoading(false);
    }
  };

  const renderTracker = (status) => {
    if (status === "cancelled") {
      return (
        <div style={{ textAlign: "center", padding: "12px", background: "#fdedec", color: "#c0392b", fontSize: "0.85rem", margin: "16px 0" }}>
          This order has been cancelled.
        </div>
      );
    }

    const currentIndex = STATUS_STEPS.indexOf(status.toLowerCase());

    return (
      <div className="order-tracker">
        {STATUS_STEPS.map((step, idx) => {
          const isComplete = currentIndex > idx;
          const isActive = currentIndex === idx;
          return (
            <div
              key={step}
              className={`order-tracker-step${
                isComplete ? " order-tracker-step--complete" : isActive ? " order-tracker-step--active" : ""
              }`}
            >
              <div className="order-tracker-dot">
                {isComplete ? "✓" : idx + 1}
              </div>
              <span className="order-tracker-label">{step}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderOrderCard = (order) => {
    const dateStr = order.created_at
      ? new Date(order.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <article key={order.id || order._id} className="order-card">
        <div className="order-card__header">
          <div>
            <span className="order-card__id">ORDER #{order.id || order._id}</span>
            <p className="order-card__date">Commissioned on {dateStr}</p>
          </div>
          <span className={`order-status-badge order-status-badge--${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>

        {/* Milestone Tracker */}
        {renderTracker(order.status)}

        {/* Ordered Items */}
        <ul className="order-items-list">
          {(order.items || []).map((item, i) => (
            <li key={i} className="order-item-row">
              <div>
                <strong>{item.name}</strong>
                <span className="order-item-meta"> — SKU: {item.sku} × {item.quantity}</span>
              </div>
              <span>{fmt(item.subtotal)}</span>
            </li>
          ))}
        </ul>

        {/* Address and Total */}
        <div className="order-footer-details">
          <div className="order-address-box">
            <strong>Destination:</strong> {order.shipping_address}
            {order.notes && (
              <p style={{ marginTop: "4px", fontStyle: "italic" }}>
                Notes: {order.notes}
              </p>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Total Settlement
            </span>
            <div className="order-total-amount">{fmt(order.total_amount)}</div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <main className="orders-page">
      <div className="orders-container">
        <header className="orders-header">
          <h1 className="orders-title">Client Atelier & Orders</h1>
          <p className="orders-subtitle">Track Bespoke Creations & Order History</p>
        </header>

        {/* Direct Order Lookup Bar */}
        <form onSubmit={handleLookup} className="orders-lookup-bar">
          <input
            type="text"
            className="orders-lookup-input"
            placeholder="Track by Order Reference ID (e.g. 6abcf...)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button type="submit" className="btn btn--outline" disabled={searchLoading}>
            {searchLoading ? "Locating..." : "Track Order"}
          </button>
        </form>

        {/* Searched Order Result if any */}
        {searchError && (
          <div style={{ textAlign: "center", padding: "16px", background: "#fdedec", color: "#c0392b", marginBottom: "24px" }}>
            {searchError}
          </div>
        )}

        {searchedOrder && (
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, marginBottom: "16px" }}>
              Lookup Result
            </h2>
            {renderOrderCard(searchedOrder)}
          </section>
        )}

        {/* Main Orders List */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="collection-skeleton-img" style={{ height: "160px" }} />
            <div className="collection-skeleton-img" style={{ height: "160px" }} />
          </div>
        ) : error ? (
          <div className="orders-empty">
            <h2 className="orders-empty-title">Error Loading Orders</h2>
            <p className="orders-empty-desc">{error}</p>
            <button className="btn btn--outline" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <h2 className="orders-empty-title">No Commissions Placed Yet</h2>
            <p className="orders-empty-desc">
              Your atelier archive is currently empty. Explore our latest collection to commission your first piece.
            </p>
            <Link to="/collection" className="btn btn--primary">
              Discover Creations
            </Link>
          </div>
        ) : (
          <section>
            {orders.map((order) => renderOrderCard(order))}
          </section>
        )}
      </div>
    </main>
  );
}
