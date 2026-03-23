"use client"

import { useState } from "react"
import { IntroScreen } from "@/components/screens/intro-screen"
import { FrameworkScreen } from "@/components/screens/framework-screen"
import { MapScreen } from "@/components/screens/map-screen"
import { QuizScreen } from "@/components/screens/quiz-screen"
import { CompletionScreen } from "@/components/screens/completion-screen"
import { frameworkLevels } from "@/lib/framework-data"

type Screen = "intro" | "framework" | "map" | "quiz" | "completion"

export default function AdventureMap() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("intro")
  const [frameworkLevel, setFrameworkLevel] = useState(0)
  const [quizMastery, setQuizMastery] = useState(0)

  const handleStart = () => {
    setCurrentScreen("framework")
    setFrameworkLevel(0)
  }

  const handleFrameworkNext = () => {
    if (frameworkLevel < frameworkLevels.length - 1) {
      setFrameworkLevel(prev => prev + 1)
    } else {
      setCurrentScreen("map")
    }
  }

  const handleFrameworkBack = () => {
    if (frameworkLevel > 0) {
      setFrameworkLevel(prev => prev - 1)
    }
  }

  const handleMapNext = () => {
    setCurrentScreen("quiz")
  }

  const handleQuizComplete = (score: number, total: number) => {
    setQuizMastery(Math.round((score / total) * 100))
    setCurrentScreen("completion")
  }

  const handleRestart = () => {
    setCurrentScreen("intro")
    setFrameworkLevel(0)
  }

  return (
    <main className="max-w-lg mx-auto min-h-screen bg-background overflow-hidden">
      <div key={currentScreen} className="screen-enter">
        {currentScreen === "intro" && (
          <IntroScreen onStart={handleStart} />
        )}
        {currentScreen === "framework" && (
          <FrameworkScreen
            currentLevel={frameworkLevel}
            onNext={handleFrameworkNext}
            onBack={handleFrameworkBack}
          />
        )}
        {currentScreen === "map" && (
          <MapScreen onNext={handleMapNext} mastery={quizMastery} />
        )}
        {currentScreen === "quiz" && (
          <QuizScreen onComplete={handleQuizComplete} />
        )}
        {currentScreen === "completion" && (
          <CompletionScreen onRestart={handleRestart} />
        )}
      </div>
    </main>
  )
}
