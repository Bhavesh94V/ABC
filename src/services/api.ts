import axios from "axios"

// Create axios instance
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Auth services
export const authService = {
  // Customer signup
  customerSignup: async (userData: {
    name: string
    email: string
    phone: string
    password: string
  }) => {
    const response = await api.post("/auth/register", {
      ...userData,
      role: "customer",
    })
    return response.data
  },

  // Driver signup
  driverSignup: async (formData: FormData) => {
    const response = await api.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  // Login with password
  loginWithPassword: async (identifier: string, password: string) => {
    const response = await api.post("/auth/login/password", {
      identifier,
      password,
    })

    return response.data
  },

  // Request OTP for login
  requestLoginOTP: async (identifier: string) => {
    const response = await api.post("/auth/login/otp/request", {
      identifier,
    })
    return response.data
  },

  // Login with OTP
  loginWithOTP: async (identifier: string, otp: string) => {
    const response = await api.post("/auth/login/otp/verify", {
      identifier,
      otp,
    })
    return response.data
  },

  // Verify OTP (for signup, password reset, etc.)
  verifyOTP: async (userId: string, otp: string, purpose: string) => {
    const response = await api.post("/auth/verify-otp", {
      userId,
      otp,
      purpose,
    })
    return response.data
  },

  // Resend OTP
  resendOTP: async (userId: string, purpose: string) => {
    const response = await api.post("/auth/resend-otp", {
      userId,
      purpose,
    })
    return response.data
  },

  // Admin login
  adminLogin: async (email: string, password: string) => {
    const response = await api.post("/auth/admin/login", {
      email,
      password,
    })
    return response.data
  },

  // Forgot password
  forgotPassword: async (identifier: string) => {
    const response = await api.post("/auth/forgot-password", {
      identifier,
    })
    return response.data
  },

  // Reset password
  resetPassword: async (userId: string, otp: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", {
      userId,
      otp,
      newPassword,
    })
    return response.data
  },
}

// User services
export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get("/users/profile")
    return response.data
  },

  // Update user profile
  updateProfile: async (userData: FormData) => {
    const response = await api.put("/users/profile", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put("/users/password", {
      currentPassword,
      newPassword,
    })
    return response.data
  },

  // Get saved locations
  getSavedLocations: async () => {
    const response = await api.get("/users/saved-locations")
    return response.data
  },

  // Add saved location
  addSavedLocation: async (locationData: {
    name: string
    address: string
    lat: number
    lng: number
    type?: string
  }) => {
    const response = await api.post("/users/saved-locations", locationData)
    return response.data
  },

  // Update saved location
  updateSavedLocation: async (
    locationId: string,
    locationData: {
      name?: string
      address?: string
      lat?: number
      lng?: number
      type?: string
    },
  ) => {
    const response = await api.put(`/users/saved-locations/${locationId}`, locationData)
    return response.data
  },

  // Delete saved location
  deleteSavedLocation: async (locationId: string) => {
    const response = await api.delete(`/users/saved-locations/${locationId}`)
    return response.data
  },

  // Get payment methods
  getPaymentMethods: async () => {
    const response = await api.get("/users/payment-methods")
    return response.data
  },

  // Add payment method
  addPaymentMethod: async (paymentData: {
    type: string
    cardNumber?: string
    cardName?: string
    expiryDate?: string
    upiId?: string
  }) => {
    const response = await api.post("/users/payment-methods", paymentData)
    return response.data
  },

  // Update payment method
  updatePaymentMethod: async (
    paymentId: string,
    paymentData: {
      type?: string
      cardNumber?: string
      cardName?: string
      expiryDate?: string
      upiId?: string
      isDefault?: boolean
    },
  ) => {
    const response = await api.put(`/users/payment-methods/${paymentId}`, paymentData)
    return response.data
  },

  // Delete payment method
  deletePaymentMethod: async (paymentId: string) => {
    const response = await api.delete(`/users/payment-methods/${paymentId}`)
    return response.data
  },

  // Update user preferences
  updatePreferences: async (preferences: {
    language?: string
    theme?: string
    notifications?: {
      email?: boolean
      sms?: boolean
      push?: boolean
    }
  }) => {
    const response = await api.put("/users/preferences", preferences)
    return response.data
  },
}

// Admin services
export const adminService = {
  // Get all users
  getAllUsers: async (params?: {
    page?: number
    limit?: number
    role?: string
    search?: string
  }) => {
    const response = await api.get("/admin/users", { params })
    return response.data
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    const response = await api.get(`/admin/users/${userId}`)
    return response.data
  },

  // Update user
  updateUser: async (
    userId: string,
    userData: {
      name?: string
      email?: string
      phone?: string
      role?: string
      isVerified?: boolean
      isApproved?: boolean
    },
  ) => {
    const response = await api.put(`/admin/users/${userId}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`)
    return response.data
  },

  // Get all drivers
  getAllDrivers: async (params?: {
    page?: number
    limit?: number
    search?: string
    isApproved?: boolean
  }) => {
    const response = await api.get("/admin/drivers", { params })
    return response.data
  },

  // Get pending drivers
  getPendingDrivers: async (params?: {
    page?: number
    limit?: number
  }) => {
    const response = await api.get("/admin/drivers/pending", { params })
    return response.data
  },

  // Approve driver
  approveDriver: async (driverId: string) => {
    const response = await api.put(`/admin/drivers/${driverId}/approve`)
    return response.data
  },

  // Reject driver
  rejectDriver: async (driverId: string, reason: string) => {
    const response = await api.put(`/admin/drivers/${driverId}/reject`, { reason })
    return response.data
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get("/admin/stats")
    return response.data
  },
}

export default api
