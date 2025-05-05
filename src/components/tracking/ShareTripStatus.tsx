"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ShareTripStatusProps {
  tripId: string
  eta: number
  status: string
}

const ShareTripStatus: React.FC<ShareTripStatusProps> = ({ tripId, eta, status }) => {
  const { toast } = useToast()
  const [contactInfo, setContactInfo] = useState("")
  const [shareMethod, setShareMethod] = useState<"sms" | "email" | "whatsapp">("sms")
  const [isSharing, setIsSharing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const shareUrl = `https://greenglide.app/trip/${tripId}`

  const handleShare = () => {
    setIsSharing(true)

    // Simulate API call
    setTimeout(() => {
      setIsSharing(false)
      setIsDialogOpen(false)
      toast({
        title: "Trip shared",
        description: `Trip details sent to ${contactInfo}`,
      })
    }, 1500)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-green-nexus-600 dark:text-green-nexus-400">
          Share trip status
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Trip Status</DialogTitle>
          <DialogDescription>Share your trip details with family or friends for safety</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="font-medium">Trip Status</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {status}, ETA: {eta} min
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Share Method</label>
            <div className="flex space-x-2">
              <Button
                variant={shareMethod === "sms" ? "default" : "outline"}
                size="sm"
                onClick={() => setShareMethod("sms")}
                className={shareMethod === "sms" ? "bg-green-nexus-600" : ""}
              >
                SMS
              </Button>
              <Button
                variant={shareMethod === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setShareMethod("email")}
                className={shareMethod === "email" ? "bg-green-nexus-600" : ""}
              >
                Email
              </Button>
              <Button
                variant={shareMethod === "whatsapp" ? "default" : "outline"}
                size="sm"
                onClick={() => setShareMethod("whatsapp")}
                className={shareMethod === "whatsapp" ? "bg-green-nexus-600" : ""}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">
              {shareMethod === "sms" ? "Phone Number" : shareMethod === "email" ? "Email Address" : "WhatsApp Number"}
            </label>
            <Input
              type={shareMethod === "email" ? "email" : "tel"}
              placeholder={shareMethod === "email" ? "example@email.com" : "+91 12345 67890"}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Trip Link</label>
            <div className="flex space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  })
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleShare}
            disabled={isSharing || !contactInfo}
            className="bg-green-nexus-600 hover:bg-green-nexus-700"
          >
            {isSharing ? "Sharing..." : "Share Trip"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareTripStatus
