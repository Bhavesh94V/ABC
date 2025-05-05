"use client"

import type React from "react"
import { useState } from "react"
import { Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import ShareTripStatus from "./ShareTripStatus"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SafetyFeaturesProps {
  tripId: string
  eta: number
  status: string
}

const SafetyFeatures: React.FC<SafetyFeaturesProps> = ({ tripId, eta, status }) => {
  const { toast } = useToast()
  const [isEmergency, setIsEmergency] = useState(false)

  const handleEmergency = () => {
    setIsEmergency(true)

    toast({
      title: "Emergency Alert Sent",
      description: "Contacting emergency services and trusted contacts",
      variant: "destructive",
    })

    // In a real implementation, this would trigger emergency protocols
    console.log("Emergency alert triggered for trip:", tripId)

    // Reset after delay (simulating resolution)
    setTimeout(() => setIsEmergency(false), 5000)
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-green-nexus-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Trip Safety</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Share your trip status with friends and family for added safety. Your ride is protected with insurance
              coverage.
            </p>
            <ShareTripStatus tripId={tripId} eta={eta} status={status} />
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full" disabled={isEmergency}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            {isEmergency ? "Emergency Alert Sent" : "SOS Emergency Button"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emergency Alert</AlertDialogTitle>
            <AlertDialogDescription>
              This will alert emergency services and your emergency contacts with your current location. Only use in
              case of an emergency.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEmergency} className="bg-red-600 hover:bg-red-700">
              Send Emergency Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SafetyFeatures
