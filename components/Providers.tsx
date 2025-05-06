"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLandingPage, setIsLandingPage] = useState(false)

  useEffect(() => {
    setIsLandingPage(pathname === "/landing")
  }, [pathname])

  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider defaultTheme="light" storageKey="flux-theme">
            {!isLandingPage && <Navbar />}
            <main className={!isLandingPage ? "pt-20" : ""}>{children}</main>
            {!isLandingPage && <Footer />}
            <Toaster />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
