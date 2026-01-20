import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  Banknote,
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
  Shield,
  TrendingUp,
  TrendingDown,
  Percent,
  DollarSign,
  Building,
  Scale,
  LineChart,
  Target
} from "lucide-react";

export default function Module5({ theme = 'dark' }) {
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
        border: 'border-gray-200',
        hover: 'hover:bg-white',
        inputBg: 'bg-white/90',
        shadow: 'shadow-2xl shadow-cyan-500/10',
        accent: 'text-cyan-600',
        accentBg: 'bg-cyan-50/80',
        accentBorder: 'border-cyan-200/50',
        accentHover: 'hover:bg-cyan-100/80',
        gradientText: 'bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent',
        transition: 'transition-all duration-300 ease-in-out'
      };
    }
    return {
      bg: 'bg-transparent',
      cardBg: 'bg-black/65',
      text: 'text-white',
      textSecondary: 'text-white',
      textTertiary: 'text-gray-100',
      border: 'border-white/10',
      hover: 'hover:bg-white/10',
      inputBg: 'bg-white/5',
      shadow: 'shadow-xl',
      accent: 'text-cyan-400',
      accentBg: 'bg-cyan-500/20',
      accentBorder: 'border-cyan-400/30',
      accentHover: 'hover:bg-cyan-500/30',
      gradientText: 'text-cyan-400',
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
              ? 'linear-gradient(135deg, rgba(6, 181, 212, 0.52) 0%, rgba(20, 184, 166, 0.59) 100%)'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.27) 0%, rgba(6, 181, 212, 0.39) 50%, rgba(20, 184, 166, 0.35) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(2px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>
        {/* Back Button - Outside Card, Extreme Left */}
        <Link
          to="/modules"
          className={`fixed left-4 top-24 z-20 flex items-center justify-center w-10 h-10 rounded-full ${theme === 'light'
            ? 'bg-white hover:bg-gray-50 text-gray-900 hover:text-gray-950 shadow-xl hover:shadow-2xl backdrop-blur-md border border-gray-200'
            : 'bg-white/30 hover:bg-white/40 text-white hover:text-white backdrop-blur-md border-2 border-white/40 hover:border-white/60 shadow-2xl'
            } transition-all duration-300 hover:scale-110 ${styles.transition}`}
          aria-label="Back to Training Modules"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-cyan-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-cyan-400 to-teal-500'
                : 'bg-cyan-500/30 border border-cyan-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <Banknote className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-cyan-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-cyan-400'
                  } ${styles.transition}`}>
                  Capital Adequacy Analysis
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master capital adequacy assessment as mandated by the Insurance Regulatory Authority (IRA) in Kenya. Learn to calculate Available Capital, Required Capital, and Capital Adequacy Ratio for both life and general insurance companies.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-cyan-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-cyan-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-cyan-400 text-white font-semibold bg-cyan-400/20 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-white hover:text-white hover:bg-cyan-500/30 hover:border-cyan-400 px-1'
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
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module equips learners with a practical understanding of capital adequacy as mandated by the Insurance Regulatory Authority (IRA) in Kenya. It covers both life and general insurance frameworks, emphasizing how capital adequacy safeguards policyholder interests, supports solvency, and informs strategic decision-making.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                  : 'bg-gradient-to-r from-cyan-400 to-teal-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Explain the concept of capital adequacy in insurance.</li>
                <li>Define and calculate an insurer's Available Capital and Required Capital in accordance with IRA guidelines.</li>
                <li>Understand the minimum capital requirements for life and general insurers.</li>
                <li>Complete CAR template for both life and general insurers and interpret the results.</li>
                <li>Describe the supervisory and enforcement actions the IRA can take in cases of non-compliance.</li>
              </ol>

            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Capital Adequacy Analysis</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-cyan-200' : 'bg-cyan-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Capital Adequacy Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Guidelines on Capital Adequacy Analysis - PDF • 22 pages</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-5-Capital-Adequacy/Course Content/KAFS_Internal Technical Procedures_Guidelines on Capital Adequacy Analysis_2026.pdf"
                    download="KAFS ITP Capital Adequacy Analysis 2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-cyan-600 hover:bg-cyan-700 shadow-lg hover:shadow-xl'
                      : 'bg-cyan-500 hover:bg-cyan-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
                  </a>
                </div>

                {/* Additional Resources */}
                <div className={`mt-6 pt-6 border-t ${styles.border}`}>
                  <h4 className={`font-semibold ${styles.text} mb-4 flex items-center gap-2 ${styles.transition}`}>
                    <FileText className="w-5 h-5" />
                    Additional Resources
                  </h4>
                  <div className="space-y-3">
                    <div className={`rounded-xl p-4 flex items-center justify-between ${theme === 'light'
                      ? 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                      : 'bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30'
                      } ${styles.transition}`}>
                      <div className="flex items-center space-x-3">
                        <FileText className={`w-5 h-5 ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`} />
                        <div>
                          <h5 className={`font-medium ${theme === 'light' ? 'text-blue-900' : 'text-blue-200'} ${styles.transition}`}>IRA Guidelines On Capital Adequacy </h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-5-Capital-Adequacy/Additional Resources/Draft_Risk_Based_Capital_Adequacy1.pdf"
                        download="Draft Risk Based Capital Adequacy.pdf"
                        className={`px-4 md:px-6 py-2 ${theme === 'light'
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                          : 'bg-blue-500 hover:bg-blue-600'
                          } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                      >
                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                        Download PDF
                      </a>
                    </div>

                    <div className={`rounded-xl p-4 flex items-center justify-between ${theme === 'light'
                      ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                      : 'bg-green-500/20 border border-green-400/30 hover:bg-green-500/30'
                      } ${styles.transition}`}>
                      <div className="flex items-center space-x-3">
                        <FileText className={`w-5 h-5 ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`} />
                        <div>
                          <h5 className={`font-medium ${theme === 'light' ? 'text-green-900' : 'text-green-200'} ${styles.transition}`}>The Insurance Valuation of Technical Provisions for General Insurance Business Guidelines 2017</h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-5-Capital-Adequacy/Additional Resources/The Insurance Valuation of Technical Provisions for General Insurance Business Guidelines 2017 (1).pdf"
                        download="The Insurance Valuation of Technical Provisions for General Insurance Business Guidelines 2017.pdf"
                        className={`px-4 md:px-6 py-2 ${theme === 'light'
                          ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
                          : 'bg-green-500 hover:bg-green-600'
                          } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                      >
                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                        Download PDF
                      </a>
                    </div>
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Capital Adequacy Analysis</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#06b6d4' : '#22d3ee'
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
                              ? 'bg-cyan-100 border-2 border-cyan-500'
                              : 'bg-cyan-500/30 border-2 border-cyan-400'
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
                          ? 'bg-cyan-600 hover:bg-cyan-700 shadow-lg hover:shadow-xl'
                          : 'bg-cyan-500 hover:bg-cyan-600 shadow-lg hover:shadow-xl'
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
                    ? 'bg-gradient-to-br from-cyan-50 to-teal-100 border border-cyan-200'
                    : 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/30'
                    } rounded-2xl p-6 md:p-8 text-center ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'} mb-2`}>
                      {calculateScore().correct}/{calculateScore().total}
                    </div>
                    <p className={`text-base md:text-lg ${styles.textTertiary} ${styles.transition}`}>
                      {calculateScore().correct === calculateScore().total
                        ? 'Perfect Score! Excellent work!'
                        : calculateScore().correct >= calculateScore().total * 0.7
                          ? 'Great job! You passed!'
                          : 'Keep studying and try again!'}
                    </p>
                    <div className={`mt-4 ${theme === 'light' ? 'text-gray-600' : 'text-white'} text-sm md:text-base ${styles.transition}`}>
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
                                : 'bg-cyan-500/10 border border-cyan-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-cyan-700' : 'text-cyan-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        ? 'bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700'
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
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the following sample balance sheets to practice your capital adequacy calculations:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
                    : 'bg-cyan-500/20 border-cyan-400/30 hover:bg-cyan-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-cyan-200' : 'bg-cyan-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>General Insurance Balance Sheet</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Sample Balance Sheet_GI.xlsx • Practice dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-5-Capital-Adequacy/Data/Sample Balance Sheet_GI.xlsx',
                        'Sample Balance Sheet_GI.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-cyan-600 hover:bg-cyan-700'
                        : 'bg-cyan-500 hover:bg-cyan-600'
                        } rounded-lg text-white transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                    : 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Life Insurance Balance Sheet</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Sample Balance Sheet_Life.xlsx • Practice dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-5-Capital-Adequacy/Data/Sample Balance Sheet_Life.xlsx',
                        'Sample Balance Sheet_Life.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-purple-500 hover:bg-purple-600'
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
                  Download these templates to structure your capital adequacy calculations:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>General Insurance CAR Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>IFRS 17 CAR Template_GI.xlsx • Comprehensive calculation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-5-Capital-Adequacy/Working Files/IFRS 17 CAR Template_GI.xlsx',
                        'IFRS 17 CAR Template_GI.xlsx'
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

                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Life Insurance CAR Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>IFRS 17 CAR Template_Life.xlsx • Comprehensive calculation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-5-Capital-Adequacy/Working Files/IFRS 17 CAR Template_Life.xlsx',
                        'IFRS 17 CAR Template_Life.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
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
                  Upload your completed assignments for review and feedback:
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
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Completed Work</h5>
                    <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                      Drag and drop your files here, or click to browse
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
                      Supported formats: .xlsx, .xls, .pdf, .docx, .pptx (Max 50MB per file)
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
                          Submit All Files for Review
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