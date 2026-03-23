"use client"

import { Button } from "@/components/ui/button"
import { frameworkLevels } from "@/lib/framework-data"
import { ArrowRight, Clock, Quote } from "lucide-react"

// Distinct navy/blue accent per level — spectrum from deep navy → teal
const LEVEL_COLORS = [
  "oklch(0.28 0.08 260)",  // 1 Vision    — deep navy
  "oklch(0.34 0.09 257)",  // 2 Mission   — navy-blue
  "oklch(0.40 0.10 253)",  // 3 Operation — mid blue
  "oklch(0.47 0.11 248)",  // 4 Objective — blue
  "oklch(0.54 0.12 243)",  // 5 Goal      — blue-teal
  "oklch(0.60 0.13 239)",  // 6 Task      — teal-blue
  "oklch(0.65 0.12 235)",  // 7 Action    — accent teal
]

interface FrameworkScreenProps {
  currentLevel: number
  onNext: () => void
  onBack: () => void
}

export function FrameworkScreen({ currentLevel, onNext, onBack }: FrameworkScreenProps) {
  const level = frameworkLevels[currentLevel]
  const totalLevels = frameworkLevels.length
  const accentColor = LEVEL_COLORS[currentLevel]
  const isContainer = level.name === "OPERATION"

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ── Progress bar ─────────────────────────────────── */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Level {currentLevel + 1} of {totalLevels}
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${((currentLevel + 1) / totalLevels) * 100}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div key={currentLevel} className="flex-1 flex flex-col px-6 pb-6 overflow-y-auto">

        {/* Level name hero */}
        <div
          className="mb-2 animate-fade-up"
          style={{ animationDelay: "0s", animationFillMode: "both" }}
        >
          <h2
            className="text-6xl font-black leading-none tracking-tight"
            style={{ color: accentColor }}
          >
            {level.name}
          </h2>
          {isContainer && (
            <span
              className="inline-block mt-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest rounded-md border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}50`,
                backgroundColor: `${accentColor}0d`,
              }}
            >
              Container, not a level
            </span>
          )}
        </div>

        {/* Accent divider bar */}
        <div
          className="h-0.75 rounded-full mb-10 animate-fade-up"
          style={{
            backgroundColor: accentColor,
            animationDelay: "0.06s",
            animationFillMode: "both",
          }}
        />

        {/* ── DEFINITION ──────────────────────────────────── */}
        <div
          className="mb-10 animate-fade-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Definition
          </p>
          <p className="text-3xl leading-snug text-foreground font-bold">
            {level.definition}
          </p>
        </div>

        {/* ── TIME SCALE ──────────────────────────────────── */}
        <div
          className="mb-10 animate-card-enter"
          style={{ animationDelay: "0.16s", animationFillMode: "both" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Time Scale
          </p>
          <div
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border"
            style={{
              backgroundColor: `${accentColor}12`,
              borderColor: `${accentColor}35`,
            }}
          >
            <Clock className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
            <span className="text-lg font-bold" style={{ color: accentColor }}>
              {level.timeScale}
            </span>
          </div>
        </div>

        {/* ── REAL EXAMPLE ────────────────────────────────── */}
        <div
          className="animate-card-enter"
          style={{ animationDelay: "0.24s", animationFillMode: "both" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Real Example
          </p>
          <div
            className="rounded-2xl p-5 border-l-4"
            style={{
              backgroundColor: `${accentColor}0a`,
              borderLeftColor: accentColor,
            }}
          >
            <div className="flex gap-3">
              <Quote
                className="w-5 h-5 shrink-0 mt-0.5 opacity-35"
                style={{ color: accentColor }}
              />
              <p className="text-lg leading-relaxed text-foreground">
                {level.example}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <div className="px-6 pb-8 pt-4 flex gap-3 border-t border-border bg-background">
        {currentLevel > 0 && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-14"
          >
            Back
          </Button>
        )}
        <Button
          onClick={onNext}
          className="flex-1 h-14 text-xl font-semibold"
        >
          {currentLevel < totalLevels - 1 ? (
            <>
              Next
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          ) : (
            "See Full Map"
          )}
        </Button>
      </div>

    </div>
  )
}
