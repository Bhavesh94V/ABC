"use client"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Car, Shield, Clock, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

const CarRides = () => {
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
                <h1 className="text-4xl md:text-5xl font-bold">GreenCar Rides</h1>
                <p className="text-lg md:text-xl">
                  Comfortable, affordable, and eco-friendly car rides for your daily commute
                </p>
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
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="GreenCar Ride"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[200px]">
                  <div className="h-10 w-10 rounded-full bg-green-nexus-50 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-nexus-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average Arrival Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">4 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Choose GreenCar?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the best car ride experience with comfort, safety, and affordability in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Comfortable Rides</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enjoy spacious, air-conditioned cars with professional drivers for a smooth journey
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Safe & Secure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All rides are monitored with real-time tracking, emergency assistance, and verified drivers
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quick & Efficient</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fast pickup times, optimized routes, and experienced drivers to get you there quickly
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-100 dark:bg-gray-800/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Simple & Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Affordable rides with no hidden charges, surge pricing only during peak demand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">GreenCar Mini</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹9<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/km</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Base fare: ₹30</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Compact Hatchback</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Up to 3 passengers</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Air conditioning</span>
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
                  <h3 className="text-xl font-semibold">GreenCar Sedan</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹12<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/km</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Base fare: ₹40</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Spacious Sedan</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Up to 4 passengers</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Premium comfort</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-nexus-600 hover:bg-green-nexus-700">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">GreenCar XL</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹16<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/km</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Base fare: ₹60</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">SUV/Premium vehicle</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Up to 6 passengers</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Extra luggage space</span>
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
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Experience GreenCar?</h2>
                <p className="text-lg opacity-90">
                  Download our app and get your first ride with a special discount. Use code FIRSTRIDE for 50% off.
                </p>
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Mobile app"
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

export default CarRides
