import { ProductGrid } from "@/components/product-grid"
import { FashionChatbot } from "@/components/fashion-chatbot"

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">Fashion Collection</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated selection of premium fashion pieces with AI-powered styling and AR try-on technology.
          </p>
        </div>
        <ProductGrid />
      </div>
      <FashionChatbot />
    </main>
  )
}
