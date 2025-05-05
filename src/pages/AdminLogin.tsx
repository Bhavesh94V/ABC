"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Validation states
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigate()
  const { toast } = useToast()

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required")
      return false
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(value)) {
      setEmailError("Please enter a valid email")
      return false
    }

    setEmailError("")
    return true
  }

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required")
      return false
    }

    setPasswordError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validateEmail(email) && validatePassword(password)

    if (!isValid) return

    setIsLoading(true)

    // Simulate admin login
    setTimeout(() => {
      toast({
        title: "Success",
        description: "You have successfully logged in as an admin",
      })
      navigate("/admin-dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <Link to="/welcome" className="inline-flex items-center mb-6 text-green-nexus-600 hover:text-green-nexus-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Welcome Screen
          </Link>

          <Card className="shadow-xl border-gray-200 dark:border-gray-800 animate-scale-in">
            <CardHeader className="space-y-2">
              <div className="flex justify-center mb-2">
                <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Access the admin dashboard to manage the platform
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@idharudhar.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        validateEmail(e.target.value)
                      }}
                      className={`pl-10 ${emailError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                    />
                  </div>
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <Link
                      to="/admin-forgot-password"
                      className="text-sm font-medium text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        validatePassword(e.target.value)
                      }}
                      className={`pl-10 pr-10 ${passwordError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Admin Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminLogin
