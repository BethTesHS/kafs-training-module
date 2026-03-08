import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  Database,
  Download,
  FileText,
  TrendingUp,
  BarChart,
  PieChart,
  Target,
  Award,
  CheckCircle,
  Check,
  Eye,
  Upload,
  Settings,
  Book,
  Clock,
  Calendar,
  Shield,
  Percent,
  DollarSign,
  ChartLine,
  ExternalLink,
  Play,
  FileVideo
} from "lucide-react";

export default function Module4({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Theme-based styles with orange/amber accent
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
        shadow: 'shadow-2xl shadow-orange-500/10',
        accent: 'text-orange-600',
        accentBg: 'bg-orange-50/80',
        accentBorder: 'border-orange-200/50',
        accentHover: 'hover:bg-orange-100/80',
        gradientText: 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent',
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
      accent: 'text-orange-400',
      accentBg: 'bg-orange-500/20',
      accentBorder: 'border-orange-400/30',
      accentHover: 'hover:bg-orange-500/30',
      gradientText: 'text-orange-400',
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

  // UPDATED QUIZ QUESTIONS FOR MODULE 4
  const quizQuestions = [
    {
      id: 1,
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
      question: "Long-tail classes of business are those where:",
      options: [
        "a) Losses develop and settle quickly",
        "b) Premuims are higher than short-tail classes",
        "c) They do not require reserving triangles",
        "d) Losses take many development periods to settle"
      ],
      correctAnswer: "d) Losses take many development periods to settle",
      explanation: "Long-tail claims take many years to settle (e.g., liability, workers comp)."
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
      {/* Background - Single element, always rendered */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('/src/assets/bground.jpg')`,
        }}
      >
        {/* Overlay for theme effects */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.26) 0%, rgba(245, 159, 11, 0.49) 100%)'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(251, 146, 60, 0.4) 50%, rgba(245, 158, 11, 0.35) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(3px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-8 ${styles.transition}`}>
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
            ? 'bg-white/95 shadow-2xl shadow-orange-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-orange-400 to-amber-500'
                : 'bg-orange-500/30 border border-orange-400/40'
                } ${styles.transition} flex-shrink-0`}>
                {/* Updated icon to match valuation/discounting theme */}
                <ChartLine className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-orange-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-orange-400'
                  } ${styles.transition}`}>
                  Valuation, Discounting and Risk Margin Analysis
                </h1>

              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Learn how to perform general insurance reserve valuations using both traditional actuarial methods and IFRS 17 principles.
              This module builds practical skills in estimating outstanding claims, applying discounting and risk margin techniques,
              analysing reserve adequacy, and interpreting valuation results. You will also gain confidence in assessing uncertainty
              through sensitivity analysis and clearly communicating reserving outcomes to management and regulators.
            </p>

          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8">
          <div className={`border-b ${theme === 'light' ? 'border-orange-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-orange-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-orange-400 text-white font-semibold bg-orange-400/20 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-white hover:text-white hover:bg-orange-500/30 hover:border-orange-400 px-1'
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
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`}>
              <h3 className={`text-lg md:text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6 text-sm md:text-base ${styles.transition}`}>
                The objective of this module is to equip participants with the knowledge and practical skills required to perform general insurance reserve valuations in line with both traditional actuarial practices and IFRS 17 requirements. By the end of the training, participants will be able to:
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ul className={`list-disc pl-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Explain the role and importance of reserves in general insurance and the regulatory/IFRS 17 context</li>
                <li>Identify different reserving methods (e.g., Chain Ladder, Bornhuetter-Ferguson, Expected Loss Ratio) and when to apply each</li>
                <li>Perform calculations to estimate outstanding claims reserves using appropriate actuarial techniques</li>
                <li>Calculate the risk margin in line with IFRS 17 requirements</li>
                <li>Apply discounting techniques to insurance cashflows to derive present values under IFRS 17</li>
                <li>Analyse valuation results, assess reserve adequacy, and interpret key drivers of change</li>
                <li>Demonstrate how sensitivity testing and scenario analysis can be used to evaluate reserve uncertainty</li>
                <li>Communicate reserving results, assumptions, and limitations effectively to non-technical stakeholders</li>
              </ul>
            </div>
          )}

          {/* Course Content Tab - UPDATED FOR MODULE 4 */}
          {activeTab === 'course' && (
            <div>
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  Access comprehensive guidelines, regulations, and training materials for mastering reserve valuation, discounting, and risk margin analysis under IFRS 17.
                </p>

                {/* Main Guideline Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition} mb-4`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} ${styles.transition}`}>KAFS Internal Technical Procedures - Guidelines on Valuation for General Insurance Business</h4>
                      <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-gray-800' : 'text-white/90'} ${styles.transition}`}>Liability Valuation for General Insurance • 24 pages</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-4-General-Insurance-Valuation/Course Content/KAFS_Internal Technical Procedures_Guidelines on Valuation for General Insurance Business_2025.pdf"
                    download
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl'
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
                          <h5 className={`font-medium ${theme === 'light' ? 'text-blue-900' : 'text-blue-200'} ${styles.transition}`}>IFRS 17 Implementation Circular</h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-4-General-Insurance-Valuation/Additional Resources/Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf"
                        download
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
                      ? 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
                      : 'bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30'
                      } ${styles.transition}`}>
                      <div className="flex items-center space-x-3">
                        <FileText className={`w-5 h-5 ${theme === 'light' ? 'text-purple-700' : 'text-purple-300'}`} />
                        <div>
                          <h5 className={`font-medium ${theme === 'light' ? 'text-purple-900' : 'text-purple-200'} ${styles.transition}`}>IFRS 17 Insurance Contracts</h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-4-General-Insurance-Valuation/Additional Resources/ifrs-17-insurance-contracts.pdf"
                        download
                        className={`px-4 md:px-6 py-2 ${theme === 'light'
                          ? 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
                          : 'bg-purple-500 hover:bg-purple-600'
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
                          <h5 className={`font-medium ${theme === 'light' ? 'text-green-900' : 'text-green-200'} ${styles.transition}`}>General Insurance Technical Provisions Valuation Guidelines (2017)</h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-4-General-Insurance-Valuation/Additional Resources/The Insurancce (Valuation of Technical Provisions for General Insurance Business) Guidelines 2017.pdf"
                        download
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

                {/* Training Videos */}
                <div className={`mt-6 pt-6 border-t ${styles.border}`}>
                  <h4 className={`font-semibold ${styles.text} mb-3 flex items-center gap-2 ${styles.transition}`}>
                    <Book className="w-5 h-5" />
                    Training Videos
                  </h4>
                  <div className={`rounded-xl p-4 ${theme === 'light'
                    ? 'bg-amber-50 border border-amber-200 hover:bg-amber-100'
                    : 'bg-amber-500/20 border border-amber-400/30 hover:bg-amber-500/30'
                    } ${styles.transition}`}>
                    <Link
                      to="/modules/4/videos"
                      className={`flex items-center justify-between ${theme === 'light' ? 'text-amber-900' : 'text-amber-200'} hover:opacity-80 ${styles.transition}`}
                    >
                      <span className="font-medium">Valuation & Discounting Training Series</span>
                      <Eye className={`w-4 h-4 ${theme === 'light' ? 'text-amber-700' : 'text-amber-300'}`} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QUIZ TAB - Now with 16 questions */}
          {activeTab === 'quiz' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`}>
              {!showQuizResults ? (
                <>
                  {/* Quiz Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Valuation, Discounting & Risk Margin</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#f97316' : '#fb923c'
                      }}
                    />
                  </div>

                  {/* Question Card */}
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
                              ? 'bg-orange-100 border-2 border-orange-500'
                              : 'bg-orange-500/30 border-2 border-orange-400'
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

                  {/* Navigation Buttons */}
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
                          ? 'bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl'
                          : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl'
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

                /* Results View */
                <div className="space-y-6 md:space-y-8">
                  {/* Score Card */}
                  <div className={`${theme === 'light' ? 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200' : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-400/30'} rounded-2xl p-6 md:p-8 text-center border ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} mb-2`}>
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

                  {/* Answer Review */}
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
                                : 'bg-sky-500/10 border border-sky-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-sky-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
                                <p className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Retake Button */}
                  <div className="text-center pt-4">
                    <button
                      onClick={() => {
                        setShowQuizResults(false);
                        setQuizAnswers({});
                        setCurrentQuestionIndex(0);
                      }}
                      className={`px-6 md:px-8 py-3 ${theme === 'light'
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl'
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
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`}>
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Assignments</h3>

              {/* Data Files Subsection */}
              <div className="space-y-4">
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the required datasets for reserve valuation and discounting calculations:
                </p>

                <div className="space-y-4">
                  {/* Premium Register */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Register</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Premium data for reserve analysis</p>
                      </div>
                    </div>
                    <a
                      href="/Training Modules/Module-4-General-Insurance-Valuation/Data/Premium Register_TRAINING.xlsx"
                      download
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>

                  {/* Paid Claims */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-2xl ${styles.transition}`}>
                        💰
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Claims Paid</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Historical paid claims data</p>
                      </div>
                    </div>
                    <a
                      href="/Training Modules/Module-4-General-Insurance-Valuation/Data/Claims Paid_TRAINING.xlsx"
                      download
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>

                  {/* Outstanding Claims */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                        📈
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Claims Outstanding</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Reported claims awaiting settlement</p>
                      </div>
                    </div>
                    <a
                      href="/Training Modules/Module-4-General-Insurance-Valuation/Data/Claims Outstanding_TRAINING.xlsx"
                      download
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>

                  {/* NSE Yield Curve */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-2xl ${styles.transition}`}>
                        📉
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>NSE Yield Curve</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Discount rates for IFRS 17 calculations</p>
                      </div>
                    </div>
                    <a
                      href="/Training Modules/Module-4-General-Insurance-Valuation/Data/FY24_NSE Yield Curve.xlsx"
                      download
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates for your reserve valuation calculations:
                </p>

                <div className="space-y-4">
                  {/* IBNR Working File */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                    : 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>IBNR Computation Training</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • IBNR Computation Training</p>
                      </div>
                    </div>
                    <a
                      href="/Training Modules/Module-4-General-Insurance-Valuation/Working Files/IBNR Computation Training.xlsx"
                      download
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-purple-500 hover:bg-purple-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
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
                  Upload your completed reserve valuation analysis for review:
                </p>

                <div className={`rounded-3xl ${theme === 'light'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-green-500/10 border-green-400/20'
                  } border p-6 ${styles.transition}`}>
                  {/* Upload Area */}
                  <div className={`border-2 border-dashed ${theme === 'light'
                    ? 'border-green-300 hover:border-green-400'
                    : 'border-green-400/30 hover:border-green-400/50'
                    } rounded-2xl p-8 text-center transition-colors ${styles.transition}`}>
                    <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} mx-auto mb-4 ${styles.transition}`} />
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Reserve Valuation Files</h5>
                    <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                      Upload completed IBNR calculations, discounting analysis, and risk margin results
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
                      Supported formats: .xlsx, .r, .pdf, .docx (Max 100MB per file)
                    </p>
                  </div>

                  {/* Uploaded Files List */}
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

                      {/* Submit Button */}
                      <div className="mt-4 text-center">
                        <button className={`px-8 py-3 ${theme === 'light'
                          ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                          : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/25'
                          } rounded-xl text-white font-semibold transition`}>
                          Submit Valuation Files for Review
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
