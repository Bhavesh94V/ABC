"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Bike, Star, ChevronDown, ChevronUp, MessageSquare, FileText, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

interface Ride {
  id: string
  type: "car" | "bike" | "auto"
  from: string
  to: string
  date: string
  time: string
  amount: string
  status: "upcoming" | "completed" | "cancelled"
  driverName?: string
  driverRating?: number
  vehicleDetails?: string
  isRated?: boolean
}

const MyRides = () => {
  const { toast } = useToast()
  const [expandedRide, setExpandedRide] = useState<string | null>(null)

  const toggleRideDetails = (rideId: string) => {
    setExpandedRide(expandedRide === rideId ? null : rideId)
  }

  const rides: Ride[] = [
    {
      id: "1",
      type: "car",
      from: "Andheri East",
      to: "Bandra Kurla Complex",
      date: "2023-06-15",
      time: "09:30 AM",
      amount: "₹350",
      status: "upcoming",
      driverName: "Rajesh Kumar",
      driverRating: 4.8,
      vehicleDetails: "White Honda City (MH 01 AB 1234)",
    },
    {
      id: "2",
      type: "bike",
      from: "Powai",
      to: "Vikhroli",
      date: "2023-06-14",
      time: "06:15 PM",
      amount: "₹120",
      status: "completed",
      driverName: "Mahesh Singh",
      driverRating: 4.6,
      vehicleDetails: "Black Pulsar (MH 02 CD 5678)",
      isRated: true,
    },
    {
      id: "3",
      type: "auto",
      from: "Ghatkopar",
      to: "Kurla",
      date: "2023-06-12",
      time: "11:45 AM",
      amount: "₹180",
      status: "completed",
      driverName: "Vijay Patil",
      driverRating: 4.5,
      vehicleDetails: "Auto Rickshaw (MH 03 EF 9012)",
      isRated: false,
    },
    {
      id: "4",
      type: "car",
      from: "Dadar",
      to: "Worli",
      date: "2023-06-10",
      time: "08:00 AM",
      amount: "₹220",
      status: "cancelled",
    },
    {
      id: "5",
      type: "car",
      from: "Chembur",
      to: "Sion",
      date: "2023-06-05",
      time: "03:30 PM",
      amount: "₹190",
      status: "completed",
      driverName: "Sanjay Verma",
      driverRating: 4.7,
      vehicleDetails: "Silver Maruti Swift (MH 04 GH 3456)",
      isRated: true,
    },
  ]

  const upcomingRides = rides.filter((ride) => ride.status === "upcoming")
  const completedRides = rides.filter((ride) => ride.status === "completed")
  const cancelledRides = rides.filter((ride) => ride.status === "cancelled")

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5" />
      case "bike":
        return <Bike className="h-5 w-5" />
      case "auto":
        return <Car className="h-5 w-5" />
      default:
        return <Car className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const handleCancelRide = (rideId: string) => {
    toast({
      title: "Ride Cancellation",
      description: "Your ride has been cancelled successfully. Refund will be processed within 24 hours.",
    })
  }

  const handleRateRide = (rideId: string) => {
    toast({
      title: "Rate your ride",
      description: "Thank you for rating your ride. Your feedback helps us improve our service.",
    })
  }

  const handleBookAgain = (ride: Ride) => {
    toast({
      title: "Booking new ride",
      description: "Redirecting you to the booking page with pre-filled locations.",
    })
  }

  const handleViewInvoice = (rideId: string) => {
    toast({
      title: "Invoice",
      description: "Generating invoice for your ride. Please wait.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Rides</h1>

            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">{upcomingRides.length} Upcoming</TabsTrigger>
                <TabsTrigger value="completed">{completedRides.length} Completed</TabsTrigger>
                <TabsTrigger value="cancelled">{cancelledRides.length} Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {rides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    isExpanded={expandedRide === ride.id}
                    toggleExpand={() => toggleRideDetails(ride.id)}
                    onCancel={() => handleCancelRide(ride.id)}
                    onRate={() => handleRateRide(ride.id)}
                    onBookAgain={() => handleBookAgain(ride)}
                    onViewInvoice={() => handleViewInvoice(ride.id)}
                  />
                ))}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingRides.length > 0 ? (
                  upcomingRides.map((ride) => (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      isExpanded={expandedRide === ride.id}
                      toggleExpand={() => toggleRideDetails(ride.id)}
                      onCancel={() => handleCancelRide(ride.id)}
                      onRate={() => handleRateRide(ride.id)}
                      onBookAgain={() => handleBookAgain(ride)}
                      onViewInvoice={() => handleViewInvoice(ride.id)}
                    />
                  ))
                ) : (
                  <EmptyState message="No upcoming rides found" />
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedRides.length > 0 ? (
                  completedRides.map((ride) => (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      isExpanded={expandedRide === ride.id}
                      toggleExpand={() => toggleRideDetails(ride.id)}
                      onCancel={() => handleCancelRide(ride.id)}
                      onRate={() => handleRateRide(ride.id)}
                      onBookAgain={() => handleBookAgain(ride)}
                      onViewInvoice={() => handleViewInvoice(ride.id)}
                    />
                  ))
                ) : (
                  <EmptyState message="No completed rides found" />
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="space-y-4">
                {cancelledRides.length > 0 ? (
                  cancelledRides.map((ride) => (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      isExpanded={expandedRide === ride.id}
                      toggleExpand={() => toggleRideDetails(ride.id)}
                      onCancel={() => handleCancelRide(ride.id)}
                      onRate={() => handleRateRide(ride.id)}
                      onBookAgain={() => handleBookAgain(ride)}
                      onViewInvoice={() => handleViewInvoice(ride.id)}
                    />
                  ))
                ) : (
                  <EmptyState message="No cancelled rides found" />
                )}
              </TabsContent>
            </Tabs>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="bg-green-nexus-600 hover:bg-green-nexus-700">
                <Link to="/book">Book a New Ride</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

interface RideCardProps {
  ride: Ride
  isExpanded: boolean
  toggleExpand: () => void
  onCancel: () => void
  onRate: () => void
  onBookAgain: () => void
  onViewInvoice: () => void
}

const RideCard: React.FC<RideCardProps> = ({
  ride,
  isExpanded,
  toggleExpand,
  onCancel,
  onRate,
  onBookAgain,
  onViewInvoice,
}) => {
  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5" />
      case "bike":
        return <Bike className="h-5 w-5" />
      case "auto":
        return <Car className="h-5 w-5" />
      default:
        return <Car className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-nexus-200 dark:hover:border-green-nexus-800 transition-all">
      <CardContent className="p-0">
        <div className="p-4 cursor-pointer" onClick={toggleExpand}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${ride.type === "car" ? "bg-blue-100 dark:bg-blue-900/30" : ride.type === "bike" ? "bg-green-100 dark:bg-green-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}`}
              >
                {getVehicleIcon(ride.type)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {ride.type === "car" ? "GreenCar" : ride.type === "bike" ? "GreenBike" : "GreenAuto"} Ride
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(ride.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}{" "}
                  • {ride.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{ride.amount}</div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(ride.status)}`}>
                {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-green-nexus-500"></div>
              <div className="w-0.5 h-10 bg-gray-300 dark:bg-gray-700"></div>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
            <div className="flex-1">
              <div className="text-gray-700 dark:text-gray-300">{ride.from}</div>
              <div className="text-gray-700 dark:text-gray-300 mt-6">{ride.to}</div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400">
            <div className="text-sm">
              {ride.status === "upcoming" ? "Trip ID: " : "Booking ID: "}
              {ride.id}
            </div>
            <button className="flex items-center text-gray-500 dark:text-gray-400">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <>
            <Separator />
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              {ride.status !== "cancelled" && ride.driverName && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Driver Details</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">{ride.driverName}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{ride.driverRating}</span>
                        </div>
                      </div>
                    </div>

                    {ride.status === "upcoming" && (
                      <Button asChild variant="outline" size="sm">
                        <Link to="/chat">
                          <MessageSquare className="h-4 w-4 mr-2" /> Chat
                        </Link>
                      </Button>
                    )}
                  </div>

                  {ride.vehicleDetails && (
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Vehicle: {ride.vehicleDetails}</div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {ride.status === "upcoming" && (
                  <>
                    <Button asChild variant="default" size="sm" className="bg-green-nexus-600 hover:bg-green-nexus-700">
                      <Link to={`/ride-tracking?id=${ride.id}`}>Track Ride</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={onCancel}>
                      Cancel Ride
                    </Button>
                  </>
                )}

                {ride.status === "completed" && !ride.isRated && (
                  <Button variant="outline" size="sm" onClick={onRate}>
                    <Star className="h-4 w-4 mr-2" /> Rate Ride
                  </Button>
                )}

                {ride.status === "completed" && (
                  <>
                    <Button variant="outline" size="sm" onClick={onViewInvoice}>
                      <FileText className="h-4 w-4 mr-2" /> View Invoice
                    </Button>
                    <Button variant="outline" size="sm" onClick={onBookAgain}>
                      Book Again
                    </Button>
                  </>
                )}

                {ride.status === "cancelled" && (
                  <Button variant="outline" size="sm" onClick={onBookAgain}>
                    Book Again
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
    <Car className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{message}</h3>
    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-4">Book a ride to see your ride history here</p>
    <Button asChild>
      <Link to="/book">Book a Ride</Link>
    </Button>
  </div>
)

export default MyRides
