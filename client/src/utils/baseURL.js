// frontend/src/utils/baseURL.js
// Centralised location for the API base URL. During build Vite will
// replace `import.meta.env.VITE_BASE_URL` with the value defined in
// the current environment (development, production, etc.).

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const getBaseURL = () => BASE_URL;
