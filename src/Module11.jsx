import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  Users,
  Book,
  Download,
  Award,
  Check,
  Upload,
  Database,
  Settings,
  FileText,
  Calculator,
  BarChart,
  PieChart,
  Scale,
  TrendingUp,
  TrendingDown,
  Shield,
  Layers,
  Target,
  LineChart
} from "lucide-react";

export default function Module11({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const aosInitialized = useRef(false);

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
      });
      aosInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (aosInitialized.current) {
      AOS.refresh();
    }
  }, [theme, activeTab]);

  const getThemeStyles = () => {
    if (theme === 'light') {
      return {
        bg: 'bg-white/95',
        cardBg: 'bg-white/95',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-600',
        border: 'border-white/30',
        hover: 'hover:bg-white',
        inputBg: 'bg-white/90',
        shadow: 'shadow-2xl shadow-violet-500/10',
        accent: 'text-violet-600',
        accentBg: 'bg-violet-50/80',
        accentBorder: 'border-violet-200/50',
        accentHover: 'hover:bg-violet-100/80',
        gradientText: 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent',
        transition: 'transition-all duration-300 ease-in-out'
      };
    }
    return {
      bg: 'bg-transparent',
      cardBg: 'bg-black/65',
      text: 'text-white',
      textSecondary: 'text-gray-200',
      textTertiary: 'text-gray-300',
      border: 'border-white/10',
      hover: 'hover:bg-white/10',
      inputBg: 'bg-white/5',
      shadow: 'shadow-xl',
      accent: 'text-violet-400',
      accentBg: 'bg-violet-500/20',
      accentBorder: 'border-violet-400/30',
      accentHover: 'hover:bg-violet-500/30',
      gradientText: 'text-violet-400',
      transition: 'transition-all duration-300 ease-in-out'
    };
  };

  const styles = getThemeStyles();

  const downloadFile = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'quiz') {
      setShowQuizResults(false);
    }
    if (tabId === 'quiz') {
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type,
      uploadDate: new Date().toLocaleDateString()
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    event.target.value = '';
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const quizQuestions = [
    {
      id: 1,
      question: "Which insurance liability component represents the cost of running off the unexpired portion of the insurer's policies?",
      options: [
        "A. Liability for Incurred Claims (LIC)",
        "B. Risk Adjustment (RA)",
        "C. Liability for Remaining Coverage (LRC)",
        "D. Outstanding Claims Reported (OCR)"
      ],
      correctAnswer: "C. Liability for Remaining Coverage (LRC)",
      explanation: "LRC reflects the value of unexpired insurance contracts, the cost of providing coverage for the remaining policy period."
    },
    {
      id: 2,
      question: "Which IFRS 17 measurement model is typically considered the most suitable for Group Life business, given its short-term coverage?",
      options: [
        "A. General Measurement Model (GMM)",
        "B. Premium Allocation Approach (PAA)",
        "C. Loss Component Model (LCM)",
        "D. Variable Fee Approach (VFA)"
      ],
      correctAnswer: "B. Premium Allocation Approach (PAA)",
      explanation: "Group Life contracts are usually less than 12 months, so the simplified PAA model is most suitable under IFRS 17."
    },
    {
      id: 3,
      question: "Which of the following is not a sub-component of the Liability for Incurred Claims (LIC)?",
      options: [
        "A. Outstanding Claims Reported (OCR)",
        "B. Incurred but not Reported (IBNR)",
        "C. Unearned Premium Reserve (UPR)",
        "D. Risk Adjustment (RA)"
      ],
      correctAnswer: "C. Unearned Premium Reserve (UPR)",
      explanation: "UPR belongs to LRC, not LIC. LIC only covers claims already incurred (OCR + IBNR + RA)."
    },
    {
      id: 4,
      question: "The primary non-financial risks for which the Risk Adjustment (RA) is calculated in Group Life business are:",
      options: [
        "A. Market and Credit risk.",
        "B. Pricing and Expense risk.",
        "C. Mortality and Morbidity risk.",
        "D. Liquidity and Operational risk."
      ],
      correctAnswer: "C. Mortality and Morbidity risk.",
      explanation: "RA under IFRS 17 compensates for uncertainties in non-financial risks mainly death (mortality) and health (morbidity)."
    },
    {
      id: 5,
      question: "According to the training, before starting the liability valuation, an actuary must pay close attention to which documents from the last three years?",
      options: [
        "A. Cash Flow Statements and Balance Sheets.",
        "B. Previous valuation reports, focusing on assumptions and recommendations.",
        "C. Regulatory filing forms and tax reports.",
        "D. Internal audit reports on IT systems."
      ],
      correctAnswer: "B. Previous valuation reports, focusing on assumptions and recommendations.",
      explanation: "Reviewing past valuation reports helps ensure consistency and checks if earlier assumptions remain valid."
    },
    {
      id: 6,
      question: "For Group Life policies measured under the PAA, why is interest accretion on the LRC balance typically not required?",
      options: [
        "A. The company has no debt.",
        "B. The interest rate is assumed to be zero.",
        "C. The coverage terms are generally short-term (less than 12 months).",
        "D. IFRS 17 prohibits interest accretion on all PAA contracts."
      ],
      correctAnswer: "C. The coverage terms are generally short-term (less than 12 months).",
      explanation: "Because policies are short-term, the time value of money is immaterial, no interest accretion is needed."
    },
    {
      id: 7,
      question: "How is the Gross Unearned Premium Reserve (UPR) for Group Life typically calculated?",
      options: [
        "A. As a percentage of total claims paid.",
        "B. Using the Bornhuetter-Ferguson method.",
        "C. Using the 365ths method.",
        "D. As 50% of the total premium written."
      ],
      correctAnswer: "C. Using the 365ths method.",
      explanation: "The 365ths method allocates premium evenly across each day of the contract."
    },
    {
      id: 8,
      question: "A portfolio of insurance contracts is considered 'onerous' if:",
      options: [
        "A. The Liability for Incurred Claims (LIC) exceeds the premiums written.",
        "B. The total assets are less than the total liabilities.",
        "C. The expected future outflows exceed the expected future inflows (premiums) for the remaining coverage.",
        "D. The IBNR reserve is calculated to be zero."
      ],
      correctAnswer: "C. The expected future outflows exceed the expected future inflows (premiums) for the remaining coverage.",
      explanation: "Onerous contracts are loss-making because claims and expenses are expected to exceed premiums."
    },
    {
      id: 9,
      question: "When is a Loss Component assigned to an insurance portfolio?",
      options: [
        "A. When the Net Premium is negative.",
        "B. When the utilisation rate of IBNR is too high.",
        "C. When a loss event has occurred but not been settled.",
        "D. When the combined ratio of the portfolio exceeds 100%."
      ],
      correctAnswer: "D. When the combined ratio of the portfolio exceeds 100%.",
      explanation: "A combined ratio above 100% means losses exceed premiums, so a Loss Component is required."
    },
    {
      id: 10,
      question: "For reinsurance, which cash flow is recognized under the Liability for Incurred Claims (LIC)?",
      options: [
        "A. Reinsurance Premiums.",
        "B. Reinsurance Debtors (recoveries) because they are claims-related cash flows.",
        "C. Reinsurance Creditors (payables).",
        "D. The total ceded claims amount."
      ],
      correctAnswer: "B. Reinsurance Debtors (recoveries) because they are claims-related cash flows.",
      explanation: "Reinsurance recoveries reduce claim costs, so they are part of LIC, not LRC."
    },
    {
      id: 11,
      question: "What is the primary purpose of conducting a Claims Reserves Utilisation Analysis?",
      options: [
        "A. To determine the company's current liquidity ratio.",
        "B. To check if regulatory solvency requirements were met.",
        "C. To validate and refine current reserving assumptions by tracking past estimates.",
        "D. To forecast the total earned premium for the next year."
      ],
      correctAnswer: "C. To validate and refine current reserving assumptions by tracking past estimates.",
      explanation: "Utilisation analysis checks whether past reserves were accurate and helps improve future estimates."
    },
    {
      id: 12,
      question: "A consistently high utilisation rate for the IBNR reserve might indicate:",
      options: [
        "A. A problem with policy underwriting.",
        "B. The IBNR was consistently overestimated.",
        "C. A systemic issue with late claims reporting.",
        "D. That too many outliers were excluded."
      ],
      correctAnswer: "C. A systemic issue with late claims reporting.",
      explanation: "If many claims are reported late, the IBNR reserve is heavily used."
    },
    {
      id: 13,
      question: "The Utilisation Analysis is performed on claims reserves held from which period?",
      options: [
        "A. The current valuation period only.",
        "B. The next five forecasted years.",
        "C. The past three years.",
        "D. Only the reserves related to the largest loss event."
      ],
      correctAnswer: "C. The past three years.",
      explanation: "Reviewing three years gives a balanced view of reserve accuracy and consistency."
    },
    {
      id: 14,
      question: "In the OCR Utilisation analysis, if the difference between the initial OCR estimate and the actual final payment is consistently positive, what does this generally signal about the initial estimate?",
      options: [
        "A. The estimate was consistently underestimated.",
        "B. The estimate was consistently overestimated (a reserve release).",
        "C. The IBNR reserve should be increased.",
        "D. The claim development is highly stable."
      ],
      correctAnswer: "B. The estimate was consistently overestimated (a reserve release).",
      explanation: "Positive differences mean reserves were higher than actual claims, leading to reserve releases."
    },
    {
      id: 15,
      question: "If a small insurer is estimating claims liabilities for a new product, what type of data should be incorporated to improve credibility?",
      options: [
        "A. Claims data from the previous ten years for the old product.",
        "B. External data from similar-sized insurers or industry benchmarks.",
        "C. Projected premium data for the next year.",
        "D. Only the data from the first six months of the new product."
      ],
      correctAnswer: "B. External data from similar-sized insurers or industry benchmarks.",
      explanation: "External benchmarks help improve reliability when internal data is insufficient."
    },
    {
      id: 16,
      question: "What should an actuary do after identifying and removing an 'extreme value' (outlier) from the run-off triangles?",
      options: [
        "A. Forget the value, as it should not recur.",
        "B. Adjust the total earned premium downwards.",
        "C. Incorporate a loading to the final claims reserves based on the observed proportion of large losses.",
        "D. Immediately increase the Risk Adjustment."
      ],
      correctAnswer: "C. Incorporate a loading to the final claims reserves based on the observed proportion of large losses.",
      explanation: "Outliers are excluded for modeling accuracy but must still be allowed for via loadings."
    },
    {
      id: 17,
      question: "In the context of run-off triangles, which term describes the number of periods until a payment is made?",
      options: [
        "A. Accident/Loss Period",
        "B. Development Period (or Delay Period)",
        "C. Reporting Period",
        "D. Underwriting Period"
      ],
      correctAnswer: "B. Development Period (or Delay Period)",
      explanation: "The development (delay) period measures the time between when a claim occurs and when it is paid."
    },
    {
      id: 18,
      question: "Which IBNR method is a blend of the Chain Ladder method and an a priori estimate, and is favored when there is uncertainty in claims development trends?",
      options: [
        "A. Basic Chain Ladder (BCL)",
        "B. Expected Loss Ratio (LR)",
        "C. Bornhuetter-Ferguson (BF)",
        "D. Cape Cod (Standard-Buhlmann)"
      ],
      correctAnswer: "C. Bornhuetter-Ferguson (BF)",
      explanation: "BF combines historical development (Chain Ladder) with an external expected loss ratio to reduce volatility."
    },
    {
      id: 19,
      question: "The second phase of the four-phase reserving approach focuses on:",
      options: [
        "A. Validating and balancing the claims data against accounts.",
        "B. Monitoring projections of claims development.",
        "C. Comparing results from different methods.",
        "D. Applying at least two suitable methods for each homogenous group."
      ],
      correctAnswer: "D. Applying at least two suitable methods for each homogenous group.",
      explanation: "Phase 2 is about applying reserving methods after data validation."
    },
    {
      id: 20,
      question: "When calculating the Risk Adjustment using the Bootstrapping method, how is the RA value derived?",
      options: [
        "A. It is the simple average of the BCL and BF estimates.",
        "B. It is a fixed percentage set by the regulator.",
        "C. It is the difference between the 75th percentile reserve and the mean IBNR estimate.",
        "D. It is the total of all claims paid in the last year."
      ],
      correctAnswer: "C. It is the difference between the 75th percentile reserve and the mean IBNR estimate.",
      explanation: "The Risk Adjustment is measured as the margin between the average reserve and a higher confidence level (75th percentile)."
    }
  ];

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length };
  };

  const isAnswerCorrect = (questionId) => {
    const question = quizQuestions.find(q => q.id === questionId);
    return quizAnswers[questionId] === question.correctAnswer;
  };

  return (
    <div className={`min-h-screen relative ${styles.transition}`}>
      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('/src/assets/bground.jpg')`,
        }}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.65) 0%, rgba(124, 58, 237, 0.59) 100%)'
              : 'rgba(0, 0, 0, 0.3)',
            backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-violet-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-violet-400 to-purple-500'
                : 'bg-violet-500/30 border border-violet-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <Users className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-violet-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-violet-400'
                  } ${styles.transition}`}>
                  Group Life Business Valuation
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master Group Life insurance valuation under IFRS 17 using the Premium Allocation Approach. Learn to calculate LRC, LIC, Risk Adjustment, and apply reserving techniques for accurate financial reporting.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-violet-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-violet-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-violet-400 text-violet-400 bg-violet-400/10 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-gray-300 hover:text-gray-200 hover:border-gray-300 px-1'
                    } ${styles.transition}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* TAB CONTENTS */}
        <div className="space-y-6">

          {activeTab === 'overview' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`} data-aos="fade-up">
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600'
                  : 'bg-gradient-to-r from-violet-400 to-purple-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module introduces learners to the valuation of Group Life Insurance business under IFRS 17 using the Premium Allocation Approach (PAA). It focuses on the determination of key liabilities: Liability for Remaining Coverage (LRC), Liability for Incurred Claims (LIC), and Risk Adjustment (RA).
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600'
                  : 'bg-gradient-to-r from-violet-400 to-purple-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Apply data checks for LRC and LIC to ensure quality and credibility of valuation inputs.</li>
                <li>Calculate Liability for Remaining Coverage (LRC) under PAA, including Unearned Premium Reserves and the Loss Component.</li>
                <li>Perform Liability for Incurred Claims (LIC) estimation using standard reserving techniques (Chain Ladder, Bornhuetter-Ferguson, Cape Cod, Expected Loss Ratio).</li>
                <li>Assess and compute Risk Adjustment (RA) using statistical approaches such as bootstrapping.</li>
                <li>Evaluate trends in claims reserves utilisation and understand their implications on valuation results.</li>
                <li>Interpret results, document key assumptions, and prepare a draft valuation report for review and sign-off.</li>
              </ol>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Activities and Exercises
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600'
                  : 'bg-gradient-to-r from-violet-400 to-purple-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>
                Download the exercises document to test your understanding through practical calculations and case studies.
              </p>
              <a
                href="/Training Modules/Module-11-Group-Life/Module-11_Exercises_Group-Life-Valuation.docx"
                download="Module 11 Exercises - Group Life Valuation.docx"
                className={`inline-flex items-center gap-2 mt-3 px-4 py-2 ${theme === 'light'
                  ? 'bg-violet-600 hover:bg-violet-700 text-white'
                  : 'bg-violet-500 hover:bg-violet-600 text-white'
                  } rounded-lg transition ${styles.transition}`}
              >
                <Download className="w-4 h-4" />
                Download Exercises (DOCX)
              </a>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Group Life Business Valuation</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card 1 - Data Checks */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition} mb-4`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-violet-200' : 'bg-violet-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Group Life Data Checks</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Group Life Business Data & Checks 2026 - DOCX • Data validation guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-11-Group-Life/Course Content/KAFS_Internal-Technical-Procedures_Group-Life-Business-Data-Checks_2026.docx"
                    download="KAFS ITP Group Life Data Checks 2026.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-violet-500 hover:bg-violet-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download DOCX
                  </a>
                </div>

                {/* Resource Card 2 - Valuation Guide */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-purple-50 border-purple-200' : 'bg-purple-500/20 border-purple-400/30'} p-4 md:p-6 flex items-center justify-between hover:bg-purple-100/80 dark:hover:bg-purple-500/30 ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-600/40'} rounded-xl ${styles.transition}`}>
                      📘
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Group Life Valuation Guide</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Group Life Valuation 2026 - DOCX • Comprehensive valuation guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-11-Group-Life/Course Content/KAFS_Internal-Technical-Procedures_Group-Life-Valuation_2026.docx"
                    download="KAFS ITP Group Life Valuation 2026.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                      : 'bg-purple-500 hover:bg-purple-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download DOCX
                  </a>
                </div>

                {/* Additional Resources */}
                <div className="mt-6 space-y-4">
                  <h4 className={`text-md font-semibold ${styles.text} ${styles.transition}`}>Additional Resources and References</h4>
                  
                  <div className={`rounded-xl ${theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-blue-500/10 border-blue-400/20'} border p-4 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-lg ${styles.transition}`}>
                        📚
                      </div>
                      <div>
                        <h5 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>IRA Life Insurance Technical Provisions Guidelines</h5>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Insurance Valuation of Technical Provisions for Life Insurance Business Guidelines</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Additional Resources/The-Insurance-Valuation-of-Technical-Provisions-for-Life-Insurance-Business-Guidelines.pdf',
                        'IRA Life Insurance Technical Provisions Guidelines.pdf'
                      )}
                      className={`px-3 py-1 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} rounded text-white text-xs transition`}
                    >
                      Download
                    </button>
                  </div>
                </div>

                <div className={`mt-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-xs md:text-sm italic ${styles.transition}`}>
                  Training video resources will be added here when available.
                </div>
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`} data-aos="fade-up">
              {!showQuizResults ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Group Life Business Valuation</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#7C3AED' : '#A78BFA'
                      }}
                    />
                  </div>

                  <div className={`${styles.inputBg} rounded-2xl p-4 md:p-6 mb-6 border ${styles.border} ${styles.transition}`}>
                    <h4 className={`text-base md:text-lg font-medium ${styles.text} mb-4 ${styles.transition}`}>
                      {quizQuestions[currentQuestionIndex].question}
                    </h4>

                    <div className="space-y-2.5">
                      {quizQuestions[currentQuestionIndex].options.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${quizAnswers[quizQuestions[currentQuestionIndex].id] === option
                            ? theme === 'light'
                              ? 'bg-violet-100 border-2 border-violet-500'
                              : 'bg-violet-500/30 border-2 border-violet-400'
                            : theme === 'light'
                              ? 'bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                              : 'bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20'
                            } ${styles.transition}`}
                        >
                          <input
                            type="radio"
                            name={`question-${quizQuestions[currentQuestionIndex].id}`}
                            value={option}
                            checked={quizAnswers[quizQuestions[currentQuestionIndex].id] === option}
                            onChange={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, option)}
                            className="mr-3 w-4 h-4"
                          />
                          <span className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`px-4 md:px-6 py-3 ${theme === 'light'
                        ? 'bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200'
                        : 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800'
                        } disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'light' ? 'text-gray-900' : 'text-white'
                        } rounded-lg transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                      Previous
                    </button>

                    <div className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs md:text-sm ${styles.transition}`}>
                      {Object.keys(quizAnswers).length} of {quizQuestions.length} answered
                    </div>

                    {currentQuestionIndex < quizQuestions.length - 1 ? (
                      <button
                        onClick={goToNextQuestion}
                        className={`px-4 md:px-6 py-3 ${theme === 'light'
                          ? 'bg-violet-600 hover:bg-violet-700 shadow-lg hover:shadow-xl'
                          : 'bg-[#7C3AED] hover:bg-[#6D28D9] shadow-lg hover:shadow-xl'
                          } text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                      >
                        Next
                        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
                      </button>
                    ) : (
                      <button
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                        className={`px-6 md:px-8 py-3 ${theme === 'light'
                          ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400 shadow-lg hover:shadow-xl'
                          : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-600'
                          } disabled:cursor-not-allowed disabled:opacity-50 text-white rounded-lg transition-all duration-200 font-semibold text-sm md:text-base`}
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-6 md:space-y-8">
                  <div className={`${theme === 'light'
                    ? 'bg-gradient-to-br from-violet-50 to-purple-100 border border-violet-200'
                    : 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-400/30'
                    } rounded-2xl p-6 md:p-8 text-center ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'} mb-2`}>
                      {calculateScore().correct}/{calculateScore().total}
                    </div>
                    <p className={`text-base md:text-lg ${styles.textTertiary} ${styles.transition}`}>
                      {calculateScore().correct === calculateScore().total
                        ? 'Perfect Score! Excellent work!'
                        : calculateScore().correct >= calculateScore().total * 0.7
                          ? 'Great job! You passed!'
                          : 'Keep studying and try again!'}
                    </p>
                    <div className={`mt-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-sm md:text-base ${styles.transition}`}>
                      Score: {Math.round((calculateScore().correct / calculateScore().total) * 100)}%
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 md:mb-6 ${styles.transition}`}>Answer Review</h4>
                    <div className="space-y-4 md:space-y-6">
                      {quizQuestions.map((q, index) => (
                        <div
                          key={q.id}
                          className={`rounded-xl p-4 md:p-6 border-2 ${isAnswerCorrect(q.id)
                            ? theme === 'light'
                              ? 'bg-green-50 border-green-400'
                              : 'bg-green-500/10 border-green-400/30'
                            : theme === 'light'
                              ? 'bg-red-50 border-red-400'
                              : 'bg-red-500/10 border-red-400/30'
                            } ${styles.transition}`}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${isAnswerCorrect(q.id)
                              ? theme === 'light'
                                ? 'bg-green-200 text-green-700'
                                : 'bg-green-500/30 text-green-400'
                              : theme === 'light'
                                ? 'bg-red-200 text-red-700'
                                : 'bg-red-500/30 text-red-400'
                              } ${styles.transition}`}>
                              {isAnswerCorrect(q.id) ? (
                                <Check className="w-3 h-3 md:w-4 md:h-4" />
                              ) : (
                                <span className="text-base md:text-lg font-bold">✗</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h5 className={`text-base md:text-lg font-semibold ${styles.text} mb-3 ${styles.transition}`}>
                                Question {index + 1}: {q.question}
                              </h5>

                              {!isAnswerCorrect(q.id) && (
                                <div className={`mb-3 p-3 ${theme === 'light' ? 'bg-red-100' : 'bg-red-500/20'
                                  } rounded-lg ${styles.transition}`}>
                                  <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-red-800' : 'text-red-300'} ${styles.transition}`}>
                                    <span className="font-semibold">Your answer:</span> {quizAnswers[q.id]}
                                  </p>
                                </div>
                              )}

                              <div className={`mb-3 p-3 ${theme === 'light' ? 'bg-green-100' : 'bg-green-500/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-green-800' : 'text-green-300'} ${styles.transition}`}>
                                  <span className="font-semibold">Correct answer:</span> {q.correctAnswer}
                                </p>
                              </div>

                              <div className={`p-3 md:p-4 ${theme === 'light'
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-violet-500/10 border border-violet-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-violet-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
                                <p className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => {
                        setShowQuizResults(false);
                        setQuizAnswers({});
                        setCurrentQuestionIndex(0);
                      }}
                      className={`px-6 md:px-8 py-3 ${theme === 'light'
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        : 'bg-violet-600 hover:bg-violet-700'
                        } text-white rounded-lg transition-all duration-200 font-semibold text-sm md:text-base`}
                    >
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ASSIGNMENTS TAB */}
          {activeTab === 'assignments' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`} data-aos="fade-up">
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Assignments</h3>

              {/* Data Files Subsection */}
              <div className="space-y-4">
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the following datasets to practice your Group Life valuation analysis:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Group Life Premiums Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Group_life_premiums data.xlsx • Complete premium dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Data/Group_life_premiums-data.xlsx',
                        'Group Life Premiums Data.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } rounded-lg text-white transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Group Life Claims Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Group_life_claims data.xlsx • Complete claims dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Data/Group_life_claims-data.xlsx',
                        'Group Life Claims Data.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } rounded-lg text-white transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Working Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates to structure your Group Life valuation analysis:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-lg ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>Premium Data Clean Up Template</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life Premium_Data_Clean_Up_Template.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Working Files/Group-Life-Premium_Data_Clean_Up_Template.xlsx',
                        'Group Life Premium Data Clean Up Template.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-lg ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>Claims Data Clean Up Template</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life Claims Data_Clean_Up_Template.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Working Files/Group-Life-Claims-Data_Clean_Up_Template.xlsx',
                        'Group Life Claims Data Clean Up Template.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-lg ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>LRC Calculation Template</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life Business LRC_Template.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Working Files/Group-Life-Business-LRC_Template.xlsx',
                        'Group Life Business LRC Template.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-lg ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>IBNR Estimation Template</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life IBNR Template_2024.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Working Files/Group-Life-IBNR-Template_2024.xlsx',
                        'Group Life IBNR Template 2024.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-600' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Award className="w-6 h-6" />
                  Results Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download completed templates to compare your valuation results with model answers:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-lg ${styles.transition}`}>
                        ✅
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>Premium Cleaned Data</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life Premium_Cleaned Data.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Results Files/Group-Life-Premium_Cleaned-Data.xlsx',
                        'Group Life Premium Cleaned Data.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-lg ${styles.transition}`}>
                        ✅
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>Claims Cleaned Data</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life Claims_Cleaned Data.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Results Files/Group-Life-Claims_Cleaned-Data.xlsx',
                        'Group Life Claims Cleaned Data.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-lg ${styles.transition}`}>
                        ✅
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>LRC Results File</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life Business LRC_Results File.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Results Files/Group-Life-Business-LRC_Results-File.xlsx',
                        'Group Life Business LRC Results File.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-4 flex flex-col justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-lg ${styles.transition}`}>
                        ✅
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>IBNR Results File</h4>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Group Life IBNR_2024_Results File.xlsx</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-11-Group-Life/Results Files/Group-Life-IBNR_2024_Results-File.xlsx',
                        'Group Life IBNR 2024 Results File.xlsx'
                      )}
                      className={`w-full px-3 py-2 ${theme === 'light'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
                        } rounded text-white transition text-xs`}
                    >
                      <Download className="inline w-3 h-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Submission Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Upload className="w-6 h-6" />
                  Submission
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Upload your completed Group Life valuation assignments for review and feedback:
                </p>

                <div className={`rounded-3xl ${theme === 'light'
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-purple-500/10 border-purple-400/20'
                  } border p-6 ${styles.transition}`}>
                  <div className={`border-2 border-dashed ${theme === 'light'
                    ? 'border-purple-300 hover:border-purple-400'
                    : 'border-purple-400/30 hover:border-purple-400/50'
                    } rounded-2xl p-8 text-center transition-colors ${styles.transition}`}>
                    <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'} mx-auto mb-4 ${styles.transition}`} />
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Valuation Work</h5>
                    <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                      Drag and drop your completed valuation files here, or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className={`inline-block px-6 py-2 ${theme === 'light'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-purple-500 hover:bg-purple-600'
                        } rounded-lg text-white cursor-pointer transition`}
                    >
                      Choose Files
                    </label>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 ${styles.transition}`}>
                      Supported formats: .xlsx, .xls, .xlsm, .pdf, .docx (Max 50MB per file)
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h6 className={`text-md font-semibold ${styles.text} mb-3 ${styles.transition}`}>Uploaded Files:</h6>
                      <div className="space-y-2">
                        {uploadedFiles.map(file => (
                          <div key={file.id} className={`flex items-center justify-between ${styles.inputBg} rounded-lg p-3 ${styles.transition}`}>
                            <div className="flex items-center space-x-3">
                              <FileText className={`w-4 h-4 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'} ${styles.transition}`} />
                              <div>
                                <p className={`${styles.text} text-sm font-medium ${styles.transition}`}>{file.name}</p>
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs ${styles.transition}`}>{file.size} • {file.uploadDate}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 text-center">
                        <button className={`px-8 py-3 ${theme === 'light'
                          ? 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
                          : 'bg-purple-500 hover:bg-purple-600 shadow-lg hover:shadow-purple-500/25'
                          } rounded-xl text-white font-semibold transition`}>
                          Submit Group Life Valuation
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}