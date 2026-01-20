import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  FileSignature,
  Book,
  Download,
  Award,
  Check,
  Upload,
  Database,
  Settings,
  FileText,
  Shield,
  Scale,
  TrendingUp,
  TrendingDown,
  ClipboardCheck,
  FileCheck,
  Layers,
  ShieldCheck,
  Handshake,
  Building
} from "lucide-react";

export default function Module8({ theme = 'dark' }) {
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
        shadow: 'shadow-2xl shadow-green-500/10',
        accent: 'text-green-700',
        accentBg: 'bg-green-50/80',
        accentBorder: 'border-green-200/50',
        accentHover: 'hover:bg-green-100/80',
        gradientText: 'bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent',
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
      accent: 'text-green-400',
      accentBg: 'bg-green-500/20',
      accentBorder: 'border-green-400/30',
      accentHover: 'hover:bg-green-500/30',
      gradientText: 'text-green-400',
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
      question: "What is the main purpose of a reinsurance certificate?",
      options: [
        "A. To calculate insurer profits",
        "B. To evidence the reinsurance program of an insurer",
        "C. To replace the treaty agreement",
        "D. To determine underwriting rates"
      ],
      correctAnswer: "B. To evidence the reinsurance program of an insurer",
      explanation: "A reinsurance certificate serves as formal documentation that evidences and outlines the reinsurance protection arrangements between the cedant and reinsurer(s)."
    },
    {
      id: 2,
      question: "In Kenya, which body requires insurers to maintain transparent and compliant reinsurance programs?",
      options: [
        "A. IRA",
        "B. CBK",
        "C. AM Best",
        "D. CMA"
      ],
      correctAnswer: "A. IRA",
      explanation: "The Insurance Regulatory Authority (IRA) of Kenya mandates insurers to maintain transparent, adequate, and compliant reinsurance programs to ensure policyholder protection."
    },
    {
      id: 3,
      question: "Which of the following is NOT a benefit of the reinsurance certificate?",
      options: [
        "A. It assures regulators of adequate protection",
        "B. It demonstrates financial soundness of reinsurers",
        "C. It guarantees profits for insurers",
        "D. It enhances policyholder confidence"
      ],
      correctAnswer: "C. It guarantees profits for insurers",
      explanation: "Reinsurance certificates document protection arrangements but do not guarantee profits. They provide risk transfer, regulatory compliance, and financial security benefits."
    },
    {
      id: 4,
      question: "In a surplus treaty, the insurer always retains:",
      options: [
        "A. A fixed percentage",
        "B. A fixed line amount",
        "C. All small risks",
        "D. Only catastrophic losses"
      ],
      correctAnswer: "B. A fixed line amount",
      explanation: "In surplus treaties, the cedant retains a fixed monetary amount (line) on each risk, with the surplus above this amount ceded to reinsurers."
    },
    {
      id: 5,
      question: "Which type of proportional treaty involves a fixed percentage sharing of all premiums and claims?",
      options: [
        "A. Surplus",
        "B. Quota Share",
        "C. Catastrophe XoL",
        "D. Risk XoL"
      ],
      correctAnswer: "B. Quota Share",
      explanation: "Quota share treaties involve a fixed percentage sharing of all premiums and claims between cedant and reinsurer(s)."
    },
    {
      id: 6,
      question: "Quota share treaties are particularly useful for:",
      options: [
        "A. High-frequency classes like motor",
        "B. Catastrophic events like earthquakes",
        "C. Classes with large sums insured variations",
        "D. Specialist lines like marine hull"
      ],
      correctAnswer: "A. High-frequency classes like motor",
      explanation: "Quota share works well for high-frequency, homogeneous business like motor insurance where risk distribution is relatively stable."
    },
    {
      id: 7,
      question: "Which statement best describes non-proportional treaties?",
      options: [
        "A. Losses and premiums are shared in fixed proportions",
        "B. The reinsurer only pays when losses exceed a retention",
        "C. They apply only to marine insurance",
        "D. They eliminate the need for underwriting"
      ],
      correctAnswer: "B. The reinsurer only pays when losses exceed a retention",
      explanation: "Non-proportional (excess of loss) treaties provide coverage only when losses exceed a specified retention amount."
    },
    {
      id: 8,
      question: "Risk Excess of Loss (XoL) primarily protects against:",
      options: [
        "A. Large individual risk losses",
        "B. Accumulated small losses",
        "C. All underwriting losses",
        "D. Broker insolvency"
      ],
      correctAnswer: "A. Large individual risk losses",
      explanation: "Risk XoL protects against large losses on individual policies or risks, covering amounts above a specified retention per risk."
    },
    {
      id: 9,
      question: "Catastrophe XoL is designed to cover:",
      options: [
        "A. Single small claims",
        "B. An accumulation of losses from one event",
        "C. Routine motor accident claims",
        "D. Premium shortfalls"
      ],
      correctAnswer: "B. An accumulation of losses from one event",
      explanation: "Catastrophe XoL covers aggregated losses from a single catastrophic event (e.g., earthquake, hurricane) affecting multiple policies."
    },
    {
      id: 10,
      question: "Stop Loss XoL (Aggregate XoL) protects the insurer against:",
      options: [
        "A. Large claims on individual policies",
        "B. Total losses exceeding a certain ratio",
        "C. Broker non-compliance",
        "D. Small frequency claims"
      ],
      correctAnswer: "B. Total losses exceeding a certain ratio",
      explanation: "Stop Loss/ Aggregate XoL protects against the total loss ratio exceeding a specified percentage of earned premium."
    },
    {
      id: 11,
      question: "Which agency is NOT commonly used to rate reinsurers?",
      options: [
        "A. AM Best",
        "B. Standard & Poor's",
        "C. Fitch",
        "D. IMF"
      ],
      correctAnswer: "D. IMF",
      explanation: "The International Monetary Fund (IMF) is not a reinsurance rating agency. AM Best, S&P, and Fitch are major reinsurer rating agencies."
    },
    {
      id: 12,
      question: "Why are strong credit ratings important for reinsurers?",
      options: [
        "A. They increase profits for insurers",
        "B. They assure claims-paying ability",
        "C. They replace reinsurance treaties",
        "D. They eliminate underwriting risk"
      ],
      correctAnswer: "B. They assure claims-paying ability",
      explanation: "Strong credit ratings indicate financial strength and reliability, assuring cedants that reinsurers can meet claims obligations."
    },
    {
      id: 13,
      question: "Which of the following reinsurers in the example had the strongest rating?",
      options: [
        "A. Kenya Re (B Fair)",
        "B. Zep Re (B++)",
        "C. Africa Re (A)",
        "D. East Africa Re (B Fair)"
      ],
      correctAnswer: "C. Africa Re (A)",
      explanation: "An 'A' rating is stronger than 'B' ratings, indicating superior financial strength and claims-paying ability."
    },
    {
      id: 14,
      question: "Reinsurance brokers act as:",
      options: [
        "A. Treaty regulators",
        "B. Intermediaries between cedants and reinsurers",
        "C. Credit rating agencies",
        "D. Underwriting agents"
      ],
      correctAnswer: "B. Intermediaries between cedants and reinsurers",
      explanation: "Reinsurance brokers facilitate placements by acting as intermediaries, negotiating terms between cedants and reinsurers."
    },
    {
      id: 15,
      question: "Which of the following is a regulatory reason for disclosing broker incorporation details?",
      options: [
        "A. To comply with local participation rules",
        "B. To calculate profit margins",
        "C. To increase broker commissions",
        "D. To improve credit ratings"
      ],
      correctAnswer: "A. To comply with local participation rules",
      explanation: "Regulations often require disclosure of broker incorporation details to ensure compliance with local participation and ownership rules."
    },
    {
      id: 16,
      question: "A Minimum and Deposit Premium (MDP) guarantees that:",
      options: [
        "A. The cedant pays nothing if business is low",
        "B. The reinsurer receives at least a minimum premium",
        "C. Premiums are always proportional to losses",
        "D. Brokers always receive commission"
      ],
      correctAnswer: "B. The reinsurer receives at least a minimum premium",
      explanation: "MDP ensures the reinsurer receives a minimum premium regardless of actual ceded business volume, covering their fixed costs."
    },
    {
      id: 17,
      question: "Deposit Premium is usually based on:",
      options: [
        "A. Historical claims",
        "B. Estimate of Gross Net Premium Income (EGNPI)",
        "C. Average loss ratios",
        "D. Treaty limits only"
      ],
      correctAnswer: "B. Estimate of Gross Net Premium Income (EGNPI)",
      explanation: "Deposit premium is typically calculated as a percentage of the Estimated Gross Net Premium Income (EGNPI) for the treaty period."
    },
    {
      id: 18,
      question: "Higher layers of reinsurance generally have:",
      options: [
        "A. Higher MDP rates",
        "B. Lower MDP rates",
        "C. Equal MDP rates to all layers",
        "D. No MDP requirement"
      ],
      correctAnswer: "B. Lower MDP rates",
      explanation: "Higher layers have lower probability of attachment, resulting in lower premium rates and correspondingly lower MDP rates."
    },
    {
      id: 19,
      question: "In the frequency tab of the working file, frequency is computed as:",
      options: [
        "A. Reported Claims ÷ Premium",
        "B. Number of Claims ÷ Exposure",
        "C. Gross Claims ÷ Recoveries",
        "D. Severity ÷ Premium"
      ],
      correctAnswer: "B. Number of Claims ÷ Exposure",
      explanation: "Frequency measures claims occurrence rate, calculated as number of claims divided by exposure units (e.g., policies, sums insured)."
    },
    {
      id: 20,
      question: "In the RI Summary, the premium cession rate is calculated as:",
      options: [
        "A. Premium Ceded ÷ Gross Premium",
        "B. Net Premium ÷ Gross Premium",
        "C. Recoveries ÷ Net Premium",
        "D. Gross Premium ÷ Premium Ceded"
      ],
      correctAnswer: "A. Premium Ceded ÷ Gross Premium",
      explanation: "Premium cession rate measures the proportion of gross premium transferred to reinsurers: Premium Ceded / Gross Premium × 100%."
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
              ? 'linear-gradient(135deg, rgba(5, 120, 85, 0.6) 0%, rgba(15, 118, 110, 0.55) 100%)'
              : 'linear-gradient(135deg, rgba(5, 120, 86, 0.54) 0%, rgba(12, 82, 76, 0.6) 100%)',
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
            ? 'bg-white/95 shadow-2xl shadow-green-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-green-500 to-teal-600'
                : 'bg-green-500/30 border border-green-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <Layers className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-green-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-green-400'
                  } ${styles.transition}`}>
                  Reinsurance Certification
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master the preparation and review of reinsurance certificates. Learn to interpret key clauses, validate treaty consistency, identify errors, and prepare compliant documentation that meets both internal standards and regulatory requirements.
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8" data-aos="fade-up">
          <div className={`border-b ${theme === 'light' ? 'border-green-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-green-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-green-400 text-white font-semibold bg-green-400/10 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-white hover:text-white hover:bg-green-500/30 hover:border-green-400 px-1'
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
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module aims to equip learners with the knowledge and practical skills necessary to understand, review, and prepare reinsurance certificates. By the end of the module, participants will be able to interpret the key components of a reinsurance certificate, ensure accuracy and completeness in documentation, and apply best practices in drafting and reviewing certificates. This will support effective reinsurance administration, strengthen contractual clarity, and enhance compliance with both internal standards and regulatory requirements.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Understand the purpose, structure, and key clauses of a reinsurance certificate.</li>
                <li>Review and validate reinsurance certificate details to ensure consistency with treaty terms, endorsements, and slip placements.</li>
                <li>Identify and resolve common errors and omissions in reinsurance certificates to avoid disputes and misinterpretation.</li>
                <li>Prepare clear, accurate, and compliant reinsurance certificates that meet both internal and external stakeholder requirements.</li>
                <li>Develop standardized certificate templates to improve efficiency, reduce errors, and maintain consistency in reinsurance documentation.</li>
              </ol>

            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Reinsurance Certification</span>. Download and use them as your primary references throughout the module.
                </p>

                {/* Resource Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Reinsurance Certification Technical Procedure</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Reinsurance Certification - PDF • 21 pages</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-8-Reinsurance-Certificate/Course Content/KAFS_Internal Technical Procedures_Guidelines on Reinsurance Certificate.pdf"
                    download="KAFS ITP Reinsurance Certification.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                      : 'bg-green-500 hover:bg-green-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
                  </a>
                </div>

                <div className={`mt-6 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-xs md:text-sm italic ${styles.transition}`}>
                  Additional resources will be added here when available.
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
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Reinsurance Certification</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#047857' : '#34d399'
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
                              ? 'bg-green-100 border-2 border-green-600'
                              : 'bg-green-500/30 border-2 border-green-400'
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
                          ? 'bg-green-700 hover:bg-green-800 shadow-lg hover:shadow-xl'
                          : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl'
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
                          ? 'bg-green-700 hover:bg-green-800 disabled:bg-gray-400 shadow-lg hover:shadow-xl'
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
                    ? 'bg-gradient-to-br from-green-50 to-teal-100 border border-green-200'
                    : 'bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-400/30'
                    } rounded-2xl p-6 md:p-8 text-center ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-green-700' : 'text-green-400'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-green-700' : 'text-green-400'} mb-2`}>
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
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-green-500/10 border border-green-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-green-700' : 'text-green-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        ? 'bg-gradient-to-r from-green-700 to-teal-700 hover:from-green-800 hover:to-teal-800 shadow-lg hover:shadow-xl'
                        : 'bg-green-600 hover:bg-green-700'
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
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-700' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Database className="w-6 h-6" />
                  Data Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download the following datasets to practice your reinsurance certification analysis:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Premium Data.xlsx • Premium dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-8-Reinsurance-Certificate/Data/Premium Data.xlsx',
                        'Premium Data.xlsx'
                      )}
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-green-700 hover:bg-green-800'
                        : 'bg-green-500 hover:bg-green-600'
                        } rounded-lg text-white transition flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </button>
                  </div>

                  <div className={`rounded-2xl ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Claims Data</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Claims Data.xlsx • Claims dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-8-Reinsurance-Certificate/Data/Claims Data.xlsx',
                        'Claims Data.xlsx'
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
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Frequency and Severity</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Frequency and Severity.xlsx • Frequency and severity dataset</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-8-Reinsurance-Certificate/Data/Frequency and Severity.xlsx',
                        'Frequency and Severity.xlsx'
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
                  Working File
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download this template to structure your reinsurance data analysis:
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
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Beetroot General - Reinsurance Simulation Template</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Beetroot General - Reinsurance Simulation Template.xlsm • Comprehensive reinsurance simulation workbook</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-8-Reinsurance-Certificate/Working File/Beetroot General - Reinsurance Simulation Template.xlsm',
                        'Beetroot General - Reinsurance Simulation Template.xlsm'
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
                  Upload your completed reinsurance certification assignments for review and feedback:
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
                    <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Reinsurance Work</h5>
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
                          Submit Reinsurance Certification
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