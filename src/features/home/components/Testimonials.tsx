import type React from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Regular Commuter",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "IdharUdhar has transformed my daily commute. The drivers are always on time, and the cars are immaculate. I feel safe and comfortable every ride.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    role: "Business Executive",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "As someone who travels for work regularly, I rely on IdharUdhar for reliable intercity rides. Their corporate service is unmatched – professional drivers and excellent customer support.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "College Student",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The bike rides are perfect for my quick trips to college. Affordable and quick, especially during rush hour. The app is super easy to use and the rewards system is great!",
    rating: 4,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Entrepreneur",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I appreciate the focus on green transportation. As someone who cares about environmental impact, I choose IdharUdhar over other services. The electric vehicle options are wonderful.",
    rating: 5,
  },
]

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">What Our Riders Say</h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here's what our riders have to say about their IdharUdhar experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-xl shadow-sm relative overflow-hidden border border-border"
            >
              <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-bl-full"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{testimonial.name}</h3>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-foreground italic relative">
                <span className="absolute -top-4 -left-2 text-5xl text-primary/20">"</span>
                <p className="relative z-10 pl-4">{testimonial.content}</p>
                <span className="absolute -bottom-10 -right-2 text-5xl text-primary/20">"</span>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
