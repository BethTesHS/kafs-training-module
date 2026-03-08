import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart2,
  Bell,
  User,
  Book,
  Clock,
  Calendar,
  FileText,
  Award,
  Download,
  Eye,
  CheckCircle,
  Check,
  ExternalLink,
  Upload,
  Database,
  Settings,
  Calculator,
  TrendingUp,
  BarChart,
  PieChart,
  Target
} from "lucide-react";

export default function Module2({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Theme-based styles - matching Module 1's structure but with blue accent
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
      question: "Frequency in insurance is best defined as:",
      options: [
        "a) The probability that a claim will occur within a given period.",
        "b) The average size of a claim.",
        "c) The ratio of total claims to premiums.",
        "d) The maximum possible loss on a policy."
      ],
      correctAnswer: "a) The probability that a claim will occur within a given period.",
      explanation: "Frequency measures how often claims occur relative to exposure, i.e., probability of occurrence."
    },
    {
      id: 2,
      question: "Severity in insurance refers to:",
      options: [
        "a) The number of claims per exposure.",
        "b) The financial impact of a claim once it occurs.",
        "c) The probability of claims not occurring.",
        "d) The distribution of exposures across policies."
      ],
      correctAnswer: "b) The financial impact of a claim once it occurs.",
      explanation: "Severity measures the average claim size when a claim happens."
    },
    {
      id: 3,
      question: "If 2,000 motor policies are written and 80 claims are reported, what is the claim frequency?",
      options: [
        "a) 0.2",
        "b) 0.04",
        "c) 25",
        "d) 40%"
      ],
      correctAnswer: "b) 0.04",
      explanation: "Frequency = 80 ÷ 2,000 = 0.04 (4%)."
    },
    {
      id: 4,
      question: "An insurer reports 100 claims with a total payout of 50,000,000. What is the average severity?",
      options: [
        "a) 500,000",
        "b) 50,000",
        "c) 5,000,000",
        "d) 5,000"
      ],
      correctAnswer: "a) 500,000",
      explanation: "Severity = total loss amount ÷ number of claims = 50,000,000 ÷ 100 = 500,000."
    },
    {
      id: 5,
      question: "Suppose an insurer has 1,200 claims from 60,000 vehicle-years. If average severity is 300,000, the pure risk cost per vehicle-year is:",
      options: [
        "a) 6,000",
        "b) 3,000",
        "c) 12,000",
        "d) 18,000"
      ],
      correctAnswer: "a) 6,000",
      explanation: "Frequency = 1,200 ÷ 60,000 = 0.02. Risk cost = 0.02 × 300,000 = 6,000."
    },
    {
      id: 6,
      question: "The risk premium is best described as:",
      options: [
        "a) The premium charged after adding profit and expenses.",
        "b) The expected cost of claims before loadings.",
        "c) The reinsurance premium ceded to reinsurers.",
        "d) The difference between earned and written premium."
      ],
      correctAnswer: "b) The expected cost of claims before loadings.",
      explanation: "Risk premium = pure premium = expected claims cost only, before loadings."
    },
    {
      id: 7,
      question: "If frequency is 0.02 and average severity is 250,000, the risk premium per policy is:",
      options: [
        "a) 5,000",
        "b) 25,000",
        "c) 2,500",
        "d) 50,000"
      ],
      correctAnswer: "a) 5,000",
      explanation: "Risk premium = Frequency × Severity = 0.02 × 250,000 = 5,000."
    },
    {
      id: 8,
      question: "Which of the following does NOT directly affect risk premium?",
      options: [
        "a) Frequency",
        "b) Severity",
        "c) Expense loadings",
        "d) Exposure"
      ],
      correctAnswer: "c) Expense loadings",
      explanation: "Expenses are excluded from risk premium; they come in office premium."
    },
    {
      id: 9,
      question: "The office premium is obtained by:",
      options: [
        "a) Adding risk premium + expenses + commission + profit margin",
        "b) Subtracting IBNR from gross claims",
        "c) Multiplying risk premium by loss ratio",
        "d) Adding UPR to earned premium"
      ],
      correctAnswer: "a) Adding risk premium + expenses + commission + profit margin",
      explanation: "Office premium = risk premium plus loadings for expenses, commissions, and profit."
    },
    {
      id: 10,
      question: "An insurer's risk premium for motor policies is 10,000. To achieve a combined ratio of 95%, what office premium should be charged (assuming expenses are 20% and commission are 15% of premium)?",
      options: [
        "a) 12,500",
        "b) 13,158",
        "c) 10,526",
        "d) 16,667"
      ],
      correctAnswer: "d) 16,667",
      explanation: "Premium = 10,000 ÷ (1 – 0.20 – 0.15 – 0.05) = 16,667."
    },
    {
      id: 11,
      question: "Why is profit loading in office premium often expressed as a percentage of risk premium rather than expenses?",
      options: [
        "a) To align profitability with claims risk",
        "b) To simplify solvency reporting",
        "c) To avoid regulatory scrutiny",
        "d) To ensure commissions remain constant"
      ],
      correctAnswer: "a) To align profitability with claims risk",
      explanation: "Profit is proportional to claims risk, not expenses."
    },
    {
      id: 12,
      question: "Which of the following presents the greatest challenge when transitioning from risk premium to office premium?",
      options: [
        "a) Stability of frequency estimates",
        "b) Volatility of severity due to inflation",
        "c) Allocation and forecasting of expenses and commissions",
        "d) Measuring exposure consistently"
      ],
      correctAnswer: "c) Allocation and forecasting of expenses and commissions",
      explanation: "Expenses and commissions are highly judgmental and can vary significantly."
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
              ? 'linear-gradient(135deg, rgba(59, 131, 246, 0.35) 0%, rgba(59, 131, 246, 0.36) 100%)'
              : 'rgba(0, 0, 0, 0.3)',
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

        {/* Module Hero Container - Matching Module 1 structure */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-blue-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-blue-400 to-blue-500'
                : 'bg-blue-500/30 border border-blue-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <Calculator className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-blue-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-blue-400'
                  } ${styles.transition}`}>
                  Pricing Fundamentals: Frequency & Severity
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master the core concepts of frequency and severity for insurance pricing and risk assessment. Learn to quantify risk using exposure measures, calculate premiums, and connect technical analysis with commercial pricing decisions.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8">
          <div className={`border-b ${theme === 'light' ? 'border-blue-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-blue-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-blue-400 text-white font-semibold bg-blue-400/20 px-3 py-1 rounded-t-lg'
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
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`}>
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module introduces the core concepts of frequency and severity, which form the basis for pricing, reserving, and risk assessment in insurance. Learners will be introduced to the concepts of frequency, severity, and exposure, and learn how these measures are used to quantify and assess insurance risk. The module also covers the calculation of risk premium and office premium, ensuring learners can connect technical analysis with the commercial realities of premium setting.
                <br /><br />
                By the end of the module, participants will be able to apply actuarial techniques to analyze claims data, calculate expected premiums, and evaluate the relationship between exposures, premiums, and loss ratios to support sound pricing decisions.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Explain the concepts of frequency and severity and their role in measuring insurance risk</li>
                <li>Calculate and interpret exposures for use in insurance analysis (in days, months, or years)</li>
                <li>Differentiate between risk premium and office premium and describe how each contributes to premium calculation</li>
                <li>Apply frequency and severity measures to estimate expected claims and derive risk premiums</li>
                <li>Assess the relationship between exposures, premiums, and loss ratios to evaluate insurance performance</li>
              </ul>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div>
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Frequency & Severity Analysis</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Frequency & Severity Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>ITP-Frequency-Severity.pdf • Comprehensive guide • January 2025</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-2-Pricing/Course Content/ITP-Frequency-Severity.pdf"
                    download="ITP-Frequency-Severity.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-blue-500 hover:bg-blue-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
                  </a>
                </div>

                {/* Manual Preview Note */}
                <div className={`mt-4 md:mt-6 p-3 md:p-4 ${styles.inputBg} rounded-lg border ${styles.border} ${styles.transition}`}>
                  <h5 className={`${styles.text} font-semibold mb-2 text-sm md:text-base ${styles.transition}`}>About This Document:</h5>
                  <p className={`${styles.textTertiary} text-xs md:text-sm ${styles.transition}`}>
                    This PDF contains detailed procedures for frequency and severity analysis. It covers:
                  </p>
                  <ul className={`list-disc pl-5 mt-2 ${styles.textTertiary} text-xs md:text-sm ${styles.transition}`}>
                    <li>Frequency and severity concepts and calculations</li>
                    <li>Exposure measures and risk premium derivation</li>
                    <li>Transition from risk premium to office premium</li>
                    <li>Practical examples and exercises</li>
                  </ul>
                </div>

                <div className={`mt-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-xs md:text-sm italic ${styles.transition}`}>
                  Supplementary resources will be added here in future updates.
                </div>
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`}>
              {!showQuizResults ? (
                <>
                  {/* Quiz Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Frequency & Severity</h3>
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
                        backgroundColor: theme === 'light' ? '#3B82F6' : '#38bdf8'
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
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : 'bg-sky-500/30 border-2 border-sky-400'
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

                /* Results View */
                <div className="space-y-6 md:space-y-8">
                  {/* Score Card */}
                  <div className={`${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' : 'bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-400/30'} rounded-2xl p-6 md:p-8 text-center border ${styles.transition}`}>
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
                        ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
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

          {/* ASSIGNMENTS TAB - Matching Module 1 structure */}
          {activeTab === 'assignments' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`}>
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Assignments</h3>

              {/* Data Files Subsection */}
              <div className="space-y-4">
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the following datasets to practice your frequency and severity calculations:
                </p>

                <div className="space-y-4">
                  {/* Claims Data */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-2xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Claims Data</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Historical claims for analysis</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-2-Pricing-Fundamentals/Data/Claims-Data.xlsx',
                        'Claims Data.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } rounded-lg text-white transition flex items-center gap-2`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>

                  {/* Premium Data */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                        📈
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Data</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Premium and exposure data</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-2-Pricing-Fundamentals/Data/Premium-Data.xlsx',
                        'Premium Data.xlsx'
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

              {/* Working Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates to structure your frequency and severity calculations:
                </p>

                <div className="space-y-4">
                  {/* Frequency and Severity Template */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Frequency and Severity Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Structured template for calculations</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-2-Pricing-Fundamentals/Working File/Frequency-and-Severity-Template.xlsx',
                        'Frequency and Severity Template.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-orange-500 hover:bg-orange-600'
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
                  {/* Upload Area */}
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