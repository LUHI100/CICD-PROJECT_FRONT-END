"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { authAPI } from "../services/api"

const Signup = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await authAPI.register(formData)
      setSuccess("Account created! You can now sign in.")
      setTimeout(() => router.push("/Login"), 800)
    } catch (err) {
      setError(err.response?.data || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ background: "white", padding: "48px", borderRadius: "12px", boxShadow: "0 10px 25px -3px rgba(0,0,0,0.1)", width: "100%", maxWidth: "520px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>Create your account</h1>
        <p style={{ color: "#64748b", marginBottom: 24 }}>It only takes a minute.</p>

        <form onSubmit={handleSubmit}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First name</label>
              <input id="firstName" name="firstName" className="form-input" placeholder="John" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last name</label>
              <input id="lastName" name="lastName" className="form-input" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="form-input" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </div>

          {error && <div className="error-message mb-4">{error}</div>}
          {success && <div className="success-message mb-4">{success}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-4" style={{ color: "#64748b" }}>
          Already have an account? <Link href="/Login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
