import { api } from "./client";

export const getProducts = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== "") q.append(k, v); });
  return api.get(`/products/?${q}`);
};

export const getProduct = (id) => api.get(`/products/${id}`);

export const searchProducts = (params = {}) => {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== "") q.append(k, v); });
  return api.get(`/search/?${q}`);
};
