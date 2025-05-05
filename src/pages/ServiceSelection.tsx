"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Car, Bike, Truck, Package, ShoppingBag, Utensils } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ServiceType {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  bgImage: string
  path: string
}

const ServiceSelection = () => {
  const navigate = useNavigate()

  const serviceTypes: ServiceType[] = [
    {
      id: "bike-ride",
      name: "Bike Ride",
      description: "Quick & affordable bike rides",
      icon: <Bike className="h-12 w-12 text-green-nexus-500" />,
      bgImage:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      path: "/book?service=bike-ride",
    },
    {
      id: "car-ride",
      name: "Car Ride",
      description: "Comfortable sedans for daily commute",
      icon: <Car className="h-12 w-12 text-green-nexus-500" />,
      bgImage:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      path: "/book?service=car-ride",
    },
    {
      id: "auto-ride",
      name: "Auto Ride",
      description: "Convenient three-wheeler auto rides",
      icon: <Truck className="h-12 w-12 text-green-nexus-500" />,
      bgImage: "https://ethnomarginalia.com/wp-content/uploads/2021/03/img_4461_original.jpg?w=1600&h=600&crop=1",
      path: "/book?service=auto-ride",
    },
    {
      id: "courier",
      name: "Courier Delivery",
      description: "Fast & secure package delivery",
      icon: <Package className="h-12 w-12 text-green-nexus-500" />,
      bgImage:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      path: "/book?service=courier",
    },
    {
      id: "food-delivery",
      name: "Food Delivery",
      description: "Deliver food from restaurants to doorstep",
      icon: <Utensils className="h-12 w-12 text-green-nexus-500" />,
      bgImage:
        "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      path: "/book?service=food-delivery",
    },
    {
      id: "grocery-delivery",
      name: "Grocery Delivery",
      description: "Convenient grocery delivery to your home",
      icon: <ShoppingBag className="h-12 w-12 text-green-nexus-500" />,
      bgImage:
        "https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      path: "/book?service=grocery-delivery",
    },
  ]

  const handleServiceSelect = (service: ServiceType) => {
    navigate(service.path)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What service do you need today?
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choose a service to get started with your booking
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTypes.map((service) => (
                <Card
                  key={service.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border-transparent animate-fade-in"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="relative h-44">
                    <img
                      src={service.bgImage}
                      alt={service.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="text-xl font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-200">{service.description}</p>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-full p-2">
                      {service.icon}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceSelection
