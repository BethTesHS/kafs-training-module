import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Book,
    FileText,
    Award,
    Download,
    Eye,
    Check,
    ExternalLink,
    Upload,
    Database,
    Settings,
    TrendingUp,
    PieChart,
    Target,
    Shield,
    DollarSign,
    BarChart,
    Percent,
    Calculator,
    Globe,
    Layers
} from "lucide-react";

export default function Module17({ theme = 'dark' }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showQuizResults, setShowQuizResults] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Theme-based styles with modern light mode design - EXACT SAME AS MODULE 3
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
            question: "What is the primary objective of IFRS 17?",
            options: [
                "a) To provide consistent accounting for insurance contracts",
                "b) To increase insurance premiums",
                "c) To reduce insurance liabilities",
                "d) To eliminate reinsurance accounting"
            ],
            correctAnswer: "a) To provide consistent accounting for insurance contracts",
            explanation: "IFRS 17 aims to provide a consistent, principle-based approach to accounting for insurance contracts across all insurers."
        },
        {
            id: 2,
            question: "Which of the following is NOT one of the three measurement models under IFRS 17?",
            options: [
                "a) General Measurement Model (GMM)",
                "b) Premium Allocation Approach (PAA)",
                "c) Variable Fee Approach (VFA)",
                "d) Cash Flow Matching Model (CFM)"
            ],
            correctAnswer: "d) Cash Flow Matching Model (CFM)",
            explanation: "The three measurement models under IFRS 17 are GMM (also called BBA), PAA, and VFA."
        },
        {
            id: 3,
            question: "The Contractual Service Margin (CSM) represents:",
            options: [
                "a) The expected profit from a group of insurance contracts",
                "b) The loss component of onerous contracts",
                "c) The risk adjustment for non-financial risk",
                "d) The discount on future cash flows"
            ],
            correctAnswer: "a) The expected profit from a group of insurance contracts",
            explanation: "CSM represents the unearned profit that will be recognized as services are provided over the coverage period."
        },
        {
            id: 4,
            question: "Which approach is typically used for short-term insurance contracts (≤ 1 year)?",
            options: [
                "a) General Measurement Model",
                "b) Premium Allocation Approach",
                "c) Variable Fee Approach",
                "d) All of the above"
            ],
            correctAnswer: "b) Premium Allocation Approach",
            explanation: "PAA is a simplified approach allowed for contracts with coverage periods of one year or less."
        },
        {
            id: 5,
            question: "Risk Adjustment (RA) under IFRS 17 primarily compensates for:",
            options: [
                "a) Credit risk",
                "b) Market risk",
                "c) Non-financial risk",
                "d) Currency risk"
            ],
            correctAnswer: "c) Non-financial risk",
            explanation: "Risk Adjustment represents the compensation the entity requires for bearing the uncertainty about the amount and timing of cash flows from non-financial risk."
        },
        {
            id: 6,
            question: "An insurance contract is considered onerous when:",
            options: [
                "a) Expected claims exceed premiums",
                "b) Expected cash outflows exceed expected cash inflows",
                "c) CSM is negative",
                "d) All of the above"
            ],
            correctAnswer: "d) All of the above",
            explanation: "An onerous contract occurs when expected outflows exceed inflows, resulting in a loss component."
        },
        {
            id: 7,
            question: "Which transition approach allows entities to apply IFRS 17 retrospectively?",
            options: [
                "a) Full Retrospective Approach",
                "b) Modified Retrospective Approach",
                "c) Fair Value Approach",
                "d) Both a and b"
            ],
            correctAnswer: "d) Both a and b",
            explanation: "Entities can choose between Full Retrospective Approach or Modified Retrospective Approach for transition."
        },
        {
            id: 8,
            question: "The fulfilment cash flows under IFRS 17 include:",
            options: [
                "a) Estimates of future cash flows",
                "b) Discount adjustment",
                "c) Risk adjustment",
                "d) All of the above"
            ],
            correctAnswer: "d) All of the above",
            explanation: "Fulfilment cash flows = estimates of future cash flows + discount adjustment + risk adjustment."
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
                {/* Overlay for theme effects - EXACT SAME AS MODULE 3 */}
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

            <main className={`relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-8 ${styles.transition}`}>
                {/* Back Button - Outside Card, Extreme Left - EXACT SAME AS MODULE 3 */}
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

                {/* Module Hero Container - EXACT SAME STYLING AS MODULE 3 */}
                <div
                    className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
                        ? 'bg-white/95 shadow-2xl shadow-cyan-500/10 border border-white/30'
                        : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
                        } ${styles.transition}`}
                >
                  <div className="p-6 md:p-8">
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <div className={`inline-block p-4 rounded-full ${theme === 'light'
                                ? 'bg-gradient-to-br from-cyan-400 to-teal-500'
                                : 'bg-cyan-500/30 border border-cyan-400/40'
                                } ${styles.transition} flex-shrink-0`}>
                                <Globe className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-cyan-300'} ${styles.transition}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent bg-origin-padding'
                                    : 'text-cyan-400'
                                    } ${styles.transition}`}>
                                    IFRS 17 Insurance Contracts
                                </h1>
                            </div>
                        </div>

                        <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
                            Master end-to-end application of IFRS 17. Learn to classify contracts, select measurement models, calculate fulfilment cash flows, manage CSM, test for onerous contracts, account for reinsurance, and produce compliant financial statements and disclosures.
                        </p>
                    </div>
                </div>

                {/* TAB NAVIGATION - EXACT SAME AS MODULE 3 */}
                <div className="mb-8">
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
                        <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`}>
                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                                Module Objective
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                                    : 'bg-gradient-to-r from-cyan-400 to-teal-500'
                                    } transform translate-y-1 ${styles.transition}`}></span>
                            </h3>
                            <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                                This module aims to equip learners with the necessary skills to apply IFRS 17 end-to-end. This includes classifying contracts, selecting the right measurement model, modelling fulfilment cash flows (including discounting and risk adjustment), managing Contractual Service Margin (CSM) and coverage units, testing onerous contracts, accounting for reinsurance held, and producing compliant statements, journals, and disclosures.
                            </p>

                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                                Learning Outcomes
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600'
                                    : 'bg-gradient-to-r from-cyan-400 to-teal-500'
                                    } transform translate-y-1 ${styles.transition}`}></span>
                            </h3>
                            <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                                <li>Determine contract scope/boundaries and assign portfolios and annual-cohort groups.</li>
                                <li>Select and justify GMM/BBA, PAA, or VFA based on product features.</li>
                                <li>Build fulfilment cash flows and discount curves (including illiquidity premium choices).</li>
                                <li>Quantify Risk Adjustment (RA) and explain confidence-level disclosures.</li>
                                <li>Calculate and roll forward the CSM; define coverage units and recognize revenue.</li>
                                <li>Identify and measure onerous contracts and track the loss component.</li>
                                <li>Account for reinsurance held (initial net gain/loss, subsequent measurement).</li>
                                <li>Apply transition approaches (FRS/MRS/FV) and document policy elections.</li>
                                <li>Map movements to the Statement of Profit or Loss and Statement of Financial Position and prepare required IFRS 17 disclosures.</li>
                            </ul>

                        </div>
                    )}

                    {/* Course Content Tab */}
                    {activeTab === 'course' && (
                        <div>
                            <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                                    This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>IFRS 17 Insurance Contracts</span>. Download and use them as your primary references throughout the module.
                                </p>

                                {/* IFRS 17 Standard Card */}
                                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div className={`p-3 ${theme === 'light' ? 'bg-cyan-200' : 'bg-cyan-600/40'} rounded-xl ${styles.transition}`}>
                                            📄
                                        </div>
                                        <div>
                                            <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>IFRS 17 Insurance Contracts Standard</h4>
                                            <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>IFRS17 Insurance Contracts.pdf • Complete IFRS 17 Standard with all amendments and illustrative examples</p>
                                        </div>
                                    </div>
                                    <a
                                        href="/Training Modules/Module-17-IFRS-17/Course Content/IFRS17 Insurance Contracts.pdf"
                                        download="IFRS17 Insurance Contracts.pdf"
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
                                                    <h5 className={`font-medium ${theme === 'light' ? 'text-blue-900' : 'text-blue-200'} ${styles.transition}`}>Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard</h5>
                                                </div>
                                            </div>
                                            <a
                                                href="/Training Modules/Module-17-IFRS-17/Additional Resources/Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf"
                                                download="Circular No. COFN_IRA_00_001_03 - Implementation of IFRS-17 Standard.pdf"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* QUIZ TAB */}
                    {activeTab === 'quiz' && (
                        <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`}>
                            <div className="text-center mb-8">
                                <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-4 ${styles.transition}`}>IFRS 17 Interactive Assessment</h3>
                                <p className={`${styles.textTertiary} mb-6 ${styles.transition}`}>
                                    Test your IFRS 17 knowledge through our interactive online platform
                                </p>
                                
                                <div className={`${styles.accentBg} border ${styles.accentBorder} rounded-xl p-6 mb-6 ${styles.transition}`}>
                                    <div className="flex flex-col items-center">
                                        <Globe className={`w-16 h-16 ${styles.accent} mb-4`} />
                                        <h4 className={`text-lg md:text-xl font-semibold ${styles.text} mb-2 ${styles.transition}`}>IFRS 17 Interactive Game</h4>
                                        <p className={`${styles.textTertiary} mb-4 text-center ${styles.transition}`}>
                                            Engage with interactive scenarios and test your IFRS 17 knowledge through gamified learning
                                        </p>
                                        <a
                                            href="https://www.ifrs17game.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-6 py-3 ${theme === 'light'
                                                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                                                : 'bg-cyan-500 hover:bg-cyan-600 shadow-lg hover:shadow-xl'
                                                } text-white rounded-lg transition-all duration-200 font-semibold flex items-center gap-2`}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Launch IFRS 17 Game
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ASSIGNMENTS TAB */}
                    {activeTab === 'assignments' && (
                        <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`}>
                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Assignments</h3>

                            {/* Data Files Subsection */}
                            <div className="space-y-4">
                                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'} flex items-center gap-3 ${styles.transition}`}>
                                    <Database className="w-6 h-6" />
                                    Data Files
                                </h4>
                                <p className={`${styles.textTertiary} ${styles.transition}`}>
                                    Download the following datasets for IFRS 17 implementation exercises:
                                </p>

                                <div className="space-y-4">
                                    {/* Balance Sheet Data */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
                                        : 'bg-cyan-500/20 border-cyan-400/30 hover:bg-cyan-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-cyan-200' : 'bg-cyan-600/40'} rounded-2xl ${styles.transition}`}>
                                                📊
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>IFRS 4 Balance Sheet Data</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>IFRS4_BalanceSheet.pdf • Pre-IFRS 17 financial data</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-17-IFRS-17/Data/IFRS4_BalanceSheet.pdf',
                                                'IFRS4_BalanceSheet.pdf'
                                            )}
                                            className={`px-6 py-2 ${theme === 'light'
                                                ? 'bg-cyan-600 hover:bg-cyan-700'
                                                : 'bg-cyan-500 hover:bg-cyan-600'
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
                                    Download these templates to structure your IFRS 17 implementation:
                                </p>

                                <div className="space-y-4">
                                    {/* Balance Sheet Working File */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                                        : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                                                🛠️
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>IFRS 17 Balance Sheet Working File</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Balance Sheet_IFRS_17_Working File.xlsx • Comprehensive balance sheet conversion template</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-17-IFRS-17/Working Files/Balance Sheet_IFRS_17_Working File.xlsx',
                                                'Balance Sheet_IFRS_17_Working File.xlsx'
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
                                    Upload your completed IFRS 17 implementation assignments for review:
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
                                        <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your IFRS 17 Implementation Files</h5>
                                        <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                                            Drag and drop your completed IFRS 17 files here, or click to browse
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload-module17"
                                        />
                                        <label
                                            htmlFor="file-upload-module17"
                                            className={`inline-block px-6 py-2 ${theme === 'light'
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-green-500 hover:bg-green-600'
                                                } rounded-lg text-white cursor-pointer transition`}
                                        >
                                            Choose Files
                                        </label>
                                        <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 ${styles.transition}`}>
                                            Supported formats: .xlsx, .pdf, .docx (Max 50MB per file)
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
                                                    Submit IFRS 17 Files for Review
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