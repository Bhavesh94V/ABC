import type React from "react"
import { Link } from "react-router-dom"
import { Car, Bike, Truck, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const rideOptions = [
  {
    icon: <Car className="h-8 w-8 text-primary" />,
    title: "Car Rides",
    description: "Comfortable sedans for daily commute",
    price: "From ₹149",
    link: "/services/car-rides",
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: <Bike className="h-8 w-8 text-primary" />,
    title: "Bike Rides",
    description: "Quick & affordable bike rides",
    price: "From ₹99",
    link: "/services/bike-rides",
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Group Travel",
    description: "Spacious SUVs for group travel",
    price: "From ₹249",
    link: "/services/xl",
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Hourly Rentals",
    description: "Hourly packages for multiple stops",
    price: "From ₹899",
    link: "/services/rentals",
    bgImage: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Package Delivery",
    description: "Fast & secure package delivery",
    price: "From ₹129",
    link: "/services/delivery",
    bgImage: "/placeholder.svg?height=300&width=400",
  },
]

const RideOptions: React.FC = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Choose Your Ride</h2>
          <p className="text-muted-foreground">
            From daily commutes to special occasions, we have the perfect ride options to meet all your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rideOptions.map((option, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl h-80">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10"></div>
              <img
                src={option.bgImage || "/placeholder.svg"}
                alt={option.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{option.title}</h3>
                    <p className="text-primary-foreground">{option.price}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-white/90">{option.description}</p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link to={option.link}>Book {option.title}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RideOptions
