import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Mock data
const users = []
const rides = []
const drivers = []
const payments = []

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

// User routes
app.post("/api/auth/register", (req, res) => {
  const { name, email, phone, password } = req.body

  // Check if user already exists
  const userExists = users.find((user) => user.email === email || user.phone === phone)
  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    password, // In a real app, this would be hashed
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  users.push(newUser)

  // Don't send password back
  const { password: _, ...userWithoutPassword } = newUser

  res.status(201).json({ user: userWithoutPassword })
})

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body

  // Find user
  const user = users.find((user) => user.email === email && user.password === password)
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  // Don't send password back
  const { password: _, ...userWithoutPassword } = user

  res.status(200).json({ user: userWithoutPassword })
})

// Booking routes
app.post("/api/bookings", (req, res) => {
  const { userId, pickup, destination, serviceType, rideOption, scheduleTime, paymentMethod } = req.body

  // Create new booking
  const newBooking = {
    id: Date.now().toString(),
    userId,
    pickup,
    destination,
    serviceType,
    rideOption,
    scheduleTime: scheduleTime ? new Date(scheduleTime) : null,
    paymentMethod,
    status: "confirmed",
    fare: Math.floor(Math.random() * 500) + 100, // Random fare between 100-600
    distance: Math.floor(Math.random() * 20) + 1, // Random distance between 1-20 km
    duration: Math.floor(Math.random() * 60) + 10, // Random duration between 10-70 minutes
    createdAt: new Date(),
  }

  rides.push(newBooking)

  res.status(201).json({ booking: newBooking })
})

app.get("/api/bookings/:userId", (req, res) => {
  const { userId } = req.params

  const userRides = rides.filter((ride) => ride.userId === userId)

  res.status(200).json({ rides: userRides })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
