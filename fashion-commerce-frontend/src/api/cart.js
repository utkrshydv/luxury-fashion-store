import { api } from "./client";

export const getCart     = ()            => api.get("/cart/");
export const addItem     = (product_id, quantity) => api.post("/cart/items", { product_id, quantity });
export const updateItem  = (product_id, quantity) => api.put(`/cart/items/${product_id}`, { quantity });
export const removeItem  = (product_id)  => api.delete(`/cart/items/${product_id}`);
export const clearCart   = ()            => api.delete("/cart/");
