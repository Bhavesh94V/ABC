"use client"
import { useSearchParams } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import BookingForm from "@/components/booking/BookingForm"

const Book = () => {
  // Get service type from URL, if any
  const [searchParams] = useSearchParams()
  const serviceFromUrl = searchParams.get("service")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* <BookingForm /> */}
            <BookingForm initialServiceType={serviceFromUrl} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Book
