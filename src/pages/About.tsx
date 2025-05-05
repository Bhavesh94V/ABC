"use client"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Shield, Leaf, Award, Users, Car, Bike, ChevronDown } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-nexus-800 via-green-nexus-700 to-green-nexus-600 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat"></div>
          </div>
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Driving the Future of <span className="text-gradient">Sustainable Mobility</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                IdharUdhar is revolutionizing urban transportation with eco-friendly rides, cutting-edge technology, and
                a commitment to a greener planet.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" className="bg-white text-green-nexus-800 hover:bg-gray-100 px-8">
                  Join Our Team
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-background"></div>
        </section>

        {/* Our Mission */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <motion.img
                  src="/images/about-mission.jpg"
                  alt="IdharUdhar Mission"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Our Mission
                </motion.h2>
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    At IdharUdhar, our mission is to transform urban mobility by providing eco-friendly, affordable
                    transportation options that reduce carbon emissions while enhancing the quality of urban life.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    We believe that sustainable transportation shouldn't come at a premium cost. By leveraging
                    cutting-edge technology, we're making green rides accessible to everyone, everywhere.
                  </p>
                  <div className="pt-4">
                    <Link to="/services">
                      <Button className="group bg-green-nexus-600 hover:bg-green-nexus-700 text-white">
                        Explore Our Services
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/60">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="text-gray-700 dark:text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Founded in 2023, IdharUdhar emerged from a simple yet powerful vision: to reinvent urban transportation
                with sustainability at its core.
              </motion.p>
            </div>

            <div className="relative">
              {/* Timeline */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-nexus-200 dark:bg-green-nexus-900"></div>

              {/* Timeline Items */}
              <div className="space-y-24">
                {/* 2023 */}
                <motion.div
                  className="relative flex flex-col md:flex-row items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2023: The Beginning</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      IdharUdhar was founded in New Delhi by a team of environmental enthusiasts and tech innovators
                      determined to reduce the carbon footprint of urban transportation.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-16 order-1 md:order-2">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-nexus-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                    <img
                      src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&auto=format&fit=crop&q=60"
                      alt="IdharUdhar Founding"
                      className="rounded-xl shadow-lg mx-auto md:mx-0 w-full max-w-md h-auto"
                    />
                  </div>
                </motion.div>

                {/* 2024 */}
                <motion.div
                  className="relative flex flex-col md:flex-row items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 order-2">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-nexus-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                    <img
                      src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&auto=format&fit=crop&q=60"
                      alt="IdharUdhar Expansion"
                      className="rounded-xl shadow-lg mx-auto md:mx-0 w-full max-w-md h-auto"
                    />
                  </div>
                  <div className="md:w-1/2 md:pl-16 md:text-left order-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2024: Rapid Expansion</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Within a year, IdharUdhar expanded to 50+ cities across India and partnered with major electric
                      vehicle manufacturers to build a fleet of zero-emission vehicles.
                    </p>
                  </div>
                </motion.div>

                {/* 2025 */}
                <motion.div
                  className="relative flex flex-col md:flex-row items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2025: Today & Beyond</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Today, IdharUdhar serves over 500 cities globally with a mission to make sustainable
                      transportation the norm rather than the exception, while continuously innovating to reduce our
                      environmental impact.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-16 order-1 md:order-2">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-nexus-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                    <img
                      src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&auto=format&fit=crop&q=60"
                      alt="IdharUdhar Global"
                      className="rounded-xl shadow-lg mx-auto md:mx-0 w-full max-w-md h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Core Values
              </motion.h2>
              <motion.p
                className="text-gray-700 dark:text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The principles that guide every decision we make and every service we provide.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Sustainability */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="h-14 w-14 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-6">
                  <Leaf className="h-7 w-7 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Sustainability</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We're committed to reducing carbon emissions through electric vehicles and eco-friendly practices.
                </p>
              </motion.div>

              {/* Safety */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="h-14 w-14 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Safety</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The safety of our passengers, drivers, and communities is our top priority in everything we do.
                </p>
              </motion.div>

              {/* Innovation */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="h-14 w-14 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Innovation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We constantly push the boundaries of what's possible to create better experiences and solutions.
                </p>
              </motion.div>

              {/* Community */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="h-14 w-14 rounded-full bg-green-nexus-100 dark:bg-green-nexus-900/30 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-green-nexus-600 dark:text-green-nexus-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Community</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in building stronger communities through accessible, affordable transportation for all.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-20 px-4 bg-green-nexus-900 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Impact
              </motion.h2>
              <motion.p
                className="text-gray-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Since our founding, we've made meaningful contributions to creating a greener, more connected world.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Carbon Reduction */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="text-5xl font-bold mb-3 text-green-nexus-400">52K+</div>
                <h3 className="text-xl font-medium mb-2">Tons of CO₂ Saved</h3>
                <p className="text-gray-300">
                  Through our fleet of electric and low-emission vehicles, we've prevented thousands of tons of carbon
                  from entering the atmosphere.
                </p>
              </motion.div>

              {/* Rides */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="text-5xl font-bold mb-3 text-green-nexus-400">10M+</div>
                <h3 className="text-xl font-medium mb-2">Green Rides Completed</h3>
                <p className="text-gray-300">
                  Millions of riders have chosen our eco-friendly transportation options, contributing to a greener
                  future with every trip.
                </p>
              </motion.div>

              {/* Driver Livelihoods */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="text-5xl font-bold mb-3 text-green-nexus-400">75K+</div>
                <h3 className="text-xl font-medium mb-2">Driver Partners</h3>
                <p className="text-gray-300">
                  We've created economic opportunities for thousands of drivers while helping them transition to
                  sustainable vehicles.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Leadership
              </motion.h2>
              <motion.p
                className="text-gray-700 dark:text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Meet the team driving our mission to revolutionize urban mobility.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Amit Kumar, CEO"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Amit Kumar</h3>
                  <p className="text-green-nexus-600 dark:text-green-nexus-400 font-medium mb-3">Co-Founder & CEO</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Former head of sustainability at Tesla, Amit brings 15 years of experience in electric mobility and
                    climate tech.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Priya Sharma, COO"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Priya Sharma</h3>
                  <p className="text-green-nexus-600 dark:text-green-nexus-400 font-medium mb-3">Co-Founder & COO</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    With experience scaling operations at Uber and Ola, Priya oversees our rapid expansion across
                    cities.
                  </p>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-scale"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/68.jpg"
                  alt="Raj Patel, CTO"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Raj Patel</h3>
                  <p className="text-green-nexus-600 dark:text-green-nexus-400 font-medium mb-3">CTO</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    A serial tech entrepreneur who previously built and sold two mobility startups, Raj leads our
                    technology innovation.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" className="group">
                View Full Team <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:rotate-180" />
              </Button>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-nexus-700 to-green-nexus-600 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Join the Green Revolution
              </motion.h2>
              <motion.p
                className="text-xl text-gray-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Whether you're a rider, driver, or potential team member, be part of our journey to transform urban
                mobility and create a more sustainable future.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" className="bg-white text-green-nexus-700 hover:bg-gray-100">
                  <Car className="mr-2 h-5 w-5" /> Book a Ride
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Bike className="mr-2 h-5 w-5" /> Become a Driver
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Users className="mr-2 h-5 w-5" /> Join Our Team
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Global Presence
              </motion.h2>
              <motion.p
                className="text-gray-700 dark:text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                From bustling metropolises to emerging cities, we're bringing sustainable mobility solutions worldwide.
              </motion.p>
            </div>

            <motion.div
              className="relative h-96 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                <p className="absolute text-gray-600 dark:text-gray-400 mt-16">
                  Interactive map would be displayed here
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "New Delhi",
                    "Mumbai",
                    "Bangalore",
                    "Hyderabad",
                    "Chennai",
                    "Kolkata",
                    "Pune",
                    "Ahmedabad",
                    "+492 more",
                  ].map((city, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                    >
                      {city}
                    </div>
                  ))}
                  <Link to="/cities" className="px-3 py-1.5 bg-green-nexus-500 rounded-full text-white text-sm">
                    View All Cities
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
