"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Wallet, Banknote, CheckCircle2, Shield, CreditCardIcon, Calendar, User, Lock } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface LocationState {
  rideDetails?: {
    type: string
    from: string
    to: string
    amount: number
    duration: string
    distance: string
  }
}

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)

  // Get ride details from location state
  const locationState = location.state as LocationState
  const rideDetails = locationState?.rideDetails || {
    type: "GreenCar",
    from: "Andheri East",
    to: "Bandra Kurla Complex",
    amount: 350,
    duration: "25 mins",
    distance: "12.5 km",
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "FIRST50") {
      const discount = Math.min(rideDetails.amount * 0.5, 100) // 50% discount up to ₹100
      setPromoDiscount(discount)
      toast({
        title: "Promo Code Applied!",
        description: `Discount of ₹${discount.toFixed(2)} applied to your ride.`,
      })
    } else if (promoCode.toUpperCase() === "GREEN10") {
      const discount = Math.min(rideDetails.amount * 0.1, 50) // 10% discount up to ₹50
      setPromoDiscount(discount)
      toast({
        title: "Promo Code Applied!",
        description: `Discount of ₹${discount.toFixed(2)} applied to your ride.`,
      })
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive",
      })
    }
  }

  const handlePayment = () => {
    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv || !cardName)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all card details to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)

      toast({
        title: "Payment Successful!",
        description: "Your ride has been booked successfully.",
      })

      navigate("/ride-tracking")
    }, 2000)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const finalAmount = rideDetails.amount - promoDiscount

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Payment</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Methods */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment option</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div
                        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "card" ? "border-green-nexus-600 bg-green-nexus-50 dark:bg-green-nexus-900/20" : "border-gray-200 dark:border-gray-800"}`}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center flex-1 cursor-pointer">
                          <CreditCard className="h-5 w-5 mr-3 text-green-nexus-600 dark:text-green-nexus-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Credit / Debit Card</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Pay using Visa, Mastercard or RuPay
                            </p>
                          </div>
                        </Label>
                        <div className="flex space-x-1">
                          <div className="w-10 h-6 bg-blue-600 rounded"></div>
                          <div className="w-10 h-6 bg-red-500 rounded"></div>
                          <div className="w-10 h-6 bg-green-500 rounded"></div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "upi" ? "border-green-nexus-600 bg-green-nexus-50 dark:bg-green-nexus-900/20" : "border-gray-200 dark:border-gray-800"}`}
                      >
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center flex-1 cursor-pointer">
                          <CheckCircle2 className="h-5 w-5 mr-3 text-green-nexus-600 dark:text-green-nexus-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">UPI Payment</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Pay using Google Pay, PhonePe, Paytm or any UPI app
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "wallet" ? "border-green-nexus-600 bg-green-nexus-50 dark:bg-green-nexus-900/20" : "border-gray-200 dark:border-gray-800"}`}
                      >
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center flex-1 cursor-pointer">
                          <Wallet className="h-5 w-5 mr-3 text-green-nexus-600 dark:text-green-nexus-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">GreenGlide Wallet</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Balance: ₹250.00</p>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "cash" ? "border-green-nexus-600 bg-green-nexus-50 dark:bg-green-nexus-900/20" : "border-gray-200 dark:border-gray-800"}`}
                      >
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center flex-1 cursor-pointer">
                          <Banknote className="h-5 w-5 mr-3 text-green-nexus-600 dark:text-green-nexus-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Cash Payment</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Pay directly to driver after ride
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {paymentMethod === "card" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Details</CardTitle>
                      <CardDescription>Enter your card information securely</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              className="pl-10"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                              maxLength={5}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="cvv">CVV</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="pl-10"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                          <Input
                            id="cardName"
                            placeholder="John Smith"
                            className="pl-10"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Shield className="h-4 w-4 text-green-nexus-600 dark:text-green-nexus-400" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Your payment information is secure and encrypted
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "upi" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>UPI Payment</CardTitle>
                      <CardDescription>Choose your UPI provider</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                          <div className="h-12 w-12 bg-blue-500 rounded-full mx-auto mb-2"></div>
                          <p className="font-medium">Google Pay</p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                          <div className="h-12 w-12 bg-purple-500 rounded-full mx-auto mb-2"></div>
                          <p className="font-medium">PhonePe</p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                          <div className="h-12 w-12 bg-blue-700 rounded-full mx-auto mb-2"></div>
                          <p className="font-medium">Paytm</p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                          <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
                          <p className="font-medium">Other UPI</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="username@upi" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Enter your UPI ID (e.g. 9876543210@upi)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Promo Code</CardTitle>
                    <CardDescription>Apply a promo code for discounts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      />
                      <Button onClick={handleApplyPromo}>Apply</Button>
                    </div>

                    <div className="mt-4 text-sm">
                      <p className="font-medium text-gray-900 dark:text-white">Available Promos:</p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                        <li>FIRST50 - 50% off your first ride (max ₹100)</li>
                        <li>GREEN10 - 10% off any ride (max ₹50)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Ride details and total</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white mb-2">{rideDetails.type}</p>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-green-nexus-500"></div>
                            <div className="w-0.5 h-10 bg-gray-300 dark:bg-gray-700"></div>
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-700 dark:text-gray-300">{rideDetails.from}</div>
                            <div className="text-gray-700 dark:text-gray-300 mt-6">{rideDetails.to}</div>
                          </div>
                        </div>

                        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>Distance:</span>
                          <span className="font-medium">{rideDetails.distance}</span>
                        </div>

                        <div className="flex justify-between mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>Duration:</span>
                          <span className="font-medium">{rideDetails.duration}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Ride Fare</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            ₹{rideDetails.amount.toFixed(2)}
                          </span>
                        </div>

                        {promoDiscount > 0 && (
                          <div className="flex justify-between text-green-nexus-600 dark:text-green-nexus-400">
                            <span>Promo Discount</span>
                            <span>-₹{promoDiscount.toFixed(2)}</span>
                          </div>
                        )}

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-gray-900 dark:text-white">Total</span>
                          <span className="text-gray-900 dark:text-white">₹{finalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-green-nexus-600 hover:bg-green-nexus-700"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay ₹${finalAmount.toFixed(2)}`}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Payment
