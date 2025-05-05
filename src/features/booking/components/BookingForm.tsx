"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingFormProps {
  initialServiceType?: string | null
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialServiceType = null }) => {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [selectedRide, setSelectedRide] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const selectRide = (rideId: string) => {
    setSelectedRide(rideId)
    setStep(3)
  }

  const confirmRide = () => {
    // Handle ride confirmation
    console.log("Ride confirmed")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book Your Ride</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="pickup" className="text-sm font-medium">
                Pickup Location
              </label>
              <Input
                id="pickup"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dropoff" className="text-sm font-medium">
                Dropoff Location
              </label>
              <Input
                id="dropoff"
                placeholder="Enter destination"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Find Rides
            </Button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Rides</h3>
            <div className="space-y-2">
              {["car", "bike", "auto"].map((ride) => (
                <div
                  key={ride}
                  className="p-4 border rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => selectRide(ride)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium capitalize">{ride}</h4>
                      <p className="text-sm text-muted-foreground">Estimated arrival: 5 mins</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹199</p>
                      <p className="text-sm text-muted-foreground">4.2 km</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep(1)} className="w-full">
              Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Confirm Your Ride</h3>
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium capitalize">{selectedRide}</h4>
                  <p className="text-sm">From: {pickup}</p>
                  <p className="text-sm">To: {dropoff}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹199</p>
                  <p className="text-sm text-muted-foreground">4.2 km</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={confirmRide} className="flex-1">
                Confirm Ride
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BookingForm
