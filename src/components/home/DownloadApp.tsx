import { Link } from "react-router-dom"
import { Smartphone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const DownloadApp = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10">
              <div className="relative mx-auto max-w-full max-h-[600px] lg:mx-0 lg:ml-auto overflow-hidden rounded-3xl">
                <img
                  src="/placeholder.svg?height=600&width=300"
                  alt="IdharUdhar Mobile App"
                  className="object-contain w-full h-full rounded-3xl shadow-2xl border-8 border-gray-800"
                />

                {/* App UI Elements */}
                <div className="absolute inset-0 flex flex-col p-4">
                  <div className="text-center text-white text-xs mt-6 mb-2">IdharUdhar</div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Placeholder for the app UI */}
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-6 bg-card p-3 rounded-lg shadow-lg max-w-[180px]">
                <div className="text-sm font-medium text-foreground">Your ride is arriving!</div>
                <div className="text-xs text-muted-foreground">ETA: 3 minutes</div>
              </div>

              {/* Floating rating */}
              <div className="absolute -bottom-6 -left-6 bg-card p-3 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div className="ml-2 text-sm font-medium text-foreground">4.9</div>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -right-10 top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-70"></div>
          </div>

          <div className="space-y-8">
            <div className="inline-block p-1 bg-primary/10 rounded-full">
              <div className="bg-background px-6 py-2 rounded-full flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Mobile App</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Download the IdharUdhar App for a Seamless Experience
            </h2>

            <p className="text-muted-foreground text-lg">
              Get the full IdharUdhar experience right in your pocket. Our app provides real-time tracking, quick
              booking, multiple payment options, and exclusive rewards.
            </p>

            <div className="space-y-4">
              {[
                "Book rides in just a few taps",
                "Track your driver in real-time",
                "Schedule rides in advance",
                "Save favorite destinations",
                "Earn and redeem rewards",
                "Access 24/7 in-app support",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="#" className="hover:opacity-90 transition-opacity">
                <img
                  src="/placeholder.svg?height=40&width=120&text=Google+Play"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </Link>
              <Link to="#" className="hover:opacity-90 transition-opacity">
                <img
                  src="/placeholder.svg?height=40&width=120&text=App+Store"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </Link>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-foreground text-sm">
                <strong>Driver Partner?</strong> Download the dedicated driver app to start earning with IdharUdhar
                today!
              </p>
              <Button variant="link" className="px-0 text-primary">
                Learn more about becoming a partner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadApp
