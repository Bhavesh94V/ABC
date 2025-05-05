import { Shield, Phone, Bell, MapPin, Car, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const Safety = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-nexus-800 to-green-nexus-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Your Safety is Our Priority</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90 animate-fade-in">
              GreenGlide is committed to ensuring safe and secure rides for all our users. Discover the safety features
              we've built into every journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                Safety Features
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Emergency Help
              </Button>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Safety Features in Every Ride
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Verified Drivers</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All our drivers undergo rigorous background checks, document verification, and regular performance
                    reviews to ensure your safety.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">SOS Button</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Immediate emergency assistance is just a tap away with our in-app SOS button that connects to local
                    authorities and our safety team.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Real-time Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Share your ride details and real-time location with trusted contacts so they can follow your
                    journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-4">
                    <Car className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Vehicle Inspection</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All vehicles on our platform undergo regular safety inspections to ensure they meet our quality and
                    safety standards.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Anonymous Contact</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your personal contact details remain protected with our anonymous communication system between
                    riders and drivers.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow animate-fade-in">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-green-nexus-600 dark:text-green-nexus-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Ride Check</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our system automatically detects unusual stops or route deviations and checks in to ensure
                    everything is okay.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Safety Guidelines */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Safety Guidelines</h2>

            <Tabs defaultValue="rider" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="rider">For Riders</TabsTrigger>
                <TabsTrigger value="driver">For Drivers</TabsTrigger>
              </TabsList>

              <TabsContent value="rider" className="animate-fade-in">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
                  <ol className="space-y-6">
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Verify Your Ride</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Always confirm the driver's name, car model, and license plate before getting in. Ensure they
                          know your name as the rider.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Share Your Trip Details
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Use the "Share My Trip" feature to let family or friends follow your journey in real-time.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Ride in the Back Seat
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          When traveling alone, sit in the back seat to give yourself and your driver personal space.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">4</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Trust Your Instincts
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          If you feel uncomfortable for any reason, ask the driver to end the ride early. Your safety
                          comes first.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">5</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Rate Your Experience
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Always rate your driver after the ride. Your feedback helps improve the experience for
                          everyone.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </TabsContent>

              <TabsContent value="driver" className="animate-fade-in">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
                  <ol className="space-y-6">
                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Verify Your Rider</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Always confirm the rider's name before starting the journey. Never accept rides outside the
                          app.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Maintain Your Vehicle
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Ensure your vehicle is regularly serviced and meets all safety standards required by
                          GreenGlide.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Follow Traffic Rules
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Always follow traffic regulations, speed limits, and avoid distractions while driving.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">4</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                          Emergency Protocols
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Familiarize yourself with emergency procedures and how to use the in-app emergency features.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                        <span className="font-bold text-green-nexus-600 dark:text-green-nexus-400">5</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Report Issues</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Report any safety concerns, unusual incidents, or inappropriate rider behavior immediately via
                          the app.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6 md:mb-0 md:mr-6">
                  <Phone className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Emergency Contact</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    In case of an emergency, please call our 24/7 safety helpline:
                  </p>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    1-800-SAFE-RIDE (1-800-723-3743)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Partners */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Our Safety Partners</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md h-32 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1625320637268-30bef1e9cf00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2FmZXR5JTIwYXNzb2NpYXRpb24lMjBsb2dvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                  alt="Safety Partner 1"
                  className="max-h-20 max-w-full"
                />
              </div>

              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md h-32 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1608403890696-1a3f68da3b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNhZmV0eSUyMGFzc29jaWF0aW9uJTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=200&q=80"
                  alt="Safety Partner 2"
                  className="max-h-20 max-w-full"
                />
              </div>

              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md h-32 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1589188056053-28910dc61d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNhZmV0eSUyMGFzc29jaWF0aW9uJTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=200&q=80"
                  alt="Safety Partner 3"
                  className="max-h-20 max-w-full"
                />
              </div>

              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md h-32 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1580762313975-755ca9578b18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHNhZmV0eSUyMGFzc29jaWF0aW9uJTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=200&q=80"
                  alt="Safety Partner 4"
                  className="max-h-20 max-w-full"
                />
              </div>
            </div>

            <Button className="mt-10 bg-green-nexus-600 hover:bg-green-nexus-700">Learn About Our Partnerships</Button>
          </div>
        </section>

        {/* Safety Blog */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Safety Blog</h2>
              <Button variant="outline">View All Articles</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover-scale">
                <img
                  src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Safety Blog 1"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    5 Essential Safety Tips for Every Rider
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Learn the fundamental safety practices that every rider should follow for a secure journey.
                  </p>
                  <Button variant="link" className="p-0 text-green-nexus-600 dark:text-green-nexus-400">
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover-scale">
                <img
                  src="https://images.unsplash.com/photo-1494819374645-a807e57d8757?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Safety Blog 2"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Understanding Our Driver Verification Process
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dive deep into how GreenGlide ensures that only qualified drivers join our platform.
                  </p>
                  <Button variant="link" className="p-0 text-green-nexus-600 dark:text-green-nexus-400">
                    Read More
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover-scale">
                <img
                  src="https://images.unsplash.com/photo-1542410613-d073472c3135?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Safety Blog 3"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    New Safety Features Coming in 2025
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Explore the upcoming safety enhancements that will make your rides even more secure.
                  </p>
                  <Button variant="link" className="p-0 text-green-nexus-600 dark:text-green-nexus-400">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Safety
