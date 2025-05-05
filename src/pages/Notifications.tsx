"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Trash, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  isRead: boolean
  type: "ride" | "promo" | "system" | "payment"
}

const Notifications = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState<string>("all")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Ride Completed",
      message: "Your ride with Rahul has been completed. Rate your experience!",
      time: "5 minutes ago",
      isRead: false,
      type: "ride",
    },
    {
      id: "2",
      title: "Weekend Offer",
      message: "Enjoy 20% off on all rides this weekend using code WEEKEND20",
      time: "2 hours ago",
      isRead: false,
      type: "promo",
    },
    {
      id: "3",
      title: "Payment Successful",
      message: "Your payment of ₹249 for the last ride has been processed successfully",
      time: "3 hours ago",
      isRead: true,
      type: "payment",
    },
    {
      id: "4",
      title: "Account Update",
      message: "Your profile information has been updated successfully",
      time: "1 day ago",
      isRead: true,
      type: "system",
    },
    {
      id: "5",
      title: "New Feature",
      message: "You can now schedule rides up to 7 days in advance",
      time: "3 days ago",
      isRead: true,
      type: "system",
    },
  ])

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">You need to be logged in to view notifications</h2>
            <Button asChild className="bg-green-nexus-600 hover:bg-green-nexus-700">
              <a href="/login">Go to Login</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.type === filter)

  const toggleNotificationSelection = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((nId) => nId !== id))
    } else {
      setSelectedNotifications([...selectedNotifications, id])
    }
  }

  const markAsRead = () => {
    setNotifications(
      notifications.map((notification) =>
        selectedNotifications.includes(notification.id) ? { ...notification, isRead: true } : notification,
      ),
    )
    setSelectedNotifications([])
  }

  const deleteNotifications = () => {
    setNotifications(notifications.filter((notification) => !selectedNotifications.includes(notification.id)))
    setSelectedNotifications([])
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
  }

  const deleteAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ride":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <CarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        )
      case "promo":
        return (
          <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <GiftIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
        )
      case "payment":
        return (
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CreditCardIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        )
      case "system":
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <InfoIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        )
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Bell className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                  {notifications.filter((n) => !n.isRead).length > 0 && (
                    <div className="ml-2 bg-green-nexus-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {notifications.filter((n) => !n.isRead).length}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  {selectedNotifications.length > 0 ? (
                    <>
                      <Button variant="outline" size="sm" onClick={markAsRead} className="flex items-center">
                        <Check className="h-4 w-4 mr-1" /> Mark Read
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={deleteNotifications}
                        className="flex items-center text-red-500 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" onClick={toggleSettings} className="flex items-center">
                      <Settings className="h-4 w-4 mr-1" /> Settings
                    </Button>
                  )}
                </div>
              </div>

              {showSettings && (
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 animate-fade-in">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">Ride Updates</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications about your rides
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">Promotions & Offers</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Special deals and promotional offers
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">Payment Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Updates about your payments and receipts
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">System Updates</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Important updates about your account
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      Mark All as Read
                    </Button>
                    <Button variant="outline" size="sm" onClick={deleteAll} className="text-red-500 hover:text-red-600">
                      Clear All Notifications
                    </Button>
                  </div>
                </div>
              )}

              <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex overflow-x-auto">
                <Button
                  variant={filter === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="rounded-full"
                >
                  All
                </Button>
                <Button
                  variant={filter === "ride" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("ride")}
                  className="rounded-full"
                >
                  Rides
                </Button>
                <Button
                  variant={filter === "promo" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("promo")}
                  className="rounded-full"
                >
                  Promotions
                </Button>
                <Button
                  variant={filter === "payment" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("payment")}
                  className="rounded-full"
                >
                  Payments
                </Button>
                <Button
                  variant={filter === "system" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("system")}
                  className="rounded-full"
                >
                  System
                </Button>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <Bell className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No notifications</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {filter === "all"
                        ? "You don't have any notifications yet."
                        : `You don't have any ${filter} notifications.`}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 flex hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                        !notification.isRead ? "bg-green-nexus-50 dark:bg-green-nexus-900/10" : ""
                      }`}
                    >
                      <div className="mr-3 flex items-start pt-1">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleNotificationSelection(notification.id)}
                          className="h-4 w-4 text-green-nexus-600 rounded border-gray-300 focus:ring-green-nexus-500"
                        />
                      </div>
                      <div className="mr-4 flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p
                            className={`text-sm font-medium ${!notification.isRead ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                            {notification.time}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                      </div>
                      {!notification.isRead && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-green-nexus-500"></div>
                        </div>
                      )}
                    </div>
                  ))
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

// Icon components for notification types
const CarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
)

const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

export default Notifications
