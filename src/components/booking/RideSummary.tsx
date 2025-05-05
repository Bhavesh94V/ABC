"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface RideOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  eta: string
  price: number
  priceBreakdown: {
    base: number
    distance: number
    time: number
    tax: number
  }
}

interface RideSummaryProps {
  selectedRideOption: RideOption | null
  pickup: string
  dropoff: string
  onChangeRide: () => void
  onEditLocations: () => void
}

const RideSummary: React.FC<RideSummaryProps> = ({
  selectedRideOption,
  pickup,
  dropoff,
  onChangeRide,
  onEditLocations,
}) => {
  if (!selectedRideOption) return null

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Confirm Your Ride</h3>
        <div className="flex space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>
            {pickup} to {dropoff}
          </span>
          <Button variant="link" className="h-auto p-0" onClick={onEditLocations}>
            Edit
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center">
                {selectedRideOption.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRideOption.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">ETA: {selectedRideOption.eta}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onChangeRide}>
              Change
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white">Fare Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Base fare</span>
            <span className="text-gray-900 dark:text-white">₹{selectedRideOption.priceBreakdown.base}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Distance charge</span>
            <span className="text-gray-900 dark:text-white">₹{selectedRideOption.priceBreakdown.distance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Time charge</span>
            <span className="text-gray-900 dark:text-white">₹{selectedRideOption.priceBreakdown.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Taxes & fees</span>
            <span className="text-gray-900 dark:text-white">₹{selectedRideOption.priceBreakdown.tax}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span className="text-gray-900 dark:text-white">Total fare</span>
            <span className="text-gray-900 dark:text-white">₹{selectedRideOption.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RideSummary
