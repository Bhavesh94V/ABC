"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ChevronLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqCategories = [
  { id: "general", name: "General" },
  { id: "account", name: "Account & Profile" },
  { id: "booking", name: "Booking & Rides" },
  { id: "payment", name: "Payment & Billing" },
  { id: "safety", name: "Safety & Security" },
  { id: "services", name: "Services & Features" },
]

const faqData = {
  general: [
    {
      question: "What is GreenGlide?",
      answer:
        "GreenGlide is an eco-friendly transportation platform that connects riders with sustainable mobility options. Our mission is to provide convenient, affordable, and environmentally responsible transportation choices for urban commuters.",
    },
    {
      question: "Where is GreenGlide available?",
      answer:
        "GreenGlide is currently available in major metropolitan areas across India, with plans to expand to more cities soon. Check our city coverage page for detailed information on service availability in your area.",
    },
    {
      question: "How is GreenGlide different from other ride-sharing apps?",
      answer:
        "GreenGlide focuses exclusively on eco-friendly transportation options, including electric vehicles, bicycles, and public transit integration. We also invest a portion of every fare into environmental initiatives and carbon offset programs.",
    },
  ],
  account: [
    {
      question: "How do I create a GreenGlide account?",
      answer:
        "To create an account, download the GreenGlide app or visit our website, click on 'Sign Up', and follow the registration process. You'll need to provide your name, email, phone number, and create a password.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login screen. We'll send a password reset link to your registered email address. Follow the instructions in the email to set a new password.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "You can update your profile information by navigating to the Profile section in the app or website. There, you can edit your name, phone number, email, and profile picture. Remember to save changes before exiting.",
    },
  ],
  booking: [
    {
      question: "How do I book a ride?",
      answer:
        "To book a ride, open the app and enter your pickup location and destination. Choose your preferred service type (car, bike, auto, etc.), review the estimated fare and arrival time, then tap 'Book Ride' to confirm your booking.",
    },
    {
      question: "Can I schedule a ride in advance?",
      answer:
        "Yes, you can schedule rides up to 7 days in advance. When booking, select the 'Schedule' option, then choose your desired date and time. You'll receive reminders as your scheduled ride approaches.",
    },
    {
      question: "How do I cancel a ride?",
      answer:
        "You can cancel a ride by opening the active ride screen and tapping the 'Cancel Ride' button. Please note that cancellation fees may apply depending on how much time has passed since booking.",
    },
  ],
  payment: [
    {
      question: "What payment methods are accepted?",
      answer:
        "GreenGlide accepts various payment methods including credit/debit cards, UPI, digital wallets like Paytm and Google Pay, and GreenGlide credits. You can manage your payment methods in the Payment section of your profile.",
    },
    {
      question: "How do I add a new payment method?",
      answer:
        "To add a new payment method, go to the Profile section, select 'Payment Methods', and tap on 'Add Payment Method'. Follow the instructions to securely add your preferred payment option.",
    },
    {
      question: "What should I do if I'm charged incorrectly?",
      answer:
        "If you believe you've been charged incorrectly, please go to the Rides section in your profile, locate the ride in question, and select 'Report an Issue'. Our support team will investigate and resolve the matter promptly.",
    },
  ],
  safety: [
    {
      question: "What safety features does GreenGlide offer?",
      answer:
        "GreenGlide offers several safety features including ride tracking, emergency contact sharing, driver verification, trip sharing with friends or family, and a 24/7 emergency support line for immediate assistance during your ride.",
    },
    {
      question: "How are drivers verified?",
      answer:
        "All GreenGlide driver partners undergo comprehensive background checks, vehicle inspections, and must maintain high ratings to continue on our platform. We verify their identity, driving history, and conduct regular safety reviews.",
    },
    {
      question: "How can I report a safety concern?",
      answer:
        "You can report safety concerns through the app by going to the specific ride in your history and selecting 'Report a Safety Issue'. For urgent matters, use the emergency button in the app during an active ride or contact our safety hotline.",
    },
  ],
  services: [
    {
      question: "What types of vehicles are available?",
      answer:
        "GreenGlide offers a range of eco-friendly vehicle options including electric cars, hybrid vehicles, electric bikes, eco-friendly auto-rickshaws, and in some cities, we partner with public transportation systems for integrated mobility solutions.",
    },
    {
      question: "Do you offer package delivery services?",
      answer:
        "Yes, GreenGlide offers package delivery services in select cities. You can use the app to send packages across town with our secure, tracked delivery service using the same eco-friendly vehicles as our passenger service.",
    },
    {
      question: "Can I request specific vehicle features?",
      answer:
        "Yes, you can specify preferences such as vehicle size, accessibility features, child seats, or extra luggage space when booking a ride. These options are available on the booking screen after entering your destination.",
    },
  ],
}

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Array<{ category: string; question: string; answer: string }>>([])

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results: Array<{ category: string; question: string; answer: string }> = []

    Object.entries(faqData).forEach(([category, questions]) => {
      questions.forEach(({ question, answer }) => {
        if (question.toLowerCase().includes(query) || answer.toLowerCase().includes(query)) {
          results.push({
            category,
            question,
            answer,
          })
        }
      })
    })

    setSearchResults(results)
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

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>

            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Find answers to common questions about GreenGlide services, account management, booking process, and more.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-nexus-600 hover:bg-green-nexus-700"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Search Results ({searchResults.length})
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {searchResults.map((result, index) => (
                  <AccordionItem key={index} value={`search-result-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div>
                        <div className="font-medium">{result.question}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Category: {faqCategories.find((c) => c.id === result.category)?.name}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">{result.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery("")
                  setSearchResults([])
                }}
              >
                Clear search results
              </Button>
            </div>
          ) : (
            <>
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={activeCategory === category.id ? "bg-green-nexus-600 hover:bg-green-nexus-700" : ""}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  {faqData[activeCategory as keyof typeof faqData].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 dark:text-gray-300">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </>
          )}

          {/* Contact Support */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our support team is here to help with any questions you may have.
            </p>
            <Button asChild className="bg-green-nexus-600 hover:bg-green-nexus-700">
              <Link to="/help/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FAQ
