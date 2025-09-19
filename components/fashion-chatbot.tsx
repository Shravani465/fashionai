"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Sparkles, Bot, User, GripHorizontal, Minimize2, Maximize2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function FashionChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const chatRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "✨ Welcome to GlamBot! I'm your personal AI fashion stylist. I can help you discover perfect outfit combinations, suggest styles for any occasion, or answer fashion questions. What would you like to explore today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Keep within viewport bounds
    const maxX = window.innerWidth - 400
    const maxY = window.innerHeight - 600

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Enhanced AI response simulation
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateEnhancedFashionResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateEnhancedFashionResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("outfit") || input.includes("combination")) {
      return "🎨 Perfect! I recommend pairing our **Elegant Black Blazer** with **Tailored Wool Trousers** for a sophisticated foundation. Add the **Luxury Leather Handbag** and **Statement Jewelry Set** to elevate the look. This combination works beautifully for business meetings, dinner dates, or gallery openings! Would you like me to suggest color variations or seasonal adaptations?"
    }

    if (input.includes("casual") || input.includes("everyday")) {
      return "☀️ For effortless everyday elegance, try our **Luxury Cashmere Sweater** with well-fitted jeans and the **Designer Sneakers**. Layer with the **Silk Scarf** for a pop of sophistication. This look transitions perfectly from coffee dates to shopping trips. Want to see how to dress it up for evening?"
    }

    if (input.includes("formal") || input.includes("evening")) {
      return "✨ For show-stopping formal occasions, our **Silk Evening Dress** is absolutely divine! Pair it with the **Statement Jewelry Set** and **Designer Heels**. Add the **Luxury Clutch** for the perfect finishing touch. This ensemble radiates confidence and elegance. Shall I suggest makeup and hair styling tips to complete the look?"
    }

    if (input.includes("winter") || input.includes("cold")) {
      return "❄️ Winter styling is all about luxurious layering! Start with our **Cashmere Sweater**, add the **Wool Coat** for warmth, and pair with **Tailored Trousers**. The **Silk Scarf** adds both warmth and style. Don't forget **Leather Boots** for both comfort and sophistication. Want tips for transitioning this look from day to night?"
    }

    if (input.includes("accessories")) {
      return "💎 Our curated accessory collection is designed to transform any outfit! The **Designer Leather Handbag** adds instant sophistication, while the **Statement Jewelry Set** creates focal points. The **Silk Scarf** is incredibly versatile - wear it around your neck, as a headband, or tied to your handbag. Which piece interests you most?"
    }

    if (input.includes("color") || input.includes("colours")) {
      return "🌈 Color is the soul of fashion! This season, I'm loving rich jewel tones like emerald and sapphire paired with classic neutrals. For your skin tone, I'd recommend starting with colors that make your eyes pop. Would you like me to create a personalized color palette based on your preferences?"
    }

    if (input.includes("trend") || input.includes("trending")) {
      return "📈 The hottest trends right now include oversized blazers, statement sleeves, and sustainable luxury pieces. But remember, the best trend is the one that makes YOU feel confident! I prefer timeless pieces with contemporary twists. What's your style personality - classic, edgy, romantic, or minimalist?"
    }

    return "💫 That's a wonderful question! I'm here to help you discover your unique style story. Our GlamBot collection features carefully curated pieces that work together seamlessly. Whether you're building a capsule wardrobe or looking for that perfect statement piece, I can guide you. Tell me more about your lifestyle and style goals - are you dressing for work, special occasions, or everyday luxury?"
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          data-chatbot-trigger
          className="fixed bottom-24 md:bottom-6 right-6 h-16 w-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-2xl z-50 btn-luxury"
          size="sm"
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full animate-pulse" />
          </div>
        </Button>
      )}

      {isOpen && (
        <Card
          ref={chatRef}
          className={`fixed z-50 glass-effect border-border/20 shadow-2xl flex flex-col transition-all duration-300 ${
            isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
          }`}
          style={{
            bottom: position.y === 0 ? (window.innerWidth < 768 ? "6rem" : "1.5rem") : "auto",
            right: position.x === 0 ? "1.5rem" : "auto",
            left: position.x !== 0 ? `${position.x}px` : "auto",
            top: position.y !== 0 ? `${position.y}px` : "auto",
            cursor: isDragging ? "grabbing" : "default",
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/20">
            <div
              className="flex items-center gap-3 flex-1 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
            >
              <GripHorizontal className="h-4 w-4 text-muted-foreground" />
              <div className="relative">
                <Sparkles className="h-6 w-6 text-accent animate-float" />
                <div className="absolute inset-0 h-6 w-6 text-accent/30 animate-ping" />
              </div>
              <span className="font-serif text-card-foreground">GlamBot Stylist</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-card-foreground rounded-full"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-card-foreground rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 bg-accent/20">
                          <AvatarFallback>
                            <Bot className="h-4 w-4 text-accent" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-accent text-accent-foreground ml-auto"
                            : "bg-card/80 text-card-foreground border border-border/20"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 bg-primary/20">
                          <AvatarFallback>
                            <User className="h-4 w-4 text-primary" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8 bg-accent/20">
                        <AvatarFallback>
                          <Bot className="h-4 w-4 text-accent" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-card/80 text-card-foreground rounded-2xl p-4 text-sm border border-border/20">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-accent rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-accent rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border/20">
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about fashion, styling, or trends..."
                    className="flex-1 bg-input/50 border-border/20 text-card-foreground rounded-full px-4 focus:ring-2 focus:ring-accent/20"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 btn-luxury"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
