import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  Heart,
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
  LifeBuoy,
  Percent,
  UserCheck,
  Shield
} from "lucide-react";

export default function Module10({ theme = 'dark' }) {
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
        shadow: 'shadow-2xl shadow-pink-500/10',
        accent: 'text-pink-600',
        accentBg: 'bg-pink-50/80',
        accentBorder: 'border-pink-200/50',
        accentHover: 'hover:bg-pink-100/80',
        gradientText: 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent',
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
      accent: 'text-pink-600',
      accentBg: 'bg-pink-700/20',
      accentBorder: 'border-pink-600/30',
      accentHover: 'hover:bg-pink-700/30',
      gradientText: 'text-pink-600',
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
      question: "Which of the following is an example of a consistency check?",
      options: [
        "a) Confirming policy dates are in the correct format",
        "b) Tracking that policies active last year but missing this year appear in the movement schedules",
        "c) Checking unusual values such as negative sums assured",
        "d) Ensuring policyholder names match gender"
      ],
      correctAnswer: "b) Tracking that policies active last year but missing this year appear in the movement schedules",
      explanation: "Consistency checks ensure data remains logical over time, like tracking policy movements between valuation dates."
    },
    {
      id: 2,
      question: "What is the purpose of movement analysis in policy data?",
      options: [
        "a) To track how policy counts change between valuation dates",
        "b) To calculate surrender values",
        "c) To project solvency margins",
        "d) To compute expenses per policy"
      ],
      correctAnswer: "a) To track how policy counts change between valuation dates",
      explanation: "Movement analysis reconciles policy counts from opening to closing through new business, lapses, maturities, and surrenders."
    },
    {
      id: 3,
      question: "At last valuation, 10,000 policies were active. During the year, 2,000 new policies were issued, 800 matured, 200 lapsed and 100 surrendered. How many policies should be active at current valuation?",
      options: [
        "a) 10,000",
        "b) 10,500",
        "c) 11,000",
        "d) 10,900"
      ],
      correctAnswer: "d) 10,900",
      explanation: "Active policies = Opening + New - Matured - Lapsed - Surrendered = 10,000 + 2,000 - 800 - 200 - 100 = 10,900"
    },
    {
      id: 4,
      question: "In Term Assurance, the sum assured is payable:",
      options: [
        "a) Whenever death occurs",
        "b) Only if the insured dies within the policy term",
        "c) On survival to the end of the term only",
        "d) Both death and survival"
      ],
      correctAnswer: "b) Only if the insured dies within the policy term",
      explanation: "Term Assurance provides death coverage only during the specified policy term with no survival benefit."
    },
    {
      id: 5,
      question: "Which product pays the sum assured on death during the term or on survival at maturity?",
      options: [
        "a) Term Assurance",
        "b) Endowment Assurance",
        "c) Whole Life Assurance",
        "d) Annuity"
      ],
      correctAnswer: "b) Endowment Assurance",
      explanation: "Endowment Assurance pays the sum assured either on death during the term or on survival to maturity."
    },
    {
      id: 6,
      question: "With-profit policies provide benefits through:",
      options: [
        "a) Guaranteed fixed payments only",
        "b) Bonuses in addition to guaranteed benefits",
        "c) Only annuity income",
        "d) Lower premiums"
      ],
      correctAnswer: "b) Bonuses in addition to guaranteed benefits",
      explanation: "With-profit policies provide guaranteed benefits plus bonuses declared from investment profits."
    },
    {
      id: 7,
      question: "Which of the following is NOT an example of a rider?",
      options: [
        "a) Accidental Death Benefit",
        "b) Critical Illness",
        "c) Disability rider",
        "d) Endowment Assurance"
      ],
      correctAnswer: "d) Endowment Assurance",
      explanation: "Endowment Assurance is a main policy type, not a rider. Riders are additional benefits attached to main policies."
    },
    {
      id: 8,
      question: "In Whole Life Assurance, when is the sum assured paid?",
      options: [
        "a) Only at maturity",
        "b) At death, whenever it occurs",
        "c) Only if the insured dies before 65",
        "d) At retirement"
      ],
      correctAnswer: "b) At death, whenever it occurs",
      explanation: "Whole Life Assurance provides lifetime coverage with sum assured payable on death at any age."
    },
    {
      id: 9,
      question: "Which is a savings-oriented policy that also provides protection?",
      options: [
        "a) Term Assurance",
        "b) Endowment Assurance",
        "c) Annuity",
        "d) Rider"
      ],
      correctAnswer: "b) Endowment Assurance",
      explanation: "Endowment Assurance combines savings (maturity benefit) with life protection (death benefit)."
    },
    {
      id: 10,
      question: "What do with-profit policies depend on for bonus declarations?",
      options: [
        "a) The insurer's investment performance and financial results",
        "b) The age of the policyholder",
        "c) Government subsidies",
        "d) Market interest rates only"
      ],
      correctAnswer: "a) The insurer's investment performance and financial results",
      explanation: "Bonus declarations depend on the insurer's actual investment returns and overall profitability."
    },
    {
      id: 11,
      question: "The main purpose of actuarial valuation of life insurance products is to:",
      options: [
        "a) Decide how much profit the insurer makes each year",
        "b) Ensure that reserves are adequate to meet future policyholder benefits",
        "c) Calculate sales targets for agents",
        "d) Set government tax rates"
      ],
      correctAnswer: "b) Ensure that reserves are adequate to meet future policyholder benefits",
      explanation: "Valuation ensures sufficient reserves are held to meet all future benefit obligations to policyholders."
    },
    {
      id: 12,
      question: "In valuation, the Expected Present Value (EPV) of future cashflows refers to:",
      options: [
        "a) Historical claims experience",
        "b) The probability-weighted value of all future premiums and benefits discounted to today",
        "c) Only the future premiums expected from policyholders",
        "d) Only the future claims without discounting"
      ],
      correctAnswer: "b) The probability-weighted value of all future premiums and benefits discounted to today",
      explanation: "EPV accounts for probabilities of future events and time value of money through discounting."
    },
    {
      id: 13,
      question: "A policy pays a maturity benefit of KES 1,000,000 in 10 years. The risk-free discount rate is 5% p.a. What is the present value of this benefit?",
      options: [
        "a) KES 613,913",
        "b) KES 700,000",
        "c) KES 950,000",
        "d) KES 1,000,000"
      ],
      correctAnswer: "a) KES 613,913",
      explanation: "PV = 1,000,000 / (1.05)^10 = KES 613,913. Discounting reflects time value of money."
    },
    {
      id: 14,
      question: "Which of the following best describes the Contractual Service Margin (CSM)?",
      options: [
        "a) The insurer's solvency ratio",
        "b) The unearned profit that will be recognized as the insurer provides future services",
        "c) The reinsurer's profit share",
        "d) The policyholder's bonus allocation"
      ],
      correctAnswer: "b) The unearned profit that will be recognized as the insurer provides future services",
      explanation: "CSM represents unearned profit recognized over the coverage period as services are provided."
    },
    {
      id: 15,
      question: "The Risk Adjustment (RA) in life insurance valuation represents:",
      options: [
        "a) An allowance for investment risk",
        "b) The profit margin for shareholders",
        "c) The compensation for bearing uncertainty in non-financial risks",
        "d) A regulatory penalty"
      ],
      correctAnswer: "c) The compensation for bearing uncertainty in non-financial risks",
      explanation: "RA compensates the insurer for bearing uncertainty about the amount and timing of cash flows."
    },
    {
      id: 16,
      question: "Which of the following risks would typically be included in the Risk Adjustment for life insurance?",
      options: [
        "a) Mortality and morbidity risks",
        "b) Equity market fluctuations",
        "c) Foreign exchange movements",
        "d) Policyholder bonuses"
      ],
      correctAnswer: "a) Mortality and morbidity risks",
      explanation: "RA typically covers insurance risks like mortality, morbidity, and lapse uncertainty."
    },
    {
      id: 17,
      question: "Why is discounting used in life insurance valuation?",
      options: [
        "a) To reduce the value of reserves artificially",
        "b) To reflect the time value of money",
        "c) To simplify calculations",
        "d) To comply with tax requirements"
      ],
      correctAnswer: "b) To reflect the time value of money",
      explanation: "Discounting accounts for the fact that money received in the future is worth less than money today."
    },
    {
      id: 18,
      question: "Why do actuaries use best estimate assumptions in valuation?",
      options: [
        "a) To minimize regulatory scrutiny",
        "b) To reflect a realistic view of expected future experience",
        "c) To increase profitability",
        "d) To simplify accounting"
      ],
      correctAnswer: "b) To reflect a realistic view of expected future experience",
      explanation: "Best estimate assumptions represent the actuary's unbiased expectation of future experience."
    },
    {
      id: 19,
      question: "Which of the following best describes the interaction of the 3 components of LRC?",
      options: [
        "a) LRC = Fulfilment Cashflows + CSM + Risk Adjustment",
        "b) LRC = Fulfilment Cashflows – CSM – Risk Adjustment",
        "c) LRC = Premiums – Benefits – Expenses",
        "d) LRC = Incurred Claims + Outstanding Claims"
      ],
      correctAnswer: "a) LRC = Fulfilment Cashflows + CSM + Risk Adjustment",
      explanation: "LRC comprises fulfillment cashflows (PV of future cashflows) plus CSM plus Risk Adjustment."
    },
    {
      id: 20,
      question: "If at initial recognition, the LRC is insufficient to cover expected future cashflows, what happens?",
      options: [
        "a) Create a Contractual Service Margin (CSM)",
        "b) Recognise a loss component in LRC",
        "c) Increase the Risk Adjustment",
        "d) Defer to next reporting period"
      ],
      correctAnswer: "b) Recognise a loss component in LRC",
      explanation: "When expected cash outflows exceed inflows at initial recognition, a loss component is recognized immediately."
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
              ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(225, 29, 72, 0.35) 100%)'
              : 'linear-gradient(135deg, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.35) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(4px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-pink-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-pink-400 to-rose-500'
                : 'bg-pink-700/30 border border-pink-600/40'
                } ${styles.transition} flex-shrink-0`}>
                <Heart className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-pink-500'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-pink-400'
                  } ${styles.transition}`}>
                  Ordinary Life Valuation
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master actuarial valuation of ordinary life insurance products through data validation, product analysis, assumption setting, and reserve calculation techniques for accurate financial reporting.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-pink-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-pink-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-white text-white font-semibold px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                    } ${styles.transition}`}
                  style={activeTab === tab && theme === 'dark' ? {
                    backgroundColor: 'rgba(236, 72, 153, 0.1)'
                  } : {}}
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
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600'
                  : 'bg-gradient-to-r from-pink-600 to-rose-600'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module aims to build learners' capability to perform accurate actuarial valuations of ordinary life insurance products by integrating data clean up with the appropriate valuation techniques. It focuses on data validation and clean-up, understanding product features, applying appropriate actuarial assumptions and the use of actuarial models in calculating reserves to produce accurate and reliable valuation results. The objective is to ensure reliable valuation results that support actuarial reporting and decision-making. By the end of the module, learners will understand the end-to-end process of valuing ordinary life products, ensuring accuracy, consistency, and compliance with actuarial and regulatory standards.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600'
                  : 'bg-gradient-to-r from-pink-600 to-rose-600'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Validate and clean ordinary life policy data to ensure accuracy and completeness before valuation.</li>
                <li>Identify and correct common data quality issues such as missing values, inconsistencies, duplicates, or misclassifications in ordinary life datasets.</li>
                <li>Understand and explain the different technical terms used in ordinary life insurance valuations (e.g., surrenders, paid ups, lapses, CSM etc.)</li>
                <li>Interpret product features and apply appropriate actuarial assumptions (e.g., mortality, interest, expenses) in the valuation process.</li>
                <li>Calculate ordinary life liabilities using standard actuarial techniques.</li>
                <li>Prepare valuation results in a structured and reproducible format for actuarial reporting and analysis.</li>
              </ol>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Activities and Exercises
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600'
                  : 'bg-gradient-to-r from-pink-600 to-rose-600'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>
                Download the exercises document to test your understanding through practical calculations and case studies.
              </p>
              <a
                href="/Training Modules/Module-10-Ordinary-Life/Sample-Quiz-Data-Checks-Valuation.docx"
                download="Sample Quiz - Data Checks & Valuation.docx"
                className={`inline-flex items-center gap-2 mt-3 px-4 py-2 ${theme === 'light'
                  ? 'bg-pink-600 hover:bg-pink-700 text-white'
                  : 'bg-pink-700 hover:bg-pink-800 text-white'
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
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Ordinary Life Valuation</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card 1 - Data Checks */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition} mb-4`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-pink-200' : 'bg-pink-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Ordinary Life Data Checks & Clean Up</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Ordinary Life Insurance Data & Checks - PDF • Data validation guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-10-Ordinary-Life/Course Content/KAFS_ITPs_Ordinary-Life-Insurance-Data-Checks.pdf"
                    download="KAFS ITP Ordinary Life Data Checks.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl'
                      : 'bg-pink-700 hover:bg-pink-800'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
                  </a>
                </div>

                {/* Resource Card 2 - Valuation Guide */}
                <div className={`rounded-2xl ${theme === 'light' ? 'bg-purple-50 border-purple-200' : 'bg-purple-500/20 border-purple-400/30'} p-4 md:p-6 flex items-center justify-between hover:bg-purple-100/80 dark:hover:bg-purple-500/30 ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-600/40'} rounded-xl ${styles.transition}`}>
                      📘
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Ordinary Life Valuation Guide</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS Ordinary Life Insurance Valuation - PDF • Comprehensive valuation guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-10-Ordinary-Life/Course Content/KAFS_Ordinary-Life-Insurance-Valuation.pdf"
                    download="KAFS Ordinary Life Valuation Guide.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                      : 'bg-purple-500 hover:bg-purple-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
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
                        '/Training Modules/Module-10-Ordinary-Life/Additional Resources/The-Insurance-Valuation-of-Technical-Provisions-for-Life-Insurance-Business-Guidelines.pdf',
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Ordinary Life Valuation</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#DB2777' : '#F472B6'
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
                              ? 'bg-pink-100 border-2 border-pink-500'
                              : 'bg-pink-500/30 border-2 border-pink-400'
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
                        className="px-4 md:px-6 py-3 text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm md:text-base shadow-lg hover:shadow-xl hover:opacity-90"
                        style={{
                          backgroundColor: theme === 'light' ? '#DB2777' : '#EC4899',
                        }}
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
                    ? 'bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200'
                    : 'bg-gradient-to-br from-pink-700/20 to-rose-700/20 border border-pink-600/30'
                    } rounded-2xl p-6 md:p-8 text-center ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-pink-600' : 'text-pink-600'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-pink-600' : 'text-pink-600'} mb-2`}>
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
                                : 'bg-pink-500/10 border border-pink-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-pink-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl'
                        : 'bg-pink-700 hover:bg-pink-800'
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
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-pink-600' : 'text-pink-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the following dataset to practice your ordinary life valuation analysis:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-pink-50 border-pink-200 hover:bg-pink-100'
                    : 'bg-pink-700/20 border-pink-600/30 hover:bg-pink-700/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-pink-200' : 'bg-pink-700/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Ordinary Life Valuation Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Ordinary Life_Valuation Data.xlsx • Complete valuation dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-10-Ordinary-Life/Data/Ordinary-Life_Valuation-Data.xlsx',
                        'Ordinary Life Valuation Data.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-pink-600 hover:bg-pink-700'
                        : 'bg-pink-500 hover:bg-pink-600'
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
                  Download these templates to structure your ordinary life valuation analysis:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Data Reconciliation Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Data Reconciliation- Ordinary Life_Data Recon - 311223_Valuation_Working File.xlsm • Data validation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-10-Ordinary-Life/Working Files/Data-Reconciliation-Ordinary-Life_Data-Recon-311223_Valuation_Working-File.xlsm',
                        'Ordinary Life Data Reconciliation Working File.xlsm'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                        } rounded-lg text-white transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>IFRS 17 GMM Model Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Valuation Working File- Company X_StandAlone_IFRS17 GMM Model_Working File.xlsm • Comprehensive valuation model</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-10-Ordinary-Life/Working Files/Valuation-Working-File-Company-X_StandAlone_IFRS17-GMM-Model_Working-File.xlsm',
                        'IFRS 17 GMM Valuation Working File.xlsm'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded-lg text-white transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Submission Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-600' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Upload className="w-6 h-6" />
                  Submission
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Upload your completed ordinary life valuation assignments for review and feedback:
                </p>

                <div className={`rounded-3xl ${theme === 'light'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-green-500/10 border-green-400/20'
                  } border p-6 ${styles.transition}`}>
                  <div className={`border-2 border-dashed ${theme === 'light'
                    ? 'border-green-300 hover:border-green-400'
                    : 'border-green-400/30 hover:border-green-400/50'
                    } rounded-2xl p-8 text-center transition-colors ${styles.transition}`}>
                    <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} mx-auto mb-4 ${styles.transition}`} />
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
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
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
                              <FileText className={`w-4 h-4 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} ${styles.transition}`} />
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
                          ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                          : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/25'
                          } rounded-xl text-white font-semibold transition`}>
                          Submit Valuation Analysis
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