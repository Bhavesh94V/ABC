"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Bell,
  Shield,
  CreditCard,
  Map,
  Laptop,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  User,
  Lock,
  HelpCircle,
  Save,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { user, updateUserProfile, logout } = useAuth()
  const navigate = useNavigate()

  // Password change state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    promotions: true,
    rideUpdates: true,
    partnerOffers: false,
    newsAndFeatures: true,
    rideSummaries: true,
    systemAlerts: true,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    locationSharing: true,
    dataCollection: true,
    thirdPartySharing: false,
    personalization: true,
  })

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedNotificationSettings = localStorage.getItem("notificationSettings")
    const savedPrivacySettings = localStorage.getItem("privacySettings")

    if (savedNotificationSettings) {
      setNotificationSettings(JSON.parse(savedNotificationSettings))
    }

    if (savedPrivacySettings) {
      setPrivacySettings(JSON.parse(savedPrivacySettings))
    }
  }, [])

  // The specific handler for notification settings
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    const newSettings = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    }

    setNotificationSettings(newSettings)

    // Save settings to localStorage for persistence
    localStorage.setItem("notificationSettings", JSON.stringify(newSettings))

    // Show toast for notification changes
    toast({
      title: "Settings updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications are now ${!notificationSettings[key] ? "enabled" : "disabled"}.`,
    })
  }

  // The specific handler for privacy settings
  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    const newSettings = {
      ...privacySettings,
      [key]: !privacySettings[key],
    }

    setPrivacySettings(newSettings)

    // Save settings to localStorage for persistence
    localStorage.setItem("privacySettings", JSON.stringify(newSettings))

    // Show toast for privacy changes
    toast({
      title: "Privacy setting updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} is now ${!privacySettings[key] ? "enabled" : "disabled"}.`,
    })
  }

  // Handle language change
  const handleLanguageChange = (newLanguage: "en" | "hi" | "es" | "fr" | "de") => {
    setLanguage(newLanguage)

    toast({
      title: "Language updated",
      description: `App language has been changed to ${
        newLanguage === "en"
          ? "English"
          : newLanguage === "hi"
            ? "Hindi"
            : newLanguage === "es"
              ? "Spanish"
              : newLanguage === "fr"
                ? "French"
                : "German"
      }.`,
    })
  }

  // Handle theme change
  const handleThemeChange = () => {
    toggleTheme()

    toast({
      title: "Theme updated",
      description: `App theme has been changed to ${theme === "dark" ? "light" : "dark"} mode.`,
    })
  }

  // Handle password change
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    setSavingPassword(true)

    // Simulate API call to change password
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      })

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setShowPasswordDialog(false)
      setSavingPassword(false)
    }, 1500)
  }

  // Handle account deletion
  const handleDeleteAccount = () => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")

    if (confirmed) {
      toast({
        title: "Account deletion initiated",
        description: "We've received your request to delete your account. This process may take up to 24 hours.",
        variant: "destructive",
      })

      // In a real app, this would send a request to your backend
      // For this demo, we'll just simulate the process
      setTimeout(() => {
        logout()
        navigate("/")
      }, 3000)
    }
  }

  // Handle data download
  const handleDownloadData = () => {
    toast({
      title: "Data request submitted",
      description: "Your data is being prepared for download. We'll notify you when it's ready.",
    })

    // Simulate data preparation
    setTimeout(() => {
      // In a real app, this would actually download the user's data
      const dummyData = JSON.stringify(
        {
          user: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
          },
          rides: [
            { date: "2023-05-15", from: "Home", to: "Office", fare: "$12.50" },
            { date: "2023-05-16", from: "Office", to: "Home", fare: "$13.25" },
          ],
          settings: {
            notifications: notificationSettings,
            privacy: privacySettings,
          },
        },
        null,
        2,
      )

      // Create a download link
      const blob = new Blob([dummyData], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "greenglide_user_data.json"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Data downloaded",
        description: "Your account data has been downloaded successfully.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Settings</h1>

          <Tabs defaultValue="account" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="account" className="text-center">
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-center">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-center">
                Privacy & Security
              </TabsTrigger>
              <TabsTrigger value="preferences" className="text-center">
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your account details and personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link
                    to="/profile"
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-green-nexus-500" />
                      <div>
                        <div className="font-medium">Personal Information</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Update your name, email, and phone number
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>

                  <div
                    onClick={() => setShowPasswordDialog(true)}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-3 text-green-nexus-500" />
                      <div>
                        <div className="font-medium">Password & Security</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Change your password and set up two-factor authentication
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <Link
                    to="/payment"
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-green-nexus-500" />
                      <div>
                        <div className="font-medium">Payment Methods</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Add or remove payment options</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </CardContent>
                <CardFooter>
                  <Link to="/help">
                    <Button variant="outline" className="w-full">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Get help with account issues
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Password Change Dialog */}
              <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>Update your password to keep your account secure.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowPasswordDialog(false)} disabled={savingPassword}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleChangePassword}
                      disabled={savingPassword}
                      className="bg-green-nexus-600 hover:bg-green-nexus-700"
                    >
                      {savingPassword ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Save Password
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control which notifications you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Promotions & Offers</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive special deals and discounts
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.promotions}
                        onCheckedChange={() => handleNotificationChange("promotions")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Ride Updates</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Notifications about your rides</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.rideUpdates}
                        onCheckedChange={() => handleNotificationChange("rideUpdates")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Partner Offers</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive offers from our partners</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.partnerOffers}
                        onCheckedChange={() => handleNotificationChange("partnerOffers")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">News & Features</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Updates about new services</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.newsAndFeatures}
                        onCheckedChange={() => handleNotificationChange("newsAndFeatures")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Ride Summaries</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get summaries after each ride</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.rideSummaries}
                        onCheckedChange={() => handleNotificationChange("rideSummaries")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">System Alerts</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Important system notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={() => handleNotificationChange("systemAlerts")}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      const newSettings = {
                        promotions: true,
                        rideUpdates: true,
                        partnerOffers: true,
                        newsAndFeatures: true,
                        rideSummaries: true,
                        systemAlerts: true,
                      }

                      setNotificationSettings(newSettings)
                      localStorage.setItem("notificationSettings", JSON.stringify(newSettings))

                      toast({
                        title: "Preferences updated",
                        description: "All notifications have been enabled.",
                      })
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Enable all notifications
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>Manage your privacy settings and data preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Map className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Location Sharing</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Share your location while using the app
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.locationSharing}
                        onCheckedChange={() => handlePrivacyChange("locationSharing")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Data Collection</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Allow us to collect usage data to improve services
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.dataCollection}
                        onCheckedChange={() => handlePrivacyChange("dataCollection")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Third-Party Sharing</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Share your data with partners for better offers
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.thirdPartySharing}
                        onCheckedChange={() => handlePrivacyChange("thirdPartySharing")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-nexus-500" />
                        <div>
                          <p className="font-medium">Personalization</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Customize your experience based on usage
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={privacySettings.personalization}
                        onCheckedChange={() => handlePrivacyChange("personalization")}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full" onClick={handleDownloadData}>
                    Download my data
                  </Button>

                  <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                    Delete my account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>App Preferences</CardTitle>
                  <CardDescription>Customize your GreenGlide experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {theme === "dark" ? (
                        <Moon className="h-5 w-5 text-green-nexus-500" />
                      ) : (
                        <Sun className="h-5 w-5 text-green-nexus-500" />
                      )}
                      <div>
                        <p className="font-medium">App Theme</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {theme === "dark" ? "Dark mode" : "Light mode"} is currently active
                        </p>
                      </div>
                    </div>
                    <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <Globe className="h-5 w-5 text-green-nexus-500" />
                      <div>
                        <p className="font-medium">App Language</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <Button
                        variant={language === "en" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleLanguageChange("en")}
                      >
                        <span className="mr-2">🇺🇸</span> English
                      </Button>

                      <Button
                        variant={language === "hi" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleLanguageChange("hi")}
                      >
                        <span className="mr-2">🇮🇳</span> Hindi
                      </Button>

                      <Button
                        variant={language === "es" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleLanguageChange("es")}
                      >
                        <span className="mr-2">🇪🇸</span> Español
                      </Button>

                      <Button
                        variant={language === "fr" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleLanguageChange("fr")}
                      >
                        <span className="mr-2">🇫🇷</span> Français
                      </Button>

                      <Button
                        variant={language === "de" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleLanguageChange("de")}
                      >
                        <span className="mr-2">🇩🇪</span> Deutsch
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="block space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Laptop className="h-5 w-5 text-green-nexus-500" />
                      <div>
                        <p className="font-medium">Enable Desktop Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notifications when you're using a browser
                        </p>
                      </div>
                    </div>
                    <Switch
                      onChange={() => {
                        // In a real app, you'd request notification permissions
                        // For this demo, we'll just show a toast
                        toast({
                          title: "Permission requested",
                          description: "Please allow notifications in your browser prompt.",
                        })
                      }}
                    />
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Settings
