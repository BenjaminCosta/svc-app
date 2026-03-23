"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { quizQuestions, QuizQuestion } from "@/lib/framework-data"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, ArrowRight, RefreshCw } from "lucide-react"

const QUESTIONS_PER_ROUND = 5
const PASS_THRESHOLD = 4  // 4 out of 5 = 80%

function pickRandom(pool: QuizQuestion[]): QuizQuestion[] {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_ROUND)
}

interface QuizScreenProps {
  onComplete: (score: number, total: number) => void
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => pickRandom(quizQuestions))
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [phase, setPhase] = useState<"active" | "review">("active")
  // Track which answer triggered a shake so it resets cleanly on re-select
  const [shakeKey, setShakeKey] = useState(0)

  const question = activeQuestions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctIndex
  const isLastQuestion = currentQuestion === QUESTIONS_PER_ROUND - 1

  const handleSelectAnswer = useCallback((index: number) => {
    if (showResult) return
    const correct = index === question.correctIndex
    setSelectedAnswer(index)
    setShowResult(true)
    if (!correct) setShakeKey(k => k + 1)
    if (correct) setCorrectAnswers(prev => prev + 1)
  }, [showResult, question.correctIndex])

  const handleNext = () => {
    if (isLastQuestion) {
      // correctAnswers was already incremented by handleSelectAnswer before this runs
      if (correctAnswers >= PASS_THRESHOLD) {
        onComplete(correctAnswers, QUESTIONS_PER_ROUND)
      } else {
        setPhase("review")
      }
    } else {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleRetry = () => {
    setActiveQuestions(pickRandom(quizQuestions))
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setCorrectAnswers(0)
    setPhase("active")
  }

  // ── Review / retry screen ─────────────────────────────────────
  if (phase === "review") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background screen-enter">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-6">
            <RefreshCw className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Not quite — let&apos;s review</h2>
          <p className="text-muted-foreground mb-2">
            You got <span className="font-semibold text-foreground">{correctAnswers} out of {QUESTIONS_PER_ROUND}</span>
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Score {PASS_THRESHOLD} or higher to pass. A fresh set of questions is ready.
          </p>
          <Button onClick={handleRetry} className="w-full h-14 text-lg font-semibold">
            Try Again
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    )
  }

  // ── Active quiz ───────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress bar + dots */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {QUESTIONS_PER_ROUND}
          </span>
          <span className="text-sm font-medium text-primary">
            {correctAnswers} correct
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / QUESTIONS_PER_ROUND) * 100}%` }}
          />
        </div>

        {/* Question dots */}
        <div className="flex gap-2 justify-center">
          {Array.from({ length: QUESTIONS_PER_ROUND }, (_, i) => {
            const isAnswered = i < currentQuestion || (i === currentQuestion && showResult)
            const isCurrent = i === currentQuestion && !showResult
            return (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all duration-300",
                  isAnswered && "w-2.5 h-2.5 bg-primary",
                  isCurrent && "w-3 h-3 bg-primary ring-2 ring-primary/30 ring-offset-1",
                  !isAnswered && !isCurrent && "w-2.5 h-2.5 bg-secondary border border-border"
                )}
              />
            )
          })}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6 py-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {question.question}
        </h2>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctIndex
            const isWrong = showResult && isSelected && !isCorrectOption

            const buttonKey = isWrong
              ? `${currentQuestion}-${index}-shake-${shakeKey}`
              : `${currentQuestion}-${index}`

            return (
              <button
                key={buttonKey}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all border-2",
                  "flex items-center justify-between",
                  !showResult && "hover:border-primary/50 hover:bg-secondary/50 active:scale-[0.99]",
                  !showResult && "border-border bg-card",
                  showResult && isCorrectOption && "border-green-500 bg-green-50",
                  showResult && isSelected && !isCorrectOption && "border-red-400 bg-red-50",
                  showResult && !isSelected && !isCorrectOption && "border-border bg-card opacity-40",
                  isWrong && "animate-shake"
                )}
              >
                <span className={cn(
                  "font-medium",
                  showResult && isCorrectOption && "text-green-700",
                  showResult && isSelected && !isCorrectOption && "text-red-700",
                  !showResult && "text-foreground"
                )}>
                  {option}
                </span>
                {showResult && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 animate-check-pop shrink-0" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback card */}
        {showResult && (
          <Card className={cn(
            "p-4 border-0 animate-fade-up",
            isCorrect ? "bg-green-50" : "bg-amber-50"
          )}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              )}
              <div>
                <p className={cn(
                  "font-semibold mb-1",
                  isCorrect ? "text-green-700" : "text-amber-700"
                )}>
                  {isCorrect ? "Correct!" : "Not quite"}
                </p>
                <p className={cn(
                  "text-sm",
                  isCorrect ? "text-green-600" : "text-amber-600"
                )}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Continue button */}
      {showResult && (
        <div className="px-6 pb-8 pt-4 animate-fade-up">
          <Button
            onClick={handleNext}
            className="w-full h-14 text-lg font-semibold"
          >
            {isLastQuestion ? "See Results" : "Next Question"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
