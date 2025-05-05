"use client"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Car, Clock, Shield, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

const Rentals = () => {
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
                <h1 className="text-4xl md:text-5xl font-bold">GreenGlide Rentals</h1>
                <p className="text-lg md:text-xl">
                  Flexible vehicle rentals by the hour, day, or week for all your travel needs
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Rent a Vehicle</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/safety">Learn About Safety</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517153295259-74eb0b416cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Car Rental"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[200px]">
                  <div className="h-10 w-10 rounded-full bg-green-nexus-50 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-nexus-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Flexible Duration</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Hours to Weeks</p>
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
              Why Choose GreenGlide Rentals?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The most convenient and flexible way to rent vehicles for any duration with no hidden fees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Flexible Duration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rent by the hour, day, or week with easy extensions and early returns
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Diverse Fleet</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose from cars, SUVs, luxury vehicles, and more to suit your specific needs
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-nexus-50 dark:bg-green-nexus-900/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Fully Insured</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All rentals come with comprehensive insurance coverage for peace of mind
              </p>
            </div>
          </div>
        </div>

        {/* Rental Options */}
        <div className="bg-gray-100 dark:bg-gray-800/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Choose Your Rental Package
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We offer a variety of rental options to fit your specific needs and budget
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">Hourly Rental</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹149<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/hour</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Minimum 4 hours</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Perfect for short trips</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Fuel included</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Unlimited km within city</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-nexus-600 hover:bg-green-nexus-700">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative transform scale-105 z-10">
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">Daily Rental</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹1,299<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/day</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">24-hour period</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Ideal for day trips</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">300 km included</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Free delivery & pickup</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-nexus-600 hover:bg-green-nexus-700">
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-green-nexus-600 p-4 text-white text-center">
                  <h3 className="text-xl font-semibold">Weekly Rental</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹6,999<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/week</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">7-day period</p>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Perfect for long trips</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">1500 km included</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-5 w-5 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/20 flex items-center justify-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-green-nexus-600 dark:bg-green-nexus-400"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">24/7 roadside assistance</span>
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
                <h2 className="text-3xl md:text-4xl font-bold">Need a Vehicle for Longer?</h2>
                <p className="text-lg opacity-90">
                  Contact our team for special monthly rates and corporate fleet solutions. Custom packages available.
                </p>
                <div className="pt-4">
                  <Button asChild size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                    <Link to="/book">Rent Now</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Car keys"
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

export default Rentals
