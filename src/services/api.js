"use client"
import axios from "axios"

// Use NEXT_PUBLIC_API_URL (set at build or runtime) when available, otherwise fall back to localhost for dev
const API_BASE_URL =
  typeof process !== 'undefined' &&
  process.env &&
  process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8083/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Debug: log which API base URL is being used (visible in browser console)
if (typeof window !== "undefined") {
  // Only log once in the browser
  // eslint-disable-next-line no-console
  console.log("[HomeService] API base URL:", API_BASE_URL)
}

// Helper to safely get token (only in browser)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Add token to requests safely
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
}

// Services API
export const servicesAPI = {
  getAll: () => api.get("/services"),
  getById: (id) => api.get(`/services/${id}`),
  getByCategory: (category) => api.get(`/services/category/${category}`),
}

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post("/orders", orderData),
  getUserOrders: () => api.get("/orders"),
  getAllOrders: () => api.get("/orders/admin"),
}

export default api
