"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthContext"
import { authAPI } from "../services/api"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const auth = useAuth() || {}
  const router = useRouter()

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await authAPI.login(formData)
      const { accessToken, id, firstName, lastName, email } = response.data
      auth.login?.(accessToken, { id, firstName, lastName, email })
      router.push("/")
    } catch (err) {
      setError(err.response?.data || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ background: "white", padding: "48px", borderRadius: "12px", boxShadow: "0 10px 25px -3px rgba(0,0,0,0.1)", width: "100%", maxWidth: "420px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>Welcome Back</h1>
        <p style={{ color: "#64748b", marginBottom: 24 }}>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message mb-4">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4" style={{ color: "#64748b" }}>
          Don't have an account? <Link href="/Signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
