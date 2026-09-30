import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartDrawer.css";

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQty, removeFromCart, loading } = useCart();

  return (
    <>
      <div className={`cart-backdrop${isOpen ? " cart-backdrop--open" : ""}`} onClick={closeCart} />
      <div className={`cart-drawer${isOpen ? " cart-drawer--open" : ""}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Bag</h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your bag is empty.</p>
            <button className="btn-text" onClick={closeCart}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {cart.items.map((item) => (
                <li key={item.product_id} className="cart-item">
                  <Link to={`/product/${item.product_id}`} className="cart-item__img-wrap" onClick={closeCart}>
                    <div className="cart-item__img-placeholder" />
                  </Link>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">{fmt(item.unit_price)}</p>
                    <div className="cart-item__qty">
                      <button onClick={() => item.quantity > 1 && updateQty(item.product_id, item.quantity - 1)} disabled={loading}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.product_id, item.quantity + 1)} disabled={loading}>+</button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.product_id)} disabled={loading}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span className="label">Subtotal</span>
                <span className="cart-drawer__total-value">{fmt(cart.total)}</span>
              </div>
              <p className="cart-drawer__note">Shipping calculated at checkout</p>
              <Link to="/checkout" className="btn-outlined cart-drawer__checkout" onClick={closeCart}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
