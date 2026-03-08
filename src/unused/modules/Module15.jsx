import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Target,
  Users,
  Calendar,
  UserCheck,
  BarChart3,
  FileSpreadsheet
} from "lucide-react";

export default function Module15({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following correctly matches the Funding Structure of a pension scheme with its key feature?",
      options: [
        "A. Defined Contribution (DC) – Guarantees a specific benefit amount to members",
        "B. Defined Benefit (DB) – Employer and employee contribute fixed amounts; member bears investment risk",
        "C. Defined Contribution (DC) – Benefits equal contributions plus investment returns, net of expenses",
        "D. Defined Benefit (DB) – Member bears both investment and longevity risk"
      ],
      correctAnswer: "C. Defined Contribution (DC) – Benefits equal contributions plus investment returns, net of expenses",
      explanation: "In a DC scheme, the final benefit depends only on contributions made plus investment returns, net of expenses. DB schemes, by contrast, guarantee specific benefits."
    },
    {
      id: 2,
      question: "In a Defined Benefit (DB) scheme, who primarily bears the investment and longevity risk?",
      options: [
        "A. The member",
        "B. The trustees",
        "C. The employer/sponsor",
        "D. The Retirement Benefits Authority (RBA)"
      ],
      correctAnswer: "C. The employer/sponsor",
      explanation: "DB schemes promise a defined benefit regardless of market performance, so the employer carries both the investment and longevity risks."
    },
    {
      id: 3,
      question: "Which of the following is NOT a recognized type of hybrid scheme design?",
      options: [
        "A. Minimum Guarantee Plans",
        "B. Cash Balance Plans",
        "C. Combination Plans",
        "D. Indexed Salary Plans"
      ],
      correctAnswer: "D. Indexed Salary Plans",
      explanation: "Hybrid designs include Minimum Guarantee, Cash Balance, and Combination plans. 'Indexed Salary Plans' is not a hybrid type."
    },
    {
      id: 4,
      question: "Which of the following is NOT typically included in the Membership Register for active members?",
      options: [
        "A. Date of Birth",
        "B. Final Average Salary",
        "C. Accumulated Member Balance",
        "D. Annual Pension in Payment"
      ],
      correctAnswer: "D. Annual Pension in Payment",
      explanation: "The Membership Register tracks active members, so it captures salary and balances but not pension amounts, which apply only to pensioners."
    },
    {
      id: 5,
      question: "Why is the Withdrawals Register particularly relevant for Defined Contribution (DC) schemes?",
      options: [
        "A. It tracks employer funding levels",
        "B. It records actuarial assumptions",
        "C. It tracks access to individual accounts at retirement or exit",
        "D. It ensures guaranteed minimum pensions are paid"
      ],
      correctAnswer: "C. It tracks access to individual accounts at retirement or exit",
      explanation: "In DC schemes, members can withdraw from their accounts upon retirement or leaving employment, so the Withdrawals Register is crucial."
    },
    {
      id: 6,
      question: "In a DB scheme, how is the retirement benefit typically calculated?",
      options: [
        "A. Based on contributions plus interest",
        "B. As a fixed amount set by the employer",
        "C. Using a formula linked to salary and years of service",
        "D. Equal to one-third of pensionable salary"
      ],
      correctAnswer: "C. Using a formula linked to salary and years of service",
      explanation: "DB schemes use formulas (e.g., % of final salary × years of service) to determine retirement benefits."
    },
    {
      id: 7,
      question: "In a DC scheme, who bears the investment risk?",
      options: [
        "A. Employer",
        "B. Member",
        "C. Trustees",
        "D. Government"
      ],
      correctAnswer: "B. Member",
      explanation: "Since DC benefits depend on investment performance, members bear the risk of poor returns."
    },
    {
      id: 8,
      question: "Which of the following is an advantage of a DC scheme?",
      options: [
        "A. Predictable benefits",
        "B. Simple actuarial valuations",
        "C. Benefits aligned to salary growth",
        "D. Survivor pensions automatically included"
      ],
      correctAnswer: "B. Simple actuarial valuations",
      explanation: "DC schemes are straightforward to administer because benefits equal account balances and don't require complex actuarial valuations."
    },
    {
      id: 9,
      question: "Which of the following is a disadvantage of a DC scheme?",
      options: [
        "A. Costly for employers",
        "B. Benefits are less portable",
        "C. Retirement income is uncertain",
        "D. Requires complex actuarial reviews"
      ],
      correctAnswer: "C. Retirement income is uncertain",
      explanation: "In DC schemes, benefits depend on market returns and contribution levels, which makes retirement income uncertain."
    },
    {
      id: 10,
      question: "Which of the following is a disadvantage of a DB scheme?",
      options: [
        "A. Members bear investment risk",
        "B. Less portable compared to DC schemes",
        "C. No requirement for actuarial valuations",
        "D. Simpler administration"
      ],
      correctAnswer: "B. Less portable compared to DC schemes",
      explanation: "DB schemes are less portable since accrued benefits are tied to the scheme's rules and funding."
    },
    {
      id: 11,
      question: "In a Pension Fund, what proportion of the member's fund can be taken as a cash lump sum at retirement?",
      options: [
        "A. One-third",
        "B. One-half",
        "C. Two-thirds",
        "D. Entire balance"
      ],
      correctAnswer: "A. One-third",
      explanation: "By law, a maximum of one-third can be taken as a lump sum, while the rest must be converted into an income stream."
    },
    {
      id: 12,
      question: "Which of the following is a feature of a Guaranteed Fund?",
      options: [
        "A. No protection of capital",
        "B. Capital and minimum return guaranteed",
        "C. Trustees control investments",
        "D. Returns always higher than segregated funds"
      ],
      correctAnswer: "B. Capital and minimum return guaranteed",
      explanation: "Guaranteed funds provide capital protection and a minimum return, with investment risk transferred to the issuer (e.g., insurer)."
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
                <Users className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-orange-300'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent bg-origin-padding'
                  : 'text-orange-400'
                  } ${styles.transition}`}>
                  DB Valuation
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              Master the valuation of Defined Benefit (DB) pension schemes. Learn to analyze membership data, apply actuarial assumptions, calculate liabilities, assess funding status, and prepare compliant actuarial reports for trustees and regulators.
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
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                This module aims to equip learners with practical skills in valuing Defined Benefit (DB) pension schemes. 
                By the end of the module, participants will be able to analyze membership and contribution data, 
                apply actuarial assumptions, and calculate liabilities for DB schemes. This will improve financial 
                reporting accuracy, support funding decisions, and ensure compliance with regulatory requirements.
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ol className={`list-decimal pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                <li>Analyze membership and contribution data to prepare inputs required for Defined Benefit valuation.</li>
                <li>Apply actuarial assumptions such as discount rates, salary escalation, mortality, and withdrawal rates in valuing DB liabilities.</li>
                <li>Calculate actuarial liabilities including Present Value of Future Benefits (PVFB), Current Service Cost (CSC), and Past Service Liabilities (PSL).</li>
                <li>Assess funding status by comparing scheme assets with actuarial liabilities to determine deficits or surpluses.</li>
                <li>Prepare standardized actuarial reports that support decision-making for trustees, regulators, and sponsors while ensuring compliance with applicable pension regulations.</li>
              </ol>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'course' && (
            <div data-aos="fade-up">
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  This module is guided by comprehensive technical documents. They contain all the instructions, 
                  worked examples, and exercises you need to master <span className={styles.accent}>DB Valuation</span>. 
                  Download and use them as your primary references throughout the module.
                </p>

                {/* Technical Procedure Card */}
                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className={`p-3 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-xl ${styles.transition}`}>
                      📄
                    </div>
                    <div>
                      <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>DB Valuation Technical Procedure - Data Checks</h4>
                      <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS_Internal Technical Procedures_Defined Benefits Valuation - Data Checks.pdf</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-15-DB-Valuation/Course Content/KAFS_Internal Technical Procedures_Defined Benefits Valuation - Data Checks.pdf"
                    download="KAFS_Internal Technical Procedures_Defined Benefits Valuation - Data Checks.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 md:px-6 py-2 ${theme === 'light'
                      ? 'bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl'
                      : 'bg-orange-500 hover:bg-orange-600'
                      } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4" />
                    Download PDF
                  </a>
                </div>

                {/* Practical Example */}
                <div className={`mt-4 rounded-[30px] ${theme === 'light'
                  ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                  : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                  } border p-6 flex items-center justify-between ${styles.transition}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                      📊
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Data Checks Practical Example</h4>
                      <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Worked examples and exercises</p>
                    </div>
                  </div>
                  <a
                    href="/Training Modules/Module-15-DB-Valuation/Course Content/Data_Checks_Practical Example.xlsx"
                    download="Data_Checks_Practical Example.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-2 ${theme === 'light'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                      } rounded-lg text-white transition flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    Download Excel
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
                          <h5 className={`font-medium ${theme === 'light' ? 'text-blue-900' : 'text-blue-200'} ${styles.transition}`}>Guidebook on Retirement Benefits Sector in Kenya</h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-15-DB-Valuation/Additional Resources/Guidebook on Retirement Benefits Sector in Kenya.pdf"
                        download="Guidebook on Retirement Benefits Sector in Kenya.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
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
                        <Book className={`w-5 h-5 ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`} />
                        <div>
                          <h5 className={`font-medium ${theme === 'light' ? 'text-green-900' : 'text-green-200'} ${styles.transition}`}>DB Valuation Guide</h5>
                        </div>
                      </div>
                      <a
                        href="/Training Modules/Module-15-DB-Valuation/Course Content/DB_Valuation_Guide.pdf"
                        download="DB_Valuation_Guide.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
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
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`}>
              {!showQuizResults ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: DB Valuation - Data Checks</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-8 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: theme === 'light' ? '#ea580c' : '#fb923c'
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
                    ? 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200'
                    : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-400/30'
                    } rounded-2xl p-6 md:p-8 text-center border ${styles.transition}`}>
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
                                ? 'bg-amber-50 border border-amber-200'
                                : 'bg-amber-500/10 border border-amber-400/20'
                                } rounded-lg ${styles.transition}`}>
                                <p className={`${theme === 'light' ? 'text-amber-700' : 'text-amber-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
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
                  Download the following datasets to practice your DB valuation calculations:
                </p>

                <div className="space-y-4">
                  {/* Premium Register Dataset */}
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                    : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                        📊
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Register Dataset</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Comprehensive membership and contribution data</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-15-DB-Valuation/Data/premium_register_1000.xlsx',
                        'premium_register_1000.xlsx'
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

              {/* Working Files Subsection */}
              <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
                  <Settings className="w-6 h-6" />
                  Working Files
                </h4>
                <p className={`${styles.textTertiary} ${styles.transition}`}>
                  Download these templates to structure your DB valuation calculations:
                </p>

                <div className="space-y-4">
                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Data Clean Up Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Excel • Template for data validation and cleaning</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-15-DB-Valuation/Working Files/Premium_Data_Clean_Up_Template.xlsx',
                        'Premium_Data_Clean_Up_Template.xlsx'
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

                  <div className={`rounded-[30px] ${theme === 'light'
                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                    } border p-6 flex items-center justify-between ${styles.transition}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                        🛠️
                      </div>
                      <div>
                        <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Claims Data Clean Up Template</h4>
                        <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Claims Data_Clean_Up_Template.xlsx • Template for claims data processing</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(
                        '/Training Modules/Module-15-DB-Valuation/Working Files/Claims Data_Clean_Up_Template.xlsx',
                        'Claims Data_Clean_Up_Template.xlsx'
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