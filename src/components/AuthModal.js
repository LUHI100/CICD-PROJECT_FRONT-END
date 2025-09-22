"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { authAPI } from "../services/api"

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Safe destructuring to prevent errors during SSR or if useAuth is undefined
  const { login } = useAuth() || { login: () => {} }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "login") {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        })
        const { accessToken, id, firstName, lastName, email } = response.data
        login(accessToken, { id, firstName, lastName, email })
        onClose()
      } else {
        await authAPI.register(formData)
        setMode("login")
        setError("")
        setFormData({ ...formData, password: "" })
        alert("Registration successful! Please login.")
      }
    } catch (err) {
      setError(err.response?.data || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    })
    setError("")
  }

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login")
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, color: "#1e293b" }}>{mode === "login" ? "Login" : "Sign Up"}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="First Name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Phone Number"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Email Address"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Password"
              minLength={6}
            />
          </div>

          {error && (
            <div className="error-message" style={{ marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginBottom: "16px" }}
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </button>

          <div className="text-center">
            <span style={{ color: "#64748b" }}>
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={switchMode}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
