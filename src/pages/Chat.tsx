"use client"

import { useState } from "react"
import { MessageSquare, Search, Phone, Video, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ChatBox from "@/components/chat/ChatBox"

interface ChatContact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  type: "driver" | "support"
}

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

  const contacts: ChatContact[] = [
    {
      id: "1",
      name: "Customer Support",
      lastMessage: "How can we help you today?",
      time: "12:30 PM",
      unread: 2,
      online: true,
      type: "support",
    },
    {
      id: "2",
      name: "Rahul Singh (Driver)",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "I've arrived at the pickup location",
      time: "Yesterday",
      unread: 0,
      online: false,
      type: "driver",
    },
    {
      id: "3",
      name: "Priya Mehta (Driver)",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Thanks for the ride! Have a great day!",
      time: "2 days ago",
      unread: 0,
      online: true,
      type: "driver",
    },
    {
      id: "4",
      name: "Technical Support",
      lastMessage: "Your issue has been resolved",
      time: "3 days ago",
      unread: 0,
      online: true,
      type: "support",
    },
    {
      id: "5",
      name: "Amit Kumar (Driver)",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      lastMessage: "I'm waiting near the coffee shop",
      time: "Last week",
      unread: 0,
      online: false,
      type: "driver",
    },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleContactSelect = (contact: ChatContact) => {
    setSelectedContact(contact)
    setChatOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row h-[calc(100vh-200px)]">
              {/* Sidebar */}
              <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700">
                <div className="p-4">
                  <h1 className="text-2xl font-bold flex items-center text-gray-900 dark:text-white mb-4">
                    <MessageSquare className="mr-2 h-6 w-6 text-green-nexus-500" />
                    Messages
                  </h1>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search contacts..."
                      className="pl-10"
                    />
                  </div>

                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="drivers">Drivers</TabsTrigger>
                      <TabsTrigger value="support">Support</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-4 space-y-1">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedContact?.id === contact.id
                              ? "bg-green-nexus-50 dark:bg-green-nexus-900/20"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => handleContactSelect(contact)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                {contact.avatar ? (
                                  <img src={contact.avatar} alt={contact.name} className="h-full w-full object-cover" />
                                ) : (
                                  <div className="bg-green-nexus-500 h-full w-full flex items-center justify-center">
                                    <span className="text-white font-medium">{contact.name.charAt(0)}</span>
                                  </div>
                                )}
                              </Avatar>
                              {contact.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {contact.name}
                                </h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && (
                              <div className="h-5 w-5 rounded-full bg-green-nexus-500 flex items-center justify-center">
                                <span className="text-xs text-white font-medium">{contact.unread}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {filteredContacts.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No conversations found</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="drivers" className="mt-4 space-y-1">
                      {filteredContacts
                        .filter((contact) => contact.type === "driver")
                        .map((contact) => (
                          <div
                            key={contact.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedContact?.id === contact.id
                                ? "bg-green-nexus-50 dark:bg-green-nexus-900/20"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => handleContactSelect(contact)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar className="h-12 w-12">
                                  {contact.avatar ? (
                                    <img
                                      src={contact.avatar}
                                      alt={contact.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="bg-blue-500 h-full w-full flex items-center justify-center">
                                      <span className="text-white font-medium">{contact.name.charAt(0)}</span>
                                    </div>
                                  )}
                                </Avatar>
                                {contact.online && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {contact.name}
                                  </h3>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                  {contact.lastMessage}
                                </p>
                              </div>
                              {contact.unread > 0 && (
                                <div className="h-5 w-5 rounded-full bg-green-nexus-500 flex items-center justify-center">
                                  <span className="text-xs text-white font-medium">{contact.unread}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                      {filteredContacts.filter((contact) => contact.type === "driver").length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No driver conversations found</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="support" className="mt-4 space-y-1">
                      {filteredContacts
                        .filter((contact) => contact.type === "support")
                        .map((contact) => (
                          <div
                            key={contact.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedContact?.id === contact.id
                                ? "bg-green-nexus-50 dark:bg-green-nexus-900/20"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => handleContactSelect(contact)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar className="h-12 w-12">
                                  <div className="bg-green-nexus-500 h-full w-full flex items-center justify-center">
                                    <span className="text-white font-medium">{contact.name.charAt(0)}</span>
                                  </div>
                                </Avatar>
                                {contact.online && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {contact.name}
                                  </h3>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{contact.time}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                  {contact.lastMessage}
                                </p>
                              </div>
                              {contact.unread > 0 && (
                                <div className="h-5 w-5 rounded-full bg-green-nexus-500 flex items-center justify-center">
                                  <span className="text-xs text-white font-medium">{contact.unread}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                      {filteredContacts.filter((contact) => contact.type === "support").length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No support conversations found</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedContact ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          {selectedContact.avatar ? (
                            <img
                              src={selectedContact.avatar}
                              alt={selectedContact.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div
                              className={`${selectedContact.type === "support" ? "bg-green-nexus-500" : "bg-blue-500"} h-full w-full flex items-center justify-center`}
                            >
                              <span className="text-white font-medium">{selectedContact.name.charAt(0)}</span>
                            </div>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{selectedContact.name}</h3>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            {selectedContact.online ? (
                              <>
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                                <span>Online</span>
                              </>
                            ) : (
                              <span>Offline</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Info className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Full Chat Component */}
                    {chatOpen && (
                      <div className="flex-1">
                        <ChatBox
                          title={selectedContact.name}
                          receiver={{
                            name: selectedContact.name,
                            avatar: selectedContact.avatar,
                          }}
                          minimizable={false}
                          fullScreen={true}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                      <MessageSquare className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Select a conversation</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                      Choose a conversation from the sidebar to start chatting with drivers or support
                    </p>
                  </div>
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

export default Chat
