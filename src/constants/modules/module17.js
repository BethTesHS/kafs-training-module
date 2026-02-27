export const module17Data = {
  id: 17,
  title: "IFRS 17 Insurance Contracts",
  shortDescription: "Master end-to-end application of IFRS 17. Learn to classify contracts, select measurement models, calculate fulfilment cash flows, manage CSM, test for onerous contracts, account for reinsurance, and produce compliant financial statements and disclosures.",
  themeColor: "cyan",

  objectives: {
    intro: "This module aims to equip learners with the necessary skills to apply IFRS 17 end-to-end. This includes classifying contracts, selecting the right measurement model, modelling fulfilment cash flows (including discounting and risk adjustment), managing Contractual Service Margin (CSM) and coverage units, testing onerous contracts, accounting for reinsurance held, and producing compliant statements, journals, and disclosures.",
    points: [
      "Determine contract scope/boundaries and assign portfolios and annual-cohort groups.",
      "Select and justify GMM/BBA, PAA, or VFA based on product features.",
      "Build fulfilment cash flows and discount curves (including illiquidity premium choices).",
      "Quantify Risk Adjustment (RA) and explain confidence-level disclosures.",
      "Calculate and roll forward the CSM; define coverage units and recognize revenue.",
      "Identify and measure onerous contracts and track the loss component.",
      "Account for reinsurance held (initial net gain/loss, subsequent measurement).",
      "Apply transition approaches (FRS/MRS/FV) and document policy elections.",
      "Map movements to the Statement of Profit or Loss and Statement of Financial Position and prepare required IFRS 17 disclosures."
    ],
    closing: "By the end of this module, you will have practical competence in applying IFRS 17 across all insurance contract types and scenarios."
  },

  learningOutcomes: [
    "Determine contract scope/boundaries and assign portfolios and annual-cohort groups.",
    "Select and justify GMM/BBA, PAA, or VFA based on product features.",
    "Build fulfilment cash flows and discount curves (including illiquidity premium choices).",
    "Quantify Risk Adjustment (RA) and explain confidence-level disclosures.",
    "Calculate and roll forward the CSM; define coverage units and recognize revenue.",
    "Identify and measure onerous contracts and track the loss component.",
    "Account for reinsurance held (initial net gain/loss, subsequent measurement).",
    "Apply transition approaches (FRS/MRS/FV) and document policy elections.",
    "Map movements to the Statement of Profit or Loss and Statement of Financial Position and prepare required IFRS 17 disclosures."
  ],

  courseContent: {
    description: "This module is guided by comprehensive technical documents and the IFRS 17 standard itself. They contain all the instructions, worked examples, and exercises you need to master IFRS 17 Insurance Contracts. Download and use them as your primary references throughout the module.",
    resources: [
      {
        title: "IFRS 17 Insurance Contracts Standard",
        description: "IFRS17 Insurance Contracts.pdf",
        url: "/Training Modules/Module-17-IFRS-17/Course Content/IFRS17 Insurance Contracts.pdf",
        type: "document",
        icon: "📄"
      }
    ],
    additionalResources: [
      {
        title: "Implementation of IFRS-17 Standard - Regulatory Circular",
        description: "Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf",
        url: "/Training Modules/Module-17-IFRS-17/Additional Resources/Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf",
        type: "guidelines",
        icon: "📋"
      }
    ]
  },

  assignments: {
    dataFiles: [
      {
        title: "IFRS 4 Balance Sheet Data",
        description: "IFRS4_BalanceSheet.pdf",
        url: "/Training Modules/Module-17-IFRS-17/Data/IFRS4_BalanceSheet.pdf",
        type: "document"
      }
    ],
    workingFiles: [
      {
        title: "IFRS 17 Balance Sheet Working File",
        description: "Balance Sheet_IFRS_17_Working File.xlsx",
        url: "/Training Modules/Module-17-IFRS-17/Working Files/Balance Sheet_IFRS_17_Working File.xlsx",
        type: "template"
      }
    ]
  },

  quizTitle: "Quiz: IFRS 17 Insurance Contracts",

  quizQuestions: [
    {
      id: 1,
      section: "IFRS 17 Fundamentals",
      question: "What is the primary objective of IFRS 17?",
      options: [
        "A. To provide consistent accounting for insurance contracts",
        "B. To increase insurance premiums",
        "C. To reduce insurance liabilities",
        "D. To eliminate reinsurance accounting"
      ],
      correctAnswer: "A. To provide consistent accounting for insurance contracts",
      explanation: "IFRS 17 aims to provide a consistent, principle-based approach to accounting for insurance contracts across all insurers."
    },
    {
      id: 2,
      section: "Measurement Models",
      question: "Which of the following is NOT one of the three measurement models under IFRS 17?",
      options: [
        "A. General Measurement Model (GMM)",
        "B. Premium Allocation Approach (PAA)",
        "C. Variable Fee Approach (VFA)",
        "D. Cash Flow Matching Model (CFM)"
      ],
      correctAnswer: "D. Cash Flow Matching Model (CFM)",
      explanation: "The three measurement models under IFRS 17 are GMM (also called BBA), PAA, and VFA."
    },
    {
      id: 3,
      section: "Contractual Service Margin",
      question: "The Contractual Service Margin (CSM) represents:",
      options: [
        "A. The expected profit from a group of insurance contracts",
        "B. The loss component of onerous contracts",
        "C. The risk adjustment for non-financial risk",
        "D. The discount on future cash flows"
      ],
      correctAnswer: "A. The expected profit from a group of insurance contracts",
      explanation: "CSM represents the unearned profit that will be recognized as services are provided over the coverage period."
    },
    {
      id: 4,
      section: "Premium Allocation Approach",
      question: "Which approach is typically used for short-term insurance contracts (≤ 1 year)?",
      options: [
        "A. General Measurement Model",
        "B. Premium Allocation Approach",
        "C. Variable Fee Approach",
        "D. All of the above"
      ],
      correctAnswer: "B. Premium Allocation Approach",
      explanation: "PAA is a simplified approach allowed for contracts with coverage periods of one year or less."
    },
    {
      id: 5,
      section: "Risk Adjustment",
      question: "Risk Adjustment (RA) under IFRS 17 primarily compensates for:",
      options: [
        "A. Credit risk",
        "B. Market risk",
        "C. Non-financial risk",
        "D. Currency risk"
      ],
      correctAnswer: "C. Non-financial risk",
      explanation: "Risk Adjustment represents the compensation the entity requires for bearing the uncertainty about the amount and timing of cash flows from non-financial risk."
    },
    {
      id: 6,
      section: "Onerous Contracts",
      question: "An insurance contract is considered onerous when:",
      options: [
        "A. Expected claims exceed premiums",
        "B. Expected cash outflows exceed expected cash inflows",
        "C. CSM is negative",
        "D. All of the above"
      ],
      correctAnswer: "D. All of the above",
      explanation: "An onerous contract occurs when expected outflows exceed inflows, resulting in a loss component."
    },
    {
      id: 7,
      section: "Transition",
      question: "Which transition approach allows entities to apply IFRS 17 retrospectively?",
      options: [
        "A. Full Retrospective Approach",
        "B. Modified Retrospective Approach",
        "C. Fair Value Approach",
        "D. Both a and b"
      ],
      correctAnswer: "D. Both a and b",
      explanation: "Entities can choose between Full Retrospective Approach or Modified Retrospective Approach for transition."
    },
    {
      id: 8,
      section: "Fulfilment Cash Flows",
      question: "The fulfilment cash flows under IFRS 17 include:",
      options: [
        "A. Estimates of future cash flows",
        "B. Discount adjustment",
        "C. Risk adjustment",
        "D. All of the above"
      ],
      correctAnswer: "D. All of the above",
      explanation: "Fulfilment cash flows = estimates of future cash flows + discount adjustment + risk adjustment."
    }
  ]
};
