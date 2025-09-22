"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setCurrentUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = (newToken, user) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(user))
    setToken(newToken)
    setCurrentUser(user)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setCurrentUser(null)
  }

  const value = { currentUser, token, login, logout, loading }

  // Render children only after loading to avoid undefined destructuring
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
