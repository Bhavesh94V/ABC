"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "home.hero.title": "Your Ride, Your Way",
    "home.hero.subtitle": "Book a ride in seconds, travel with comfort",
    "home.features.title": "Why Choose IdharUdhar",
    "booking.title": "Book Your Ride",
    "booking.from": "From",
    "booking.to": "To",
    "booking.when": "When",
    "booking.service": "Service Type",
    "booking.payment": "Payment Method",
    "booking.submit": "Book Now",
    // Add more translations as needed
  },
  hi: {
    "home.hero.title": "आपकी सवारी, आपके हिसाब से",
    "home.hero.subtitle": "सेकंडों में सवारी बुक करें, आराम से यात्रा करें",
    "home.features.title": "इधर-उधर क्यों चुनें",
    "booking.title": "अपनी सवारी बुक करें",
    "booking.from": "कहाँ से",
    "booking.to": "कहाँ तक",
    "booking.when": "कब",
    "booking.service": "सेवा प्रकार",
    "booking.payment": "भुगतान विधि",
    "booking.submit": "अभी बुक करें",
    // Add more translations as needed
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem("language") as Language
    return storedLanguage || "en"
  })

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
