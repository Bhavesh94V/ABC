"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapPin, Navigation, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import InteractiveMap from "@/components/tracking/InteractiveMap"
import DriverCommunication from "@/components/tracking/DriverCommunication"
import SafetyFeatures from "@/components/tracking/SafetyFeatures"

const RideTracking = () => {
  const { toast } = useToast()
  const [progress, setProgress] = useState(10)
  const [status, setStatus] = useState("Driver is on the way to pickup")
  const [eta, setEta] = useState(5)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [driverLocation, setDriverLocation] = useState({ lat: 28.6139, lng: 77.209 })
  const [tripId] = useState(`TR-${Math.floor(Math.random() * 1000000)}`)

  // Predefined locations
  const pickupLocation = { lat: 28.628, lng: 77.278 }
  const dropoffLocation = { lat: 28.5355, lng: 77.391 }

  // Simulate ride progress and driver movement
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setShowRating(true)
          return 100
        }

        // Update status based on progress
        if (prevProgress < 30) {
          setStatus("Driver is on the way to pickup")
          setEta(Math.max(1, 5 - Math.floor(prevProgress / 6)))

          // Move driver towards pickup location
          setDriverLocation((prev) => ({
            lat: prev.lat + (pickupLocation.lat - prev.lat) * 0.1,
            lng: prev.lng + (pickupLocation.lng - prev.lng) * 0.1,
          }))
        } else if (prevProgress < 40) {
          setStatus("Driver has arrived at pickup")
          setEta(0)

          // Set driver at pickup location
          setDriverLocation(pickupLocation)
        } else if (prevProgress < 90) {
          setStatus("En route to destination")
          setEta(Math.max(1, 10 - Math.floor((prevProgress - 40) / 5)))

          // Move driver towards dropoff location
          setDriverLocation((prev) => ({
            lat: prev.lat + (dropoffLocation.lat - prev.lat) * 0.05,
            lng: prev.lng + (dropoffLocation.lng - prev.lng) * 0.05,
          }))
        } else {
          setStatus("Arriving at destination")
          setEta(1)

          // Set driver close to dropoff
          setDriverLocation({
            lat: dropoffLocation.lat - 0.002,
            lng: dropoffLocation.lng - 0.002,
          })
        }

        return prevProgress + 5
      })
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const submitRating = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been submitted.",
    })

    // Reset and redirect in a real app
    setTimeout(() => {
      window.location.href = "/"
    }, 2000)
  }

  // Mock driver data
  const driver = {
    name: "Rahul Singh",
    rating: 4.8,
    trips: 1243,
    vehicleNumber: "DL 01 AB 1234",
    vehicleModel: "Honda City",
    vehicleColor: "White",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+91 98765 43210",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {!showRating ? (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden animate-fade-in">
                {/* Map area */}
                <InteractiveMap
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  driverLocation={driverLocation}
                />

                {/* Status bar */}
                <div className="p-4 bg-green-nexus-600 text-white">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{status}</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{eta > 0 ? `${eta} min${eta > 1 ? "s" : ""}` : "Arrived"}</span>
                    </div>
                  </div>
                  <Progress value={progress} className="mt-2 bg-white/20" />
                </div>

                {/* Ride details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Ride</h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Order #{tripId}</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-green-nexus-600 dark:text-green-nexus-400" />
                        </div>
                        <div className="w-0.5 h-6 bg-gray-200 dark:bg-gray-700 my-1"></div>
                        <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center">
                          <Navigation className="h-4 w-4 text-green-nexus-600 dark:text-green-nexus-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-3">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Pickup</div>
                          <div className="text-gray-900 dark:text-white">123 Green Avenue, Sector 15</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Dropoff</div>
                          <div className="text-gray-900 dark:text-white">GreenTech Business Park, Cyber City</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={driver.image}
                          alt={driver.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-green-nexus-500 mr-4"
                        />
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">{driver.name}</h3>
                          <div className="flex items-center text-sm">
                            <div className="flex items-center text-yellow-500 mr-2">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1">{driver.rating}</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">{driver.trips} trips</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-700 dark:text-gray-300">{driver.vehicleModel}</div>
                        <div className="text-gray-900 dark:text-white font-medium">{driver.vehicleNumber}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{driver.vehicleColor}</div>
                      </div>
                    </div>

                    {/* Driver communication buttons */}
                    <DriverCommunication driver={driver} />
                  </div>

                  {/* Safety features */}
                  <SafetyFeatures tripId={tripId} eta={eta} status={status} />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 mb-4">
                    <CheckIcon className="h-10 w-10 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ride Completed</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Thank you for riding with GreenGlide</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Rate your experience</h3>
                  <div className="flex justify-center space-x-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="h-12 w-12 rounded-full focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-full w-full ${
                            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience (optional)"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-green-nexus-500 focus:border-green-nexus-500"
                    rows={4}
                  />
                </div>

                <div className="flex justify-center">
                  <Button onClick={submitRating} className="bg-green-nexus-600 hover:bg-green-nexus-700 px-8">
                    Submit Rating
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Check icon component for the rating screen
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default RideTracking
