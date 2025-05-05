import type React from "react"
import { Link } from "react-router-dom"

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">Idhar</span>
              <span>Udhar</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your reliable ride-sharing partner for all your transportation needs.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/car" className="text-muted-foreground hover:text-primary">
                  Car Rides
                </Link>
              </li>
              <li>
                <Link to="/services/bike" className="text-muted-foreground hover:text-primary">
                  Bike Rides
                </Link>
              </li>
              <li>
                <Link to="/services/auto" className="text-muted-foreground hover:text-primary">
                  Auto Rides
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IdharUdhar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
