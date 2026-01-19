import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  FileBarChart,
  Book,
  Download,
  Award,
  Check,
  Upload,
  Database,
  Settings,
  FileText,
  Scale,
  TrendingUp,
  TrendingDown,
  Shield,
  BarChart,
  PieChart,
  Target,
  Building,
  FileCheck,
  ClipboardCheck
} from "lucide-react";

export default function Module9({ theme = 'dark' }) {
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

  const quizQuestions = [
    {
      id: 1,
      question: "The primary purpose of a Financial Condition Report (FCR) is to:",
      options: [
        "a) Assess the insurer's current and future financial soundness.",
        "b) Provide audited financial statements to shareholders.",
        "c) Describe marketing strategies for premium growth.",
        "d) Summarize the company's investment returns."
      ],
      correctAnswer: "a) Assess the insurer's current and future financial soundness.",
      explanation: "An FCR focuses on evaluating solvency, risks, and the insurer's ability to meet obligations under current and future conditions."
    },
    {
      id: 2,
      question: "Which of the following best describes the 'actuary's opinion' within the FCR?",
      options: [
        "a) A summary of the insurer's profitability trends.",
        "b) A mandatory statement confirming the actuarial valuation approach and key conclusions.",
        "c) A forecast of market share for the next three years.",
        "d) A description of operational policies."
      ],
      correctAnswer: "b) A mandatory statement confirming the actuarial valuation approach and key conclusions.",
      explanation: "Regulations require the signing actuary to provide a clear opinion on liabilities, risks, and methods used in the FCR."
    },
    {
      id: 3,
      question: "In preparing an FCR, the actuary must ensure that assumptions used are:",
      options: [
        "a) Determined solely by management.",
        "b) More optimistic than previous years.",
        "c) Reasonable, justifiable, and aligned with regulatory requirements.",
        "d) Based only on international benchmarks."
      ],
      correctAnswer: "c) Reasonable, justifiable, and aligned with regulatory requirements.",
      explanation: "Assumptions must be supportable, relevant to the insurer's experience, and meet guideline requirements."
    },
    {
      id: 4,
      question: "Which statement best explains the role of regulatory guidelines in FCR preparation?",
      options: [
        "a) They act as optional reference materials.",
        "b) They define the minimum content, format, and standards required in the report.",
        "c) They replace the actuary's professional judgment.",
        "d) They provide industry marketing templates."
      ],
      correctAnswer: "b) They define the minimum content, format, and standards required in the report.",
      explanation: "FCR guidelines specify required sections, actuarial duties, and reporting standards."
    },
    {
      id: 5,
      question: "When discussing solvency, the FCR should highlight:",
      options: [
        "a) Only past capital positions.",
        "b) Only IFRS accounting profits.",
        "c) Competitor solvency requirements.",
        "d) The current solvency margin and projected future solvency."
      ],
      correctAnswer: "d) The current solvency margin and projected future solvency.",
      explanation: "FCRs must include both current solvency status and forward-looking solvency forecasts."
    },
    {
      id: 6,
      question: "A material risk in the FCR must be disclosed when:",
      options: [
        "a) It has negligible impact on capital.",
        "b) It is unlikely to happen.",
        "c) It could significantly affect the insurer's financial condition.",
        "d) The risk has already been fully mitigated."
      ],
      correctAnswer: "c) It could significantly affect the insurer's financial condition.",
      explanation: "Materiality is based on potential financial impact, not likelihood alone."
    },
    {
      id: 7,
      question: "The FCR requirement for documentation of methodologies ensures that:",
      options: [
        "a) The actuary can avoid explaining complex models.",
        "b) The insurer can outsource the work without supervision.",
        "c) Only the regulator can interpret the results.",
        "d) Stakeholders understand assumptions, data, and actuarial techniques used."
      ],
      correctAnswer: "d) Stakeholders understand assumptions, data, and actuarial techniques used.",
      explanation: "Clear documentation promotes transparency and auditability of actuarial methods."
    },
    {
      id: 8,
      question: "Which risk is most commonly analyzed in the insurance liability section of an FCR?",
      options: [
        "a) Foreign exchange risk.",
        "b) Underwriting and claims risk.",
        "c) Reputation risk.",
        "d) Outsourcing risk."
      ],
      correctAnswer: "b) Underwriting and claims risk.",
      explanation: "Liability valuation is directly influenced by claim frequency, severity, lapse, and other underwriting risks."
    },
    {
      id: 9,
      question: "In an FCR, the assessment of asset–liability management (ALM) primarily focuses on:",
      options: [
        "a) Ensuring investment assets mature in line with liability cashflows.",
        "b) Comparing asset returns with competitors.",
        "c) Maximizing short-term investment income.",
        "d) Reducing operational expenses through automation."
      ],
      correctAnswer: "a) Ensuring investment assets mature in line with liability cashflows.",
      explanation: "ALM analysis in the FCR examines whether the timing, amount, and nature of assets appropriately back liability obligations."
    },
    {
      id: 10,
      question: "When evaluating reinsurance arrangements in the FCR, the actuary should focus most on:",
      options: [
        "a) Whether reinsurers offer loyalty discounts.",
        "b) The reinsurer's marketing activities.",
        "c) How reinsurance affects net solvency and capital strain under adverse scenarios.",
        "d) Historical commission rates alone."
      ],
      correctAnswer: "c) How reinsurance affects net solvency and capital strain under adverse scenarios.",
      explanation: "The FCR must assess whether reinsurance genuinely reduces risk and improves solvency under both base and stressed conditions."
    },
    {
      id: 11,
      question: "Which situation would most likely trigger an explicit recommendation in the FCR?",
      options: [
        "a) A minor year-on-year fluctuation in claim ratios.",
        "b) A consistent divergence between actual experience and booked assumptions.",
        "c) A change in the insurer's corporate branding.",
        "d) A routine board committee restructure."
      ],
      correctAnswer: "b) A consistent divergence between actual experience and booked assumptions.",
      explanation: "Persistent assumption-experience mismatches may signal emerging risks or require model refinements, warranting formal recommendations."
    },
    {
      id: 12,
      question: "In reviewing the insurer's business plan within the FCR, the actuary is primarily concerned with:",
      options: [
        "a) Whether projected growth is supported by adequate capital and risk controls.",
        "b) Whether the Board prefers aggressive expansion.",
        "c) The company's branding and marketing strategy.",
        "d) The number of new distribution channels planned."
      ],
      correctAnswer: "a) Whether projected growth is supported by adequate capital and risk controls.",
      explanation: "The actuary assesses whether the business plan is realistic relative to the insurer's solvency position and risk appetite."
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
              ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.65) 0%, rgba(245, 158, 11, 0.59) 100%)'
              : 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(251, 146, 60, 0.4) 50%, rgba(245, 158, 11, 0.35) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(4px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 py-8 ${styles.transition}`}>

        {/* Module Hero Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? 'bg-white/95 shadow-2xl shadow-orange-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-orange-400 to-amber-500'
                : 'bg-orange-500/30 border border-orange-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <FileBarChart className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-orange-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-orange-400'
                  } ${styles.transition}`}>
                  Financial Condition Report (FCR)
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master the preparation and analysis of Financial Condition Reports. Learn to assess financial strength, solvency, asset-liability management, reinsurance arrangements, and provide strategic recommendations to boards and regulators.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-orange-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-orange-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-orange-400 text-white font-semibold bg-orange-400/10 px-3 py-1 rounded-t-lg'
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
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`} data-aos="fade-up">
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module aims to equip learners with the knowledge and practical skills required to understand, support, and contribute to the preparation of a Financial Condition Report (FCR). By the end of the module, participants will be able to explain the regulatory purpose and importance of the FCR, interpret its key components, and apply actuarial techniques to support financial analysis, reserving, solvency assessment, asset-liability management, reinsurance assessment, and risk evaluation. This will strengthen their ability to contribute effectively to the preparation of the FCR, translate technical findings into recommendations that inform strategic decisions by the Board and senior management, and ensure the company meets actuarial professional standards and regulatory obligations.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Explain the role and purpose of the FCR in assessing an insurer's financial strength, solvency, and long-term sustainability.</li>
                <li>Identify and describe the key sections of the FCR, including business overview, profitability, reserving, asset-liability management, solvency position, reinsurance arrangements, risk management, and internal process reviews.</li>
                <li>Apply actuarial skills to support technical analysis within the FCR, such as reserve calculations, solvency assessments and asset-liability matching.</li>
                <li>Interpret and summarize technical findings in a clear and accurate way that supports decision-making by non-technical stakeholders, including the Board and regulator.</li>
                <li>Recognize governance, professional, and regulatory considerations when preparing an FCR, including confidentiality, accuracy, and transparency of actuarial advice.</li>
              </ol>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Activities and Exercises
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} text-sm md:text-base ${styles.transition}`}>
                Download the exercises document to test your understanding through practical calculations and case studies.
              </p>
              <a
                href="/Training Modules/Module-9-FCR/Module-9_Exercises_FCR.docx"
                download="Module 9 Exercises - Financial Condition Report.docx"
                className={`inline-flex items-center gap-2 mt-3 px-4 py-2 ${theme === 'light'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
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
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Financial Condition Report Preparation</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Financial Condition Report Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Financial Condition Report 2025 - PDF • Comprehensive guide</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-9-FCR/Course Content/KAFS-ITP-Financial-Condition-Report-2025.pdf"
                    download="KAFS ITP Financial Condition Report 2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl'
                      : 'bg-orange-500 hover:bg-orange-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
                  </a>
                </div>

                {/* Additional Resources */}
                <div className="mt-6 space-y-4">
                  <h4 className={`text-md font-semibold ${styles.text} ${styles.transition}`}>Additional Resources and References</h4>
                  
                  <div className={`rounded-xl ${theme === 'light' ? 'bg-blue-50 border-blue-200' : 'bg-blue-500/10 border-blue-400/20'} border p-4 ${styles.transition}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-lg ${styles.transition}`}>
                        📚
                      </div>
                      <div>
                        <h5 className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>IRA FCR Guidelines</h5>
                        <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>Insurance Regulatory Authority Financial Condition Report Requirements</p>
                      </div>
                    </div>
                    <div className={`mt-3 p-3 ${styles.inputBg} rounded-lg ${styles.transition}`}>
                      <p className={`text-xs ${styles.textTertiary} ${styles.transition}`}>
                        Regulatory guidelines and circulars on FCR preparation requirements, timelines, and submission standards.
                      </p>
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Financial Condition Report (FCR)</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#f97316' : '#fb923c'
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
                <div className="space-y-6 md:space-y-8">
                  <div className={`${theme === 'light'
                    ? 'bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200'
                    : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-400/30'
                    } rounded-2xl p-6 md:p-8 text-center ${styles.transition}`}>
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
                                : 'bg-orange-500/10 border border-orange-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-orange-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl'
                        : 'bg-orange-600 hover:bg-orange-700'
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
                  Download the comprehensive dataset to practice your FCR analysis:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>FCR Analysis Dataset</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Data.xlsx • Complete financial and claims dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-9-FCR/Data/Data.xlsx',
                        'FCR Analysis Dataset.xlsx'
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
                  Download these templates to structure your FCR preparation:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>FCR Working Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Working File.xlsx • Comprehensive FCR preparation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-9-FCR/Working Files/Working-File.xlsx',
                        'FCR Working Template.xlsx'
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
                  Download completed templates to compare your FCR analysis with model answers:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>FCR Results Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Results Files.xlsx • Model FCR analysis and recommendations</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-9-FCR/Results Files/Results-Files.xlsx',
                        'FCR Results Template.xlsx'
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
                  Upload your completed FCR assignments for review and feedback:
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
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your FCR Work</h5>
                    <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                      Drag and drop your completed FCR analysis files here, or click to browse
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
                          Submit FCR Analysis
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