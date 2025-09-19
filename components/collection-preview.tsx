"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CollectionPreview() {
  const featuredItems = [
    {
      id: 1,
      name: "Elegant Black Blazer",
      price: "$299",
      originalPrice: "$399",
      rating: 4.9,
      reviews: 127,
      image: "/elegant-black-blazer-on-model-luxury-fashion.jpg",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Silk Evening Dress",
      price: "$459",
      originalPrice: "$599",
      rating: 4.8,
      reviews: 89,
      image: "/silk-evening-dress-luxury-fashion-model.jpg",
      badge: "New Arrival",
    },
    {
      id: 3,
      name: "Designer Leather Handbag",
      price: "$199",
      originalPrice: "$299",
      rating: 4.9,
      reviews: 203,
      image: "/luxury-leather-handbag-designer-fashion-accessory.jpg",
      badge: "Limited Edition",
    },
    {
      id: 4,
      name: "Cashmere Sweater",
      price: "$179",
      originalPrice: "$249",
      rating: 4.7,
      reviews: 156,
      image: "/luxury-cashmere-sweater-fashion-model.jpg",
      badge: "Trending",
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">Curated Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Discover our handpicked selection of luxury fashion pieces, each chosen for their exceptional quality and
              timeless appeal
            </p>
          </div>
          <Link href="/shop">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground btn-luxury hidden md:flex">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="glass-effect border-border/20 overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover image-hover"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{item.badge}</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-card-foreground mb-2 text-lg font-serif">{item.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({item.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary">{item.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link href="/shop">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground btn-luxury">
              View All Collection
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
