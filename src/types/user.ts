export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface SavedLocation {
  id: string
  userId: string
  name: string
  address: string
  lat: number
  lng: number
  type: "home" | "work" | "other"
  icon: string
}

export interface Ride {
  id: string
  userId: string
  pickup: {
    address: string
    lat: number
    lng: number
  }
  destination: {
    address: string
    lat: number
    lng: number
  }
  serviceType: string
  rideOption: string
  fare: number
  distance: number
  duration: number
  status: "completed" | "cancelled"
  paymentMethod: string
  paymentStatus: "paid" | "pending" | "failed"
  driverName: string
  driverRating: number
  vehicleDetails: {
    model: string
    color: string
    plateNumber: string
  }
  startTime: Date
  endTime: Date
  createdAt: Date
}
