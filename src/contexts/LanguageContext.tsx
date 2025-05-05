"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "es" | "fr" | "de" | "zh" | "ja"

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Simple translations
const translations: Translations = {
  en: {
    home: "Home",
    services: "Services",
    about_us: "About Us",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    my_rides: "My Rides",
    notifications: "Notifications",
    theme: "Theme",
    language: "Language",
    car_rides: "Car Rides",
    bike_rides: "Bike Rides",
    auto_rides: "Auto Rides",
    rentals: "Rentals",
    intercity: "Intercity",
    safety: "Safety",
  },
  hi: {
    home: "होम",
    services: "सेवाएं",
    about_us: "हमारे बारे में",
    contact: "संपर्क करें",
    login: "लॉगिन",
    signup: "साइन अप",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    my_rides: "मेरी सवारी",
    notifications: "सूचनाएं",
    theme: "थीम",
    language: "भाषा",
    car_rides: "कार सवारी",
    bike_rides: "बाइक सवारी",
    auto_rides: "ऑटो सवारी",
    rentals: "किराये",
    intercity: "अंतर्शहरी",
    safety: "सुरक्षा",
  },
  // Add other languages as needed
  es: { home: "Inicio" },
  fr: { home: "Accueil" },
  de: { home: "Startseite" },
  zh: { home: "首页" },
  ja: { home: "ホーム" },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    return savedLanguage || "en"
  })

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key]
    }

    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key]
    }

    // Return the key if no translation found
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
