"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  profileImage?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData: User = {
        id: "user-1",
        name: "John Doe",
        email,
        phone: "+1234567890",
        profileImage: "/placeholder.svg?height=100&width=100",
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (err) {
      setError("Failed to login. Please check your credentials.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData: User = {
        id: "user-" + Date.now(),
        name,
        email,
        phone,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (err) {
      setError("Failed to create account. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
