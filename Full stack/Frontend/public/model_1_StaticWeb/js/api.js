const API_BASE_URL = window.location.origin.includes("localhost:8080")
  ? ""
  : "http://localhost:8080";

async function apiRequest(path, options = {}) {
  const response = await fetch(API_BASE_URL + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}
