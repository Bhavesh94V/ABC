import { Toaster } from "./components/ui/toaster"
import { Toaster as SonnerToaster } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route } from "react-router-dom"

// Custom providers
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"

// Pages
import Index from "./pages"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OTPVerification from "./pages/OTPVerification"
import Profile from "./pages/Profile"
import Book from "./pages/Book"
import RideTracking from "./pages/RideTracking"
import Notifications from "./pages/Notifications"
import About from "./pages/About"
import Safety from "./pages/Safety"
import Settings from "./pages/Settings"
import Chat from "./pages/Chat"
import Cities from "./pages/Cities"
import NotFound from "./pages/NotFound"
import MyRides from "./pages/MyRides"
import Payment from "./pages/Payment"

// Service Pages
import CarRides from "./pages/services/CarRides"
import BikeRides from "./pages/services/BikeRides"
import AutoRides from "./pages/services/AutoRides"
import Rentals from "./pages/services/Rentals"
import Intercity from "./pages/services/Intercity"

// Global chat component
import ChatBox from "./components/chat/ChatBox"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <SonnerToaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<OTPVerification />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book" element={<Book />} />
                <Route path="/ride-tracking" element={<RideTracking />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/about" element={<About />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/my-rides" element={<MyRides />} />
                <Route path="/payment" element={<Payment />} />

                {/* Service Pages */}
                <Route path="/services/car-rides" element={<CarRides />} />
                <Route path="/services/bike-rides" element={<BikeRides />} />
                <Route path="/services/auto-rides" element={<AutoRides />} />
                <Route path="/services/rentals" element={<Rentals />} />
                <Route path="/services/intercity" element={<Intercity />} />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              {/* Global Chat Component */}
              <ChatBox />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
