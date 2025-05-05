"use client"

import type React from "react"
import { User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RideOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  eta: string
  price: number
  capacity: number
  features: string[]
}

interface RideOptionsProps {
  isScheduling: boolean
  scheduledDate: string
  scheduledTime: string
  selectedRide: string | null
  rideOptions: RideOption[]
  selectRide: (rideId: string) => void
  goBackToServiceSelection: () => void
}

const RideOptions: React.FC<RideOptionsProps> = ({
  isScheduling,
  scheduledDate,
  scheduledTime,
  selectedRide,
  rideOptions,
  selectRide,
  goBackToServiceSelection,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Available Rides</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isScheduling ? `Scheduled for ${scheduledDate} at ${scheduledTime}` : "For immediate pickup"}
          </p>
        </div>
        <Button variant="outline" onClick={goBackToServiceSelection}>
          Back
        </Button>
      </div>

      <div className="space-y-4">
        {rideOptions.map((option) => (
          <Card
            key={option.id}
            className={`hover:border-green-nexus-500 transition-all ${selectedRide === option.id ? "border-green-nexus-500 ring-2 ring-green-nexus-200" : ""} cursor-pointer`}
            onClick={() => selectRide(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{option.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">₹{option.price}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">ETA: {option.eta}</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="flex space-x-2">
                  {option.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" /> {option.capacity}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RideOptions
