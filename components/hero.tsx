"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, Eye, MessageCircle, ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features")
    featuresSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Floating fashion elements */}
      <div className="absolute top-20 left-10 w-20 h-20 opacity-20 animate-float">
        <Image src="/luxury-handbag-silhouette.jpg" alt="" width={80} height={80} />
      </div>
      <div className="absolute top-40 right-20 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: "1s" }}>
        <Image src="/elegant-dress-silhouette.jpg" alt="" width={64} height={64} />
      </div>
      <div className="absolute bottom-40 left-20 w-24 h-24 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
        <Image src="/high-heel-shoe-silhouette.jpg" alt="" width={96} height={96} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto pt-20">
        <Badge className="mb-8 bg-accent/20 text-accent-foreground border-accent/30 hover:bg-accent/30 px-6 py-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 mr-2" />
          AI-Powered Luxury Fashion Experience
        </Badge>

        <h1 className="text-7xl md:text-8xl font-bold text-primary mb-8 font-serif text-balance tracking-tight">
          Glam<span className="text-accent">Bot</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed text-pretty font-light">
          Discover your perfect style with AI-powered recommendations, AR try-on technology, and personalized luxury
          fashion curation. Experience fashion like never before with your personal styling assistant.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="/shop">
            <Button
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground min-w-[180px] btn-luxury shadow-lg"
            >
              <Eye className="h-5 w-5 mr-3" />
              Explore Collection
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-6 text-lg font-semibold bg-transparent border-2 border-primary hover:bg-primary hover:text-primary-foreground min-w-[180px] btn-luxury"
            onClick={() => {
              const chatbot = document.querySelector("[data-chatbot-trigger]") as HTMLElement
              chatbot?.click()
            }}
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            Try AI Stylist
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-bold text-card-foreground mb-3 text-lg font-serif">AI Personal Styling</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get personalized outfit recommendations powered by advanced AI that learns your unique style preferences
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
              <Eye className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-bold text-card-foreground mb-3 text-lg font-serif">AR Virtual Try-On</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visualize how luxury pieces look on you with cutting-edge augmented reality technology
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
              <MessageCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-bold text-card-foreground mb-3 text-lg font-serif">Fashion Concierge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chat with our AI fashion expert for styling tips, trend insights, and personalized advice
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollToFeatures}
          className="animate-bounce text-muted-foreground hover:text-accent"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
