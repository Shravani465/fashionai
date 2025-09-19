"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Eye, MessageCircle, Palette, Zap, Heart } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Personal Stylist",
      description:
        "Advanced AI analyzes your preferences, body type, and lifestyle to curate personalized outfit recommendations that reflect your unique style.",
      image: "/ai-fashion-stylist-interface-with-outfit-recommend.jpg",
    },
    {
      icon: Eye,
      title: "AR Virtual Try-On",
      description:
        "Experience the future of shopping with augmented reality. See how clothes fit and look on you before making a purchase decision.",
      image: "/woman-using-ar-try-on-technology-with-virtual-clot.jpg",
    },
    {
      icon: MessageCircle,
      title: "Fashion Concierge",
      description:
        "Chat with our AI fashion expert 24/7 for styling advice, trend insights, and personalized recommendations tailored to your needs.",
      image: "/elegant-chat-interface-with-fashion-advice.jpg",
    },
    {
      icon: Palette,
      title: "Color Analysis",
      description:
        "Discover your perfect color palette based on your skin tone, hair color, and personal preferences for a harmonious wardrobe.",
      image: "/color-palette-analysis-for-fashion-styling.jpg",
    },
    {
      icon: Zap,
      title: "Instant Outfit Creation",
      description:
        "Generate complete outfit combinations in seconds based on occasion, weather, and your personal style preferences.",
      image: "/instant-outfit-generation-interface-showing-multip.jpg",
    },
    {
      icon: Heart,
      title: "Style Evolution",
      description:
        "Track your style journey and discover new looks as our AI learns and evolves with your changing preferences over time.",
      image: "/style-evolution-timeline-showing-fashion-growth.jpg",
    },
  ]

  return (
    <section id="features" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-serif">
            Revolutionizing Fashion with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of personal styling with cutting-edge AI technology that understands your unique
            fashion DNA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="glass-effect border-border/20 overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-accent/90 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-card-foreground mb-3 text-lg font-serif">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
