"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { ordersAPI } from "../services/api"

const BookingModal = ({ service, isOpen, onClose, onSuccess }) => {
  const { currentUser } = useAuth()
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    pincode: "",
    scheduledDateTime: "",
    paymentMethod: "COD",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

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
      const orderData = {
        serviceId: service.id,
        street: formData.street,
        city: formData.city,
        pincode: formData.pincode,
        scheduledDateTime: formData.scheduledDateTime,
        paymentMethod: formData.paymentMethod,
      }

      await ordersAPI.create(orderData)
      onSuccess()
      onClose()

      // Reset form
      setFormData({
        street: "",
        city: "",
        pincode: "",
        scheduledDateTime: "",
        paymentMethod: "COD",
      })
    } catch (err) {
      setError(err.response?.data || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, color: "#1e293b" }}>Book Service</h2>
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

        <div style={{ marginBottom: "24px", padding: "16px", background: "#f8fafc", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 8px 0", color: "#1e293b" }}>{service.name}</h3>
          <p style={{ margin: "0 0 8px 0", color: "#64748b", fontSize: "14px" }}>{service.description}</p>
          <p style={{ margin: 0, fontWeight: "600", color: "#3b82f6" }}>Price: ₹{service.price}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter your street address"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Pincode"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Date & Time</label>
            <input
              type="datetime-local"
              name="scheduledDateTime"
              value={formData.scheduledDateTime}
              onChange={handleChange}
              className="form-input"
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Credit/Debit Card</option>
            </select>
          </div>

          {error && (
            <div className="error-message" style={{ marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Placing Order..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingModal
