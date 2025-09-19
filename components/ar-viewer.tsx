"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Smartphone, Monitor } from "lucide-react"

interface ARViewerProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    description: string
    image: string
    arModel: string
    category: string
  }
}

export function ARViewer({ isOpen, onClose, product }: ARViewerProps) {
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "web">("web")

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      setDeviceType("ios")
    } else if (userAgent.includes("android")) {
      setDeviceType("android")
    } else {
      setDeviceType("web")
    }
  }, [])

  const handleARLaunch = () => {
    if (deviceType === "ios") {
      // Launch AR Quick Look for iOS
      const link = document.createElement("a")
      link.href = product.arModel.replace(".glb", ".usdz")
      link.rel = "ar"
      link.click()
    } else if (deviceType === "android") {
      // Launch Scene Viewer for Android
      const intent = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(window.location.origin + product.arModel)}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`
      window.location.href = intent
    } else {
      // Web AR fallback - show 3D model viewer
      alert("AR viewing is best experienced on mobile devices. Showing 3D preview instead.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-card-foreground flex items-center justify-between">
            AR Preview: {product.name}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg border border-border"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{product.description}</p>
              <p className="text-accent font-bold text-lg">${product.price}</p>
            </div>
          </div>

          {/* AR Instructions */}
          <div className="bg-muted/20 rounded-lg p-4 border border-border">
            <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              {deviceType === "ios" && <Smartphone className="h-4 w-4" />}
              {deviceType === "android" && <Smartphone className="h-4 w-4" />}
              {deviceType === "web" && <Monitor className="h-4 w-4" />}
              AR Experience Instructions
            </h4>

            {deviceType === "ios" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Tap "Launch AR" to open AR Quick Look</p>
                <p>• Point your camera at a flat surface</p>
                <p>• Tap to place the {product.name} in your space</p>
                <p>• Walk around to view from different angles</p>
              </div>
            )}

            {deviceType === "android" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Tap "Launch AR" to open Scene Viewer</p>
                <p>• Allow camera permissions when prompted</p>
                <p>• Point your camera at a flat surface</p>
                <p>• Tap to place the {product.name} in your space</p>
              </div>
            )}

            {deviceType === "web" && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• AR is best experienced on mobile devices</p>
                <p>• Use your phone's camera for the full AR experience</p>
                <p>• Desktop users can view the 3D model preview</p>
              </div>
            )}
          </div>

          {/* 3D Model Preview */}
          <div className="bg-muted/10 rounded-lg p-8 border border-border text-center">
            <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Monitor className="h-8 w-8 text-accent" />
                </div>
                <p className="text-muted-foreground text-sm">3D Model Preview</p>
                <p className="text-xs text-muted-foreground mt-1">{product.name}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleARLaunch} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              {deviceType === "ios" && "Launch AR Quick Look"}
              {deviceType === "android" && "Launch Scene Viewer"}
              {deviceType === "web" && "View 3D Model"}
            </Button>
            <Button variant="outline" onClick={onClose} className="border-border text-card-foreground bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
