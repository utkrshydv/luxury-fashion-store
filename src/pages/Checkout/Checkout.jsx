import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../api/orders";
import "./Checkout.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

export default function Checkout() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    street: "14 Kasturba Gandhi Marg, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    deliveryOption: "standard",
    paymentOption: "card",
    giftWrap: true,
    notes: "Leave with building reception if unavailable.",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    document.title = "Checkout — Maison";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const shippingCost = form.deliveryOption === "express" ? 500 : 0;
  const grandTotal = (cart.total || 0) + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.items || cart.items.length === 0) {
      setError("Your cart is empty. Please add items before placing an order.");
      return;
    }

    setLoading(true);
    setError(null);

    const fullAddress = `${form.fullName}, ${form.street}, ${form.city}, ${form.state} - ${form.pincode} (Tel: ${form.phone})`;
    const orderNotes = [
      form.notes,
      form.giftWrap ? "[Complimentary Bespoke Gift Box Requested]" : null,
      `Delivery: ${form.deliveryOption.toUpperCase()}`,
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const order = await placeOrder(fullAddress, orderNotes);
      setPlacedOrder(order);
      await fetchCart();
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message || "Unable to place order. Please review your details and stock availability.");
    } finally {
      setLoading(false);
    }
  };

  // If order was successfully placed
  if (placedOrder) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="order-success">
            <div className="order-success-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="order-success-title">Order Confirmed</h1>
            <p className="order-success-id">REFERENCE NO. #{placedOrder.id || placedOrder._id}</p>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              Thank you for placing your order with Maison. Our master tailors and artisans are preparing your bespoke items with utmost care.
            </p>

            <div className="order-success-box">
              <div className="order-success-row">
                <span style={{ color: "var(--color-text-muted)" }}>Order Status:</span>
                <strong style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {placedOrder.status}
                </strong>
              </div>
              <div className="order-success-row">
                <span style={{ color: "var(--color-text-muted)" }}>Total Paid:</span>
                <strong>{fmt(placedOrder.total_amount)}</strong>
              </div>
              <div className="order-success-row">
                <span style={{ color: "var(--color-text-muted)" }}>Items Reserved:</span>
                <span>{placedOrder.items?.length || 1} piece(s)</span>
              </div>
              <div className="order-success-row">
                <span style={{ color: "var(--color-text-muted)" }}>Dispatched To:</span>
                <span style={{ maxWidth: "60%", textAlign: "right", fontSize: "0.8rem" }}>
                  {placedOrder.shipping_address}
                </span>
              </div>
            </div>

            <div className="order-success-actions">
              <Link to="/orders" className="btn btn--primary">
                View All Orders
              </Link>
              <Link to="/collection" className="btn btn--outline">
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // If cart is empty
  if (!cart.items || cart.items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-container" style={{ textAlign: "center", padding: "100px 20px" }}>
          <h1 className="checkout-title">Your Bag is Empty</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
            Add luxury pieces to your bag before proceeding to checkout.
          </p>
          <Link to="/collection" className="btn btn--outline">
            Discover Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">Secure Luxury Reservation & Delivery</p>
        </header>

        {error && (
          <div style={{
            backgroundColor: "#faeae8",
            color: "#c0392b",
            padding: "16px",
            border: "1px solid #f5c6cb",
            marginBottom: "24px",
            fontSize: "0.85rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="checkout-layout">
          {/* Form Left Column */}
          <div>
            {/* Step 1: Shipping Address */}
            <section className="checkout-section">
              <h2 className="checkout-section-title">
                <span className="checkout-step-num">1</span>
                <span>Delivery & Client Details</span>
              </h2>

              <div className="checkout-form-grid">
                <div className="checkout-field checkout-form-full">
                  <label className="checkout-label" htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="checkout-input"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label className="checkout-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="checkout-input"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label className="checkout-label" htmlFor="phone">Phone (For Courier)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="checkout-input"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field checkout-form-full">
                  <label className="checkout-label" htmlFor="street">Street Address / Suite</label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    className="checkout-input"
                    value={form.street}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label className="checkout-label" htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="checkout-input"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label className="checkout-label" htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    className="checkout-input"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field checkout-form-full">
                  <label className="checkout-label" htmlFor="pincode">Postal PIN Code</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    required
                    className="checkout-input"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Delivery Speed */}
            <section className="checkout-section">
              <h2 className="checkout-section-title">
                <span className="checkout-step-num">2</span>
                <span>Delivery Service</span>
              </h2>

              <label
                className={`checkout-option-card${
                  form.deliveryOption === "standard" ? " checkout-option-card--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="standard"
                  checked={form.deliveryOption === "standard"}
                  onChange={handleChange}
                />
                <div className="checkout-option-info">
                  <p className="checkout-option-title">Standard Insured Courier (3–5 Business Days)</p>
                  <p className="checkout-option-desc">Carbon-neutral delivery in archival garment box</p>
                </div>
                <span className="checkout-option-price">Complimentary</span>
              </label>

              <label
                className={`checkout-option-card${
                  form.deliveryOption === "express" ? " checkout-option-card--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="deliveryOption"
                  value="express"
                  checked={form.deliveryOption === "express"}
                  onChange={handleChange}
                />
                <div className="checkout-option-info">
                  <p className="checkout-option-title">Express Atelier Courier (1–2 Business Days)</p>
                  <p className="checkout-option-desc">Priority handling with real-time driver tracking</p>
                </div>
                <span className="checkout-option-price">₹500</span>
              </label>
            </section>

            {/* Step 3: Payment Method */}
            <section className="checkout-section">
              <h2 className="checkout-section-title">
                <span className="checkout-step-num">3</span>
                <span>Payment & Atelier Packaging</span>
              </h2>

              <label
                className={`checkout-option-card${
                  form.paymentOption === "card" ? " checkout-option-card--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentOption"
                  value="card"
                  checked={form.paymentOption === "card"}
                  onChange={handleChange}
                />
                <div className="checkout-option-info">
                  <p className="checkout-option-title">Direct Atelier Settlement (Instant Mock Authorization)</p>
                  <p className="checkout-option-desc">Simulated card/UPI authorization for instant order verification</p>
                </div>
              </label>

              <div style={{ marginTop: "16px", padding: "12px", background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.82rem" }}>
                  <input
                    type="checkbox"
                    name="giftWrap"
                    checked={form.giftWrap}
                    onChange={handleChange}
                  />
                  <span>Complimentary signature gift wrapping with silk ribbon and wax seal</span>
                </label>
              </div>

              <div className="checkout-field" style={{ marginTop: "16px" }}>
                <label className="checkout-label" htmlFor="notes">Delivery / Atelier Notes</label>
                <input
                  id="notes"
                  name="notes"
                  type="text"
                  className="checkout-input"
                  placeholder="e.g. Leave with building security, call upon arrival"
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>

          {/* Right Column: Order Review */}
          <aside className="checkout-summary" aria-label="Order Summary">
            <h2 className="checkout-summary-title">Order Review ({cart.item_count})</h2>

            <ul className="checkout-summary-items">
              {cart.items.map((item) => {
                const img = item.image_url || "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&q=80";
                return (
                  <li key={item.product_id} className="checkout-summary-item">
                    <img src={img} alt={item.name} className="checkout-summary-img" />
                    <div className="checkout-summary-item-info">
                      <p className="checkout-summary-item-name">{item.name}</p>
                      <p className="checkout-summary-item-qty">Qty: {item.quantity}</p>
                    </div>
                    <span className="checkout-summary-item-price">{fmt(item.subtotal)}</span>
                  </li>
                );
              })}
            </ul>

            <div className="checkout-calc-row">
              <span>Subtotal</span>
              <span>{fmt(cart.total)}</span>
            </div>

            <div className="checkout-calc-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Complimentary" : fmt(shippingCost)}</span>
            </div>

            <div className="checkout-calc-row">
              <span>Estimated Taxes</span>
              <span>Included</span>
            </div>

            <div className="checkout-calc-row checkout-calc-row--total">
              <span>Total</span>
              <span>{fmt(grandTotal)}</span>
            </div>

            <button
              type="submit"
              className="btn btn--primary checkout-submit-btn"
              disabled={loading}
            >
              {loading ? "Confirming Order..." : `Place Order — ${fmt(grandTotal)}`}
            </button>

            <div className="checkout-assurance">
              <p>🔒 256-Bit Encrypted Atelier Transaction</p>
              <p style={{ marginTop: "4px" }}>
                14-day complimentary returns. White-glove insured delivery.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
