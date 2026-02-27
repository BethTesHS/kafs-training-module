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
  Target,
  Users,
  Shield,
  Building,
  Banknote,
  Percent,
  ChartLine
} from "lucide-react";

export default function Module12({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Theme-based styles - matching Module 2's structure but with blue accent
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
      question: "Under a DA Scheme, who bears the investment risk?",
      options: [
        "A. The employer",
        "B. The insurance company",
        "C. The members collectively",
        "D. The Retirement Benefits Authority (RBA)"
      ],
      correctAnswer: "B. The insurance company",
      explanation: "In Deposit Administration (DA) schemes, the insurer manages and invests the pooled fund and guarantees the declared return; hence, the investment risk lies with the insurer, not the employer or members."
    },
    {
      id: 2,
      question: "What does the insurer deduct from the fund's investment returns to cover administrative and operational expenses?",
      options: [
        "A. Transfer fee",
        "B. Withdrawal levy",
        "C. Management fee",
        "D. Trustee commission"
      ],
      correctAnswer: "C. Management fee",
      explanation: "The manual states that management fees are deducted from investment returns to cover administrative, investment, and operational costs."
    },
    {
      id: 3,
      question: "In an IPP, each member's fund value reflects:",
      options: [
        "A. The pooled balance of all members",
        "B. The insurer's declared bonus rate only",
        "C. The member's individual account value at valuation date",
        "D. The average of all scheme balances"
      ],
      correctAnswer: "C. The member's individual account value at valuation date",
      explanation: "IPP liabilities equal the member's own account balance (units × unit price) at the valuation date rather than a pooled fund."
    },
    {
      id: 4,
      question: "Which authority regulates both DA and IPP schemes in Kenya?",
      options: [
        "A. Central Bank of Kenya",
        "B. Capital Markets Authority",
        "C. Retirement Benefits Authority (RBA)",
        "D. Insurance Regulatory Authority (IRA)"
      ],
      correctAnswer: "C. Retirement Benefits Authority (RBA)",
      explanation: "Both DA and IPP schemes are governed by the Retirement Benefits Authority (RBA) under the Retirement Benefits Act (Kenya)."
    },
    {
      id: 5,
      question: "Which of the following is not listed as required data for a DA valuation?",
      options: [
        "A. Detailed product descriptions",
        "B. Contributions and withdrawals data",
        "C. Declared interest rates",
        "D. Staff payroll records"
      ],
      correctAnswer: "D. Staff payroll records",
      explanation: "Data requirements include product descriptions, contributions, withdrawals, and declared interest rates — not payroll records."
    },
    {
      id: 6,
      question: "One of the main goals of the data-checks phase is to confirm:",
      options: [
        "A. Future contribution rates",
        "B. Credibility, consistency, and completeness of the data",
        "C. Company profitability",
        "D. Market share of pension schemes"
      ],
      correctAnswer: "B. Credibility, consistency, and completeness of the data",
      explanation: "Data checks aim to verify credibility, consistency, and completeness, ensuring reliable inputs for valuation."
    },
    {
      id: 7,
      question: "Reasonability checks include all the following except:",
      options: [
        "A. Checking data formats",
        "B. Comparing declared bonuses across insurers",
        "C. Identifying blanks or unreasonable values",
        "D. Confirming entry ages meet eligibility"
      ],
      correctAnswer: "B. Comparing declared bonuses across insurers",
      explanation: "Reasonability checks relate to internal data integrity, not external benchmarking such as comparing industry bonus rates."
    },
    {
      id: 8,
      question: "What is the purpose of performing completeness and accuracy checks?",
      options: [
        "A. To verify interest-rate projections",
        "B. To compare total contributions and withdrawals with financial statements",
        "C. To audit actuarial assumptions",
        "D. To ensure pension-law compliance"
      ],
      correctAnswer: "B. To compare total contributions and withdrawals with financial statements",
      explanation: "Completeness and accuracy checks confirm that aggregate policy data reconcile with the insurer's audited or management accounts."
    },
    {
      id: 9,
      question: "The liability for DA & IPP business represents:",
      options: [
        "A. Expected future premiums",
        "B. Accumulated contributions and transfers plus declared interest",
        "C. Profit margin retained by insurer",
        "D. Regulatory solvency capital"
      ],
      correctAnswer: "B. Accumulated contributions and transfers plus declared interest",
      explanation: "The fund liability equals the accumulated value of contributions + transfers + declared interest credited over the period."
    },
    {
      id: 10,
      question: "Which of the following is included in the fund-balance formula?",
      options: [
        "A. Premium receivable",
        "B. Management fees",
        "C. Deferred tax",
        "D. Claims reserves"
      ],
      correctAnswer: "B. Management fees",
      explanation: "The formula for year-end fund balance explicitly deducts management fees before applying interest: Opening + Contributions − Withdrawals − Fees + Interest."
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

        {/* Module Hero Container - Matching Module 2 structure */}
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
                <Users className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-blue-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-blue-400'
                  } ${styles.transition}`}>
                  DA Valuation
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master the practical skills for calculating pension liabilities under Deposit Administration (DA) and Individual Pension Plans (IPP). Learn to analyze contributions, validate data, apply actuarial assumptions, and compute accurate actuarial liabilities for pension business.
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
                This module aims to equip learners with practical skills in calculating the liabilities under pension business. 
                By the end of the module, participants will be able to analyze contributions and withdrawals data, 
                apply actuarial assumptions, and calculate the actuarial liabilities for Deposit Administration ("DA") 
                and Individual Pension Plans ("IPP") businesses.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-600'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Compile and validate data on contributions and withdrawals to ensure accuracy for valuation purposes</li>
                <li>Calculate liabilities for Deposit Administration (DA) and Individual Pension Plans (IPP) using appropriate actuarial methods</li>
                <li>Apply data quality checks to verify credibility, consistency, and completeness of pension data</li>
                <li>Understand the regulatory framework governing DA and IPP schemes in Kenya</li>
                <li>Differentiate between pooled fund (DA) and individual account (IPP) valuation approaches</li>
              </ul>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module provides comprehensive guidance on pension valuation through detailed technical documents. 
                  Download and use them as your primary references to master <span className={styles.accent}>DA & IPP Valuation</span>.
                </p>

                {/* Technical Procedure Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>DA & IPP Valuation Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS_Internal Technical Procedures_DA & IPP - Valuation Manual.pdf • Comprehensive guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-12-DA-Valuation/Course Content/KAFS_Internal Technical Procedures_DA & IPP - Valuation Manual.pdf"
                    download="KAFS_Internal Technical Procedures_DA & IPP - Valuation Manual.pdf"
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
                    This comprehensive manual covers all aspects of DA and IPP valuation including:
                  </p>
                  <ul className={`list-disc pl-5 mt-2 ${styles.textTertiary} text-xs md:text-sm ${styles.transition}`}>
                    <li>Overview of DA and IPP pension schemes</li>
                    <li>Data requirements and validation procedures</li>
                    <li>Valuation methodologies and calculations</li>
                    <li>Regulatory framework and compliance requirements</li>
                    <li>Practical examples and case studies</li>
                  </ul>
                </div>

                <div className={`mt-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-xs md:text-sm italic ${styles.transition}`}>
                  Additional resources and training videos will be added in future updates.
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: DA & IPP Pension Valuation</h3>
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
                        backgroundColor: theme === 'light' ? '#2563eb' : '#3b82f6'
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
                          : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl'
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
                  <div className={`${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' : 'bg-gradient-to-br from-blue-500/10 to-blue-500/10 border-blue-400/30'} rounded-2xl p-6 md:p-8 text-center border ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} mb-2`}>
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

          {/* ASSIGNMENTS TAB - Matching Module 2 structure */}
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
                  Download the following datasets to practice your pension valuation calculations:
                </p>

                <div className="space-y-4">
                  {/* Training Dataset */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-2xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>DA Training Dataset</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Complete dataset with full dates for valuation</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-12-DA-Valuation/Data/DA_training_dataset_with_full_dates.xlsx',
                        'DA Training Dataset.xlsx'
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
                </div>
              </div>

              {/* Working Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates to structure your DA & IPP valuation calculations:
                </p>

                <div className="space-y-4">
                  {/* DA & IPP Working File */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-amber-50 border-amber-200 hover:bg-amber-100'
                    : 'bg-amber-500/20 border-amber-400/30 hover:bg-amber-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-amber-200' : 'bg-amber-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>DA & IPP Working File Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Structured template for valuation calculations</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-12-DA-Valuation/Working Files/DA & IPP_Working File.xlsx',
                        'DA & IPP Working File.xlsx'
                      )}
                      className={`px-6 py-2 ${theme === 'light'
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-amber-500 hover:bg-amber-600'
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