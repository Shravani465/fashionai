"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, ShoppingCart } from "lucide-react"
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
    image: "/luxury-cashmere-sweater.png",
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
  {
    id: 7,
    name: "Premium Sneakers",
    price: 249,
    description: "High-end sneakers combining comfort with cutting-edge design.",
    image: "/luxury-designer-sneakers.jpg",
    arModel: "/models/sneakers.glb",
    category: "Footwear",
  },
  {
    id: 8,
    name: "Wool Coat",
    price: 399,
    description: "Sophisticated wool coat designed for both warmth and style.",
    image: "/elegant-wool-coat.jpg",
    arModel: "/models/coat.glb",
    category: "Outerwear",
  },
  {
    id: 9,
    name: "Silk Scarf",
    price: 89,
    description: "Luxurious silk scarf with intricate patterns and vibrant colors.",
    image: "/luxury-silk-scarf.png",
    arModel: "/models/scarf.glb",
    category: "Accessories",
  },
  {
    id: 10,
    name: "Designer Sunglasses",
    price: 199,
    description: "Premium sunglasses with UV protection and timeless design.",
    image: "/luxury-designer-sunglasses.jpg",
    arModel: "/models/sunglasses.glb",
    category: "Accessories",
  },
]

export function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof fashionProducts)[0] | null>(null)
  const [showARViewer, setShowARViewer] = useState(false)

  const handleViewInAR = (product: (typeof fashionProducts)[0]) => {
    setSelectedProduct(product)
    setShowARViewer(true)
  }

  return (
    <section id="catalog" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Curated Fashion Collection</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium fashion pieces, each designed to elevate your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fashionProducts.map((product) => (
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
      </div>

      {selectedProduct && (
        <ARViewer isOpen={showARViewer} onClose={() => setShowARViewer(false)} product={selectedProduct} />
      )}
    </section>
  )
}
