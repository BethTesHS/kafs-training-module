export const module1Data = {
  id: 1,
  title: "Data Cleaning and Validation",
  shortDescription: "Learn how to validate, clean, and standardize General Insurance Premium and Claims data. This module equips you with practical techniques to prepare actuarially fit datasets for pricing, reserving, and solvency monitoring.",
  description: "This module aims to equip you with practical skills in validating, cleaning, and standardizing General Insurance Premium and Claims data.",
  themeColor: "purple",
  
  objectives: {
    intro: "This module aims to equip you with practical skills in validating, cleaning, and standardizing General Insurance Premium and Claims data. By the end of the module, you will be able to:",
    points: [
      "Identify and correct data quality issues",
      "Apply consistent data standards",
      "Prepare accurate and reliable GI premium and claims datasets"
    ],
    closing: "This will strengthen the integrity of actuarial analysis, enhance financial reporting accuracy, and ensure compliance with regulatory requirements."
  },

  learningOutcomes: [
    "Identify and correct data inconsistencies in GI Premium and Claims datasets using standard validation and clean-up techniques.",
    "Detect and resolve data quality issues such as missing values, duplicates, inconsistencies, and misclassifications across GI datasets.",
    "Prepare actuarially fit datasets that can be seamlessly used for pricing, reserving, financial reporting, solvency monitoring, and regulatory submissions",
    "Develop and use standardized working templates that improve data quality, reproducibility, and compliance with internal technical procedures."
  ],

  courseContent: {
    description: "This module is guided by a comprehensive PDF manual. It contains all the instructions, worked examples, and exercises you need to master Data Clean Up. Download and use it as your primary reference throughout the module.",
    resources: [
      {
        title: "Data Clean Up Training Manual",
        description: "KAFS ITP GI Data & Checks - PDF • 14 pages • January 2025",
        url: "/Training Modules/Module 1_Data Clean Up/Course Content/KAFS ITP GI Data & Checks_2025.pdf",
        filename: "KAFS ITP GI Data & Checks_2025.pdf",
        icon: "📄"
      }
    ],
    aboutText: {
      intro: "This PDF contains Kenbright Actuarial and Financial Services Limited's Internal Technical Procedures for General Insurance Data & Checks (Version 1.0, January 2025). It covers:",
      points: [
        "Data Requirements for GI valuation",
        "Data Quality Checks and Validation Procedures",
        "Data Collection Templates",
        "Approval workflows and sign-off procedures"
      ]
    }
  },

  assignments: {
    dataFiles: [
      {
        title: "Premium Register Data",
        description: "Excel • 1,000 records • Sample dataset",
        url: "/Training Modules/Module 1_Data Clean Up/Data/premium_register_1000.xlsx",
        filename: "premium_register_1000.xlsx",
        icon: "📊",
        color: "blue"
      },
      {
        title: "Paid Claims Data",
        description: "Excel • 5,000 records • Sample dataset",
        url: "/Training Modules/Module 1_Data Clean Up/Data/paid_claims_5000.xlsx",
        filename: "paid_claims_5000.xlsx",
        icon: "📈",
        color: "green"
      },
      {
        title: "Outstanding Claims Data",
        description: "Excel • 2,000 records • Sample dataset",
        url: "/Training Modules/Module 1_Data Clean Up/Data/outstanding_claims_2000.xlsx",
        filename: "outstanding_claims_2000.xlsx",
        icon: "📋",
        color: "purple"
      }
    ],
    workingFiles: [
      {
        title: "Claims Data Clean Up Template",
        description: "Excel • Structured template for claims validation",
        url: "/Training Modules/Module 1_Data Clean Up/Working Files/Claims Data_Clean_Up_Template.xlsx",
        filename: "Claims Data_Clean_Up_Template.xlsx",
        icon: "🛠️",
        color: "orange"
      },
      {
        title: "Premium Data Clean Up Template",
        description: "Excel • Structured template for premium validation",
        url: "/Training Modules/Module 1_Data Clean Up/Working Files/Premium_Data_Clean_Up_Template.xlsx",
        filename: "Premium_Data_Clean_Up_Template.xlsx",
        icon: "⚙️",
        color: "yellow"
      }
    ]
  },

  quizTitle: "Quiz: Data Requirements & Checks",
  
  quizQuestions: [
    // Section 1: Data Requirements
    {
      id: 1,
      section: "Data Requirements",
      question: "Which of the following is not a required data item in the Premium Register?",
      options: [
        "a) Unique policy identifier",
        "b) Policy start-date",
        "c) Gross premium",
        "d) Claim status"
      ],
      correctAnswer: "d) Claim status",
      explanation: "Claim status belongs to claims data, not the Premium Register."
    },
    {
      id: 2,
      section: "Data Requirements",
      question: "The Exposure File is primarily used for the computation of:",
      options: [
        "a) Loss Ratio",
        "b) Unearned Premium Reserve (UPR)",
        "c) Solvency Margin",
        "d) Incurred But Not Reported (IBNR) claims"
      ],
      correctAnswer: "b) Unearned Premium Reserve (UPR)",
      explanation: "The Exposure File contains active in-force policies used in UPR calculations."
    },
    {
      id: 3,
      section: "Data Requirements",
      question: "Paid claims information should cover:",
      options: [
        "a) At least 3 years",
        "b) At least 5 years",
        "c) At least 6 years",
        "d) At least 10 years"
      ],
      correctAnswer: "c) At least 6 years",
      explanation: "Paid claims must cover a minimum of 6 years to capture historical claims experience."
    },
    {
      id: 4,
      section: "Data Requirements",
      question: "Which of the following must be confirmed in Paid Claims data?",
      options: [
        "a) That only settled claims are included",
        "b) That future claims projections are included",
        "c) That exposure adjustments are made",
        "d) That policy endorsements are tracked"
      ],
      correctAnswer: "a) That only settled claims are included",
      explanation: "The Paid Claims file should only include fully/partially settled claims."
    },
    {
      id: 5,
      section: "Data Requirements",
      question: "Outstanding claims are defined as:",
      options: [
        "a) Claims fully settled in the current year",
        "b) Claims that are reported but not yet paid",
        "c) Claims denied by reinsurers",
        "d) Claims that have been written off"
      ],
      correctAnswer: "b) Claims that are reported but not yet paid",
      explanation: "Outstanding claims = reported but unpaid."
    },
    {
      id: 6,
      section: "Data Requirements",
      question: "Which financial statements are required for general insurance valuation?",
      options: [
        "a) Management accounts only",
        "b) Audited accounts and management accounts",
        "c) Trial balance and solvency margin report",
        "d) Premium register and claims data"
      ],
      correctAnswer: "b) Audited accounts and management accounts",
      explanation: "Both audited accounts and management accounts are needed for valuation."
    },
  
    // Section 2: Data Checks
    {
      id: 7,
      section: "Data Checks",
      question: "Which of the following is not a data check type described in the manual?",
      options: [
        "a) Reasonability & Appropriateness",
        "b) Consistency",
        "c) Completeness & Accuracy",
        "d) Predictive Analytics"
      ],
      correctAnswer: "d) Predictive Analytics",
      explanation: "The three checks are reasonability, consistency, and completeness/accuracy."
    },
    {
      id: 8,
      section: "Data Checks",
      question: "An example of a reasonability check is:",
      options: [
        "a) Checking if policy start-date is after policy end-date",
        "b) Verifying solvency margins",
        "c) Comparing premium growth rates to GDP growth",
        "d) Forecasting next year's claims"
      ],
      correctAnswer: "a) Checking if policy start-date is after policy end-date",
      explanation: "Ensuring logical date sequences is a reasonability check."
    },
    {
      id: 9,
      section: "Data Checks",
      question: "Which date sequence is correct according to the checks?",
      options: [
        "a) Claim reporting date → Claim loss-date → Claim payment date",
        "b) Claim loss-date → Claim reporting date → Claim payment date",
        "c) Policy end-date → Claim loss-date → Policy start-date",
        "d) Claim payment date → Claim reporting date → Claim loss-date"
      ],
      correctAnswer: "b) Claim loss-date → Claim reporting date → Claim payment date",
      explanation: "A claim must occur, then be reported, then be paid."
    },
    {
      id: 10,
      section: "Data Checks",
      question: "A movement analysis in Outstanding Claims involves:",
      options: [
        "a) Reconciling opening, reported, and paid claims",
        "b) Checking only paid claims year-to-date",
        "c) Projecting ultimate claims",
        "d) Verifying solvency margins"
      ],
      correctAnswer: "a) Reconciling opening, reported, and paid claims",
      explanation: "Movement analysis ensures reconciliation of outstanding claims."
    },
    {
      id: 11,
      section: "Data Checks",
      question: "Completeness checks require comparing GI data with:",
      options: [
        "a) Regulatory capital requirements",
        "b) The numbers in financial accounts",
        "c) Competitors' data",
        "d) Future claims estimates"
      ],
      correctAnswer: "b) The numbers in financial accounts",
      explanation: "Completeness is checked by reconciling GI data to accounts."
    },
    {
      id: 12,
      section: "Data Checks",
      question: "When data errors occur, one valid approach is:",
      options: [
        "a) Always deleting the records",
        "b) Ignoring errors without documentation",
        "c) Correcting errors with client validation",
        "d) Creating synthetic claims data"
      ],
      correctAnswer: "c) Correcting errors with client validation",
      explanation: "Corrections must be validated with the client for auditability."
    },
  
    // Section 3: Data Handling & Reporting
    {
      id: 13,
      section: "Data Handling & Reporting",
      question: "Which factor should not guide how to treat data errors?",
      options: [
        "a) Purpose of the data",
        "b) Volume of data",
        "c) Number of actuaries in the team",
        "d) Ability to validate correction"
      ],
      correctAnswer: "c) Number of actuaries in the team",
      explanation: "Staffing is irrelevant; treatment depends on purpose, volume, and validation."
    },
    {
      id: 14,
      section: "Data Handling & Reporting",
      question: "Assumptions made when filling in missing data must:",
      options: [
        "a) Be approved by the reinsurer",
        "b) Be highlighted and reviewed by the Actuarial Manager",
        "c) Be omitted from reports",
        "d) Be reported only verbally"
      ],
      correctAnswer: "b) Be highlighted and reviewed by the Actuarial Manager",
      explanation: "All assumptions must be documented and signed off."
    },
    {
      id: 15,
      section: "Data Handling & Reporting",
      question: "Failed data checks and queries should be:",
      options: [
        "a) Corrected immediately without client involvement",
        "b) Summarized and sent to the client for clarification",
        "c) Ignored if immaterial",
        "d) Reported only at year-end"
      ],
      correctAnswer: "b) Summarized and sent to the client for clarification",
      explanation: "Queries must be documented and shared with the client."
    },
    {
      id: 16,
      section: "Data Handling & Reporting",
      question: "Summaries per class of business must include:",
      options: [
        "a) Claims and premiums by loss year/quarter",
        "b) Investment income by asset class",
        "c) Cashflows by product line",
        "d) Staff expenses by department"
      ],
      correctAnswer: "a) Claims and premiums by loss year/quarter",
      explanation: "Summaries include claims counts/amounts and premium data."
    },
    {
      id: 17,
      section: "Data Handling & Reporting",
      question: "Premium register summaries should present:",
      options: [
        "a) Gross and net written premium per underwriting year",
        "b) Gross incurred claims per loss year",
        "c) Net solvency position",
        "d) Policyholder age distribution"
      ],
      correctAnswer: "a) Gross and net written premium per underwriting year",
      explanation: "Premium summaries focus on gross and net premiums."
    }
  ]
};
