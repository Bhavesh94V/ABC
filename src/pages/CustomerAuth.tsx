"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, User, Phone, Lock, ArrowLeft, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useAuth } from "@/contexts/AuthContext"

const CustomerAuth = () => {
  const [activeTab, setActiveTab] = useState("login")
  const [loginMethod, setLoginMethod] = useState("password")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")

  // Signup form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation states
  const [identifierError, setIdentifierError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [signupPasswordError, setSignupPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const navigate = useNavigate()
  const { toast } = useToast()
  const { login, requestOTP, loginWithOTP, signup, verifyOTP } = useAuth()

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    const re = /^\+?[0-9]{10,15}$/
    return re.test(phone)
  }

  const validateIdentifier = (value: string) => {
    if (!value) {
      setIdentifierError("Email or phone number is required")
      return false
    }

    if (!validateEmail(value) && !validatePhone(value)) {
      setIdentifierError("Please enter a valid email or phone number")
      return false
    }

    setIdentifierError("")
    return true
  }

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required")
      return false
    }

    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return false
    }

    setPasswordError("")
    return true
  }

  const validateName = (value: string) => {
    if (!value) {
      setNameError("Full name is required")
      return false
    }

    setNameError("")
    return true
  }

  const validateSignupEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required")
      return false
    }

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email")
      return false
    }

    setEmailError("")
    return true
  }

  const validateSignupPhone = (value: string) => {
    if (!value) {
      setPhoneError("Phone number is required")
      return false
    }

    if (!validatePhone(value)) {
      setPhoneError("Please enter a valid phone number")
      return false
    }

    setPhoneError("")
    return true
  }

  const validateSignupPassword = (value: string) => {
    if (!value) {
      setSignupPasswordError("Password is required")
      return false
    }

    if (value.length < 8) {
      setSignupPasswordError("Password must be at least 8 characters")
      return false
    }

    setSignupPasswordError("")
    return true
  }

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      setConfirmPasswordError("Please confirm your password")
      return false
    }

    if (value !== signupPassword) {
      setConfirmPasswordError("Passwords do not match")
      return false
    }

    setConfirmPasswordError("")
    return true
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = validateIdentifier(identifier)

    if (loginMethod === "password") {
      isValid = isValid && validatePassword(password)

      if (!isValid) return

      setIsLoading(true)
      try {
        await login(identifier, password)
        navigate("/")
      } catch (error) {
        console.error("Login error:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      // OTP login
      if (!otp || otp.length !== 6) {
        toast({
          title: "Error",
          description: "Please enter a valid 6-digit OTP",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)
      try {
        await loginWithOTP(identifier, otp)
        navigate("/")
      } catch (error) {
        console.error("OTP login error:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid =
      validateName(name) &&
      validateSignupEmail(email) &&
      validateSignupPhone(phone) &&
      validateSignupPassword(signupPassword) &&
      validateConfirmPassword(confirmPassword)

    if (!isValid) return

    setIsLoading(true)
    try {
      const userData = {
        name,
        email,
        phone,
        password: signupPassword,
      }

      const { userId } = await signup(userData, "customer")

      if (userId) {
        navigate("/verify-otp", {
          state: {
            userId,
            email,
            phone,
            purpose: "signup",
            userType: "customer",
            redirectTo: "/",
          },
        })
      }
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOTP = async () => {
    if (!validateIdentifier(identifier)) return

    setIsLoading(true)
    try {
      const { userId } = await requestOTP(identifier)
      setUserId(userId)

      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your email/phone",
      })
    } catch (error) {
      console.error("Send OTP error:", error)
    } finally {
      setIsLoading(false)
    }
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
              <CardTitle className="text-2xl font-bold text-center">Customer Portal</CardTitle>
              <CardDescription className="text-center">Login or create a new customer account</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="identifier"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email or Phone Number
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="identifier"
                          type="text"
                          placeholder="john@example.com or +1234567890"
                          value={identifier}
                          onChange={(e) => {
                            setIdentifier(e.target.value)
                            validateIdentifier(e.target.value)
                          }}
                          className={`pl-10 ${identifierError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                        />
                      </div>
                      {identifierError && <p className="text-sm text-red-500">{identifierError}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Login Method</label>
                      <ToggleGroup
                        type="single"
                        value={loginMethod}
                        onValueChange={(value) => value && setLoginMethod(value)}
                        className="justify-start"
                      >
                        <ToggleGroupItem
                          value="password"
                          aria-label="Password login"
                          className="data-[state=on]:bg-green-nexus-100 data-[state=on]:text-green-nexus-700 dark:data-[state=on]:bg-green-nexus-900/30 dark:data-[state=on]:text-green-nexus-400"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Password
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="otp"
                          aria-label="OTP login"
                          className="data-[state=on]:bg-green-nexus-100 data-[state=on]:text-green-nexus-700 dark:data-[state=on]:bg-green-nexus-900/30 dark:data-[state=on]:text-green-nexus-400"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          OTP
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>

                    {loginMethod === "password" ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Password
                          </label>
                          <Link
                            to="/forgot-password"
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
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            One-Time Password
                          </label>
                          <button
                            type="button"
                            onClick={handleSendOTP}
                            className="text-sm font-medium text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                          >
                            Send OTP
                          </button>
                        </div>
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
                          <button
                            type="button"
                            onClick={handleSendOTP}
                            className="text-sm font-medium text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                          >
                            Resend OTP
                          </button>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value)
                            validateName(e.target.value)
                          }}
                          className={`pl-10 ${nameError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                        />
                      </div>
                      {nameError && <p className="text-sm text-red-500">{nameError}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            validateSignupEmail(e.target.value)
                          }}
                          className={`pl-10 ${emailError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                        />
                      </div>
                      {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value)
                            validateSignupPhone(e.target.value)
                          }}
                          className={`pl-10 ${phoneError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                        />
                      </div>
                      {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signupPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="signupPassword"
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => {
                            setSignupPassword(e.target.value)
                            validateSignupPassword(e.target.value)
                            if (confirmPassword) validateConfirmPassword(confirmPassword)
                          }}
                          className={`pl-10 pr-10 ${signupPasswordError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {signupPasswordError && <p className="text-sm text-red-500">{signupPasswordError}</p>}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            validateConfirmPassword(e.target.value)
                          }}
                          className={`pl-10 pr-10 ${confirmPasswordError ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-green-nexus-500"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {confirmPasswordError && <p className="text-sm text-red-500">{confirmPasswordError}</p>}
                    </div>

                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-green-nexus-600 focus:ring-green-nexus-500"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Sign up & Get OTP"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CustomerAuth
