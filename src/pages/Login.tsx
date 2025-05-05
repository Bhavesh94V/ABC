"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const Login = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email or phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      setTimeout(() => {
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your email/phone",
        })

        navigate("/verify-otp", {
          state: {
            email,
            isLogin: true,
          },
        })
      }, 1500)
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Could not send verification code. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-gray-200 dark:border-gray-800 animate-scale-in">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">Sign in to GreenGlide</CardTitle>
              <CardDescription className="text-center">Enter your email or phone to receive an OTP</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email or Phone
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="text"
                      placeholder="john.doe@example.com or +1234567890"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending verification code..." : "Sign in with OTP"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                >
                  Sign up now <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login
