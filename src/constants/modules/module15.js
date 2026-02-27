export const module15Data = {
  id: 15,
  title: "DB Valuation",
  shortDescription: "Master the valuation of Defined Benefit (DB) pension schemes. Learn to analyze membership data, apply actuarial assumptions, calculate liabilities, assess funding status, and prepare compliant actuarial reports for trustees and regulators.",
  themeColor: "orange",

  objectives: {
    intro: "This module aims to equip learners with practical skills in valuing Defined Benefit (DB) pension schemes. By the end of the module, participants will be able to analyze membership and contribution data, apply actuarial assumptions, and calculate liabilities for DB schemes. This will improve financial reporting accuracy, support funding decisions, and ensure compliance with regulatory requirements.",
    points: [
      "Analyze membership and contribution data to prepare inputs required for Defined Benefit valuation.",
      "Apply actuarial assumptions such as discount rates, salary escalation, mortality, and withdrawal rates in valuing DB liabilities.",
      "Calculate actuarial liabilities including Present Value of Future Benefits (PVFB), Current Service Cost (CSC), and Past Service Liabilities (PSL).",
      "Assess funding status by comparing scheme assets with actuarial liabilities to determine deficits or surpluses.",
      "Prepare standardized actuarial reports that support decision-making for trustees, regulators, and sponsors while ensuring compliance with applicable pension regulations."
    ],
    closing: "By the end of this module, you will have practical competence in valuing Defined Benefit pension schemes."
  },

  learningOutcomes: [
    "Analyze membership and contribution data to prepare inputs required for Defined Benefit valuation.",
    "Apply actuarial assumptions such as discount rates, salary escalation, mortality, and withdrawal rates in valuing DB liabilities.",
    "Calculate actuarial liabilities including Present Value of Future Benefits (PVFB), Current Service Cost (CSC), and Past Service Liabilities (PSL).",
    "Assess funding status by comparing scheme assets with actuarial liabilities to determine deficits or surpluses.",
    "Prepare standardized actuarial reports that support decision-making for trustees, regulators, and sponsors while ensuring compliance with applicable pension regulations."
  ],

  courseContent: {
    description: "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master DB Valuation. Download and use them as your primary references throughout the module.",
    resources: [
      {
        title: "DB Valuation Technical Procedure - Data Checks",
        description: "KAFS_Internal Technical Procedures_Defined Benefits Valuation - Data Checks.pdf",
        url: "/Training Modules/Module-15-DB-Valuation/Course Content/KAFS_Internal Technical Procedures_Defined Benefits Valuation - Data Checks.pdf",
        type: "document",
        icon: "📄"
      },
      {
        title: "Data Checks Practical Example",
        description: "Data_Checks_Practical Example.xlsx",
        url: "/Training Modules/Module-15-DB-Valuation/Course Content/Data_Checks_Practical Example.xlsx",
        type: "excel",
        icon: "📊"
      }
    ],
    additionalResources: [
      {
        title: "Guidebook on Retirement Benefits Sector in Kenya",
        description: "Guidebook on Retirement Benefits Sector in Kenya.pdf",
        url: "/Training Modules/Module-15-DB-Valuation/Additional Resources/Guidebook on Retirement Benefits Sector in Kenya.pdf",
        type: "guidelines",
        icon: "📚"
      },
      {
        title: "DB Valuation Guide",
        description: "DB_Valuation_Guide.pdf",
        url: "/Training Modules/Module-15-DB-Valuation/Course Content/DB_Valuation_Guide.pdf",
        type: "guidelines",
        icon: "📖"
      }
    ]
  },

  assignments: {
    dataFiles: [
      {
        title: "Premium Register Dataset",
        description: "premium_register_1000.xlsx",
        url: "/Training Modules/Module-15-DB-Valuation/Data/premium_register_1000.xlsx",
        type: "excel"
      }
    ],
    workingFiles: [
      {
        title: "Premium Data Clean Up Template",
        description: "Premium_Data_Clean_Up_Template.xlsx",
        url: "/Training Modules/Module-15-DB-Valuation/Working Files/Premium_Data_Clean_Up_Template.xlsx",
        type: "template"
      },
      {
        title: "Claims Data Clean Up Template",
        description: "Claims Data_Clean_Up_Template.xlsx",
        url: "/Training Modules/Module-15-DB-Valuation/Working Files/Claims Data_Clean_Up_Template.xlsx",
        type: "template"
      }
    ]
  },

  quizTitle: "Quiz: DB Valuation - Data Checks",

  quizQuestions: [
    {
      id: 1,
      section: "Funding Structure",
      question: "Which of the following correctly matches the Funding Structure of a pension scheme with its key feature?",
      options: [
        "A. Defined Contribution (DC) – Guarantees a specific benefit amount to members",
        "B. Defined Benefit (DB) – Employer and employee contribute fixed amounts; member bears investment risk",
        "C. Defined Contribution (DC) – Benefits equal contributions plus investment returns, net of expenses",
        "D. Defined Benefit (DB) – Member bears both investment and longevity risk"
      ],
      correctAnswer: "C. Defined Contribution (DC) – Benefits equal contributions plus investment returns, net of expenses",
      explanation: "In a DC scheme, the final benefit depends only on contributions made plus investment returns, net of expenses. DB schemes, by contrast, guarantee specific benefits."
    },
    {
      id: 2,
      section: "Investment Risk",
      question: "In a Defined Benefit (DB) scheme, who primarily bears the investment and longevity risk?",
      options: [
        "A. The member",
        "B. The trustees",
        "C. The employer/sponsor",
        "D. The Retirement Benefits Authority (RBA)"
      ],
      correctAnswer: "C. The employer/sponsor",
      explanation: "DB schemes promise a defined benefit regardless of market performance, so the employer carries both the investment and longevity risks."
    },
    {
      id: 3,
      section: "Hybrid Schemes",
      question: "Which of the following is NOT a recognized type of hybrid scheme design?",
      options: [
        "A. Minimum Guarantee Plans",
        "B. Cash Balance Plans",
        "C. Combination Plans",
        "D. Indexed Salary Plans"
      ],
      correctAnswer: "D. Indexed Salary Plans",
      explanation: "Hybrid designs include Minimum Guarantee, Cash Balance, and Combination plans. 'Indexed Salary Plans' is not a hybrid type."
    },
    {
      id: 4,
      section: "Membership Register",
      question: "Which of the following is NOT typically included in the Membership Register for active members?",
      options: [
        "A. Date of Birth",
        "B. Final Average Salary",
        "C. Accumulated Member Balance",
        "D. Annual Pension in Payment"
      ],
      correctAnswer: "D. Annual Pension in Payment",
      explanation: "The Membership Register tracks active members, so it captures salary and balances but not pension amounts, which apply only to pensioners."
    },
    {
      id: 5,
      section: "Withdrawals Register",
      question: "Why is the Withdrawals Register particularly relevant for Defined Contribution (DC) schemes?",
      options: [
        "A. It tracks employer funding levels",
        "B. It records actuarial assumptions",
        "C. It tracks access to individual accounts at retirement or exit",
        "D. It ensures guaranteed minimum pensions are paid"
      ],
      correctAnswer: "C. It tracks access to individual accounts at retirement or exit",
      explanation: "In DC schemes, members can withdraw from their accounts upon retirement or leaving employment, so the Withdrawals Register is crucial."
    },
    {
      id: 6,
      section: "DB Benefit Calculation",
      question: "In a DB scheme, how is the retirement benefit typically calculated?",
      options: [
        "A. Based on contributions plus interest",
        "B. As a fixed amount set by the employer",
        "C. Using a formula linked to salary and years of service",
        "D. Equal to one-third of pensionable salary"
      ],
      correctAnswer: "C. Using a formula linked to salary and years of service",
      explanation: "DB schemes use formulas (e.g., % of final salary × years of service) to determine retirement benefits."
    },
    {
      id: 7,
      section: "Investment Risk in DC",
      question: "In a DC scheme, who bears the investment risk?",
      options: [
        "A. Employer",
        "B. Member",
        "C. Trustees",
        "D. Government"
      ],
      correctAnswer: "B. Member",
      explanation: "Since DC benefits depend on investment performance, members bear the risk of poor returns."
    },
    {
      id: 8,
      section: "DC Advantages",
      question: "Which of the following is an advantage of a DC scheme?",
      options: [
        "A. Predictable benefits",
        "B. Simple actuarial valuations",
        "C. Benefits aligned to salary growth",
        "D. Survivor pensions automatically included"
      ],
      correctAnswer: "B. Simple actuarial valuations",
      explanation: "DC schemes are straightforward to administer because benefits equal account balances and don't require complex actuarial valuations."
    },
    {
      id: 9,
      section: "DC Disadvantages",
      question: "Which of the following is a disadvantage of a DC scheme?",
      options: [
        "A. Costly for employers",
        "B. Benefits are less portable",
        "C. Retirement income is uncertain",
        "D. Requires complex actuarial reviews"
      ],
      correctAnswer: "C. Retirement income is uncertain",
      explanation: "In DC schemes, benefits depend on market returns and contribution levels, which makes retirement income uncertain."
    },
    {
      id: 10,
      section: "DB Disadvantages",
      question: "Which of the following is a disadvantage of a DB scheme?",
      options: [
        "A. Members bear investment risk",
        "B. Less portable compared to DC schemes",
        "C. No requirement for actuarial valuations",
        "D. Simpler administration"
      ],
      correctAnswer: "B. Less portable compared to DC schemes",
      explanation: "DB schemes are less portable since accrued benefits are tied to the scheme's rules and funding."
    },
    {
      id: 11,
      section: "Pension Lump Sum",
      question: "In a Pension Fund, what proportion of the member's fund can be taken as a cash lump sum at retirement?",
      options: [
        "A. One-third",
        "B. One-half",
        "C. Two-thirds",
        "D. Entire balance"
      ],
      correctAnswer: "A. One-third",
      explanation: "By law, a maximum of one-third can be taken as a lump sum, while the rest must be converted into an income stream."
    },
    {
      id: 12,
      section: "Guaranteed Fund",
      question: "Which of the following is a feature of a Guaranteed Fund?",
      options: [
        "A. No protection of capital",
        "B. Capital and minimum return guaranteed",
        "C. Trustees control investments",
        "D. Returns always higher than segregated funds"
      ],
      correctAnswer: "B. Capital and minimum return guaranteed",
      explanation: "Guaranteed funds provide capital protection and a minimum return, with investment risk transferred to the issuer (e.g., insurer)."
    }
  ]
};
