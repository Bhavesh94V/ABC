"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BookingForm } from "@/features/booking/components/BookingForm"
import { RideSummary } from "@/features/booking/components/RideSummary"
import { useToast } from "@/hooks/use-toast"

export function BookingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const initialPickup = location.state?.pickup || ""
  const initialDestination = location.state?.destination || ""

  const [bookingData, setBookingData] = useState({
    pickup: initialPickup,
    destination: initialDestination,
    serviceType: "",
    rideOption: "",
    scheduleTime: null,
    paymentMethod: "",
  })

  const handleBookingSubmit = (data: any) => {
    setBookingData({ ...bookingData, ...data })

    // Mock booking submission - replace with actual API call
    setTimeout(() => {
      toast({
        title: "Booking Confirmed",
        description: "Your ride has been booked successfully!",
      })
      navigate("/track")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Book Your Ride</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookingForm initialData={bookingData} onSubmit={handleBookingSubmit} />
        </div>

        <div>
          <RideSummary data={bookingData} />
        </div>
      </div>
    </div>
  )
}
