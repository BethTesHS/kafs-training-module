export const module3Data = {
  id: 3,
  title: "Liability for Remaining Coverage (LRC)",
  shortDescription: "Master the calculation and analysis of Liability for Remaining Coverage under IFRS 17. Learn to calculate Unearned Premium Reserve, Earned Premium, Deferred Acquisition Costs, and perform comprehensive LRC roll-forward calculations.",
  themeColor: "green",
  objectives: {
    intro: "This module aims to equip learners with practical skills in calculating and analyzing the Liability for Remaining Coverage (LRC). By the end of the module, participants will be able to determine Unearned Premium Reserve (UPR), calculate Earned Premium, apply Deferred Acquisition Costs (DAC), and derive the LRC using real insurance data. This will strengthen the accuracy of actuarial valuations, improve the reliability of financial reporting, and support compliance with IFRS 17 requirements.",
    points: [],
    closing: ""
  },
  learningOutcomes: [
    "Understand the purpose and definitions of Unearned Premium Reserve (UPR), Earned Premium, Deferred Acquisition Costs (DAC), and Liability for Remaining Coverage (LRC) under IFRS 17.",
    "Explain the interrelationship between UPR, Earned Premium, DAC, and LRC in the context of insurance contract liabilities and revenue recognition.",
    "Apply practical methods, such as the 365th method, to calculate UPR and Earned Premium, and demonstrate how these flow into LRC.",
    "Calculate unamortized DAC and incorporate it into the roll-forward calculation of LRC balances.",
    "Perform step-by-step LRC roll-forward calculations using worked examples, linking premium receivables, written premium, earned premium, UPR, and DAC.",
    "Interpret results to ensure compliance with IFRS 17 and produce financial statements that fairly represent insurance contract liabilities."
  ],
  courseContent: {
    description: "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master Liability for Remaining Coverage (LRC) Analysis. Download and use them as your primary references throughout the module.",
    resources: [
      {
        id: 1,
        title: "LRC Internal Technical Procedure",
        description: "KAFS ITP Liability for Remaining Coverage - DOCX • 30 pages • Comprehensive guide",
        icon: "📄",
        downloadUrl: "/Training Modules/Module 3_LRC/Course Content/KAFS_Internal Technical Procedures_Liability for Remaining Coverage Analysis_2025.docx",
        fileName: "KAFS_Internal Technical Procedures_Liability for Remaining Coverage Analysis_2025.docx"
      }
    ],
    aboutText: {
      title: "About This Document:",
      content: "Kenbright Actuarial and Financial Services Limited - Liability for Remaining Coverage Internal Technical Procedures (Version 1.0). This 30-page manual covers:",
      topics: [
        "IFRS 17 requirements for LRC calculation",
        "Step-by-step UPR and Earned Premium calculations",
        "DAC amortization methods and principles",
        "Comprehensive LRC roll-forward calculations",
        "Practical examples and implementation guidance"
      ]
    }
  },
  assignments: {
    dataFiles: [
      {
        id: 1,
        title: "Premium Register Data",
        description: "Premium Register 31-12-2024.xlsx • Year-end premium data",
        icon: "📊",
        downloadUrl: "/Training Modules/Module 3_LRC/Data/Premium Register_31_12_2024.xlsx",
        fileName: "Premium Register 31-12-2024.xlsx"
      }
    ],
    workingFiles: [
      {
        id: 1,
        title: "LRC Analysis Template",
        description: "LRC Analysis.xlsx • Comprehensive LRC calculation workbook",
        icon: "🛠️",
        downloadUrl: "/Training Modules/Module 3_LRC/Working Files/LRC_Analysis.xlsx",
        fileName: "LRC Analysis Template.xlsx"
      },
      {
        id: 2,
        title: "UPR, GEP & DAC Analysis Template",
        description: "UPR, GEP & DAC Analysis.xlsx • Component calculations workbook",
        icon: "⚙️",
        downloadUrl: "/Training Modules/Module 3_LRC/Working Files/UPR,GEP & DAC_Analysis.xlsx",
        fileName: "UPR, GEP & DAC Analysis Template.xlsx"
      }
    ]
  },

  aiQuizQuestions: [
    {
      id: "aq1",
      question: "Explain the concept of Unearned Premium Reserve (UPR) and describe step-by-step how you would calculate UPR using the 365th method for a portfolio of insurance contracts.",
      hint: "Consider how the 365th method allocates premium to each day of coverage and how the unexpired portion at the valuation date forms the UPR."
    },
    {
      id: "aq2",
      question: "Describe the relationship between Earned Premium, Written Premium, and UPR. How does earned premium flow into the LRC roll-forward calculation under IFRS 17?",
      hint: "Think about the formula: Earned Premium = Written Premium + Opening UPR − Closing UPR, and how this connects to revenue recognition."
    },
    {
      id: "aq3",
      question: "What are Deferred Acquisition Costs (DAC) and why must they be incorporated into the LRC calculation? Explain how DAC amortization works over the coverage period.",
      hint: "Focus on how acquisition costs are deferred and amortized in proportion to the earning of premiums, reducing the LRC balance."
    },
    {
      id: "aq4",
      question: "Perform a conceptual LRC roll-forward from the opening to closing balance. Identify each component that increases or decreases the LRC and explain why.",
      hint: "Consider premium receivables, written premium, earned premium, UPR movements, and DAC as the key components of the roll-forward."
    },
    {
      id: "aq5",
      question: "Why is accurate LRC measurement critical for IFRS 17 compliance and financial reporting? Discuss the consequences of misstating the LRC on an insurer's financial statements.",
      hint: "Think about how LRC affects the balance sheet (insurance contract liabilities) and income statement (insurance revenue recognition)."
    }
  ],

  quizTitle: "Quiz: Liability for Remaining Coverage (LRC)",
  quizQuestions: [
    {
      id: 1,
      section: "IFRS 17 LRC Fundamentals",
      question: "What does the Liability for Remaining Coverage (LRC) represent under IFRS 17?",
      options: [
        "A) Claims that have already been reported",
        "B) Obligation to provide coverage for future insured events",
        "C) Premiums that have been fully earned",
        "D) Reinsurance recoveries from ceded business"
      ],
      correctAnswer: "B) Obligation to provide coverage for future insured events",
      explanation: "LRC represents the obligation for unexpired coverage, i.e., the insurer's liability to provide services for future insured events not yet occurred."
    },
    {
      id: 2,
      section: "IFRS 17 LRC Fundamentals",
      question: "Which IFRS 17 paragraph directly requires measurement of the LRC as the obligation to provide future coverage?",
      options: [
        "A) Paragraph 38",
        "B) Paragraph 44",
        "C) Paragraph 55(a)",
        "D) Paragraph B126"
      ],
      correctAnswer: "A) Paragraph 38",
      explanation: "IFRS 17 paragraph 38 requires the measurement of LRC as the obligation to provide coverage for insured events in future periods."
    },
    {
      id: 3,
      section: "IFRS 17 LRC Measurement",
      question: "According to IFRS 17, which component is deducted from premiums received when measuring LRC?",
      options: [
        "A) Risk adjustment",
        "B) Claims liability",
        "C) Insurance revenue already recognized",
        "D) Acquisition cash flows"
      ],
      correctAnswer: "D) Acquisition cash flows",
      explanation: "IFRS 17 paragraph 55(b)(i) requires deducting acquisition cash flows from premiums received when calculating LRC."
    },
    {
      id: 4,
      section: "IFRS 17 LRC Measurement",
      question: "At initial recognition, LRC is measured as:",
      options: [
        "A) Expected claims plus expenses",
        "B) Premiums received minus acquisition cash flows",
        "C) Unearned premiums only",
        "D) Risk adjustment plus CSM"
      ],
      correctAnswer: "B) Premiums received minus acquisition cash flows",
      explanation: "At initial recognition, LRC = premiums received (or receivable) minus acquisition cash flows."
    },
    {
      id: 5,
      section: "IFRS 17 LRC Measurement",
      question: "At subsequent measurement, which of the following is subtracted from LRC?",
      options: [
        "A) Unearned Premium Reserve (UPR)",
        "B) Insurance revenue recognized for services provided",
        "C) Risk margin",
        "D) Reinsurance recoveries"
      ],
      correctAnswer: "B) Insurance revenue recognized for services provided",
      explanation: "As coverage is provided, revenue is recognized and deducted from the LRC balance."
    },
    {
      id: 6,
      section: "LRC Roll-Forward",
      question: "The roll-forward of LRC starts with:",
      options: [
        "A) Opening LRC",
        "B) Closing liability for incurred claims",
        "C) Premium receivables only",
        "D) Cash collected"
      ],
      correctAnswer: "A) Opening LRC",
      explanation: "Roll-forward starts with opening LRC, then adjusts for premiums, revenue, and acquisition cash flows."
    },
    {
      id: 7,
      section: "LRC Components",
      question: "In the component view, Unearned Premium Reserve (UPR) represents:",
      options: [
        "A) Claims already paid",
        "B) Future coverage yet to be provided",
        "C) Risk adjustment on incurred claims",
        "D) Reinsurance recoverables"
      ],
      correctAnswer: "B) Future coverage yet to be provided",
      explanation: "UPR represents the portion of premiums allocated to unexpired risk, i.e., coverage yet to be provided."
    },
    {
      id: 8,
      section: "LRC Calculation",
      question: "How should premium receivables be treated under IFRS 17 when measuring LRC?",
      options: [
        "A) Excluded completely",
        "B) Counted only when cash is received",
        "C) Included as part of total premiums due",
        "D) Treated as a reinsurance asset"
      ],
      correctAnswer: "C) Included as part of total premiums due",
      explanation: "IFRS 17 allows inclusion of both received premiums and receivables in measuring LRC."
    },
    {
      id: 9,
      section: "LRC Calculation",
      question: "Which of the following increases LRC?",
      options: [
        "A) Premiums received in cash",
        "B) Insurance revenue recognized",
        "C) Expired coverage period",
        "D) Claims paid"
      ],
      correctAnswer: "A) Premiums received in cash",
      explanation: "Premiums received increase the liability for remaining coverage until they are earned."
    },
    {
      id: 10,
      section: "DAC Treatment",
      question: "Acquisition cash flows affect LRC by:",
      options: [
        "A) Increasing it",
        "B) Decreasing it",
        "C) Having no effect",
        "D) Shifting it to LIC"
      ],
      correctAnswer: "B) Decreasing it",
      explanation: "Acquisition cash flows (commissions, expenses) are deducted from LRC per IFRS 17 paragraph 38."
    },
    {
      id: 11,
      section: "LRC Analysis",
      question: "A negative LRC balance typically arises when:",
      options: [
        "A) Premium receivables are higher than gross written premiums",
        "B) Claims exceed premiums",
        "C) Acquisition costs are refunded",
        "D) Premium allocation approach is not applied"
      ],
      correctAnswer: "A) Premium receivables are higher than gross written premiums",
      explanation: "A negative LRC can arise if receivables exceed the recognized premiums."
    },
    {
      id: 12,
      section: "LRC Analysis",
      question: "How should negative LRC be interpreted?",
      options: [
        "A) It is an error and must be corrected",
        "B) It reflects an asset position from premium receivables",
        "C) It means claims are under-reserved",
        "D) It requires immediate profit recognition"
      ],
      correctAnswer: "B) It reflects an asset position from premium receivables",
      explanation: "Negative LRC indicates an asset position when premium receivables are greater than premiums due."
    },
    {
      id: 13,
      section: "Premium Calculation",
      question: "Given: Policy Start = Jan 1, 2025; End = Dec 31, 2025; Valuation Date = Mar 31, 2025. Expired Period = ?",
      options: [
        "A) 30 days",
        "B) 60 days",
        "C) 90 days",
        "D) 365 days"
      ],
      correctAnswer: "C) 90 days",
      explanation: "Using formula Expired = max(0, min(Valuation Date, End Date) – Start Date + 1) → (Mar 31 – Jan 1 + 1) = 90 days."
    },
    {
      id: 14,
      section: "Premium Calculation",
      question: "Policy duration is calculated as:",
      options: [
        "A) End Date – Start Date",
        "B) End Date – Start Date + 1",
        "C) Expired Period ÷ 2",
        "D) Premium ÷ Days"
      ],
      correctAnswer: "B) End Date – Start Date + 1",
      explanation: "Policy duration = Policy End Date – Policy Start Date + 1."
    },
    {
      id: 15,
      section: "UPR Calculation",
      question: "If total premium is 120,000 for a 12-month policy, and 3 months have expired, what is the Unearned Premium Reserve (UPR)?",
      options: [
        "A) 30,000",
        "B) 90,000",
        "C) 120,000",
        "D) 60,000"
      ],
      correctAnswer: "B) 90,000",
      explanation: "Earned premium = 120,000 × (3/12) = 30,000. UPR = 120,000 – 30,000 = 90,000."
    }
  ]
};
