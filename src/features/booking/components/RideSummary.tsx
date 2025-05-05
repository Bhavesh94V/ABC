import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface RideSummaryProps {
  pickup: string
  dropoff: string
  distance: string
  duration: string
  fare: string
  rideType: string
}

export const RideSummary: React.FC<RideSummaryProps> = ({ pickup, dropoff, distance, duration, fare, rideType }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ride Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Ride Type</span>
            <span className="font-medium capitalize">{rideType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Pickup</span>
            <span className="font-medium">{pickup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Dropoff</span>
            <span className="font-medium">{dropoff}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Distance</span>
            <span className="font-medium">{distance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="font-medium">{duration}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Total Fare</span>
          <span className="text-lg font-bold">₹{fare}</span>
        </div>

        <div className="text-xs text-muted-foreground">
          Fare breakdown includes base fare, distance charge, time charge, and applicable taxes.
        </div>
      </CardContent>
    </Card>
  )
}

export default RideSummary
