import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  FileCheck,
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
  Percent,
  TrendingUp,
  TrendingDown,
  Scale,
  ClipboardCheck,
  FileSignature,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function Module7({ theme = 'dark' }) {
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
        shadow: 'shadow-2xl shadow-blue-500/10',
        accent: 'text-blue-600',
        accentBg: 'bg-blue-50/80',
        accentBorder: 'border-blue-200/50',
        accentHover: 'hover:bg-blue-100/80',
        gradientText: 'bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent',
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
      accent: 'text-blue-400',
      accentBg: 'bg-blue-500/20',
      accentBorder: 'border-blue-400/30',
      accentHover: 'hover:bg-blue-500/30',
      gradientText: 'text-blue-400',
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
      question: "Which of the following BEST describes the purpose of premium certification?",
      options: [
        "A. To increase insurer profits",
        "B. To prove that pricing matches competitors",
        "C. To confirm adequacy and compliance of premium rates",
        "D. To support broker commissions"
      ],
      correctAnswer: "C. To confirm adequacy and compliance of premium rates",
      explanation: "Ensures premiums are financially adequate, compliant and sustainable."
    },
    {
      id: 2,
      question: "Which dataset MUST reconcile before any certification can proceed?",
      options: [
        "A. Reinsurance treaties vs underwriting guidelines",
        "B. Premium registers vs management accounts",
        "C. Sales projections vs investment returns",
        "D. Payroll expenses vs claim reserves"
      ],
      correctAnswer: "B. Premium registers vs management accounts",
      explanation: "Premium register must match management accounts for data integrity."
    },
    {
      id: 3,
      question: "A combined ratio consistently above 110% indicates:",
      options: [
        "A. Strong profitability",
        "B. Borderline pricing",
        "C. Underpricing and emerging loss strain",
        "D. Good reserve strength"
      ],
      correctAnswer: "C. Underpricing and emerging loss strain",
      explanation: "Claims + expenses > 110% of premiums = unsustainable pricing."
    },
    {
      id: 4,
      question: "Loss Ratio = Incurred Claims / Earned Premium. If claims = 85M and premium = 100M, LR =",
      options: [
        "A. 75%",
        "B. 85%",
        "C. 115%",
        "D. 100%"
      ],
      correctAnswer: "B. 85%",
      explanation: "85 divided by 100 = 85% loss ratio."
    },
    {
      id: 5,
      question: "Which condition prevents certification?",
      options: [
        "A. Combined ratio < 95%",
        "B. CAR > 100%",
        "C. Expense ratio at 28%",
        "D. Commission rate exceeds IRA limit"
      ],
      correctAnswer: "D. Commission rate exceeds IRA limit",
      explanation: "Commission breaches regulatory limits = automatic certification fail"
    },
    {
      id: 6,
      question: "Minimum adequate premium is calculated as:",
      options: [
        "A. Claims + Commissions + Expenses",
        "B. Pure Premium / Expense Ratio",
        "C. (Pure Premium + Expenses) / (1 – Margin)",
        "D. GWP – Loss Ratio"
      ],
      correctAnswer: "C. (Pure Premium + Expenses) / (1 – Margin)",
      explanation: "Ensures pure premium + cost + profit recovered fully"
    },
    {
      id: 7,
      question: "Strongest indicator for rate increase?",
      options: [
        "A. Stable frequency + declining severity",
        "B. Loss ratio rises 18% YoY",
        "C. Premium growth >20%",
        "D. Expense ratio <20%"
      ],
      correctAnswer: "B. Loss ratio rises 18% YoY",
      explanation: "Rapid deterioration implies underpricing risk."
    },
    {
      id: 8,
      question: "Certification should not proceed when:",
      options: [
        "A. CR = 97%",
        "B. Avg rate 2% above adequacy",
        "C. Pricing 12% below adequacy",
        "D. LR = 60%"
      ],
      correctAnswer: "C. Pricing 12% below adequacy",
      explanation: "Underpricing >10% requires adjustment before approval."
    },
    {
      id: 9,
      question: "'Approve with Conditions' means:",
      options: [
        "A. Fully adequate",
        "B. Must increase pricing immediately",
        "C. Adequate but requires monitoring",
        "D. IRA approval irrelevant"
      ],
      correctAnswer: "C. Adequate but requires monitoring",
      explanation: "Suitable when near adequacy threshold with emerging risk."
    },
    {
      id: 10,
      question: "Most sensitive to claims inflation?",
      options: [
        "A. Expense Ratio",
        "B. Loss Ratio",
        "C. Commission Ratio",
        "D. CAR"
      ],
      correctAnswer: "B. Loss Ratio",
      explanation: "Claims inflation increases severity and loss ratio primarily."
    },
    {
      id: 11,
      question: "CAR Fall 150% → 110% suggests:",
      options: [
        "A. Strong profits",
        "B. Low growth",
        "C. Capital strain from losses",
        "D. Commission savings"
      ],
      correctAnswer: "C. Capital strain from losses",
      explanation: "Decline signals underwriting deterioration affecting solvency"
    },
    {
      id: 12,
      question: "If severity increases, appropriate action is:",
      options: [
        "A. Reduce premiums",
        "B. Increase deductibles",
        "C. Remove reinsurance",
        "D. Cut commission only"
      ],
      correctAnswer: "B. Increase deductibles",
      explanation: "Deductibles control high severity exposure."
    },
    {
      id: 13,
      question: "Mandatory content in certificate?",
      options: [
        "A. Broker feedback",
        "B. Pricing adequacy opinion",
        "C. Competitor benchmarking only",
        "D. Marketing summary"
      ],
      correctAnswer: "B. Pricing adequacy opinion",
      explanation: "Certificate must contain adequacy conclusion and recommendation."
    },
    {
      id: 14,
      question: "Dataset acceptable only after:",
      options: [
        "A. Gaps ignored",
        "B. Validation log signed",
        "C. Market assumption only",
        "D. CAR >100%"
      ],
      correctAnswer: "B. Validation log signed",
      explanation: "Signed validation confirms data integrity."
    },
    {
      id: 15,
      question: "Purpose of average premium rate analysis?",
      options: [
        "A. Track revenue",
        "B. Detect pricing drift & underpricing",
        "C. Measure distribution profit only",
        "D. Validate investment returns"
      ],
      correctAnswer: "B. Detect pricing drift & underpricing",
      explanation: "Used to compare adequacy across years"
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
              ? 'linear-gradient(135deg, rgba(59, 131, 246, 0.52) 0%, rgba(59, 131, 246, 0.53) 100%)'
              : 'rgba(0, 0, 0, 0.3)',
            backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-blue-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-blue-400 to-blue-500'
                : 'bg-blue-500/30 border border-blue-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <FileCheck className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-blue-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-blue-400'
                  } ${styles.transition}`}>
                  Premium Certification
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master actuarial premium certification for general insurance business. Learn to assess pricing adequacy, compute loss & expense ratios, evaluate average premium rates, test regulatory compliance, and issue actuarial certification opinions for IRA approval.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-blue-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-blue-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-blue-400 text-white font-semibold bg-blue-400/10 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-white hover:text-white hover:bg-blue-500/30 hover:border-blue-400 px-1'
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
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module equips learners with practical skills in performing Actuarial Premium Certification for general insurance business. Participants will learn how to assess pricing adequacy, compute loss & expense ratios, evaluate average premium rates, test regulatory compliance, and issue an actuarial certification opinion for approval by IRA.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Understand the purpose and regulatory basis of premium certification under the Insurance Act.</li>
                <li>Explain how premium adequacy links to solvency, loss experience and capital sustainability.</li>
                <li>Validate premium and loss data for accuracy, completeness and reconciliation integrity.</li>
                <li>Calculate core actuarial certification metrics.</li>
                <li>Determine whether proposed premium rates are sufficient using adequacy formulas.</li>
                <li>Apply premium review methodology to real insurer datasets.</li>
                <li>Produce an actuarial certification report and recommendation suitable for IRA submission.</li>
              </ol>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Activities and Exercises
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>
                Download the exercises document to test your understanding through practical calculations and case studies.
              </p>
              <a
                href="/Training Modules/Module-7-Premium-Certification/Module-7_Exercises_GI-Premium-Certificate.docx"
                download="Module 7 Exercises - GI Premium Certificate.docx"
                className={`inline-flex items-center gap-2 mt-3 px-4 py-2 ${theme === 'light'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
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
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Premium Certification Analysis</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Certification Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Premium Certification 2025 - DOCX • Comprehensive guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-7-Premium-Certification/Course Content/KAFS_Internal-Technical-Procedures_Premium-Certification_2025.docx"
                    download="KAFS ITP Premium Certification 2025.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-blue-500 hover:bg-blue-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download DOCX
                  </a>
                </div>

                <div className={`mt-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-xs md:text-sm italic ${styles.transition}`}>
                  Additional regulatory resources will be added here when available.
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Premium Certification</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#4F46E5' : '#818CF8'
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
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-blue-500/30 border-2 border-blue-400'
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
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                          : 'bg-sky-400 hover:bg-sky-500 shadow-lg hover:shadow-xl'
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
                    ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                    : 'bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-400/30'
                    } rounded-2xl p-6 md:p-8 text-center border ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-blue-600' : 'text-sky-400'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-blue-600' : 'text-sky-400'} mb-2`}>
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
                                : 'bg-blue-500/10 border border-blue-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-blue-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                        : 'bg-blue-500 hover:bg-blue-600'
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
                  Download the following dataset to practice your premium certification calculations:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>ABC Company Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>ABC Company_Data Shared.xlsx • Complete premium & claims dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-7-Premium-Certification/Data/ABC-Company_Data-Shared.xlsx',
                        'ABC Company Data Shared.xlsx'
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
                  Download these templates to structure your premium certification analysis:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Certification Template 2025</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>ABC- Premium Certification 2025.xlsx • Comprehensive certification workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-7-Premium-Certification/Working Files/ABC-Premium-Certification-2025.xlsx',
                        'ABC Premium Certification 2025.xlsx'
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

              {/* Results Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-600' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Award className="w-6 h-6" />
                  Results Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download completed templates to compare your certification analysis with model answers:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-xl ${styles.transition}`}>
                        ✅
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Certification Results 2025</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>ABC- Premium Certification 2025_Results.xlsx • Model certification answers</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-7-Premium-Certification/Results Files/ABC-Premium-Certification-2025_Results.xlsx',
                        'ABC Premium Certification 2025 Results.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
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
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Upload className="w-6 h-6" />
                  Submission
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Upload your completed premium certification assignments for review and feedback:
                </p>

                <div className={`rounded-3xl ${theme === 'light'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-blue-500/10 border-blue-400/20'
                  } border p-6 ${styles.transition}`}>
                  <div className={`border-2 border-dashed ${theme === 'light'
                    ? 'border-blue-300 hover:border-blue-400'
                    : 'border-blue-400/30 hover:border-blue-400/50'
                    } rounded-2xl p-8 text-center transition-colors ${styles.transition}`}>
                    <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} mx-auto mb-4 ${styles.transition}`} />
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Certification Work</h5>
                    <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                      Drag and drop your completed certification files here, or click to browse
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
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
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
                              <FileText className={`w-4 h-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} ${styles.transition}`} />
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
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                          : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/25'
                          } rounded-xl text-white font-semibold transition`}>
                          Submit Certification for Review
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