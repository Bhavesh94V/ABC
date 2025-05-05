"use client"

import type React from "react"
import { MapPin, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"

interface LocationInputProps {
  pickup: string
  dropoff: string
  setPickup: (value: string) => void
  setDropoff: (value: string) => void
}

const LocationInput: React.FC<LocationInputProps> = ({ pickup, dropoff, setPickup, setDropoff }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup location"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Dropoff Location</label>
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Enter dropoff location"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}

export default LocationInput
