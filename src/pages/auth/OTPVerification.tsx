"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"

export function OTPVerificationPage() {
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      })
      return
    }

    // Mock verification - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Verification successful",
        description: "Your phone number has been verified!",
      })
      navigate("/")
    }, 1500)
  }

  const handleResendOTP = () => {
    setIsResending(true)

    // Mock resend OTP - replace with actual API call
    setTimeout(() => {
      setTimeLeft(30)
      setIsResending(false)
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your phone",
      })
    }, 1500)
  }

  return (
    <div className="container max-w-md py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Verify Your Phone</h1>
          <p className="text-muted-foreground">
            We've sent a 6-digit code to your phone number. Please enter it below to verify your account.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>

          <Button onClick={handleVerify} className="w-full" disabled={otp.length !== 6}>
            Verify
          </Button>

          <div className="text-center text-sm">
            {timeLeft > 0 ? (
              <p className="text-muted-foreground">Resend OTP in {timeLeft} seconds</p>
            ) : (
              <Button variant="link" className="p-0 h-auto" onClick={handleResendOTP} disabled={isResending}>
                {isResending ? "Resending..." : "Resend OTP"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
