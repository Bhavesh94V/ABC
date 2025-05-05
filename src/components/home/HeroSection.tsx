"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

const HeroSection: React.FC = () => {
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")

  const handleFindRides = () => {
    // Handle ride search
    console.log("Finding rides from", pickup, "to", dropoff)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-foreground text-white">
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">The Future of</span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ride Sharing
              </span>
              <span className="block mt-2">is Green & Sustainable</span>
            </h1>

            <p className="text-lg text-gray-200">
              Experience seamless, eco-friendly rides at your fingertips. IdharUdhar connects you with reliable drivers
              in over 500+ cities nationwide.
            </p>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary" />
                  <Input
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Enter destination"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <Button
                  onClick={handleFindRides}
                  disabled={!pickup || !dropoff}
                  className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center justify-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Rides
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Electric car ride sharing"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white text-xl font-bold">I</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-white font-semibold">IdharUdhar Premium</div>
                    <div className="text-primary-foreground text-sm">Electric Luxury Experience</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-300">Starting at</div>
                    <div className="text-2xl font-bold text-white">₹199</div>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
