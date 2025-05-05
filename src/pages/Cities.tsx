"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

interface City {
  name: string
  state: string
  region: string
  popularity: number
  isActive: boolean
  comingSoon?: boolean
}

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const citiesPerPage = 30

  // List of cities including Indian cities
  const allCities: City[] = [
    // Popular Cities - North India
    { name: "Delhi", state: "Delhi", region: "north", popularity: 100, isActive: true },
    { name: "Gurgaon", state: "Haryana", region: "north", popularity: 95, isActive: true },
    { name: "Noida", state: "Uttar Pradesh", region: "north", popularity: 90, isActive: true },
    { name: "Chandigarh", state: "Chandigarh", region: "north", popularity: 85, isActive: true },
    { name: "Jaipur", state: "Rajasthan", region: "north", popularity: 88, isActive: true },
    { name: "Lucknow", state: "Uttar Pradesh", region: "north", popularity: 82, isActive: true },
    { name: "Agra", state: "Uttar Pradesh", region: "north", popularity: 80, isActive: true },
    { name: "Amritsar", state: "Punjab", region: "north", popularity: 78, isActive: true },
    { name: "Ludhiana", state: "Punjab", region: "north", popularity: 75, isActive: true },
    { name: "Dehradun", state: "Uttarakhand", region: "north", popularity: 72, isActive: true },
    { name: "Varanasi", state: "Uttar Pradesh", region: "north", popularity: 70, isActive: true },
    { name: "Kanpur", state: "Uttar Pradesh", region: "north", popularity: 68, isActive: true },
    { name: "Allahabad", state: "Uttar Pradesh", region: "north", popularity: 65, isActive: true },
    { name: "Meerut", state: "Uttar Pradesh", region: "north", popularity: 60, isActive: true },
    { name: "Srinagar", state: "Jammu & Kashmir", region: "north", popularity: 58, isActive: true },
    { name: "Jammu", state: "Jammu & Kashmir", region: "north", popularity: 55, isActive: true },
    { name: "Shimla", state: "Himachal Pradesh", region: "north", popularity: 52, isActive: true },
    { name: "Ghaziabad", state: "Uttar Pradesh", region: "north", popularity: 50, isActive: true },

    // Popular Cities - South India
    { name: "Bangalore", state: "Karnataka", region: "south", popularity: 100, isActive: true },
    { name: "Hyderabad", state: "Telangana", region: "south", popularity: 98, isActive: true },
    { name: "Chennai", state: "Tamil Nadu", region: "south", popularity: 95, isActive: true },
    { name: "Kochi", state: "Kerala", region: "south", popularity: 90, isActive: true },
    { name: "Trivandrum", state: "Kerala", region: "south", popularity: 85, isActive: true },
    { name: "Coimbatore", state: "Tamil Nadu", region: "south", popularity: 80, isActive: true },
    { name: "Mysore", state: "Karnataka", region: "south", popularity: 78, isActive: true },
    { name: "Madurai", state: "Tamil Nadu", region: "south", popularity: 75, isActive: true },
    { name: "Mangalore", state: "Karnataka", region: "south", popularity: 70, isActive: true },
    { name: "Pondicherry", state: "Puducherry", region: "south", popularity: 68, isActive: true },
    { name: "Vizag", state: "Andhra Pradesh", region: "south", popularity: 65, isActive: true },
    { name: "Tirupati", state: "Andhra Pradesh", region: "south", popularity: 60, isActive: true },
    { name: "Kanyakumari", state: "Tamil Nadu", region: "south", popularity: 55, isActive: true },
    { name: "Ooty", state: "Tamil Nadu", region: "south", popularity: 50, isActive: true },
    { name: "Vellore", state: "Tamil Nadu", region: "south", popularity: 48, isActive: true },
    { name: "Calicut", state: "Kerala", region: "south", popularity: 45, isActive: true },

    // Popular Cities - West India
    { name: "Mumbai", state: "Maharashtra", region: "west", popularity: 100, isActive: true },
    { name: "Pune", state: "Maharashtra", region: "west", popularity: 95, isActive: true },
    { name: "Ahmedabad", state: "Gujarat", region: "west", popularity: 90, isActive: true },
    { name: "Surat", state: "Gujarat", region: "west", popularity: 85, isActive: true },
    { name: "Vadodara", state: "Gujarat", region: "west", popularity: 80, isActive: true },
    { name: "Nagpur", state: "Maharashtra", region: "west", popularity: 75, isActive: true },
    { name: "Thane", state: "Maharashtra", region: "west", popularity: 70, isActive: true },
    { name: "Nashik", state: "Maharashtra", region: "west", popularity: 65, isActive: true },
    { name: "Aurangabad", state: "Maharashtra", region: "west", popularity: 60, isActive: true },
    { name: "Rajkot", state: "Gujarat", region: "west", popularity: 55, isActive: true },
    { name: "Goa", state: "Goa", region: "west", popularity: 50, isActive: true },
    { name: "Indore", state: "Madhya Pradesh", region: "west", popularity: 48, isActive: true },
    { name: "Bhopal", state: "Madhya Pradesh", region: "west", popularity: 45, isActive: true },

    // Popular Cities - East India
    { name: "Kolkata", state: "West Bengal", region: "east", popularity: 100, isActive: true },
    { name: "Patna", state: "Bihar", region: "east", popularity: 90, isActive: true },
    { name: "Ranchi", state: "Jharkhand", region: "east", popularity: 85, isActive: true },
    { name: "Guwahati", state: "Assam", region: "east", popularity: 80, isActive: true },
    { name: "Bhubaneswar", state: "Odisha", region: "east", popularity: 75, isActive: true },
    { name: "Siliguri", state: "West Bengal", region: "east", popularity: 70, isActive: true },
    { name: "Cuttack", state: "Odisha", region: "east", popularity: 65, isActive: true },
    { name: "Asansol", state: "West Bengal", region: "east", popularity: 60, isActive: true },
    { name: "Dhanbad", state: "Jharkhand", region: "east", popularity: 55, isActive: true },
    { name: "Jamshedpur", state: "Jharkhand", region: "east", popularity: 50, isActive: true },
    { name: "Shillong", state: "Meghalaya", region: "east", popularity: 45, isActive: true },
    { name: "Imphal", state: "Manipur", region: "east", popularity: 40, isActive: true, comingSoon: true },
    { name: "Gangtok", state: "Sikkim", region: "east", popularity: 35, isActive: true, comingSoon: true },

    // More cities from each region, with lower popularity
    { name: "Jodhpur", state: "Rajasthan", region: "north", popularity: 45, isActive: true },
    { name: "Udaipur", state: "Rajasthan", region: "north", popularity: 40, isActive: true },
    { name: "Haridwar", state: "Uttarakhand", region: "north", popularity: 35, isActive: true },
    { name: "Mathura", state: "Uttar Pradesh", region: "north", popularity: 30, isActive: true },
    { name: "Jalandhar", state: "Punjab", region: "north", popularity: 25, isActive: true },
    { name: "Aligarh", state: "Uttar Pradesh", region: "north", popularity: 20, isActive: true },

    { name: "Tiruchirappalli", state: "Tamil Nadu", region: "south", popularity: 40, isActive: true },
    { name: "Vijayawada", state: "Andhra Pradesh", region: "south", popularity: 35, isActive: true },
    { name: "Thrissur", state: "Kerala", region: "south", popularity: 30, isActive: true },
    { name: "Salem", state: "Tamil Nadu", region: "south", popularity: 25, isActive: true },
    { name: "Warangal", state: "Telangana", region: "south", popularity: 20, isActive: true },

    { name: "Navi Mumbai", state: "Maharashtra", region: "west", popularity: 40, isActive: true },
    { name: "Jamnagar", state: "Gujarat", region: "west", popularity: 35, isActive: true },
    { name: "Ujjain", state: "Madhya Pradesh", region: "west", popularity: 30, isActive: true },
    { name: "Solapur", state: "Maharashtra", region: "west", popularity: 25, isActive: true },
    { name: "Panaji", state: "Goa", region: "west", popularity: 20, isActive: true },

    { name: "Darjeeling", state: "West Bengal", region: "east", popularity: 30, isActive: true },
    { name: "Gaya", state: "Bihar", region: "east", popularity: 25, isActive: true },
    { name: "Durgapur", state: "West Bengal", region: "east", popularity: 20, isActive: true },
    { name: "Puri", state: "Odisha", region: "east", popularity: 15, isActive: true },

    // Coming soon cities
    { name: "Agartala", state: "Tripura", region: "east", popularity: 10, isActive: false, comingSoon: true },
    { name: "Aizawl", state: "Mizoram", region: "east", popularity: 8, isActive: false, comingSoon: true },
    { name: "Kohima", state: "Nagaland", region: "east", popularity: 7, isActive: false, comingSoon: true },
    { name: "Dimapur", state: "Nagaland", region: "east", popularity: 5, isActive: false, comingSoon: true },
    { name: "Itanagar", state: "Arunachal Pradesh", region: "east", popularity: 3, isActive: false, comingSoon: true },

    { name: "Diu", state: "Daman & Diu", region: "west", popularity: 10, isActive: false, comingSoon: true },
    {
      name: "Silvassa",
      state: "Dadra & Nagar Haveli",
      region: "west",
      popularity: 8,
      isActive: false,
      comingSoon: true,
    },

    { name: "Lakshadweep", state: "Lakshadweep", region: "south", popularity: 5, isActive: false, comingSoon: true },
    {
      name: "Portblair",
      state: "Andaman & Nicobar Islands",
      region: "south",
      popularity: 3,
      isActive: false,
      comingSoon: true,
    },
  ]

  // Filter and sort cities based on search term and region
  useEffect(() => {
    let results = allCities

    if (selectedRegion !== "all") {
      results = results.filter((city) => city.region === selectedRegion)
    }

    if (searchTerm) {
      results = results.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.state.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort by popularity (highest first)
    results = [...results].sort((a, b) => b.popularity - a.popularity)

    setFilteredCities(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedRegion])

  // Get current cities for pagination
  const indexOfLastCity = currentPage * citiesPerPage
  const indexOfFirstCity = indexOfLastCity - citiesPerPage
  const currentCities = filteredCities.slice(indexOfFirstCity, indexOfLastCity)

  // Calculate total pages
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPagination = () => {
    const pages = []

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => goToPage(1)}
        className={currentPage === 1 ? "bg-green-nexus-600 hover:bg-green-nexus-700" : ""}
      >
        1
      </Button>,
    )

    // Logic for "..." and surrounding pages
    if (totalPages > 1) {
      if (currentPage > 3) {
        pages.push(
          <Button key="ellipsis1" variant="outline" size="sm" disabled>
            ...
          </Button>,
        )
      }

      // Show current page and one before/after
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i === 1 || i === totalPages) continue // Skip first and last as they're always shown
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(i)}
            className={currentPage === i ? "bg-green-nexus-600 hover:bg-green-nexus-700" : ""}
          >
            {i}
          </Button>,
        )
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <Button key="ellipsis2" variant="outline" size="sm" disabled>
            ...
          </Button>,
        )
      }

      // Always show last page if there's more than one page
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(totalPages)}
          className={currentPage === totalPages ? "bg-green-nexus-600 hover:bg-green-nexus-700" : ""}
        >
          {totalPages}
        </Button>,
      )
    }

    return pages
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="bg-green-nexus-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">GreenGlide Cities</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
              Discover all the cities where GreenGlide operates. Book a ride anywhere, anytime.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a city or state..."
                className="pl-12 py-6 border-0 shadow-lg text-gray-800"
              />
            </div>
          </div>
        </section>

        {/* Cities List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" value={selectedRegion} onValueChange={setSelectedRegion} className="mb-8">
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex min-w-max">
                  <TabsTrigger value="all">All Cities</TabsTrigger>
                  <TabsTrigger value="north">North India</TabsTrigger>
                  <TabsTrigger value="south">South India</TabsTrigger>
                  <TabsTrigger value="east">East India</TabsTrigger>
                  <TabsTrigger value="west">West India</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchTerm
                      ? `Search results for "${searchTerm}" (${filteredCities.length})`
                      : `All Cities (${filteredCities.length})`}
                  </h2>
                  {totalPages > 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>

                {currentCities.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {currentCities.map((city, index) => (
                        <Link
                          key={index}
                          to={city.isActive ? `/cities/${city.name.toLowerCase()}` : "#"}
                          className={`relative p-4 rounded-lg border transition-all ${
                            city.isActive
                              ? "border-gray-200 dark:border-gray-700 hover:border-green-nexus-500 dark:hover:border-green-nexus-500 hover:shadow-md"
                              : "border-dashed border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p
                                className={`font-medium ${
                                  city.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {city.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                            </div>
                            <MapPin className={`h-4 w-4 ${city.isActive ? "text-green-nexus-500" : "text-gray-400"}`} />
                          </div>

                          {city.comingSoon && (
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                              <div className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                Soon
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Prev
                        </Button>

                        <div className="flex gap-2 mx-2">{renderPagination()}</div>

                        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                          Next
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No cities found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedRegion("all")
                      }}
                    >
                      View All Cities
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="north" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchTerm
                      ? `Search results for "${searchTerm}" (${filteredCities.length})`
                      : `North India (${filteredCities.length})`}
                  </h2>
                  {totalPages > 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>

                {/* Same grid layout as "all" tab */}
                {currentCities.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {currentCities.map((city, index) => (
                        <Link
                          key={index}
                          to={city.isActive ? `/cities/${city.name.toLowerCase()}` : "#"}
                          className={`relative p-4 rounded-lg border transition-all ${
                            city.isActive
                              ? "border-gray-200 dark:border-gray-700 hover:border-green-nexus-500 dark:hover:border-green-nexus-500 hover:shadow-md"
                              : "border-dashed border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p
                                className={`font-medium ${
                                  city.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {city.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                            </div>
                            <MapPin className={`h-4 w-4 ${city.isActive ? "text-green-nexus-500" : "text-gray-400"}`} />
                          </div>

                          {city.comingSoon && (
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                              <div className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                Soon
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Same pagination as "all" tab */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Prev
                        </Button>

                        <div className="flex gap-2 mx-2">{renderPagination()}</div>

                        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                          Next
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No cities found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                      }}
                    >
                      View All Cities in North India
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Content for South, East, West regions follows the same pattern as North */}
              <TabsContent value="south" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchTerm
                      ? `Search results for "${searchTerm}" (${filteredCities.length})`
                      : `South India (${filteredCities.length})`}
                  </h2>
                  {totalPages > 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>

                {/* Same layout as previous tabs */}
                {/* Grid and pagination same as North tab */}
                {currentCities.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {currentCities.map((city, index) => (
                        <Link
                          key={index}
                          to={city.isActive ? `/cities/${city.name.toLowerCase()}` : "#"}
                          className={`relative p-4 rounded-lg border transition-all ${
                            city.isActive
                              ? "border-gray-200 dark:border-gray-700 hover:border-green-nexus-500 dark:hover:border-green-nexus-500 hover:shadow-md"
                              : "border-dashed border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p
                                className={`font-medium ${
                                  city.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {city.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                            </div>
                            <MapPin className={`h-4 w-4 ${city.isActive ? "text-green-nexus-500" : "text-gray-400"}`} />
                          </div>

                          {city.comingSoon && (
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                              <div className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                Soon
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Prev
                        </Button>

                        <div className="flex gap-2 mx-2">{renderPagination()}</div>

                        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                          Next
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No cities found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                      }}
                    >
                      View All Cities in South India
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="east" className="mt-6">
                {/* Content for East region - follows same pattern */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchTerm
                      ? `Search results for "${searchTerm}" (${filteredCities.length})`
                      : `East India (${filteredCities.length})`}
                  </h2>
                  {totalPages > 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>

                {currentCities.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {currentCities.map((city, index) => (
                        <Link
                          key={index}
                          to={city.isActive ? `/cities/${city.name.toLowerCase()}` : "#"}
                          className={`relative p-4 rounded-lg border transition-all ${
                            city.isActive
                              ? "border-gray-200 dark:border-gray-700 hover:border-green-nexus-500 dark:hover:border-green-nexus-500 hover:shadow-md"
                              : "border-dashed border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p
                                className={`font-medium ${
                                  city.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {city.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                            </div>
                            <MapPin className={`h-4 w-4 ${city.isActive ? "text-green-nexus-500" : "text-gray-400"}`} />
                          </div>

                          {city.comingSoon && (
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                              <div className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                Soon
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Prev
                        </Button>

                        <div className="flex gap-2 mx-2">{renderPagination()}</div>

                        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                          Next
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No cities found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                      }}
                    >
                      View All Cities in East India
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="west" className="mt-6">
                {/* Content for West region - follows same pattern */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchTerm
                      ? `Search results for "${searchTerm}" (${filteredCities.length})`
                      : `West India (${filteredCities.length})`}
                  </h2>
                  {totalPages > 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>

                {currentCities.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {currentCities.map((city, index) => (
                        <Link
                          key={index}
                          to={city.isActive ? `/cities/${city.name.toLowerCase()}` : "#"}
                          className={`relative p-4 rounded-lg border transition-all ${
                            city.isActive
                              ? "border-gray-200 dark:border-gray-700 hover:border-green-nexus-500 dark:hover:border-green-nexus-500 hover:shadow-md"
                              : "border-dashed border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p
                                className={`font-medium ${
                                  city.isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {city.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                            </div>
                            <MapPin className={`h-4 w-4 ${city.isActive ? "text-green-nexus-500" : "text-gray-400"}`} />
                          </div>

                          {city.comingSoon && (
                            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                              <div className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                                Soon
                              </div>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button variant="outline" size="sm" onClick={prevPage} disabled={currentPage === 1}>
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Prev
                        </Button>

                        <div className="flex gap-2 mx-2">{renderPagination()}</div>

                        <Button variant="outline" size="sm" onClick={nextPage} disabled={currentPage === totalPages}>
                          Next
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No cities found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("")
                      }}
                    >
                      View All Cities in West India
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Expansion Plans */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Expansion Plans</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                GreenGlide is rapidly expanding to new cities across India. We're committed to bringing our
                eco-friendly, reliable transportation solutions to every corner of the country.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-green-nexus-600 dark:text-green-nexus-400 mb-2">500+</div>
                  <p className="text-gray-600 dark:text-gray-300">Current Cities</p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-green-nexus-600 dark:text-green-nexus-400 mb-2">50+</div>
                  <p className="text-gray-600 dark:text-gray-300">New Cities This Year</p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-green-nexus-600 dark:text-green-nexus-400 mb-2">28</div>
                  <p className="text-gray-600 dark:text-gray-300">States Covered</p>
                </div>
              </div>

              <Button className="mt-8 bg-green-nexus-600 hover:bg-green-nexus-700">Partner With Us</Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default Cities
