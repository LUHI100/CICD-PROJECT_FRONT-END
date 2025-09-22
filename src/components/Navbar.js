"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav
      style={{
        background: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#3b82f6",
            textDecoration: "none",
          }}
        >
          HomeService
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {currentUser ? (
            <>
              <span style={{ color: "#64748b" }}>Welcome, {currentUser.firstName}</span>
              <Link href="/Orders" className="btn btn-outline">
                My Orders
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/Login" className="btn btn-outline">
                Login
              </Link>
              <Link href="/Signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
