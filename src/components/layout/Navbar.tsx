"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/contexts/ThemeContext"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { Menu, X, Sun, Moon, Globe, User, Settings, LogOut, Bell, MapPin, Car, Bike, Clock } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  console.log(location);

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">GreenGlide</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/services" className="text-sm font-medium hover:text-primary">
            Services
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("fr")}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("de")}>Deutsch</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("zh")}>中文</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ja")}>日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu (Desktop) */}
          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex w-full cursor-pointer items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("profile")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-rides" className="flex w-full cursor-pointer items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{t("my_rides")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/notifications" className="flex w-full cursor-pointer items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>{t("notifications")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex w-full cursor-pointer items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t("settings")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden space-x-2 md:flex">
              <Button variant="outline" asChild>
                <Link to="/login">{t("login")}</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">{t("signup")}</Link>
              </Button>
            </div>
          )}
          <Button variant="outline" asChild className="hidden md:flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="hidden md:flex">
            <Link to="/signup">Sign Up</Link>
          </Button>
          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <Car className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">GreenGlide</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {user && (
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col gap-2">
                  <Link
                    to="/"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("home")}
                  </Link>
                  <div className="px-3 py-2 text-sm font-medium">{t("services")}</div>
                  <Link
                    to="/services/car-rides"
                    className={`ml-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/services/car-rides") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Car className="h-4 w-4" />
                    {t("car_rides")}
                  </Link>
                  <Link
                    to="/services/bike-rides"
                    className={`ml-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/services/bike-rides") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bike className="h-4 w-4" />
                    {t("bike_rides")}
                  </Link>
                  <Link
                    to="/services/auto-rides"
                    className={`ml-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/services/auto-rides") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Car className="h-4 w-4" />
                    {t("auto_rides")}
                  </Link>
                  <Link
                    to="/services/rentals"
                    className={`ml-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/services/rentals") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Clock className="h-4 w-4" />
                    {t("rentals")}
                  </Link>
                  <Link
                    to="/services/intercity"
                    className={`ml-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/services/intercity") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MapPin className="h-4 w-4" />
                    {t("intercity")}
                  </Link>
                  <Link
                    to="/safety"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/safety") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("safety")}
                  </Link>
                  <Link
                    to="/about"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                      isActive("/about") ? "bg-accent" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("about_us")}
                  </Link>
                </nav>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between rounded-lg px-3 py-2">
                    <span className="text-sm">{t("theme")}</span>
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg px-3 py-2">
                    <span className="text-sm">{t("language")}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Globe className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("fr")}>Français</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("de")}>Deutsch</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("zh")}>中文</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("ja")}>日本語</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {user ? (
                  <div className="mt-auto flex flex-col gap-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      {t("profile")}
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      {t("settings")}
                    </Link>
                    <Button
                      variant="destructive"
                      className="mt-2"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("logout")}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">{t("login")}</Link>
                    </Button>
                    <Button asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/signup">{t("signup")}</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
