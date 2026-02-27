export const module2Data = {
  id: 2,
  title: "Pricing Fundamentals: Frequency & Severity",
  shortDescription:
    "Master the core concepts of frequency and severity for insurance pricing and risk assessment. Learn to quantify risk using exposure measures, calculate premiums, and connect technical analysis with commercial pricing decisions.",
  description:
    "This module introduces the core concepts of frequency and severity, which form the basis for pricing, reserving, and risk assessment in insurance. Learners will be introduced to the concepts of frequency, severity, and exposure, and learn how these measures are used to quantify and assess insurance risk. The module also covers the calculation of risk premium and office premium, ensuring learners can connect technical analysis with the commercial realities of premium setting.\n\nBy the end of the module, participants will be able to apply actuarial techniques to analyze claims data, calculate expected premiums, and evaluate the relationship between exposures, premiums, and loss ratios to support sound pricing decisions.",
  themeColor: "blue",
  objectives: {
    intro:
      "This module introduces the core concepts of frequency and severity, which form the basis for pricing, reserving, and risk assessment in insurance. Learners will be introduced to the concepts of frequency, severity, and exposure, and learn how these measures are used to quantify and assess insurance risk. The module also covers the calculation of risk premium and office premium, ensuring learners can connect technical analysis with the commercial realities of premium setting.",
    points: [],
    closing:
      "By the end of the module, participants will be able to apply actuarial techniques to analyze claims data, calculate expected premiums, and evaluate the relationship between exposures, premiums, and loss ratios to support sound pricing decisions."
  },
  learningOutcomes: [
    "Explain the concepts of frequency and severity and their role in measuring insurance risk",
    "Calculate and interpret exposures for use in insurance analysis (in days, months, or years)",
    "Differentiate between risk premium and office premium and describe how each contributes to premium calculation",
    "Apply frequency and severity measures to estimate expected claims and derive risk premiums",
    "Assess the relationship between exposures, premiums, and loss ratios to evaluate insurance performance"
  ],
  courseContent: {
    description:
      "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master Frequency & Severity Analysis. Download and use them as your primary references throughout the module.",
    resources: [
      {
        title: "Frequency & Severity Technical Procedure",
        description: "Comprehensive guide",
        url: "/Training Modules/Module-2-Pricing/Course Content/ITP-Frequency-Severity.pdf",
        filename: "ITP-Frequency-Severity.pdf",
        icon: "📄",
        color: "blue"
      }
    ],
    aboutText: {
      intro:
        "This PDF contains detailed procedures for frequency and severity analysis. It covers:",
      points: [
        "Frequency and severity concepts and calculations",
        "Exposure measures and risk premium derivation",
        "Transition from risk premium to office premium",
        "Practical examples and exercises"
      ]
    }
  },
  assignments: {
    dataFiles: [
      {
        title: "Claims Data",
        description: "Historical claims for analysis",
        url: "/Training Modules/Module-2-Pricing-Fundamentals/Data/Claims-Data.xlsx",
        filename: "Claims Data.xlsx",
        icon: "📊",
        color: "blue"
      },
      {
        title: "Premium Data",
        description: "Premium and exposure data",
        url: "/Training Modules/Module-2-Pricing-Fundamentals/Data/Premium-Data.xlsx",
        filename: "Premium Data.xlsx",
        icon: "📈",
        color: "yellow"
      }
    ],
    workingFiles: [
      {
        title: "Frequency and Severity Template",
        description: "Structured template for calculations",
        url: "/Training Modules/Module-2-Pricing-Fundamentals/Working File/Frequency-and-Severity-Template.xlsx",
        filename: "Frequency and Severity Template.xlsx",
        icon: "🛠️",
        color: "orange"
      }
    ]
  },
  quizTitle: "Quiz: Frequency & Severity",
  quizQuestions: [
    {
      id: 1,
      section: "Pricing Fundamentals",
      question: "Frequency in insurance is best defined as:",
      options: [
        "a) The probability that a claim will occur within a given period.",
        "b) The average size of a claim.",
        "c) The ratio of total claims to premiums.",
        "d) The maximum possible loss on a policy."
      ],
      correctAnswer:
        "a) The probability that a claim will occur within a given period.",
      explanation:
        "Frequency measures how often claims occur relative to exposure, i.e., probability of occurrence."
    },
    {
      id: 2,
      section: "Pricing Fundamentals",
      question: "Severity in insurance refers to:",
      options: [
        "a) The number of claims per exposure.",
        "b) The financial impact of a claim once it occurs.",
        "c) The probability of claims not occurring.",
        "d) The distribution of exposures across policies."
      ],
      correctAnswer: "b) The financial impact of a claim once it occurs.",
      explanation: "Severity measures the average claim size when a claim happens."
    },
    {
      id: 3,
      section: "Pricing Fundamentals",
      question:
        "If 2,000 motor policies are written and 80 claims are reported, what is the claim frequency?",
      options: ["a) 0.2", "b) 0.04", "c) 25", "d) 40%"],
      correctAnswer: "b) 0.04",
      explanation: "Frequency = 80 ÷ 2,000 = 0.04 (4%)."
    },
    {
      id: 4,
      section: "Pricing Fundamentals",
      question:
        "An insurer reports 100 claims with a total payout of 50,000,000. What is the average severity?",
      options: [
        "a) 500,000",
        "b) 50,000",
        "c) 5,000,000",
        "d) 5,000"
      ],
      correctAnswer: "a) 500,000",
      explanation:
        "Severity = total loss amount ÷ number of claims = 50,000,000 ÷ 100 = 500,000."
    },
    {
      id: 5,
      section: "Risk Premium Basics",
      question:
        "Suppose an insurer has 1,200 claims from 60,000 vehicle-years. If average severity is 300,000, the pure risk cost per vehicle-year is:",
      options: ["a) 6,000", "b) 3,000", "c) 12,000", "d) 18,000"],
      correctAnswer: "a) 6,000",
      explanation: "Frequency = 1,200 ÷ 60,000 = 0.02. Risk cost = 0.02 × 300,000 = 6,000."
    },
    {
      id: 6,
      section: "Risk Premium Basics",
      question: "The risk premium is best described as:",
      options: [
        "a) The premium charged after adding profit and expenses.",
        "b) The expected cost of claims before loadings.",
        "c) The reinsurance premium ceded to reinsurers.",
        "d) The difference between earned and written premium."
      ],
      correctAnswer: "b) The expected cost of claims before loadings.",
      explanation:
        "Risk premium = pure premium = expected claims cost only, before loadings."
    },
    {
      id: 7,
      section: "Risk Premium Basics",
      question:
        "If frequency is 0.02 and average severity is 250,000, the risk premium per policy is:",
      options: ["a) 5,000", "b) 25,000", "c) 2,500", "d) 50,000"],
      correctAnswer: "a) 5,000",
      explanation: "Risk premium = Frequency × Severity = 0.02 × 250,000 = 5,000."
    },
    {
      id: 8,
      section: "Risk Premium Basics",
      question: "Which of the following does NOT directly affect risk premium?",
      options: [
        "a) Frequency",
        "b) Severity",
        "c) Expense loadings",
        "d) Exposure"
      ],
      correctAnswer: "c) Expense loadings",
      explanation:
        "Expenses are excluded from risk premium; they come in office premium."
    },
    {
      id: 9,
      section: "Office Premium & Loadings",
      question: "The office premium is obtained by:",
      options: [
        "a) Adding risk premium + expenses + commission + profit margin",
        "b) Subtracting IBNR from gross claims",
        "c) Multiplying risk premium by loss ratio",
        "d) Adding UPR to earned premium"
      ],
      correctAnswer:
        "a) Adding risk premium + expenses + commission + profit margin",
      explanation:
        "Office premium = risk premium plus loadings for expenses, commissions, and profit."
    },
    {
      id: 10,
      section: "Office Premium & Loadings",
      question:
        "An insurer's risk premium for motor policies is 10,000. To achieve a combined ratio of 95%, what office premium should be charged (assuming expenses are 20% and commission are 15% of premium)?",
      options: ["a) 12,500", "b) 13,158", "c) 10,526", "d) 16,667"],
      correctAnswer: "d) 16,667",
      explanation:
        "Premium = 10,000 ÷ (1 – 0.20 – 0.15 – 0.05) = 16,667."
    },
    {
      id: 11,
      section: "Office Premium & Loadings",
      question:
        "Why is profit loading in office premium often expressed as a percentage of risk premium rather than expenses?",
      options: [
        "a) To align profitability with claims risk",
        "b) To simplify solvency reporting",
        "c) To avoid regulatory scrutiny",
        "d) To ensure commissions remain constant"
      ],
      correctAnswer: "a) To align profitability with claims risk",
      explanation: "Profit is proportional to claims risk, not expenses."
    },
    {
      id: 12,
      section: "Office Premium & Loadings",
      question:
        "Which of the following presents the greatest challenge when transitioning from risk premium to office premium?",
      options: [
        "a) Stability of frequency estimates",
        "b) Volatility of severity due to inflation",
        "c) Allocation and forecasting of expenses and commissions",
        "d) Measuring exposure consistently"
      ],
      correctAnswer:
        "c) Allocation and forecasting of expenses and commissions",
      explanation:
        "Expenses and commissions are highly judgmental and can vary significantly."
    }
  ]
};
