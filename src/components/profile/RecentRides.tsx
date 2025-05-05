import type React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Bike } from "lucide-react"

const RecentRides: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your Recent Rides</h3>
          <Button asChild variant="outline">
            <Link to="/my-rides">View All Rides</Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">GreenCar Ride</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">15 Jun 2023 • 09:30 AM</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">₹350</div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Upcoming
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-nexus-500"></div>
                <div className="w-0.5 h-10 bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
              <div className="flex-1">
                <div className="text-gray-700 dark:text-gray-300">Andheri East</div>
                <div className="text-gray-700 dark:text-gray-300 mt-6">Bandra Kurla Complex</div>
              </div>
            </div>

            <div className="flex mt-4 space-x-2">
              <Button asChild size="sm" className="bg-green-nexus-600 hover:bg-green-nexus-700">
                <Link to="/ride-tracking?id=1">Track Ride</Link>
              </Button>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Bike className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">GreenBike Ride</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">14 Jun 2023 • 06:15 PM</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">₹120</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Completed
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-nexus-500"></div>
                <div className="w-0.5 h-10 bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
              <div className="flex-1">
                <div className="text-gray-700 dark:text-gray-300">Powai</div>
                <div className="text-gray-700 dark:text-gray-300 mt-6">Vikhroli</div>
              </div>
            </div>

            <div className="flex mt-4 space-x-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Book Again
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button asChild className="bg-green-nexus-600 hover:bg-green-nexus-700">
            <Link to="/book">Book a New Ride</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentRides
