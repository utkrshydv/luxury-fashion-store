import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart, addItem, updateItem, removeItem, clearCart as clearCartApi } from "../api/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart]         = useState({ items: [], total: 0, item_count: 0 });
  const [isOpen, setIsOpen]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch {}
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const openCart  = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = async (product_id, quantity = 1) => {
    setLoading(true);
    try {
      const data = await addItem(product_id, quantity);
      setCart(data);
      setIsOpen(true);
    } finally { setLoading(false); }
  };

  const updateQty = async (product_id, quantity) => {
    setLoading(true);
    try {
      const data = await updateItem(product_id, quantity);
      setCart(data);
    } finally { setLoading(false); }
  };

  const removeFromCart = async (product_id) => {
    setLoading(true);
    try {
      const data = await removeItem(product_id);
      setCart(data);
    } finally { setLoading(false); }
  };

  const emptyCart = async () => {
    const data = await clearCartApi();
    setCart(data);
  };

  return (
    <CartContext.Provider value={{
      cart, isOpen, loading,
      openCart, closeCart,
      addToCart, updateQty, removeFromCart, emptyCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
