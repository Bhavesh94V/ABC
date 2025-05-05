import { HeroSection } from "@/features/home/components/HeroSection"
import { FeaturesSection } from "@/features/home/components/FeaturesSection"
import { RideOptions } from "@/features/home/components/RideOptions"
import { CitiesSection } from "@/features/home/components/CitiesSection"
import { Testimonials } from "@/features/home/components/Testimonials"
import { DownloadApp } from "@/features/home/components/DownloadApp"

export function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      <FeaturesSection />
      <RideOptions />
      <CitiesSection />
      <Testimonials />
      <DownloadApp />
    </div>
  )
}
