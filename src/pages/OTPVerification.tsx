"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/contexts/AuthContext"

const OTPVerification = () => {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const { login, signup } = useAuth()

  // Extract email and other user data from location state
  const { email, password, name, phone, isLogin } = location.state || {}

  useEffect(() => {
    // Start countdown timer
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft])

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // For demo purposes, any OTP is valid
      // In a real app, you'd verify with your backend
      if (isLogin) {
        await login(email, password)
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully",
        })
      } else {
        // If it's signup flow
        await signup(name, email, phone, password)
        toast({
          title: "Account Created",
          description: "Your account has been created successfully",
        })
      }
      navigate("/")
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = () => {
    // Simulate OTP resend
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email/phone",
    })
    setTimeLeft(30) // Reset timer
  }

  if (!email) {
    // Redirect if no email is provided (direct access without going through login/signup)
    navigate(isLogin ? "/login" : "/signup")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-gray-200 dark:border-gray-800 animate-scale-in">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">
                Verify Your {isLogin ? "Login" : "Account"}
              </CardTitle>
              <CardDescription className="text-center">
                Enter the 6-digit code sent to <br />
                <span className="font-medium">{email}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Resend code in {timeLeft} seconds</p>
                ) : (
                  <Button
                    variant="link"
                    className="text-green-nexus-600 dark:text-green-nexus-400"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
                disabled={otp.length !== 6 || isLoading}
                onClick={handleVerifyOTP}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>

              <Button variant="ghost" className="w-full" onClick={() => navigate(isLogin ? "/login" : "/signup")}>
                Go Back
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OTPVerification
