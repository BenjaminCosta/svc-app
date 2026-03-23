"use client"

import { Button } from "@/components/ui/button"
import { Map } from "lucide-react"

interface IntroScreenProps {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Icon badge — fades in first */}
        <div
          className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mb-10 animate-fade-in"
          style={{ animationDelay: "0s" }}
        >
          <Map className="w-12 h-12 text-primary-foreground" />
        </div>

        {/* Hero headline */}
        <h1
          className="text-6xl font-black tracking-tight text-foreground mb-3 leading-none animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          SVC Adventure
          <br />
          Map
        </h1>

        <p
          className="text-lg text-muted-foreground mb-14 animate-fade-up"
          style={{ animationDelay: "0.22s" }}
        >
          Lift everybody up
        </p>

        {/* Pulsing CTA */}
        <div
          className="w-full max-w-xs animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="w-full text-lg font-semibold h-14 animate-pulse-cta"
          >
            Start
          </Button>
        </div>

        <p
          className="mt-8 text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.55s" }}
        >
          Learn the SVC framework in 5 minutes
        </p>
      </div>
    </div>
  )
}
