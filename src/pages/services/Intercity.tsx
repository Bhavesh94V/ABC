"use client"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Car, MapPin, Shield, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"

const Intercity = () => {
  const { t } = useLanguage()

  const popularRoutes = [
    {
      from: "Mumbai",
      to: "Pune",
      distance: "150 km",
      time: "3 hours",
      price: "₹1,999",
      image:
        "https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.jpg?s=612x612&w=0&k=20&c=L1LJVrYMS8kj2rJKlQMcUR88vYoAZeWbYIGkcTo6QV0=",
    },
    {
      from: "Delhi",
      to: "Agra",
      distance: "233 km",
      time: "3.5 hours",
      price: "₹2,499",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    },
    {
      from: "Bangalore",
      to: "Mysore",
      distance: "150 km",
      time: "3.5 hours",
      price: "₹1,899",
      image:
        "https://media.istockphoto.com/id/1382384282/photo/bangalore-or-bengaluru.jpg?s=612x612&w=0&k=20&c=6pxwL3JxNV2B_NZSLMZLhrSLqAbyCPlGuSZYKImpjKQ=",
    },
    {
      from: "Chennai",
      to: "Pondicherry",
      distance: "170 km",
      time: "3 hours",
      price: "₹1,799",
      image: "https://t4.ftcdn.net/jpg/04/84/47/27/360_F_484472702_acpl3SZTBwb2Al4ZiW8VusICp7Utl8ed.jpg",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-green-nexus-600 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">GreenGlide Intercity</h1>
                <p className="text-lg md:text-xl">
                  Safe, comfortable, and reliable intercity travel with fixed pricing
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Book an Intercity Ride</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/safety">Learn About Safety</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Intercity Travel"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[200px]">
                  <div className="h-10 w-10 rounded-full bg-green-nexus-50 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-nexus-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available in</p>
                    <p className="font-semibold text-gray-900 dark:text-white">50+ City Pairs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose Intercity Service?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The most comfortable and convenient way to travel between cities with professional drivers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Premium Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Travel in comfort with our fleet of well-maintained sedans, SUVs, and premium vehicles
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Safety First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verified drivers, real-time tracking, and 24/7 customer support for peace of mind
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Fixed Pricing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No surge pricing or hidden charges. Pay the same price regardless of traffic or time
              </p>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="bg-gray-100 dark:bg-gray-800/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Popular Intercity Routes</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Most traveled routes with fixed fares and comfortable rides
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularRoutes.map((route, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={route.image}
                      alt={`${route.from} to ${route.to}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="font-medium text-lg text-gray-900 dark:text-white">{route.from}</div>
                      <div className="text-green-nexus-600 dark:text-green-nexus-400">→</div>
                      <div className="font-medium text-lg text-gray-900 dark:text-white">{route.to}</div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div>Distance: {route.distance}</div>
                      <div>Time: {route.time}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-green-nexus-600 dark:text-green-nexus-400">
                        {route.price}
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/book">Book</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/cities">View All Routes</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Booking Process */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Book Your Intercity Ride in 3 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fast, easy, and convenient booking process for your intercity travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-green-nexus-600 dark:text-green-nexus-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Select Cities</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your pickup and drop-off cities, along with your travel date and time
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-green-nexus-600 dark:text-green-nexus-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Choose Vehicle</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select from our range of comfortable vehicles based on your needs and group size
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-green-nexus-600 dark:text-green-nexus-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Pay & Confirm</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Make a secure payment and receive instant confirmation for your journey
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-green-nexus-600 hover:bg-green-nexus-700">
              <Link to="/book">Book an Intercity Ride Now</Link>
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="bg-green-nexus-600 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Planning a Group Trip?</h2>
                <p className="text-lg opacity-90">
                  We offer special rates for group travel and corporate bookings. Contact our team for custom quotes.
                </p>
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Group travel"
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

export default Intercity
