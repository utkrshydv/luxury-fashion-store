import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartDrawer.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 0 })}`;

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQty, removeFromCart, emptyCart, loading } = useCart();

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - (cart.total || 0));

  return (
    <>
      <div
        className={`cart-backdrop${isOpen ? " cart-backdrop--open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${isOpen ? " cart-drawer--open" : ""}`}
        aria-label="Shopping Bag"
      >
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Your Bag {cart.item_count > 0 && `(${cart.item_count})`}
          </h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close Bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Qualification Bar */}
        <div className="cart-drawer__shipping-bar">
          {remainingForFreeShipping > 0 ? (
            <span>
              Add <strong>{fmt(remainingForFreeShipping)}</strong> more for complimentary courier delivery
            </span>
          ) : (
            <span>You have qualified for complimentary express courier delivery</span>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="cart-drawer__empty">
            <h3 className="cart-drawer__empty-title">Your bag is empty</h3>
            <p>Explore our latest creations and curation of noble silhouettes.</p>
            <Link to="/collection" className="btn btn--outline" onClick={closeCart}>
              Discover Collections
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {cart.items.map((item) => {
                const img = item.image_url || "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&q=80";
                return (
                  <li key={item.product_id} className="cart-item">
                    <Link
                      to={`/product/${item.product_id}`}
                      className="cart-item__img-wrap"
                      onClick={closeCart}
                    >
                      <img src={img} alt={item.name} className="cart-item__img" loading="lazy" />
                    </Link>
                    <div className="cart-item__info">
                      <p className="cart-item__name">{item.name}</p>
                      <p className="cart-item__price">{fmt(item.unit_price)}</p>
                      <div className="cart-item__qty">
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
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.product_id)}
                      disabled={loading}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span className="cart-drawer__total-label">Estimated Total</span>
                <span className="cart-drawer__total-value">{fmt(cart.total)}</span>
              </div>
              <p className="cart-drawer__note">
                Taxes included. Duties and courier packaging calculated at checkout.
              </p>
              <Link
                to="/checkout"
                className="btn btn--primary cart-drawer__checkout-btn"
                onClick={closeCart}
              >
                Proceed to Checkout
              </Link>
              <button
                type="button"
                className="cart-drawer__clear-btn"
                onClick={emptyCart}
                disabled={loading}
              >
                Empty Bag
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
