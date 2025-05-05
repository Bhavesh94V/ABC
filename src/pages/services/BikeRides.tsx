"use client"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Bike, Shield, Zap, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

const BikeRides = () => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-green-nexus-600 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">GreenBike Rides</h1>
                <p className="text-lg md:text-xl">Quick, affordable, and eco-friendly bike rides to beat the traffic</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Book a Ride</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/safety">Learn About Safety</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="GreenBike Ride"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[200px]">
                  <div className="h-10 w-10 rounded-full bg-green-nexus-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-nexus-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average Arrival Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Choose GreenBike?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The fastest way to navigate through city traffic with trained riders and safety equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Bike className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Beat the Traffic</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Navigate through congested roads quickly with skilled riders who know the best routes
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Safety First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All rides come with complimentary helmets, trained riders, and real-time tracking
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Affordable & Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our bike rides are the most cost-effective and quickest way to reach nearby destinations
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-100 dark:bg-gray-800/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Simple & Affordable Pricing
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The most cost-effective way to travel short to medium distances in the city
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">GreenBike Standard</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹6<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/km</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Base fare: ₹15</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Standard bike</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Single passenger</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Helmet provided</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-nexus-600 hover:bg-green-nexus-700">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">GreenBike Premium</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹8<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/km</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Base fare: ₹20</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Performance bike</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Single passenger</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Premium helmet & jacket</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-nexus-600 hover:bg-green-nexus-700">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="bg-green-nexus-600 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Ready for a Quick Ride?</h2>
                <p className="text-lg opacity-90">
                  Download our app and book your first bike ride with a special discount. Use code FIRSTBIKE for 30%
                  off.
                </p>
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1619623786286-63a3aebc4a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Bike rider"
                  className="max-h-80 rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BikeRides
