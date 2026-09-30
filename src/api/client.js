const BASE = "/api";

const getUserId = () => {
  let id = localStorage.getItem("maison_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("maison_user_id", id);
  }
  return id;
};

const request = async (method, path, body = null) => {
  const headers = { "Content-Type": "application/json", "X-User-ID": getUserId() };
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, detail: err.detail || "Request failed" };
  }
  if (res.status === 204) return null;
  return res.json();
};

export const api = {
  get:    (path)        => request("GET",    path),
  post:   (path, body)  => request("POST",   path, body),
  put:    (path, body)  => request("PUT",    path, body),
  delete: (path)        => request("DELETE", path),
};

export { getUserId };
