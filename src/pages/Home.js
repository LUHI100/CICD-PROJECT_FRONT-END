"use client"

import { useState, useEffect } from "react"
import ServiceCard from "../components/ServiceCard"
import { servicesAPI } from "../services/api"

const Home = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll()
        setServices(response.data)
      } catch (err) {
        // Log detailed error info to help diagnose
        // eslint-disable-next-line no-console
        console.error("[HomeService] Failed to load services:", {
          message: err?.message,
          status: err?.response?.status,
          statusText: err?.response?.statusText,
          data: err?.response?.data,
          url: err?.config?.baseURL + err?.config?.url,
        })
        setError("Failed to load services")
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) return <div className="loading"><div className="spinner" /></div>

  return (
    <div>
      {/* Hero Section */}
      {/* ...your existing Hero JSX... */}

      {/* Services Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          {error && <div className="error-message text-center mb-4">{error}</div>}
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}
          >
            {services.map(service => <ServiceCard key={service.id} service={service} />)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* ...your existing Features JSX... */}
    </div>
  )
}

export default Home
