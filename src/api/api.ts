import axios from "axios";

// In development we proxy /api -> http://localhost:8080 (vite proxy),
// in production the backend should be reachable directly.
const base = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? '/api'
  : 'http://localhost:8080';

const api = axios.create({
  baseURL: base,
});

export default api;