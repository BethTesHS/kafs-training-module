export const module6Data = {
  id: 6,
  title: "Financial Profitability Ratios",
  shortDescription: "Master financial performance analysis using IFRS 4 and IFRS 17 financials. Learn to calculate and interpret key profitability ratios, analyze financial statements, and prepare accurate performance reports for strategic decision-making.",
  themeColor: "purple",
  objectives: {
    intro: "This module aims to equip learners with the knowledge and practical skills necessary to understand, review, and prepare financial performance analysis using IFRS 4 and IFRS 17 financials. By the end of the module, participants will be able to interpret key financial statements, calculate and analyze performance ratios, and ensure accuracy and consistency in reporting. This will support effective performance monitoring, strengthen decision-making, and enhance compliance with both internal reporting standards and regulatory requirements.",
    points: [],
    closing: ""
  },
  learningOutcomes: [
    "Understand the purpose, structure, and key components of the financial performance working file.",
    "Review and update Profit & Loss (P&L) and Balance Sheet (BS) figures under both IFRS 4 and IFRS 17 frameworks.",
    "Calculate key performance ratios (e.g., loss ratio, expense ratio, combined ratio, solvency ratios) and interpret their meaning.",
    "Identify and resolve common errors, mismatches, and inconsistencies across IFRS 4 and IFRS 17 statements.",
    "Prepare clear, accurate, and reconciled financial performance reports that meet both internal and external stakeholder requirements.",
    "Apply standardized methods for ratio calculation and reporting to improve efficiency, reduce errors, and maintain consistency."
  ],
  courseContent: {
    description: "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master Financial Performance Analysis. Download and use them as your primary references throughout the module.",
    resources: [
      {
        id: 1,
        title: "Financial Performance Technical Procedure",
        description: "KAFS ITP Guidelines on Financial Performance Analysis - PDF • 18 pages",
        icon: "📄",
        downloadUrl: "/Training Modules/Module-6-Financial-Performance-Analysis/Course Content/KAFS_Internal Technical Procedures_Guidelines on Financial Performance Analysis.pdf",
        fileName: "KAFS ITP Financial Performance Analysis.pdf"
      }
    ],
    additionalResources: [
      {
        id: 1,
        title: "CFI Financial Ratios Cheat Sheet",
        downloadUrl: "/Training Modules/Module-6-Financial-Performance-Analysis/Additional Resources/CFI-Financial-Ratios-Cheat-Sheet-eBook.pdf",
        fileName: "CFI Financial Ratios Cheat Sheet.pdf",
        color: "blue"
      },
      {
        id: 2,
        title: "IRA Insurance Industry Report 2024",
        downloadUrl: "/Training Modules/Module-6-Financial-Performance-Analysis/Additional Resources/Insurance Industry Annual Report 2024.pdf",
        fileName: "IRA Insurance Industry Annual Report 2024.pdf",
        color: "green"
      }
    ],
    aboutText: {
      title: "About This Module:",
      content: "This module covers financial ratio analysis for insurance companies under IFRS 4 and IFRS 17, including profitability, liquidity, solvency, and efficiency ratios.",
      topics: [
        "Loss ratio and expense ratio calculations",
        "Combined ratio and two-year combined ratio",
        "Commission ratio analysis",
        "Return on Equity (ROE) and Return on Assets (ROA)",
        "Liquidity ratios and solvency analysis",
        "Investment yield assessment",
        "Financial statement reconciliation"
      ]
    }
  },
  assignments: {
    dataFiles: [
      {
        id: 1,
        title: "Financial Performance Data",
        description: "Data.xlsx • Complete financial dataset for analysis",
        icon: "📊",
        downloadUrl: "/Training Modules/Module-6-Financial-Performance-Analysis/Data/Data.xlsx",
        fileName: "Financial Performance Data.xlsx"
      }
    ],
    workingFiles: [
      {
        id: 1,
        title: "Financial Ratios Template",
        description: "Ratios Template.xlsx • Comprehensive ratio calculation workbook",
        icon: "🛠️",
        downloadUrl: "/Training Modules/Module-6-Financial-Performance-Analysis/Working File/Ratios Template.xlsx",
        fileName: "Financial Ratios Template.xlsx"
      }
    ]
  },
  quizTitle: "Quiz: Financial Profitability Ratios",
  quizQuestions: [
    {
      id: 1,
      section: "Profitability Ratios",
      question: "Which ratio measures the proportion of premiums used to pay claims?",
      options: [
        "A) Expense Ratio",
        "B) Loss Ratio",
        "C) Retention Ratio",
        "D) Investment Yield"
      ],
      correctAnswer: "B) Loss Ratio",
      explanation: "The loss ratio shows claims incurred as a percentage of earned premiums."
    },
    {
      id: 2,
      section: "Loss Ratio Analysis",
      question: "According to IRA benchmarks, a healthy loss ratio typically falls between:",
      options: [
        "A) 20–40%",
        "B) 30–50%",
        "C) 50–70%",
        "D) 70–90%"
      ],
      correctAnswer: "C) 50–70%",
      explanation: "The benchmark is 50–70%; lower means overpriced products, higher signals underwriting strain."
    },
    {
      id: 3,
      section: "Commission Analysis",
      question: "What does the Commission Ratio measure?",
      options: [
        "A) Proportion of premiums paid as reinsurance",
        "B) Proportion of premiums paid as commissions",
        "C) Share of capital tied up in affiliates",
        "D) Return on shareholders' equity"
      ],
      correctAnswer: "B) Proportion of premiums paid as commissions",
      explanation: "It evaluates reliance on intermediaries by showing commissions as a share of premiums."
    },
    {
      id: 4,
      section: "Expense Ratio",
      question: "An Expense Ratio consistently above 40% usually indicates:",
      options: [
        "A) Excellent operational efficiency",
        "B) Underpricing of premiums",
        "C) Excessive operating costs",
        "D) Strong solvency position"
      ],
      correctAnswer: "C) Excessive operating costs",
      explanation: "Above 40% reflects inefficiency unless justified by premium service delivery."
    },
    {
      id: 5,
      section: "Combined Ratio",
      question: "The Combined Ratio below 100% means:",
      options: [
        "A) The insurer relies heavily on reinsurance",
        "B) The insurer is making underwriting profit",
        "C) The insurer's liquidity is weak",
        "D) The insurer is undercapitalized"
      ],
      correctAnswer: "B) The insurer is making underwriting profit",
      explanation: "A combined ratio <100% indicates underwriting profitability before investment income."
    },
    {
      id: 6,
      section: "Combined Ratio",
      question: "Why is the Two-Year Combined Ratio used?",
      options: [
        "A) To measure profitability only in one year",
        "B) To assess solvency requirements",
        "C) To smooth volatility over multiple periods",
        "D) To assess investment returns"
      ],
      correctAnswer: "C) To smooth volatility over multiple periods",
      explanation: "It averages results over two years, reducing the effect of one-off shocks."
    },
    {
      id: 7,
      section: "Investment Returns",
      question: "What benchmark is typically used for Investment Yield?",
      options: [
        "A) Inflation + 1%",
        "B) Inflation + 3%",
        "C) 10% fixed threshold",
        "D) Equal to the loss ratio"
      ],
      correctAnswer: "B) Inflation + 3%",
      explanation: "A yield around CPI + 3% is considered sustainable."
    },
    {
      id: 8,
      section: "Return on Equity",
      question: "Return on Equity (ROE) above what percentage is generally desirable for insurers?",
      options: [
        "A) 1%",
        "B) 3%",
        "C) 5%",
        "D) 10%"
      ],
      correctAnswer: "C) 5%",
      explanation: "ROE >5% indicates effective deployment of shareholder capital."
    },
    {
      id: 9,
      section: "Retention Ratio",
      question: "The Retention Ratio measures:",
      options: [
        "A) Proportion of claims ceded to reinsurers",
        "B) Premiums retained relative to gross written premium",
        "C) Assets retained relative to liabilities",
        "D) Capital adequacy compared to solvency margins"
      ],
      correctAnswer: "B) Premiums retained relative to gross written premium",
      explanation: "It indicates how much risk the insurer keeps rather than reinsures."
    },
    {
      id: 10,
      section: "Reinsurance Analysis",
      question: "High cession ratios indicate:",
      options: [
        "A) Greater retained earnings",
        "B) Overdependence on reinsurers",
        "C) Stronger capital base",
        "D) Efficient expense management"
      ],
      correctAnswer: "B) Overdependence on reinsurers",
      explanation: "Too much cession reduces income and increases reliance on reinsurers."
    },
    {
      id: 11,
      section: "Liquidity Analysis",
      question: "Liquidity Ratio benchmark is typically:",
      options: [
        "A) 80%",
        "B) 95%",
        "C) 105%",
        "D) 150%"
      ],
      correctAnswer: "C) 105%",
      explanation: "A level around 105% is considered acceptable; too high or too low signals inefficiency or stress."
    },
    {
      id: 12,
      section: "Liquidity Analysis",
      question: "A Current Ratio below 1.0 suggests:",
      options: [
        "A) Comfortable liquidity position",
        "B) Potential short-term financial difficulties",
        "C) High profitability",
        "D) Low retention"
      ],
      correctAnswer: "B) Potential short-term financial difficulties",
      explanation: "Below 1.0 means current liabilities exceed current assets."
    },
    {
      id: 13,
      section: "Solvency Ratios",
      question: "The Insurance Debt Ratio should ideally be:",
      options: [
        "A) Above 70%",
        "B) Equal to 50%",
        "C) Less than 50%",
        "D) Exactly 100%"
      ],
      correctAnswer: "C) Less than 50%",
      explanation: "Ratios above 50% expose insurers to counterparty risks."
    },
    {
      id: 14,
      section: "Technical Reserves",
      question: "A Technical Reserves Cover Ratio above 100% indicates:",
      options: [
        "A) Strong solvency",
        "B) Inadequate liquid assets for obligations",
        "C) High profitability",
        "D) Efficient capital use"
      ],
      correctAnswer: "B) Inadequate liquid assets for obligations",
      explanation: "It shows insufficient liquid resources to meet policyholder claims."
    },
    {
      id: 15,
      section: "Affiliate Analysis",
      question: "The Affiliate Ratio measures:",
      options: [
        "A) Proportion of capital tied in affiliates",
        "B) Proportion of premiums ceded to reinsurers",
        "C) Debt relative to equity",
        "D) Profit margin after tax"
      ],
      correctAnswer: "A) Proportion of capital tied in affiliates",
      explanation: "High affiliate ratios raise governance and liquidity concerns."
    },
    {
      id: 16,
      section: "Capital Analysis",
      question: "A Premium-to-Surplus Ratio above 3.0 implies:",
      options: [
        "A) Conservative underwriting",
        "B) Aggressive underwriting and possible undercapitalization",
        "C) High investment returns",
        "D) Good capital adequacy"
      ],
      correctAnswer: "B) Aggressive underwriting and possible undercapitalization",
      explanation: "Ratios above 3 indicate strain on surplus relative to premium growth."
    },
    {
      id: 17,
      section: "Debt Analysis",
      question: "The benchmark for Interest Coverage Ratio is:",
      options: [
        "A) 0.5",
        "B) 1.0",
        "C) 1.5",
        "D) 2.5"
      ],
      correctAnswer: "C) 1.5",
      explanation: "Insurers should cover interest at least 1.5 times from earnings."
    },
    {
      id: 18,
      section: "Debt Analysis",
      question: "Debt-to-Equity Ratio below 1.0 means:",
      options: [
        "A) Excessive reliance on debt",
        "B) Stable financial structure",
        "C) Liquidity stress",
        "D) High combined ratio"
      ],
      correctAnswer: "B) Stable financial structure",
      explanation: "A lower ratio indicates equity sufficiently covers debt obligations."
    },
    {
      id: 19,
      section: "Growth Analysis",
      question: "Growth in Net Written Premiums above 20% may suggest:",
      options: [
        "A) Healthy expansion",
        "B) Strain on capital and underwriting discipline",
        "C) Higher profitability",
        "D) Improved retention"
      ],
      correctAnswer: "B) Strain on capital and underwriting discipline",
      explanation: "Supervisors view excessive growth as risky due to possible capital strain."
    },
    {
      id: 20,
      section: "Underwriting Analysis",
      question: "Underwriting Expense Ratio evaluates:",
      options: [
        "A) Profit after tax over equity",
        "B) Underwriting costs relative to earned premium",
        "C) Claims relative to premium",
        "D) Investment income relative to assets"
      ],
      correctAnswer: "B) Underwriting costs relative to earned premium",
      explanation: "It shows how much of earned premiums are consumed by underwriting costs."
    }
  ]
};
