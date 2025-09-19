import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

const fashionProducts = [
  "Classic Black Blazer ($299) - Timeless elegance meets modern sophistication",
  "Silk Evening Dress ($459) - Luxurious silk dress perfect for special occasions",
  "Designer Leather Handbag ($599) - Handcrafted leather with premium materials",
  "Cashmere Sweater ($189) - Ultra-soft cashmere for ultimate comfort",
  "Tailored Trousers ($149) - Perfectly fitted from premium wool blend",
  "Statement Jewelry Set ($329) - Bold and elegant contemporary design",
  "Premium Sneakers ($249) - High-end sneakers with cutting-edge design",
  "Wool Coat ($399) - Sophisticated coat for warmth and style",
  "Silk Scarf ($89) - Luxurious silk with intricate patterns",
  "Designer Sunglasses ($199) - Premium sunglasses with UV protection",
]

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages([
    {
      role: "system",
      content: `You are a sophisticated AI fashion assistant for a luxury fashion brand. You have access to these 10 premium products in our catalog:

${fashionProducts.join("\n")}

Your role is to:
- Provide personalized fashion advice and outfit recommendations
- Suggest combinations from our catalog based on occasions, seasons, or personal style
- Answer questions about fashion trends, styling tips, and wardrobe essentials
- Help customers find the perfect pieces for their needs
- Maintain a sophisticated, knowledgeable, and friendly tone

Always reference specific products from our catalog when making recommendations. Focus on creating complete looks and explaining why certain combinations work well together.`,
    },
    ...messages,
  ])

  const result = streamText({
    model: openai("gpt-4"),
    messages: prompt,
    maxTokens: 500,
    temperature: 0.7,
  })

  return result.toDataStreamResponse()
}
