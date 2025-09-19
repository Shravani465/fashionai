"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Heart, ShoppingCart, Search, Filter } from "lucide-react"
import { ARViewer } from "@/components/ar-viewer"

const fashionProducts = [
  {
    id: 1,
    name: "Classic Black Blazer",
    price: 299,
    description: "Timeless elegance meets modern sophistication in this tailored black blazer.",
    image: "/elegant-black-blazer-fashion.jpg",
    arModel: "/models/blazer.glb",
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Silk Evening Dress",
    price: 459,
    description: "Luxurious silk dress perfect for special occasions and evening events.",
    image: "/elegant-silk-evening-dress.jpg",
    arModel: "/models/dress.glb",
    category: "Dresses",
  },
  {
    id: 3,
    name: "Designer Leather Handbag",
    price: 599,
    description: "Handcrafted leather handbag with premium materials and exquisite detailing.",
    image: "/luxury-leather-handbag.jpg",
    arModel: "/models/handbag.glb",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Cashmere Sweater",
    price: 189,
    description: "Ultra-soft cashmere sweater for ultimate comfort and style.",
    image: "/luxury-cashmere-sweater.jpg",
    arModel: "/models/sweater.glb",
    category: "Knitwear",
  },
  {
    id: 5,
    name: "Tailored Trousers",
    price: 149,
    description: "Perfectly fitted trousers crafted from premium wool blend fabric.",
    image: "/tailored-wool-trousers.jpg",
    arModel: "/models/trousers.glb",
    category: "Bottoms",
  },
  {
    id: 6,
    name: "Statement Jewelry Set",
    price: 329,
    description: "Bold and elegant jewelry set featuring contemporary design elements.",
    image: "/luxury-jewelry-set.jpg",
    arModel: "/models/jewelry.glb",
    category: "Jewelry",
  },
]

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof fashionProducts)[0] | null>(null)
  const [showARViewer, setShowARViewer] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Outerwear", "Dresses", "Accessories", "Knitwear", "Bottoms", "Jewelry"]

  const filteredProducts = fashionProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewInAR = (product: (typeof fashionProducts)[0]) => {
    setSelectedProduct(product)
    setShowARViewer(true)
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border text-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-input border-border text-foreground">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group bg-card border-border hover:border-accent/50 transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.category}</Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-card-foreground mb-2 text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-accent">${product.price}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleViewInAR(product)}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View in AR
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-card-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ARViewer isOpen={showARViewer} onClose={() => setShowARViewer(false)} product={selectedProduct} />
      )}
    </section>
  )
}
