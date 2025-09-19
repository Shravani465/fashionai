"use client"
import { Home, Search, Sparkles, BarChart3, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/shop", icon: Search, label: "Explore" },
    { href: "/style", icon: Sparkles, label: "Style" },
    { href: "/compare", icon: BarChart3, label: "Compare" },
    { href: "/cart", icon: ShoppingBag, label: "Cart" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-effect border-t border-border/20">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200",
                isActive ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-accent hover:bg-accent/5",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "animate-bounce")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
