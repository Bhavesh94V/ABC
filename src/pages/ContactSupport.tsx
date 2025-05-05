"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ChevronLeft, Send, Phone, Mail, MessageSquare, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const ContactSupport = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [issueType, setIssueType] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !issueType || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly",
      })

      // Reset form
      setName("")
      setEmail("")
      setIssueType("")
      setMessage("")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/help"
              className="inline-flex items-center text-green-nexus-600 hover:text-green-nexus-700 dark:text-green-nexus-400 dark:hover:text-green-nexus-300 mb-4"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Help Center
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact Support</h1>

            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Need help with something? Our support team is ready to assist you. Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Send us a message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                      <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Issue Type</label>
                    <Select value={issueType} onValueChange={setIssueType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Issue Categories</SelectLabel>
                          <SelectItem value="account">Account Issues</SelectItem>
                          <SelectItem value="booking">Booking Problems</SelectItem>
                          <SelectItem value="payment">Payment Concerns</SelectItem>
                          <SelectItem value="driver">Driver Feedback</SelectItem>
                          <SelectItem value="app">App Technical Issues</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <Textarea
                      placeholder="Please describe your issue in detail..."
                      className="min-h-[150px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center">
                    <input id="attachment" type="file" className="hidden" />
                    <label
                      htmlFor="attachment"
                      className="cursor-pointer text-sm text-green-nexus-600 hover:text-green-nexus-700 dark:text-green-nexus-400 dark:hover:text-green-nexus-300"
                    >
                      + Add attachment (optional)
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-nexus-600 hover:bg-green-nexus-700 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-8">
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-green-nexus-600 dark:text-green-nexus-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Phone Support</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Available 24/7 for urgent issues</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-green-nexus-600 dark:text-green-nexus-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Email Support</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">support@greenglide.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                      <MessageSquare className="h-5 w-5 text-green-nexus-600 dark:text-green-nexus-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Live Chat</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Chat with support in the app</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Fastest way to get help</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-green-nexus-600 dark:text-green-nexus-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Support Hours</h3>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        <p>Monday - Friday: 8am - 10pm</p>
                        <p>Saturday - Sunday: 9am - 8pm</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">All times are in local timezone</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-nexus-50 dark:bg-green-nexus-950/30 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Looking for quick answers?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Check our FAQ section for immediate solutions to common questions.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/help/faq">View FAQ</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactSupport
