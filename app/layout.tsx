import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import { GeistSans, GeistMono } from "geist/font"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "GlamBot - AI-Powered Luxury Fashion Assistant",
  description:
    "Discover your perfect style with GlamBot's AI-powered recommendations, AR try-on technology, and personalized luxury fashion experience.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${sourceSans.variable} antialiased`}
    >
      <body className="bg-luxury-gradient min-h-screen font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <BottomNavigation />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
