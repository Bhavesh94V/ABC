import { Link } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { HelpCircle, FileQuestion, MessageCircle, Phone, Mail, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const HelpCenter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How can we help you?</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers, support, and inspiration from our help center. We're here to ensure your GreenGlide
              experience is smooth and enjoyable.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input className="pl-10 py-6 text-base" placeholder="Search for help articles, FAQs, or topics..." />
                <Button className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-nexus-600 hover:bg-green-nexus-700">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Help Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link to="/help/faq">
              <Card className="hover:border-green-nexus-500 hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                    <FileQuestion className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">FAQs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Find answers to commonly asked questions</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/help/contact">
              <Card className="hover:border-green-nexus-500 hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Get in touch with our customer support team
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/help/guides">
              <Card className="hover:border-green-nexus-500 hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <HelpCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Guides</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guides to using GreenGlide</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Popular Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Topics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                How to book a ride
                <ChevronRight className="ml-auto h-5 w-5" />
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                Payment methods and issues
                <ChevronRight className="ml-auto h-5 w-5" />
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                Account settings and profile
                <ChevronRight className="ml-auto h-5 w-5" />
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                Cancellation and refund policy
                <ChevronRight className="ml-auto h-5 w-5" />
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                Driver and vehicle safety
                <ChevronRight className="ml-auto h-5 w-5" />
              </Button>

              <Button variant="outline" className="justify-start h-auto py-3 px-4">
                Service availability in my area
                <ChevronRight className="ml-auto h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Direct Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still need help?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our support team is always ready to assist you with any questions or concerns you may have.
            </p>

            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Call us at</p>
                  <p className="font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-nexus-100 dark:bg-green-nexus-900/30 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email us at</p>
                  <p className="font-medium text-gray-900 dark:text-white">support@greenglide.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HelpCenter
