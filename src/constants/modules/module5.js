export const module5Data = {
  id: 5,
  title: "Capital Adequacy Analysis",
  shortDescription: "Master capital adequacy assessment as mandated by the Insurance Regulatory Authority (IRA) in Kenya. Learn to calculate Available Capital, Required Capital, and Capital Adequacy Ratio for both life and general insurance companies.",
  themeColor: "cyan",
  objectives: {
    intro: "This module equips learners with a practical understanding of capital adequacy as mandated by the Insurance Regulatory Authority (IRA) in Kenya. It covers both life and general insurance frameworks, emphasizing how capital adequacy safeguards policyholder interests, supports solvency, and informs strategic decision-making.",
    points: [],
    closing: ""
  },
  learningOutcomes: [
    "Explain the concept of capital adequacy in insurance.",
    "Define and calculate an insurer's Available Capital and Required Capital in accordance with IRA guidelines.",
    "Understand the minimum capital requirements for life and general insurers.",
    "Complete CAR template for both life and general insurers and interpret the results.",
    "Describe the supervisory and enforcement actions the IRA can take in cases of non-compliance."
  ],
  courseContent: {
    description: "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master Capital Adequacy Analysis. Download and use them as your primary references throughout the module.",
    resources: [
      {
        id: 1,
        title: "Capital Adequacy Technical Procedure",
        description: "KAFS ITP Guidelines on Capital Adequacy Analysis - PDF • 22 pages",
        icon: "📄",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Course Content/KAFS_Internal Technical Procedures_Guidelines on Capital Adequacy Analysis_2026.pdf",
        fileName: "KAFS ITP Capital Adequacy Analysis 2026.pdf"
      }
    ],
    additionalResources: [
      {
        id: 1,
        title: "IRA Guidelines On Capital Adequacy",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Additional Resources/Draft_Risk_Based_Capital_Adequacy1.pdf",
        fileName: "Draft Risk Based Capital Adequacy.pdf",
        color: "blue"
      },
      {
        id: 2,
        title: "The Insurance Valuation of Technical Provisions for General Insurance Business Guidelines 2017",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Additional Resources/The Insurance Valuation of Technical Provisions for General Insurance Business Guidelines 2017 (1).pdf",
        fileName: "The Insurance Valuation of Technical Provisions for General Insurance Business Guidelines 2017.pdf",
        color: "green"
      }
    ],
    aboutText: {
      title: "About This Module:",
      content: "This module covers capital adequacy framework in Kenya under IRA guidelines, including calculation of Available Capital, Required Capital, Capital Adequacy Ratio, and supervisory actions.",
      topics: [
        "Tier 1 and Tier 2 capital components",
        "Inadmissible assets and deductions",
        "Available Capital calculation",
        "Insurance, market, and credit risk charges",
        "Operational risk capital",
        "Capital Adequacy Ratio computation and interpretation",
        "Supervisory action thresholds"
      ]
    }
  },
  assignments: {
    dataFiles: [
      {
        id: 1,
        title: "General Insurance Balance Sheet",
        description: "Sample Balance Sheet_GI.xlsx • Practice dataset",
        icon: "📊",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Data/Sample Balance Sheet_GI.xlsx",
        fileName: "Sample Balance Sheet_GI.xlsx"
      },
      {
        id: 2,
        title: "Life Insurance Balance Sheet",
        description: "Sample Balance Sheet_Life.xlsx • Practice dataset",
        icon: "📊",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Data/Sample Balance Sheet_Life.xlsx",
        fileName: "Sample Balance Sheet_Life.xlsx"
      }
    ],
    workingFiles: [
      {
        id: 1,
        title: "General Insurance CAR Template",
        description: "IFRS 17 CAR Template_GI.xlsx • Comprehensive calculation workbook",
        icon: "🛠️",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Working Files/IFRS 17 CAR Template_GI.xlsx",
        fileName: "IFRS 17 CAR Template_GI.xlsx"
      },
      {
        id: 2,
        title: "Life Insurance CAR Template",
        description: "IFRS 17 CAR Template_Life.xlsx • Comprehensive calculation workbook",
        icon: "🛠️",
        downloadUrl: "/Training Modules/Module 5_Capital Adequacy/Working Files/IFRS 17 CAR Template_Life.xlsx",
        fileName: "IFRS 17 CAR Template_Life.xlsx"
      }
    ]
  },
  quizTitle: "Quiz: Capital Adequacy Analysis",
  quizQuestions: [
    {
      id: 1,
      section: "Capital Adequacy Basics",
      question: "According to the IRA's guidelines, what is the minimum required Capital Adequacy Ratio (CAR) an insurer must maintain?",
      options: [
        "A. 150% of the PCR",
        "B. 100% of the MCR",
        "C. 200% of the MCR",
        "D. 50% of the MCR"
      ],
      correctAnswer: "B. 100% of the MCR",
      explanation: "The IRA requires insurers to maintain a CAR at least equal to 100% of the Minimum Capital Requirement (MCR) to ensure solvency."
    },
    {
      id: 2,
      section: "Capital Components",
      question: "An insurer's Available Capital is calculated by summing Tier 1 and Tier 2 capital. What must then be done to this total?",
      options: [
        "A. Add all fixed assets.",
        "B. Add Deferred Acquisition Costs (DAC).",
        "C. Deduct any inadmissible assets.",
        "D. Deduct all statutory reserves."
      ],
      correctAnswer: "C. Deduct any inadmissible assets.",
      explanation: "Inadmissible assets (like furniture, intangibles) do not qualify as capital backing liabilities, so they must be deducted."
    },
    {
      id: 3,
      section: "Capital Components",
      question: "Which of the following is considered the highest quality and most loss-absorbent form of an insurer's capital?",
      options: [
        "A. Tier 2 Capital",
        "B. Revaluation reserves",
        "C. Tier 1 Capital",
        "D. Subordinated loans"
      ],
      correctAnswer: "C. Tier 1 Capital",
      explanation: "Tier 1 capital (e.g., ordinary shares, retained earnings) is permanent and fully loss-absorbing, making it the highest-quality capital."
    },
    {
      id: 4,
      section: "Asset Concentration",
      question: "A life insurer has 60% of its total assets invested in immovable property. Based on the concentration limits, what action would the IRA most likely take?",
      options: [
        "A. The insurer would be considered comfortable and would not face any supervisory action.",
        "B. The insurer would be in breach of the concentration limit and would need to submit a remedial plan.",
        "C. The insurer would be in breach of the limit and would be required to dispose of the excess property immediately.",
        "D. This is acceptable, as life insurers are not subject to concentration limits."
      ],
      correctAnswer: "B. The insurer would be in breach of the concentration limit and would need to submit a remedial plan.",
      explanation: "IRA imposes concentration limits on investments. Breach requires corrective action, not immediate disposal."
    },
    {
      id: 5,
      section: "Risk Charges",
      question: "What is the primary purpose of the capital required for credit risk?",
      options: [
        "A. To cushion against losses from failed processes and systems.",
        "B. To protect against volatility in the market prices of assets.",
        "C. To cover against adverse experience relative to technical provisions.",
        "D. To cushion against losses from a counterparty default."
      ],
      correctAnswer: "D. To cushion against losses from a counterparty default.",
      explanation: "Credit risk capital protects against losses if counterparties (like reinsurers or debtors) fail to meet obligations."
    },
    {
      id: 6,
      section: "Risk-Based Capital",
      question: "An insurer's Required Capital (Risk Based Capital) is computed as?",
      options: [
        "A. The sum of all individual risk charges.",
        "B. The square root of the sum of the squares of the capital for insurance, market, and credit risk, plus the capital for operational risk.",
        "C. The sum of the capital for insurance, market, and credit risk, minus diversification benefits.",
        "D. The sum of insurance, market, and credit risk, plus operational risk, with diversification benefits applied."
      ],
      correctAnswer: "B. The square root of the sum of the squares of the capital for insurance, market, and credit risk, plus the capital for operational risk.",
      explanation: "RBC uses a square-root formula to account for correlations among risks, ensuring diversification effects are recognized."
    },
    {
      id: 7,
      section: "Operational Risk",
      question: "What is the formula for calculating Operational Risk Capital?",
      options: [
        "A. 1% of the gross earned premium over the last 12 months.",
        "B. The lower of 30% of the square root of the sum of the squares of capital for insurance, market, and credit risk, or 3% of the gross earned premium.",
        "C. 3% of the last year's Net Earned Premium.",
        "D. The higher of 30% of the square root of the sum of the squares of capital for insurance, market, and credit risk; or 3% of the gross earned premium over the last 12 months."
      ],
      correctAnswer: "D. The higher of 30% of the square root of the sum of the squares of capital for insurance, market, and credit risk; or 3% of the gross earned premium over the last 12 months.",
      explanation: "IRA requires operational risk capital to be conservatively calculated as the higher of these two amounts."
    },
    {
      id: 8,
      section: "Diversification",
      question: "Under the IRA's framework, what does 'diversification benefits' represent?",
      options: [
        "A. The increase in total capital required due to different risks being correlated.",
        "B. The reduction in total capital required because risks are not perfectly correlated.",
        "C. A flat fee applied to all insurers to account for unexpected losses.",
        "D. An extra cushion of capital an insurer must hold to cover adverse scenarios."
      ],
      correctAnswer: "B. The reduction in total capital required because risks are not perfectly correlated.",
      explanation: "Diversification reduces overall capital needs since not all risks will crystallize simultaneously."
    },
    {
      id: 9,
      section: "Minimum Capital",
      question: "What is the Minimum Capital Requirement (MCR) for a life insurer in Kenya?",
      options: [
        "A. KES 600 million",
        "B. KES 400 million",
        "C. KES 800 million",
        "D. KES 200 million"
      ],
      correctAnswer: "B. KES 400 million",
      explanation: "The IRA prescribes a statutory minimum of KES 400 million for life insurers."
    },
    {
      id: 10,
      section: "Tier 1 Capital",
      question: "Which of the following would be classified as a Tier 1 capital component for an insurer?",
      options: [
        "A. Subordinated loans",
        "B. Fair value reserves for financial assets",
        "C. Irredeemable preference shares",
        "D. Fully paid-up ordinary shares"
      ],
      correctAnswer: "D. Fully paid-up ordinary shares",
      explanation: "Ordinary shares are the strongest form of Tier 1 capital because they are permanent and fully loss-absorbing."
    },
    {
      id: 11,
      section: "Market Risk",
      question: "An insurer's capital required for market risk is intended to cushion against which of the following?",
      options: [
        "A. Volatility in the market prices of assets.",
        "B. Losses from a reinsurer failing to pay a claim.",
        "C. Failed internal processes, systems, and people.",
        "D. Unexpected losses from adverse experience related to technical provisions."
      ],
      correctAnswer: "A. Volatility in the market prices of assets.",
      explanation: "Market risk capital protects against adverse movements in asset prices, interest rates, or exchange rates."
    },
    {
      id: 12,
      section: "Inadmissible Assets",
      question: "Which of the following is an example of an asset that must be fully deducted from an insurer's capital?",
      options: [
        "A. Statutory Reserves",
        "B. Retained profits",
        "C. Office equipment",
        "D. Capital loan stocks"
      ],
      correctAnswer: "C. Office equipment",
      explanation: "Physical assets like office furniture and equipment are inadmissible as they cannot back liabilities."
    },
    {
      id: 13,
      section: "Supervisory Actions",
      question: "If an insurer's CAR is between 110% and 150%, what is the required supervisory action from the insurer?",
      options: [
        "A. Submit an acceptable remedial plan to the IRA.",
        "B. Submit a recovery plan.",
        "C. No action is required as the company is considered financially sound.",
        "D. Immediately cease all new business."
      ],
      correctAnswer: "A. Submit an acceptable remedial plan to the IRA.",
      explanation: "If CAR falls in this range, insurers must submit a plan showing how they will restore capital adequacy."
    },
    {
      id: 14,
      section: "Catastrophe Risk",
      question: "What is the capital charge for catastrophe risk for a general insurer?",
      options: [
        "A. 2% of the total assets.",
        "B. 2% of the previous year's Net Earned Premium.",
        "C. A charge of 1% of the fund amount.",
        "D. This is covered under the insurance risk charge and has no separate calculation."
      ],
      correctAnswer: "B. 2% of the previous year's Net Earned Premium.",
      explanation: "General insurers must hold a catastrophe risk charge equal to 2% of the last year's net earned premium."
    }
  ]
};
