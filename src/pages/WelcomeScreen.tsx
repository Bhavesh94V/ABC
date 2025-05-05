import { Link } from "react-router-dom"
import { Car, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const WelcomeScreen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center mb-6 text-green-nexus-600 hover:text-green-nexus-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="shadow-xl border-gray-200 dark:border-gray-800 animate-scale-in">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">Welcome to IdharUdhar</CardTitle>
              <CardDescription className="text-center">Choose how you want to use our platform</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                asChild
                className="w-full h-20 text-lg bg-green-nexus-600 hover:bg-green-nexus-700 transition-all"
              >
                <Link to="/customer-auth">
                  <User className="mr-2 h-6 w-6" />I am a Customer
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full h-20 text-lg border-2 border-green-nexus-600 text-green-nexus-700 hover:bg-green-nexus-50 dark:text-green-nexus-400 dark:hover:bg-green-nexus-900/20 transition-all"
              >
                <Link to="/driver-auth">
                  <Car className="mr-2 h-6 w-6" />I am a Driver
                </Link>
              </Button>
            </CardContent>

            <CardFooter className="flex justify-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Admin access?{" "}
                <Link
                  to="/admin-login"
                  className="font-medium text-green-nexus-600 hover:text-green-nexus-500 dark:text-green-nexus-400"
                >
                  Login as Admin
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default WelcomeScreen
