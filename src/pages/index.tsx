import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import RideOptions from "@/components/home/RideOptions"
import CitiesSection from "@/components/home/CitiesSection"
import Testimonials from "@/components/home/Testimonials"
import DownloadApp from "@/components/home/DownloadApp"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ServiceSelection from "./ServiceSelection"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServiceSelection></ServiceSelection>
        <FeaturesSection />
        <RideOptions />
        <CitiesSection />
        <Testimonials />
        <DownloadApp />
      </main>
      <Footer />
    </div>
  )
}

export default Index
