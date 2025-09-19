"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, ShoppingCart, ExternalLink, TrendingUp, Heart } from "lucide-react"
import { FashionChatbot } from "@/components/fashion-chatbot"
import Image from "next/image"

interface Product {
  id: string
  name: string
  image: string
  price: {
    flipkart: number
    myntra: number
    amazon: number
  }
  rating: {
    flipkart: number
    myntra: number
    amazon: number
  }
  reviews: {
    flipkart: number
    myntra: number
    amazon: number
  }
  availability: {
    flipkart: boolean
    myntra: boolean
    amazon: boolean
  }
  discount: {
    flipkart: number
    myntra: number
    amazon: number
  }
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Elegant Black Blazer",
    image: "/elegant-black-blazer-fashion.jpg",
    price: { flipkart: 2499, myntra: 2799, amazon: 2399 },
    rating: { flipkart: 4.2, myntra: 4.5, amazon: 4.1 },
    reviews: { flipkart: 1250, myntra: 890, amazon: 2100 },
    availability: { flipkart: true, myntra: true, amazon: true },
    discount: { flipkart: 30, myntra: 25, amazon: 35 },
  },
  {
    id: "2",
    name: "Silk Evening Dress",
    image: "/elegant-silk-evening-dress.jpg",
    price: { flipkart: 4999, myntra: 5499, amazon: 4799 },
    rating: { flipkart: 4.3, myntra: 4.6, amazon: 4.2 },
    reviews: { flipkart: 680, myntra: 920, amazon: 1450 },
    availability: { flipkart: true, myntra: false, amazon: true },
    discount: { flipkart: 20, myntra: 15, amazon: 25 },
  },
  {
    id: "3",
    name: "Luxury Leather Handbag",
    image: "/luxury-leather-handbag.jpg",
    price: { flipkart: 3999, myntra: 4299, amazon: 3799 },
    rating: { flipkart: 4.4, myntra: 4.7, amazon: 4.3 },
    reviews: { flipkart: 950, myntra: 1200, amazon: 1800 },
    availability: { flipkart: true, myntra: true, amazon: true },
    discount: { flipkart: 40, myntra: 35, amazon: 45 },
  },
]

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredProducts(sampleProducts)
      return
    }

    const filtered = sampleProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredProducts(filtered)
  }

  const getBestPrice = (product: Product) => {
    const prices = [
      { platform: "flipkart", price: product.price.flipkart, available: product.availability.flipkart },
      { platform: "myntra", price: product.price.myntra, available: product.availability.myntra },
      { platform: "amazon", price: product.price.amazon, available: product.availability.amazon },
    ]

    const availablePrices = prices.filter((p) => p.available)
    return availablePrices.reduce((min, current) => (current.price < min.price ? current : min))
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "flipkart":
        return "bg-blue-500"
      case "myntra":
        return "bg-pink-500"
      case "amazon":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">Price Comparison</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare fashion products across Flipkart, Myntra, and Amazon to find the best deals
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fashion products..."
                className="pl-12 h-14 text-lg bg-card/50 border-border/20 rounded-full"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-8 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full btn-luxury"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8">
          {filteredProducts.map((product) => {
            const bestPrice = getBestPrice(product)

            return (
              <Card key={product.id} className="glass-effect border-border/20 overflow-hidden">
                <div className="grid md:grid-cols-4 gap-6 p-6">
                  {/* Product Image & Info */}
                  <div className="md:col-span-1">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPlatformColor(bestPrice.platform)} text-white`}>
                        Best Price: {bestPrice.platform}
                      </Badge>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  {/* Platform Comparisons */}
                  <div className="md:col-span-3 grid md:grid-cols-3 gap-4">
                    {/* Flipkart */}
                    <Card className="bg-blue-50/50 border-blue-200/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-lg">
                          <span className="text-blue-600">Flipkart</span>
                          {!product.availability.flipkart && (
                            <Badge variant="secondary" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">₹{product.price.flipkart}</span>
                          <Badge className="bg-green-100 text-green-700">{product.discount.flipkart}% OFF</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{product.rating.flipkart}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews.flipkart} reviews)</span>
                        </div>
                        <Button
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                          disabled={!product.availability.flipkart}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.availability.flipkart ? "Buy on Flipkart" : "Out of Stock"}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Myntra */}
                    <Card className="bg-pink-50/50 border-pink-200/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-lg">
                          <span className="text-pink-600">Myntra</span>
                          {!product.availability.myntra && (
                            <Badge variant="secondary" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-pink-600">₹{product.price.myntra}</span>
                          <Badge className="bg-green-100 text-green-700">{product.discount.myntra}% OFF</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{product.rating.myntra}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews.myntra} reviews)</span>
                        </div>
                        <Button
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                          disabled={!product.availability.myntra}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.availability.myntra ? "Buy on Myntra" : "Out of Stock"}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Amazon */}
                    <Card className="bg-orange-50/50 border-orange-200/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-lg">
                          <span className="text-orange-600">Amazon</span>
                          {!product.availability.amazon && (
                            <Badge variant="secondary" className="text-xs">
                              Out of Stock
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-orange-600">₹{product.price.amazon}</span>
                          <Badge className="bg-green-100 text-green-700">{product.discount.amazon}% OFF</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{product.rating.amazon}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews.amazon} reviews)</span>
                        </div>
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          disabled={!product.availability.amazon}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.availability.amazon ? "Buy on Amazon" : "Out of Stock"}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </div>

      <FashionChatbot />
    </div>
  )
}
