"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import PaymentMethodManager from "@/components/profile/PaymentMethodManager"
import ProfileSidebar from "@/components/profile/ProfileSidebar"
import EditProfileForm from "@/components/profile/EditProfileForm"
import SavedLocations from "@/components/profile/SavedLocations"
import RecentRides from "@/components/profile/RecentRides"
import AccountSettings from "@/components/profile/AccountSettings"

const Profile = () => {
  const { user, updateUserProfile } = useAuth()
  const { toast } = useToast()

  const [editing, setEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string>(
    user?.profileImage ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
  )
  const [formData, setFormData] = useState({
    name: user?.name || "Sarah Johnson",
    email: user?.email || "sarah.johnson@example.com",
    phone: user?.phone || "+91 98765 43210",
    address: user?.address || "Andheri West, Mumbai, 400053",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result.toString())
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    updateUserProfile({
      ...user,
      ...formData,
      profileImage,
    })

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })

    setEditing(false)
  }

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || "Sarah Johnson",
      email: user?.email || "sarah.johnson@example.com",
      phone: user?.phone || "+91 98765 43210",
      address: user?.address || "Andheri West, Mumbai, 400053",
    })
    setProfileImage(
      user?.profileImage ||
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    )
    setEditing(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <ProfileSidebar
                editing={editing}
                profileImage={profileImage}
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                handleSaveProfile={handleSaveProfile}
                handleCancelEdit={handleCancelEdit}
                setEditing={setEditing}
              />

              {/* Main Content */}
              <div className="lg:col-span-2">
                {editing ? (
                  <EditProfileForm formData={formData} handleInputChange={handleInputChange} />
                ) : (
                  <Tabs defaultValue="saved-locations" className="w-full">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="saved-locations">Saved Locations</TabsTrigger>
                      <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                      <TabsTrigger value="rides">My Rides</TabsTrigger>
                      <TabsTrigger value="settings">Account Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="saved-locations" className="mt-6">
                      <SavedLocations />
                    </TabsContent>

                    <TabsContent value="payment-methods" className="mt-6">
                      <PaymentMethodManager />
                    </TabsContent>

                    <TabsContent value="rides" className="mt-6">
                      <RecentRides />
                    </TabsContent>

                    <TabsContent value="settings" className="mt-6">
                      <AccountSettings />
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
