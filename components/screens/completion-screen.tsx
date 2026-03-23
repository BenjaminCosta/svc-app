"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { frameworkLevels } from "@/lib/framework-data"
import { Trophy, RotateCcw, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Minimal confetti using the existing navy/blue palette
const CONFETTI_COLORS = [
  "oklch(0.28 0.08 260)",  // deep navy
  "oklch(0.65 0.12 235)",  // accent teal
  "oklch(0.88 0.01 260)",  // soft blue-white
  "oklch(0.47 0.11 248)",  // mid blue
]

function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${4 + (i / 24) * 92}%`,
    size: 5 + (i % 3) * 3,
    circle: i % 3 !== 0,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: `${0.7 + (i % 6) * 0.15}s`,
    delay: `${(i % 10) * 0.06}s`,
  }))

  return (
    <div className="absolute inset-x-0 top-0 h-56 overflow-hidden pointer-events-none" aria-hidden>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: p.circle ? "50%" : "2px",
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

interface CompletionScreenProps {
  onRestart: () => void
}

const STAGGER_DELAYS = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600", "delay-700"]

export function CompletionScreen({ onRestart }: CompletionScreenProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Confetti fires once on mount */}
      {mounted && <Confetti />}

      {/* Hero Section */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div
          className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6 animate-fade-up"
          style={{ animationDelay: "0.05s", animationFillMode: "both" }}
        >
          <Trophy className="w-10 h-10 text-green-600" />
        </div>
        <h1
          className="text-3xl font-bold text-foreground mb-2 animate-fade-up"
          style={{ animationDelay: "0.12s", animationFillMode: "both" }}
        >
          {"You're ready!"}
        </h1>
        <p
          className="text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          You now understand the SVC framework
        </p>
      </div>

      {/* Summary Card — levels animate in staggered */}
      <div className="flex-1 px-6 pb-6">
        <Card
          className="p-5 border-border mb-6 animate-fade-up"
          style={{ animationDelay: "0.28s", animationFillMode: "both" }}
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            The 7 Levels
          </h3>
          <div className="space-y-3">
            {frameworkLevels.map((level, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between py-2 border-b border-border last:border-0",
                  "animate-fade-up",
                  STAGGER_DELAYS[index] ?? "delay-700"
                )}
                style={{ animationFillMode: "both" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="font-medium text-foreground">{level.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{level.timeScale}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Insight */}
        <Card
          className="p-5 bg-primary text-primary-foreground border-0 animate-fade-up"
          style={{ animationDelay: "0.85s", animationFillMode: "both" }}
        >
          <p className="text-sm opacity-70 mb-1">Remember</p>
          <p className="font-semibold text-lg">
            From Vision to Action — every level connects to lift everybody up.
          </p>
        </Card>
      </div>

      {/* Restart Button */}
      <div
        className="px-6 pb-8 animate-fade-up"
        style={{ animationDelay: "0.95s", animationFillMode: "both" }}
      >
        <Button
          variant="outline"
          onClick={onRestart}
          className="w-full h-14"
        >
          <RotateCcw className="mr-2 w-5 h-5" />
          Start Over
        </Button>
      </div>
    </div>
  )
}
