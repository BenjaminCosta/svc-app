"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Target, Rocket, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface MapScreenProps {
  onNext: () => void
  mastery: number // 0–100
}

// ── Static map data ───────────────────────────────────────────

const OBJECTIVES = [
  {
    number: 1,
    name: "Sales Ready",
    goals:   ["Pipeline Committed", "Offer Conversion Stable"],
    tasks:   ["Qualify Top Accounts", "Tighten Proposal Flow", "Confirm Decision Makers"],
    actions: ["Send Follow-Up", "Book Review Call", "Update CRM"],
  },
  {
    number: 2,
    name: "PreCon Ready",
    goals:   ["Scope Clarity", "Faster Handoff"],
    tasks:   ["Define Package", "Align Estimate", "Confirm Dependencies"],
    actions: ["Revise Scope Sheet", "Ping Estimator", "Log Blockers"],
  },
  {
    number: 3,
    name: "Field Ops Ready",
    goals:   ["Crew Readiness", "Cleaner Execution Rhythm"],
    tasks:   ["Assign Owner", "Prep Materials", "Confirm Site Schedule"],
    actions: ["Text Crew Lead", "Order Missing Item", "Lock Tomorrow Plan"],
  },
]

const TIME_LEGEND = [
  { label: "Vision",    time: "Ongoing",       dot: "oklch(0.28 0.08 260)" },
  { label: "Mission",   time: "6–24 months",   dot: "oklch(0.34 0.09 257)" },
  { label: "Objective", time: "~1 month",       dot: "oklch(0.54 0.12 243)" },
  { label: "Goal",      time: "~1 week",        dot: "rgb(96 165 250)" },
  { label: "Task",      time: "A few hours",    dot: "rgb(234 179 8)" },
  { label: "Action",    time: "~10 minutes",    dot: "rgb(74 222 128)" },
]

// ── Chip section ──────────────────────────────────────────────

type ChipKind = "goal" | "task" | "action"

const CHIP_META: Record<ChipKind, { chip: string; label: string; dot: string }> = {
  goal: {
    chip:  "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    label: "text-blue-600",
    dot:   "bg-blue-400",
  },
  task: {
    chip:  "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    label: "text-yellow-600",
    dot:   "bg-yellow-400",
  },
  action: {
    chip:  "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    label: "text-green-600",
    dot:   "bg-green-400",
  },
}

function ChipSection({
  title, chips, kind, defaultOpen = false,
}: {
  title: string; chips: string[]; kind: ChipKind; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const meta = CHIP_META[kind]

  return (
    <div className="border-t border-border/60 pt-2.5">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 mb-2 w-full text-left group"
      >
        <div className={cn("w-2 h-2 rounded-full shrink-0", meta.dot)} />
        <span className={cn("text-xs font-bold uppercase tracking-wider", meta.label)}>
          {title}
        </span>
        {open
          ? <ChevronDown  className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
          : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
        }
      </button>

      <div className={cn("collapsible-grid", open && "is-open")}>
        <div className="collapsible-inner">
          <div className="flex flex-wrap gap-1.5 pb-1">
            {chips.map((chip, i) => (
              <span
                key={i}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-default",
                  meta.chip
                )}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Objective column ──────────────────────────────────────────

function ObjectiveColumn({ obj }: { obj: typeof OBJECTIVES[0] }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
      {/* Top accent bar */}
      <div className="h-1 bg-primary w-full" />

      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-black flex items-center justify-center shrink-0">
            {obj.number}
          </span>
          <span className="font-bold text-sm text-foreground">{obj.name}</span>
        </div>
        {open
          ? <ChevronDown  className="w-4 h-4 text-muted-foreground shrink-0" />
          : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        }
      </button>

      {/* Collapsible body */}
      <div className={cn("collapsible-grid", open && "is-open")}>
        <div className="collapsible-inner">
          <div className="px-4 pb-4 space-y-0">
            <ChipSection title="Goals"   chips={obj.goals}   kind="goal"   defaultOpen={true}  />
            <ChipSection title="Tasks"   chips={obj.tasks}   kind="task"   defaultOpen={false} />
            <ChipSection title="Actions" chips={obj.actions} kind="action" defaultOpen={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Time legend ───────────────────────────────────────────────

function TimeLegend() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Time Legend
      </p>
      <div className="space-y-2">
        {TIME_LEGEND.map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.dot }} />
            <span className="text-sm font-semibold text-foreground w-20 shrink-0">{item.label}</span>
            <span className="text-sm text-muted-foreground">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────

export function MapScreen({ onNext, mastery }: MapScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* Vision — full-width navy hero bar */}
      <div className="bg-primary text-primary-foreground px-6 py-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Vision</p>
            <p className="font-black text-2xl leading-tight">Lift everybody up</p>
            <p className="text-xs opacity-50 mt-1 font-medium uppercase tracking-wider">Ongoing — no end date</p>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

        {/* Mission card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Mission tabs row */}
          <div className="flex gap-2 px-4 pt-3 pb-2 border-b border-border overflow-x-auto">
            <button className="px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap bg-primary text-primary-foreground shrink-0">
              Cool Breeze
            </button>
          </div>
          {/* Mission details */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Rocket className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-0.5">Mission</p>
              <p className="font-bold text-foreground text-sm leading-snug">
                Cool Breeze — $100M in 18 months
              </p>
            </div>
          </div>
        </div>

        {/* Framework Mastery bar */}
        <div className="rounded-xl border border-border bg-card px-4 py-3">
          <div className="flex items-center gap-2 mb-2.5">
            <BarChart2 className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex-1">
              Framework Mastery
            </span>
            <span className={cn(
              "text-sm font-black",
              mastery === 0 ? "text-muted-foreground" : "text-primary"
            )}>
              {mastery > 0 ? `${mastery}%` : "—"}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
              style={{ width: `${mastery}%` }}
            />
          </div>
          {mastery === 0 && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Complete the quiz to track your mastery
            </p>
          )}
        </div>

        {/* Operation: Major Kong container */}
        <div className="rounded-2xl border-2 border-dashed border-primary/25 bg-primary/3 p-4">

          {/* Operation header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-primary/15" />
            <span
              className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border shrink-0"
              style={{
                color: "oklch(0.28 0.08 260)",
                backgroundColor: "oklch(0.28 0.08 260 / 0.06)",
                borderColor: "oklch(0.28 0.08 260 / 0.20)",
              }}
            >
              Operation: Major Kong
            </span>
            <div className="h-px flex-1 bg-primary/15" />
          </div>

          {/* 3 Objective columns — stacked on mobile, grid on md+ */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
            {OBJECTIVES.map(obj => (
              <ObjectiveColumn key={obj.number} obj={obj} />
            ))}
          </div>
        </div>

        {/* Time legend */}
        <TimeLegend />

      </div>

      {/* CTA */}
      <div className="px-6 pb-8 pt-4 border-t border-border bg-background">
        <Button onClick={onNext} className="w-full h-14 text-lg font-semibold">
          Take the Quiz
        </Button>
      </div>

    </div>
  )
}
