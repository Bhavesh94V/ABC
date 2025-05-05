"use client"

import type React from "react"
import { Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface DriverCommunicationProps {
  driver: {
    name: string
    phone: string
  }
}

const DriverCommunication: React.FC<DriverCommunicationProps> = ({ driver }) => {
  const { toast } = useToast()

  const handleCall = () => {
    toast({
      title: "Calling driver",
      description: `Connecting to ${driver.name}...`,
    })
    // In a real implementation, we would use a telephony API
    console.log(`Calling driver at ${driver.phone}`)
  }

  const handleMessage = () => {
    toast({
      title: "Message",
      description: "Opening chat with driver...",
    })
    // In a real implementation, we would open a chat window
    console.log(`Opening chat with ${driver.name}`)
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <Button className="bg-green-nexus-600 hover:bg-green-nexus-700" onClick={handleCall}>
        <Phone className="mr-2 h-4 w-4" /> Call Driver
      </Button>
      <Button variant="outline" onClick={handleMessage}>
        <MessageSquare className="mr-2 h-4 w-4" /> Message
      </Button>
    </div>
  )
}

export default DriverCommunication
