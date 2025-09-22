"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthContext"
import { ordersAPI } from "../services/api"

const Orders = () => {
  const auth = useAuth() || {}
  const currentUser = auth.currentUser
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login")
      return
    }
    const fetchOrders = async () => {
      try {
        const res = await ordersAPI.getUserOrders()
        setOrders(res.data)
      } catch (err) {
        setError("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [currentUser, router])

  if (loading) return <div className="loading"><div className="spinner" /></div>

  return (
    <div className="container">
      {error && <div>{error}</div>}
      {orders.length === 0 ? <div>No Orders Yet</div> : (
        orders.map(order => <div key={order.id}>{order.service.name} - {order.orderStatus}</div>)
      )}
    </div>
  )
}

export default Orders
