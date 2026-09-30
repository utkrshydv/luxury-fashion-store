import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

export default function CartPage() {
  const { cart, updateQty, removeFromCart, loading, emptyCart } = useCart();

  useEffect(() => {
    document.title = "Shopping Bag — Maison";
    window.scrollTo(0, 0);
  }, []);

  const shippingCost = (cart.total > 5000 || cart.total === 0) ? 0 : 500;
  const grandTotal = (cart.total || 0) + shippingCost;

  if (cart.items.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-page__container" style={{ textAlign: "center", padding: "100px 20px" }}>
          <h1 className="cart-page__title">Your Bag is Empty</h1>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
            You haven't reserved any bespoke pieces yet.
          </p>
          <Link to="/collection" className="btn btn--outline">
            Explore Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">Shopping Bag ({cart.item_count})</h1>

        <div className="cart-page__layout">
          {/* Items List */}
          <div>
            <ul className="cart-page__items">
              {cart.items.map((item) => {
                const img = item.image_url || "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&q=80";
                return (
                  <li key={item.product_id} className="cart-page__item">
                    <Link to={`/product/${item.product_id}`} className="cart-page__item-img-wrap">
                      <img src={img} alt={item.name} className="cart-page__item-img" loading="lazy" />
                    </Link>

                    <div className="cart-page__item-details">
                      <Link to={`/product/${item.product_id}`} className="cart-page__item-name">
                        {item.name}
                      </Link>
                      <span className="cart-page__item-sku">SKU: {item.sku}</span>
                      <span className="cart-page__item-price">{fmt(item.unit_price)} each</span>

                      <div className="cart-item__qty" style={{ marginTop: "8px" }}>
                        <button
                          type="button"
                          className="cart-item__qty-btn"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQty(item.product_id, item.quantity - 1);
                            } else {
                              removeFromCart(item.product_id);
                            }
                          }}
                          disabled={loading}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="cart-item__qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-item__qty-btn"
                          onClick={() => updateQty(item.product_id, item.quantity + 1)}
                          disabled={loading}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-page__item-actions">
                      <span className="cart-page__subtotal">{fmt(item.subtotal)}</span>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.product_id)}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
              <button
                type="button"
                className="collection-clear-btn"
                onClick={emptyCart}
                disabled={loading}
              >
                Clear entire bag
              </button>
              <Link to="/collection" className="collection-clear-btn">
                Continue browsing
              </Link>
            </div>
          </div>

          {/* Order Summary Panel */}
          <aside className="cart-page__summary" aria-label="Order Summary">
            <h2 className="cart-page__summary-title">Summary</h2>

            <div className="cart-page__summary-row">
              <span>Subtotal</span>
              <span>{fmt(cart.total)}</span>
            </div>

            <div className="cart-page__summary-row">
              <span>Estimated Shipping</span>
              <span>{shippingCost === 0 ? "Complimentary" : fmt(shippingCost)}</span>
            </div>

            <div className="cart-page__summary-row">
              <span>Import & Duty Taxes</span>
              <span>Included</span>
            </div>

            <div className="cart-page__summary-row cart-page__summary-row--total">
              <span>Total</span>
              <span>{fmt(grandTotal)}</span>
            </div>

            <Link to="/checkout" className="btn btn--primary cart-page__checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/collection" className="cart-page__continue-link">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
