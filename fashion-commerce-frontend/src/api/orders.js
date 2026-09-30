import { api } from "./client";

export const placeOrder  = (shipping_address, notes = null) =>
  api.post("/orders/", { shipping_address, notes });

export const listOrders  = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) q.append(k, v); });
  return api.get(`/orders/?${q}`);
};

export const getOrder    = (id) => api.get(`/orders/${id}`);
