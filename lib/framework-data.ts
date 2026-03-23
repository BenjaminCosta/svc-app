export interface FrameworkLevel {
  name: string
  definition: string
  timeScale: string
  example: string
  color: string
}

export const frameworkLevels: FrameworkLevel[] = [
  {
    name: "VISION",
    definition: "The permanent north star of the organization. It never changes. Everything else serves it.",
    timeScale: "Ongoing — no end date",
    example: "\"Lift everybody up\" — SVC",
    color: "bg-primary"
  },
  {
    name: "MISSION",
    definition: "A major campaign with a clear target and deadline. A Vision can have multiple Missions running over time.",
    timeScale: "6 to 24 months",
    example: "Mission Cool Breeze — reach $100M in projected revenue within 18 months",
    color: "bg-primary/90"
  },
  {
    name: "OPERATION",
    definition: "A name given to a group of related Objectives that together serve one Mission. It is not a level — it is a container that keeps related work visible and connected.",
    timeScale: "Spans the duration of its Objectives",
    example: "Operation Major Kong — groups Objectives 1, 2 and 3 (Sales Ready, PreCon Ready, Field Ops Ready) under Mission Cool Breeze",
    color: "bg-primary/80"
  },
  {
    name: "OBJECTIVE",
    definition: "A specific, measurable milestone that moves the Mission forward. Each Objective belongs to an Operation.",
    timeScale: "Approximately 1 month",
    example: "Objective 1 — Sales Cool Breeze Ready (prepared to consistently increase output 30% each month)",
    color: "bg-primary/70"
  },
  {
    name: "GOAL",
    definition: "A concrete weekly target that moves an Objective forward. Goals are owned by a person or team.",
    timeScale: "Approximately 1 week",
    example: "4 Sales Reps operating and onboarded this week",
    color: "bg-accent"
  },
  {
    name: "TASK",
    definition: "A defined piece of work that contributes to completing a Goal. Specific, actionable, assignable.",
    timeScale: "A few hours",
    example: "Update CRM with this week's pipeline entries",
    color: "bg-accent/80"
  },
  {
    name: "ACTION",
    definition: "The smallest unit of work. A single step inside a Task. A series of Actions completes a Task.",
    timeScale: "Approximately 10 minutes",
    example: "Send one follow-up email to a prospect",
    color: "bg-accent/60"
  }
]

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "An Operation groups together related ___?",
    options: ["Missions", "Objectives", "Tasks", "Actions"],
    correctIndex: 1,
    explanation: "Operations group related Objectives together to achieve a Mission."
  },
  {
    question: "How long does a Goal typically take?",
    options: ["~10 minutes", "A few hours", "~1 week", "~1 month"],
    correctIndex: 2,
    explanation: "Goals are weekly milestones that contribute to Objectives."
  },
  {
    question: "What is the smallest unit of work?",
    options: ["Task", "Goal", "Action", "Objective"],
    correctIndex: 2,
    explanation: "Actions are the smallest units, taking about 10 minutes to complete."
  },
  {
    question: "How long does an Action take?",
    options: ["~10 minutes", "A few hours", "~1 week", "~1 month"],
    correctIndex: 0,
    explanation: "Actions are immediate, concrete steps that take about 10 minutes."
  },
  {
    question: "How long does a Mission typically last?",
    options: ["~1 month", "6–24 months", "Ongoing", "~1 week"],
    correctIndex: 1,
    explanation: "Missions span 6 to 24 months — like 'Cool Breeze — $100M in 18 months'."
  },
  {
    question: "What does an Operation do?",
    options: ["Sets the company Vision", "Tracks daily Actions", "Groups related Objectives under one Mission", "Defines the time scale"],
    correctIndex: 2,
    explanation: "An Operation organizes related Objectives under a single Mission."
  },
  {
    question: "How long does an Objective typically take?",
    options: ["~1 month", "~1 week", "A few hours", "6–24 months"],
    correctIndex: 0,
    explanation: "Objectives are monthly targets that move an Operation forward."
  },
  {
    question: "How long does a Task take?",
    options: ["~10 minutes", "~1 week", "~1 month", "A few hours"],
    correctIndex: 3,
    explanation: "Tasks take a few hours and accomplish a specific piece of work."
  },
  {
    question: "Vision is ___?",
    options: ["6–24 months", "~1 year", "Ongoing", "~5 years"],
    correctIndex: 2,
    explanation: "Vision is ongoing — it's the overarching purpose that guides everything."
  },
  {
    question: "Operation Major Kong belongs to which Mission?",
    options: ["Sales Ready", "Cool Breeze", "Field Ops Ready", "Lift Everybody Up"],
    correctIndex: 1,
    explanation: "Operation Major Kong is part of the Cool Breeze Mission."
  }
]

export const mapData = {
  vision: "Lift everybody up",
  missions: [
    {
      name: "Cool Breeze",
      target: "$100M in 18 months",
      active: true,
      operations: [
        {
          name: "Operation Major Kong",
          objectives: [
            {
              name: "Sales Ready",
              goals: [
                { name: "Sales training complete", tasks: ["Create materials", "Schedule sessions"] },
                { name: "CRM configured", tasks: ["Import contacts", "Set up pipelines"] }
              ]
            },
            {
              name: "PreCon Ready",
              goals: [
                { name: "Estimating tools ready", tasks: ["Software licenses", "Training docs"] },
                { name: "Process documented", tasks: ["Write SOPs", "Review with team"] }
              ]
            },
            {
              name: "Field Ops Ready",
              goals: [
                { name: "Equipment staged", tasks: ["Inventory check", "Order supplies"] },
                { name: "Crews trained", tasks: ["Safety training", "Technical training"] }
              ]
            }
          ]
        }
      ]
    }
  ]
}
