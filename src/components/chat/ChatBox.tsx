"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Send, MessageCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "support"
  timestamp: Date
}

interface ChatBoxProps {
  title?: string
  minimizable?: boolean
  onClose?: () => void
}

const ChatBox: React.FC<ChatBoxProps> = ({ title = "Support Chat", minimizable = true, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ])
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose && onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: `support-${Date.now()}`,
        text: "Thank you for your message. Our team will get back to you shortly.",
        sender: "support",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 1000)
  }

  // Scroll to bottom on new message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg flex items-center justify-center p-0"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-80 shadow-lg transition-all duration-300 ease-in-out ${
        isMinimized ? "h-16" : "h-[500px]"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b p-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex space-x-2">
          {minimizable && (
            <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8 p-0">
              {isMinimized ? <span className="h-4 w-4">+</span> : <span className="h-4 w-4">-</span>}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex max-w-[80%] items-start space-x-2">
                    {msg.sender === "support" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {msg.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>
          </CardContent>

          <CardFooter className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default ChatBox
