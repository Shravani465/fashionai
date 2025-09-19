import { Hero } from "@/components/hero"
import { FashionChatbot } from "@/components/fashion-chatbot"
import { FeaturesSection } from "@/components/features-section"
import { CollectionPreview } from "@/components/collection-preview"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <CollectionPreview />
      <FashionChatbot />
    </main>
  )
}
