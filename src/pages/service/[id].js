"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../context/AuthContext"
import { servicesAPI } from "../../services/api"
import BookingModal from "../../components/BookingModal"
import AuthModal from "../../components/AuthModal"

const ServiceDetailPage = () => {
  const router = useRouter()
  const { id } = router.query || {}
  const auth = useAuth() || {}
  const currentUser = auth.currentUser

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchService = async () => {
      try {
        const res = await servicesAPI.getById(id)
        setService(res.data)
      } catch {
        setError("Service not found")
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [id])

  const handleBookService = () => {
    if (!currentUser) {
      setShowAuthModal(true)
    } else {
      setShowBookingModal(true)
    }
  }

  const handleBookingSuccess = () => {
    alert("Order placed successfully!")
    router.push("/orders")
  }

  if (loading) return <div className="loading"><div className="spinner" /></div>
  if (error || !service) return (
    <div className="container" style={{ padding: "80px 20px", textAlign: "center" }}>
      <h2>{error}</h2>
      <button onClick={() => router.push("/")} className="btn btn-primary mt-4">Back to Home</button>
    </div>
  )

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "16px", marginBottom: "24px" }}>
        ← Back to Services
      </button>

      <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>{service.name}</h1>
      <p style={{ color: "#64748b", marginBottom: "16px" }}>{service.description}</p>
      <div style={{ fontSize: "28px", fontWeight: "700", color: "#3b82f6", marginBottom: "24px" }}>₹{service.price}</div>

      <button onClick={handleBookService} className="btn btn-primary" style={{ width: "100%", padding: "16px 24px", fontSize: "18px" }}>
        Book This Service
      </button>

      <BookingModal
        service={service}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSuccess={handleBookingSuccess}
      />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="login" />
    </div>
  )
}

export default ServiceDetailPage
