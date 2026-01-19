import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  TrendingUp,
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
  Percent,
  DollarSign,
  LineChart,
  Target,
  Scale,
  TrendingDown,
  BarChart2,
  ChartNoAxesColumnIncreasing
} from "lucide-react";

export default function Module6({ theme = 'dark' }) {
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
        shadow: 'shadow-2xl shadow-purple-500/10',
        accent: 'text-purple-600',
        accentBg: 'bg-purple-50/80',
        accentBorder: 'border-purple-200/50',
        accentHover: 'hover:bg-purple-100/80',
        gradientText: 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent',
        transition: 'transition-all duration-300 ease-in-out'
      };
    }
    return {
      bg: 'bg-transparent',
      cardBg: 'bg-black/75',
      text: 'text-white',
      textSecondary: 'text-gray-200',
      textTertiary: 'text-gray-300',
      border: 'border-white/30',
      hover: 'hover:bg-white/10',
      inputBg: 'bg-white/5',
      shadow: 'shadow-2xl shadow-purple-500/20',
      accent: 'text-purple-400',
      accentBg: 'bg-purple-500/20',
      accentBorder: 'border-purple-400/30',
      accentHover: 'hover:bg-purple-500/30',
      gradientText: 'bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
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
              ? 'linear-gradient(135deg, rgba(77, 98, 190, 0.65) 0%, rgba(148, 64, 232, 0.59) 100%)'
              : 'linear-gradient(135deg, rgba(31, 43, 95, 0.5) 0%, rgba(94, 51, 138, 0.61) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-purple-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-purple-400 to-blue-500'
                : 'bg-gradient-to-br from-purple-500/40 to-blue-500/40 border border-purple-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <ChartNoAxesColumnIncreasing className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-white'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'
                  } ${styles.transition}`}>
                  Financial Profitability Ratios
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master financial performance analysis using IFRS 4 and IFRS 17 financials. Learn to calculate and interpret key profitability ratios, analyze financial statements, and prepare accurate performance reports for strategic decision-making.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-purple-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-purple-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-purple-400 text-white font-semibold bg-purple-400/10 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-white hover:text-white hover:bg-purple-500/30 hover:border-purple-400 px-1'
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
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gradient-to-r from-purple-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module aims to equip learners with the knowledge and practical skills necessary to understand, review, and prepare financial performance analysis using IFRS 4 and IFRS 17 financials. By the end of the module, participants will be able to interpret key financial statements, calculate and analyze performance ratios, and ensure accuracy and consistency in reporting. This will support effective performance monitoring, strengthen decision-making, and enhance compliance with both internal reporting standards and regulatory requirements.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gradient-to-r from-purple-400 to-blue-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Understand the purpose, structure, and key components of the financial performance working file.</li>
                <li>Review and update Profit & Loss (P&L) and Balance Sheet (BS) figures under both IFRS 4 and IFRS 17 frameworks.</li>
                <li>Calculate key performance ratios (e.g., loss ratio, expense ratio, combined ratio, solvency ratios) and interpret their meaning.</li>
                <li>Identify and resolve common errors, mismatches, and inconsistencies across IFRS 4 and IFRS 17 statements.</li>
                <li>Prepare clear, accurate, and reconciled financial performance reports that meet both internal and external stakeholder requirements.</li>
                <li>Apply standardized methods for ratio calculation and reporting to improve efficiency, reduce errors, and maintain consistency.</li>
              </ol>

            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Financial Performance Analysis</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Financial Performance Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Guidelines on Financial Performance Analysis - DOCX • Comprehensive guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-6-Financial-Ratios/Course Content/KAFS_Internal-Technical-Procedures_Guidelines-on-Financial-Performance-Analysis.docx"
                    download="KAFS ITP Financial Performance Analysis.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
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
                        <h5 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>IRA Insurance Industry Report 2024</h5>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Insurance Industry Annual Report 2024.pdf • Industry benchmarks</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-6-Financial-Ratios/Additional Resources/Insurance-Industry-Annual-Report-2024.pdf',
                        'IRA Insurance Industry Annual Report 2024.pdf'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} rounded-lg text-white text-sm md:text-base transition flex items-center gap-2`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Financial Profitability Ratios</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: '#6366f1'
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
                              ? 'bg-indigo-100 border-2 border-indigo-500'
                              : 'bg-indigo-500/30 border-2 border-indigo-400'
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
                        className={`px-4 md:px-6 py-3 bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
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
                                : 'bg-purple-500/10 border border-purple-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-purple-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
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
                  Download the following dataset to practice your financial ratio calculations:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Financial Performance Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Data.xlsx • Complete financial dataset for analysis</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-6-Financial-Ratios/Data/Data.xlsx',
                        'Financial Performance Data.xlsx'
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
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates to structure your financial ratio calculations:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Financial Ratios Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Ratios Template.xlsx • Comprehensive ratio calculation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-6-Financial-Ratios/Working Files/Ratios-Template.xlsx',
                        'Financial Ratios Template.xlsx'
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

              {/* Results Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-600' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Award className="w-6 h-6" />
                  Results Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download completed templates to compare your calculations with model answers:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Financial Ratios Results</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Ratios Results.xlsx • Model answers and solutions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-6-Financial-Ratios/Results Files/Ratios-Results.xlsx',
                        'Financial Ratios Results.xlsx'
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
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Upload className="w-6 h-6" />
                  Submission
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Upload your completed assignments for review and feedback:
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
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-purple-500 hover:bg-purple-600'
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