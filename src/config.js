/**
 * Base URL for the backend API.
 *
 * - In development it defaults to the local server (http://localhost:9000).
 * - In production (Docker) build with VITE_API_BASE_URL="" so the app uses
 *   relative "/api/..." paths, which nginx reverse-proxies to the backend.
 *
 * Note: an empty string is intentionally respected (?? only falls back on
 * null/undefined), so an explicit VITE_API_BASE_URL="" yields relative URLs.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9000";
