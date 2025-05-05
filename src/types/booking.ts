export interface Location {
  address: string
  lat?: number
  lng?: number
}

export interface ServiceType {
  id: string
  name: string
  icon: string
  description: string
}

export interface RideOption {
  id: string
  name: string
  description: string
  price: number
  eta: number
  icon: string
  serviceTypeId: string
}

export interface BookingData {
  id?: string
  userId?: string
  pickup: Location
  destination: Location
  serviceType: string
  rideOption: string
  scheduleTime: Date | null
  paymentMethod: string
  status?: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  fare?: number
  distance?: number
  duration?: number
  driver?: Driver
  createdAt?: Date
}

export interface Driver {
  id: string
  name: string
  phone: string
  rating: number
  photo: string
  vehicleDetails: {
    model: string
    color: string
    plateNumber: string
  }
}
