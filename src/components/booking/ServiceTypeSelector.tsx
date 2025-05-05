"use client"

import type React from "react"
import { Card } from "@/components/ui/card"

interface ServiceType {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  bgImage: string
}

interface ServiceTypeSelectorProps {
  serviceTypes: ServiceType[]
  selectServiceType: (serviceTypeId: string) => void
}

const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({ serviceTypes, selectServiceType }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select Service Type</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Choose what kind of service you need</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {serviceTypes.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden hover-scale cursor-pointer border-transparent"
            onClick={() => selectServiceType(service.id)}
          >
            <div className="relative h-40">
              <img src={service.bgImage} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="text-lg font-semibold">{service.name}</h4>
                <p className="text-sm text-gray-200">{service.description}</p>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 rounded-full p-2">{service.icon}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ServiceTypeSelector
