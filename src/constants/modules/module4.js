export const module4Data = {
  id: 4,
  title: "Valuation, Discounting and Risk Margin Analysis",
  shortDescription: "Learn how to perform general insurance reserve valuations using both traditional actuarial methods and IFRS 17 principles. This module builds practical skills in estimating outstanding claims, applying discounting and risk margin techniques, analysing reserve adequacy, and interpreting valuation results.",
  themeColor: "orange",
  objectives: {
    intro: "The objective of this module is to equip participants with the knowledge and practical skills required to perform general insurance reserve valuations in line with both traditional actuarial practices and IFRS 17 requirements. By the end of the training, participants will be able to:",
    points: [],
    closing: ""
  },
  learningOutcomes: [
    "Explain the role and importance of reserves in general insurance and the regulatory/IFRS 17 context",
    "Identify different reserving methods (e.g., Chain Ladder, Bornhuetter-Ferguson, Expected Loss Ratio) and when to apply each",
    "Perform calculations to estimate outstanding claims reserves using appropriate actuarial techniques",
    "Calculate the risk margin in line with IFRS 17 requirements",
    "Apply discounting techniques to insurance cashflows to derive present values under IFRS 17",
    "Analyse valuation results, assess reserve adequacy, and interpret key drivers of change",
    "Demonstrate how sensitivity testing and scenario analysis can be used to evaluate reserve uncertainty",
    "Communicate reserving results, assumptions, and limitations effectively to non-technical stakeholders"
  ],
  courseContent: {
    description: "Access comprehensive guidelines, regulations, and training materials for mastering reserve valuation, discounting, and risk margin analysis under IFRS 17.",
    resources: [
      {
        id: 1,
        title: "KAFS Internal Technical Procedures - Guidelines on Valuation for General Insurance Business",
        description: "Liability Valuation for General Insurance • 24 pages",
        icon: "📄",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Course Content/KAFS_Internal Technical Procedures_Guidelines on Valuation for General Insurance Business_2025.docx",
        fileName: "KAFS Internal Technical Procedures - Guidelines on Valuation for General Insurance Business.pdf"
      }
    ],
    additionalResources: [
      {
        id: 1,
        title: "IFRS 17 Implementation Circular",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Additional Resources/Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf",
        fileName: "Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf",
        color: "blue"
      },
      {
        id: 2,
        title: "IFRS 17 Insurance Contracts",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Additional Resources/ifrs-17-insurance-contracts.pdf",
        fileName: "ifrs-17-insurance-contracts.pdf",
        color: "purple"
      },
      {
        id: 3,
        title: "General Insurance Technical Provisions Valuation Guidelines (2017)",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Additional Resources/The Insurancce (Valuation of Technical Provisions for General Insurance Business) Guidelines 2017.pdf",
        fileName: "The Insurance (Valuation of Technical Provisions for General Insurance Business) Guidelines 2017.pdf",
        color: "green"
      }
    ],
    aboutText: {
      title: "About This Module:",
      content: "This module covers reserve valuation for general insurance business, including IBNR calculations, outstanding claims analysis, discounting methods, and risk margin determination under IFRS 17.",
      topics: [
        "Outstanding claims reserve estimation",
        "IBNR (Incurred But Not Reported) calculations",
        "Chain Ladder and other actuarial methods",
        "Discounting and present value calculations",
        "Risk margin under IFRS 17",
        "Sensitivity analysis and reserve adequacy testing"
      ]
    }
  },
  assignments: {
    dataFiles: [
      {
        id: 1,
        title: "Premium Register",
        description: "Excel • Premium data for reserve analysis",
        icon: "📊",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Data/Premium Register_TRAINING.xlsx",
        fileName: "Premium Register_TRAINING.xlsx"
      },
      {
        id: 2,
        title: "Claims Paid",
        description: "Excel • Historical paid claims data",
        icon: "💰",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Data/Claims Paid_TRAINING.xlsx",
        fileName: "Claims Paid_TRAINING.xlsx"
      },
      {
        id: 3,
        title: "Claims Outstanding",
        description: "Excel • Reported claims awaiting settlement",
        icon: "📈",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Data/Claims Outstanding_TRAINING.xlsx",
        fileName: "Claims Outstanding_TRAINING.xlsx"
      },
      {
        id: 4,
        title: "NSE Yield Curve",
        description: "Excel • Discount rates for IFRS 17 calculations",
        icon: "📉",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Data/FY24_NSE Yield Curve.xlsx",
        fileName: "FY24_NSE Yield Curve.xlsx"
      }
    ],
    workingFiles: [
      {
        id: 1,
        title: "IBNR Computation Training",
        description: "Excel • IBNR Computation Training",
        icon: "🛠️",
        downloadUrl: "/Training Modules/Module 4_General Insurance Valuation/Working Files/IBNR Computation Training.xlsx",
        fileName: "IBNR Computation Training.xlsx"
      }
    ]
  },

  aiQuizQuestions: [
    {
      id: "aq1",
      question: "Compare and contrast the Chain Ladder method and the Bornhuetter-Ferguson method for estimating IBNR reserves. Under what circumstances would you prefer one method over the other?",
      hint: "Consider data maturity, credibility of historical development patterns, and reliance on prior loss ratio assumptions when choosing between the two methods."
    },
    {
      id: "aq2",
      question: "Explain the purpose of discounting insurance cashflows under IFRS 17. How do you select an appropriate discount rate, and what is the impact of discounting on the reported reserves?",
      hint: "Think about the time value of money, the use of risk-free yield curves (e.g., NSE yield curve), and how discounting reduces the nominal reserve to its present value."
    },
    {
      id: "aq3",
      question: "Describe the concept of risk margin (risk adjustment) under IFRS 17. How is it calculated, and what role does it play in the valuation of general insurance liabilities?",
      hint: "Focus on the confidence level approach, cost-of-capital method, and how the risk margin compensates for the uncertainty inherent in non-financial risks."
    },
    {
      id: "aq4",
      question: "How would you assess reserve adequacy for a general insurance portfolio? Discuss the role of sensitivity testing and scenario analysis in evaluating the uncertainty around reserve estimates.",
      hint: "Consider varying key assumptions such as development factors, loss ratios, and discount rates to test how reserves respond to different scenarios."
    },
    {
      id: "aq5",
      question: "Explain the difference between outstanding claims reserves, IBNR reserves, and total claims reserves. Why is it important to distinguish between these components in a valuation report?",
      hint: "Think about reported vs. unreported claims, how case estimates differ from statistical projections, and the transparency required in actuarial reporting."
    }
  ],

  quizTitle: "Quiz: Valuation, Discounting & Risk Margin",
  quizQuestions: [
    {
      id: 1,
      section: "Professional Judgement",
      question: "According to the IAA definition, professional judgement is:",
      options: [
        "a) The judgment of an actuary based on actuarial training and experience, grounded in actuarial principles",
        "b) Any decision made by an actuary in their day-to-day work",
        "c) Any choice made when handling client data",
        "d) A subjective opinion without the need for validation"
      ],
      correctAnswer: "a) The judgment of an actuary based on actuarial training and experience, grounded in actuarial principles",
      explanation: "Professional judgement requires actuarial expertise and grounding in actuarial principles, not just any decision."
    },
    {
      id: 2,
      section: "Professional Judgement",
      question: "Under TAS 100, professional judgement is more likely to be required when:",
      options: [
        "a) Calculations involve only simple arithmetic",
        "b) The work involves complex calculations",
        "c) Reports are prepared for non-technical audiences",
        "d) Regulatory approval is not required"
      ],
      correctAnswer: "b) The work involves complex calculations",
      explanation: "Complex calculations require more professional judgement due to increased uncertainty and assumptions."
    },
    {
      id: 3,
      section: "IFRS 17 Reserves",
      question: "The Liability for Remaining Coverage (LRC) represents:",
      options: [
        "a) Claims that have already been paid",
        "b) The reserves for claims incurred but not reported",
        "c) The expenses incurred in policy acquisition",
        "d) The cost of running off the unexpired portion of policies"
      ],
      correctAnswer: "d) The cost of running off the unexpired portion of policies",
      explanation: "LRC covers future insurance service expenses for the remaining coverage period."
    },
    {
      id: 4,
      section: "IFRS 17 Reserves",
      question: "The Loss Component under IFRS 17 refers to:",
      options: [
        "a) Future losses expected from a group of contracts",
        "b) Expected claims already settled",
        "c) A portion of outstanding claims",
        "d) Risk adjustment for non-financial risk"
      ],
      correctAnswer: "a) Future losses expected from a group of contracts",
      explanation: "Loss component represents expected future losses from existing contracts."
    },
    {
      id: 5,
      section: "IFRS 17 Reserves",
      question: "IBNR reserves are established to cover:",
      options: [
        "a) Claims incurred and reported but not settled",
        "b) Outstanding expenses not directly attributable to claims",
        "c) Claims incurred prior to valuation but not yet reported",
        "d) Catastrophic losses beyond the retention limit"
      ],
      correctAnswer: "c) Claims incurred prior to valuation but not yet reported",
      explanation: "IBNR = Incurred But Not Reported claims."
    },
    {
      id: 6,
      section: "IFRS 17 Reserves",
      question: "Which of the following is NOT a type of reserve under IFRS 17?",
      options: [
        "a) Incurred but not Reported (IBNR)",
        "b) Outstanding Claims Reported (OCR)",
        "c) Premium Deficiency Reserve (PDR)",
        "d) Incurred but not Enough Reported (IBNER)"
      ],
      correctAnswer: "c) Premium Deficiency Reserve (PDR)",
      explanation: "PDR is a US GAAP concept, not specifically under IFRS 17."
    },
    {
      id: 7,
      section: "Data and Assumptions",
      question: "Why might external data be incorporated into claims reserving?",
      options: [
        "a) To reduce reporting requirements",
        "b) To replace all internal data",
        "c) To comply with accounting standards only",
        "d) To supplement internal data where credibility is limited"
      ],
      correctAnswer: "d) To supplement internal data where credibility is limited",
      explanation: "External data helps when internal data has limited credibility or history."
    },
    {
      id: 8,
      section: "Data and Assumptions",
      question: "When grouping data for reserving, homogeneity is important because:",
      options: [
        "a) It simplifies reporting",
        "b) It ensures claims exhibit similar characteristics",
        "c) It reduces the number of triangles required",
        "d) It allows use of shorter projection methods"
      ],
      correctAnswer: "b) It ensures claims exhibit similar characteristics",
      explanation: "Homogeneous groups have similar claim patterns, making projections more reliable."
    },
    {
      id: 9,
      section: "Reserving Methods",
      question: "The Chain Ladder method relies on the assumption that:",
      options: [
        "a) Claim development patterns are stable and consistent",
        "b) Claims will always follow industry averages",
        "c) Claims are independent of time of occurrence",
        "d) No IBNR claims exist"
      ],
      correctAnswer: "a) Claim development patterns are stable and consistent",
      explanation: "Chain Ladder assumes past development patterns will continue into the future."
    },
    {
      id: 10,
      section: "Reserving Methods",
      question: "The Bornhuetter-Fergusson method combines:",
      options: [
        "a) Case estimates and ultimate loss ratios",
        "b) Historical averages and paid-to-incurred ratios",
        "c) Cape Cod and Expected Loss methods",
        "d) Chain Ladder projections and expected loss ratios"
      ],
      correctAnswer: "d) Chain Ladder projections and expected loss ratios",
      explanation: "BF method blends actual development (Chain Ladder) with expected loss ratios."
    },
    {
      id: 11,
      section: "IFRS 17 Valuation",
      question: "The Risk Adjustment under IFRS 17 represents:",
      options: [
        "a) The insurer's expected profit",
        "b) The adjustment for policyholder behavior",
        "c) The compensation required for bearing uncertainty in non-financial risks",
        "d) A reduction in the discount rate"
      ],
      correctAnswer: "c) The compensation required for bearing uncertainty in non-financial risks",
      explanation: "Risk adjustment compensates for uncertainty in fulfilling insurance obligations."
    },
    {
      id: 12,
      section: "Discounting",
      question: "Under the bottom-up discounting approach in IFRS 17, the discount rate is:",
      options: [
        "a) Risk-free rate only",
        "b) Risk-free rate + Illiquidity premium",
        "c) Average return on equity",
        "d) Inflation-adjusted bond yield"
      ],
      correctAnswer: "b) Risk-free rate + Illiquidity premium",
      explanation: "Bottom-up approach starts with risk-free rate and adjusts for illiquidity."
    },
    {
      id: 13,
      section: "Reinsurance",
      question: "In calculating Net IBNR, reinsurance recoveries are estimated using:",
      options: [
        "a) Historical paid claims",
        "b) Expected development factors",
        "c) Class-specific retention and recovery rates",
        "d) Unearned premium reserves"
      ],
      correctAnswer: "c) Class-specific retention and recovery rates",
      explanation: "Reinsurance recoveries use specific retention and recovery rates per class."
    },
    {
      id: 14,
      section: "Reinsurance",
      question: "The purpose of analysing claims retention rates when calculating recoveries is to:",
      options: [
        "a) Weight expected reserves against reinsurance recoveries",
        "b) Estimate the solvency ratio",
        "c) Assess the reinsurance premium adequacy",
        "d) Allocate expenses across classes of business"
      ],
      correctAnswer: "a) Weight expected reserves against reinsurance recoveries",
      explanation: "Retention rates determine what portion of claims the insurer retains vs. cedes."
    },
    {
      id: 15,
      section: "Run-off Analysis",
      question: "In run-off triangles, the columns represent:",
      options: [
        "a) Accident years",
        "b) Development periods",
        "c) Reporting years",
        "d) Ultimate claims"
      ],
      correctAnswer: "b) Development periods",
      explanation: "Columns show development periods (months/years) since accident."
    },
    {
      id: 16,
      section: "Claims Characteristics",
      question: "Long-tail classes of business are those where:",
      options: [
        "a) Losses develop and settle quickly",
        "b) Premiums are higher than short-tail classes",
        "c) They do not require reserving triangles",
        "d) Losses take many development periods to settle"
      ],
      correctAnswer: "d) Losses take many development periods to settle",
      explanation: "Long-tail claims take many years to settle (e.g., liability, workers comp)."
    }
  ]
};
