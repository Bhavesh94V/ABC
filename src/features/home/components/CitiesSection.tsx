"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sample list of cities
const allCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
]

export const CitiesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCities, setVisibleCities] = useState<string[]>(allCities.slice(0, 16))
  const [isShowingAll, setIsShowingAll] = useState(false)
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.length > 0) {
      const filtered = allCities.filter((city) => city.toLowerCase().includes(term.toLowerCase())).slice(0, 16)
      setVisibleCities(filtered)
      setIsShowingAll(false)
    } else {
      setVisibleCities(allCities.slice(0, 16))
      setIsShowingAll(false)
    }
  }

  const toggleShowAll = () => {
    if (isShowingAll) {
      setVisibleCities(allCities.slice(0, 16))
    } else {
      setVisibleCities(allCities)
    }
    setIsShowingAll(!isShowingAll)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Available in 500+ Cities</h2>
          <p className="text-muted-foreground">
            Book your ride anywhere in the country with our extensive coverage. We're rapidly expanding to reach every
            corner.
          </p>
        </div>

        <div className="relative max-w-lg mx-auto mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for a city..."
            className="pl-10 py-6 pr-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
          {visibleCities.map((city, index) => (
            <div key={index} onMouseEnter={() => setHoveredCity(city)} onMouseLeave={() => setHoveredCity(null)}>
              <Link
                to={`/cities?city=${city.toLowerCase()}`}
                className="text-center p-4 rounded-lg hover:bg-accent transition-colors duration-300 block"
              >
                <div className="relative">
                  {hoveredCity === city && (
                    <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div className="text-foreground hover:text-primary font-medium">{city}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={toggleShowAll}
            className="border-primary text-primary hover:bg-primary/10 flex items-center mx-auto"
          >
            {isShowingAll ? "Show Less" : "View All Cities"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CitiesSection
