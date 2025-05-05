"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { User, CreditCard, MapPin, Clock, Settings, LogOut } from "lucide-react"

const ProfileSidebar: React.FC = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  if (!user) {
    return null
  }

  return (
    <div className="w-full md:w-64 space-y-6">
      <div className="flex flex-col items-center p-6 bg-card rounded-lg border border-border">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={user.profileImage || "/placeholder.svg?height=80&width=80"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-sm text-muted-foreground">{user.phone}</p>
      </div>

      <nav className="space-y-1">
        <Link
          to="/profile"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isActive("/profile") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
        <Link
          to="/profile/payment"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isActive("/profile/payment") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          <CreditCard className="h-5 w-5" />
          <span>Payment Methods</span>
        </Link>
        <Link
          to="/profile/locations"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isActive("/profile/locations") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          <MapPin className="h-5 w-5" />
          <span>Saved Locations</span>
        </Link>
        <Link
          to="/profile/rides"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isActive("/profile/rides") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          <Clock className="h-5 w-5" />
          <span>Recent Rides</span>
        </Link>
        <Link
          to="/profile/settings"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isActive("/profile/settings") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Account Settings</span>
        </Link>
      </nav>

      <Button variant="destructive" className="w-full" onClick={logout}>
        <LogOut className="mr-2 h-5 w-5" />
        Logout
      </Button>
    </div>
  )
}

export default ProfileSidebar
