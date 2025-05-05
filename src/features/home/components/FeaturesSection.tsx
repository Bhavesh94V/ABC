import type React from "react"
import { Shield, Clock, MapPin, CreditCard, UserPlus, Headphones } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Prioritized Safety",
    description: "Real-time ride tracking, verified drivers, and 24/7 emergency support for worry-free travel.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "On-Time Guarantee",
    description: "We value your time. Schedule rides in advance with our punctuality promise.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: "Available in 500+ Cities",
    description: "Expanding nationwide to provide reliable rides no matter where you are.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Seamless Payments",
    description: "Multiple payment options including cards, UPI, and wallet for hassle-free transactions.",
  },
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "Partner with Us",
    description: "Become a driver partner and earn on your own schedule with competitive incentives.",
  },
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is always ready to assist you with any concerns.",
  },
]

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Why Choose <span className="text-primary">Idhar-Udhar</span>
          </h2>
          <p className="text-muted-foreground">
            We're committed to providing the safest, most reliable, and environmentally conscious ride-sharing
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
