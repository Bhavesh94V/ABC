import type React from "react"

interface InteractiveMapProps {
  pickupLocation: {
    lat: number
    lng: number
  }
  dropoffLocation: {
    lat: number
    lng: number
  }
  driverLocation: {
    lat: number
    lng: number
  }
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ pickupLocation, dropoffLocation, driverLocation }) => {
  return (
    <div className="h-64 bg-gray-200 dark:bg-gray-700 relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 mb-2">Interactive map would be displayed here</p>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col gap-1">
          <p>
            Driver: {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}
          </p>
          <p>
            Pickup: {pickupLocation.lat.toFixed(4)}, {pickupLocation.lng.toFixed(4)}
          </p>
          <p>
            Dropoff: {dropoffLocation.lat.toFixed(4)}, {dropoffLocation.lng.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InteractiveMap
