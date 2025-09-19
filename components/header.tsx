"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { User, Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-accent animate-float" />
              <div className="absolute inset-0 h-8 w-8 text-accent/30 animate-ping" />
            </div>
            <h1 className="text-2xl font-bold text-primary font-serif tracking-tight">GlamBot</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-accent transition-colors font-medium">
              Shop
            </Link>
            <Link href="/style" className="text-foreground hover:text-accent transition-colors font-medium">
              AI Stylist
            </Link>
            <Link href="/compare" className="text-foreground hover:text-accent transition-colors font-medium">
              Compare
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button variant="outline" size="sm" className="btn-luxury bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground btn-luxury"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/20">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium py-2">
                Home
              </Link>
              <Link href="/shop" className="text-foreground hover:text-accent transition-colors font-medium py-2">
                Shop
              </Link>
              <Link href="/style" className="text-foreground hover:text-accent transition-colors font-medium py-2">
                AI Stylist
              </Link>
              <Link href="/compare" className="text-foreground hover:text-accent transition-colors font-medium py-2">
                Compare
              </Link>
              <div className="pt-3 border-t border-border/20">
                {isLoggedIn ? (
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={() => setIsLoggedIn(true)} />
    </header>
  )
}
