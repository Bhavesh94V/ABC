"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Briefcase, MapPin } from "lucide-react"

interface SavedLocation {
  id: string
  name: string
  address: string
  type: "home" | "work" | "other"
}

const SavedLocations: React.FC = () => {
  const [locations, setLocations] = useState<SavedLocation[]>([
    {
      id: "loc1",
      name: "Home",
      address: "123 Main Street, Apartment 4B, Mumbai, 400001",
      type: "home",
    },
    {
      id: "loc2",
      name: "Office",
      address: "456 Business Park, Tower 3, 7th Floor, Bangalore, 560001",
      type: "work",
    },
    {
      id: "loc3",
      name: "Gym",
      address: "789 Fitness Avenue, Delhi, 110001",
      type: "other",
    },
  ])

  const [isAddingLocation, setIsAddingLocation] = useState(false)

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5" />
      case "work":
        return <Briefcase className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const removeLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex items-start justify-between p-4 rounded-lg border border-border"
            >
              <div className="flex items-start space-x-4">
                <div className="h-10 \
