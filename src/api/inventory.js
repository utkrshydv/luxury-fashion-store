import { api } from "./client";

export const getInventory    = (product_id) => api.get(`/inventory/${product_id}`);
export const getLowStock     = (threshold = 10) => api.get(`/inventory/low-stock?threshold=${threshold}`);
