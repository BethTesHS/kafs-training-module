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
    Scale,
    DollarSign,
    TrendingUp,
    BarChart,
    PieChart,
    Target,
    Shield,
    TrendingDown,
    Percent
} from "lucide-react";

export default function Module3({ theme = 'dark' }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showQuizResults, setShowQuizResults] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Theme-based styles with modern light mode design
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
            question: "What does the Liability for Remaining Coverage (LRC) represent under IFRS 17?",
            options: [
                "A) Claims that have already been reported",
                "B) Obligation to provide coverage for future insured events",
                "C) Premiums that have been fully earned",
                "D) Reinsurance recoveries from ceded business"
            ],
            correctAnswer: "B) Obligation to provide coverage for future insured events",
            explanation: "LRC represents the obligation for unexpired coverage, i.e., the insurer's liability to provide services for future insured events not yet occurred."
        },
        {
            id: 2,
            question: "Which IFRS 17 paragraph directly requires measurement of the LRC as the obligation to provide future coverage?",
            options: [
                "A) Paragraph 38",
                "B) Paragraph 44",
                "C) Paragraph 55(a)",
                "D) Paragraph B126"
            ],
            correctAnswer: "A) Paragraph 38",
            explanation: "IFRS 17 paragraph 38 requires the measurement of LRC as the obligation to provide coverage for insured events in future periods."
        },
        {
            id: 3,
            question: "According to IFRS 17, which component is deducted from premiums received when measuring LRC?",
            options: [
                "A) Risk adjustment",
                "B) Claims liability",
                "C) Insurance revenue already recognized",
                "D) Acquisition cash flows"
            ],
            correctAnswer: "D) Acquisition cash flows",
            explanation: "IFRS 17 paragraph 55(b)(i) requires deducting acquisition cash flows from premiums received when calculating LRC."
        },
        {
            id: 4,
            question: "At initial recognition, LRC is measured as:",
            options: [
                "A) Expected claims plus expenses",
                "B) Premiums received minus acquisition cash flows",
                "C) Unearned premiums only",
                "D) Risk adjustment plus CSM"
            ],
            correctAnswer: "B) Premiums received minus acquisition cash flows",
            explanation: "At initial recognition, LRC = premiums received (or receivable) minus acquisition cash flows."
        },
        {
            id: 5,
            question: "At subsequent measurement, which of the following is subtracted from LRC?",
            options: [
                "A) Unearned Premium Reserve (UPR)",
                "B) Insurance revenue recognized for services provided",
                "C) Risk margin",
                "D) Reinsurance recoveries"
            ],
            correctAnswer: "B) Insurance revenue recognized for services provided",
            explanation: "As coverage is provided, revenue is recognized and deducted from the LRC balance."
        },
        {
            id: 6,
            question: "The roll-forward of LRC starts with:",
            options: [
                "A) Opening LRC",
                "B) Closing liability for incurred claims",
                "C) Premium receivables only",
                "D) Cash collected"
            ],
            correctAnswer: "A) Opening LRC",
            explanation: "Roll-forward starts with opening LRC, then adjusts for premiums, revenue, and acquisition cash flows."
        },
        {
            id: 7,
            question: "In the component view, Unearned Premium Reserve (UPR) represents:",
            options: [
                "A) Claims already paid",
                "B) Future coverage yet to be provided",
                "C) Risk adjustment on incurred claims",
                "D) Reinsurance recoverables"
            ],
            correctAnswer: "B) Future coverage yet to be provided",
            explanation: "UPR represents the portion of premiums allocated to unexpired risk, i.e., coverage yet to be provided."
        },
        {
            id: 8,
            question: "How should premium receivables be treated under IFRS 17 when measuring LRC?",
            options: [
                "A) Excluded completely",
                "B) Counted only when cash is received",
                "C) Included as part of total premiums due",
                "D) Treated as a reinsurance asset"
            ],
            correctAnswer: "C) Included as part of total premiums due",
            explanation: "IFRS 17 allows inclusion of both received premiums and receivables in measuring LRC."
        },
        {
            id: 9,
            question: "Which of the following increases LRC?",
            options: [
                "A) Premiums received in cash",
                "B) Insurance revenue recognized",
                "C) Expired coverage period",
                "D) Claims paid"
            ],
            correctAnswer: "A) Premiums received in cash",
            explanation: "Premiums received increase the liability for remaining coverage until they are earned."
        },
        {
            id: 10,
            question: "Acquisition cash flows affect LRC by:",
            options: [
                "A) Increasing it",
                "B) Decreasing it",
                "C) Having no effect",
                "D) Shifting it to LIC"
            ],
            correctAnswer: "B) Decreasing it",
            explanation: "Acquisition cash flows (commissions, expenses) are deducted from LRC per IFRS 17 paragraph 38."
        },
        {
            id: 11,
            question: "A negative LRC balance typically arises when:",
            options: [
                "A) Premium receivables are higher than gross written premiums",
                "B) Claims exceed premiums",
                "C) Acquisition costs are refunded",
                "D) Premium allocation approach is not applied"
            ],
            correctAnswer: "A) Premium receivables are higher than gross written premiums",
            explanation: "A negative LRC can arise if receivables exceed the recognized premiums."
        },
        {
            id: 12,
            question: "How should negative LRC be interpreted?",
            options: [
                "A) It is an error and must be corrected",
                "B) It reflects an asset position from premium receivables",
                "C) It means claims are under-reserved",
                "D) It requires immediate profit recognition"
            ],
            correctAnswer: "B) It reflects an asset position from premium receivables",
            explanation: "Negative LRC indicates an asset position when premium receivables are greater than premiums due."
        },
        {
            id: 13,
            question: "Given: Policy Start = Jan 1, 2025; End = Dec 31, 2025; Valuation Date = Mar 31, 2025. Expired Period = ?",
            options: [
                "A) 30 days",
                "B) 60 days",
                "C) 90 days",
                "D) 365 days"
            ],
            correctAnswer: "C) 90 days",
            explanation: "Using formula Expired = max(0, min(Valuation Date, End Date) – Start Date + 1) → (Mar 31 – Jan 1 + 1) = 90 days."
        },
        {
            id: 14,
            question: "Policy duration is calculated as:",
            options: [
                "A) End Date – Start Date",
                "B) End Date – Start Date + 1",
                "C) Expired Period ÷ 2",
                "D) Premium ÷ Days"
            ],
            correctAnswer: "B) End Date – Start Date + 1",
            explanation: "Policy duration = Policy End Date – Policy Start Date + 1."
        },
        {
            id: 15,
            question: "If total premium is 120,000 for a 12-month policy, and 3 months have expired, what is the Unearned Premium Reserve (UPR)?",
            options: [
                "A) 30,000",
                "B) 90,000",
                "C) 120,000",
                "D) 60,000"
            ],
            correctAnswer: "B) 90,000",
            explanation: "Earned premium = 120,000 × (3/12) = 30,000. UPR = 120,000 – 30,000 = 90,000."
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
                            ? 'linear-gradient(135deg, rgba(5, 120, 85, 0.6) 0%, rgba(15, 118, 110, 0.55) 100%)'
                            : 'linear-gradient(135deg, rgba(5, 120, 86, 0.54) 0%, rgba(12, 82, 76, 0.6) 100%)',
                        backdropFilter: theme === 'dark' ? 'blur(2px)' : 'blur(2px)',
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
                        ? 'bg-white/95 shadow-2xl shadow-green-500/10 border border-white/30'
                        : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
                        } ${styles.transition}`}
                >
                  <div className="p-6 md:p-8">
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <div className={`inline-block p-4 rounded-full ${theme === 'light'
                                ? 'bg-gradient-to-br from-green-500 to-teal-600'
                                : 'bg-green-500/30 border border-green-400/40'
                                } ${styles.transition} flex-shrink-0`}>
                                <Scale className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-green-300'} ${styles.transition}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                                    ? 'bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent bg-origin-padding'
                                    : 'text-green-400'
                                    } ${styles.transition}`}>
                                    Liability for Remaining Coverage (LRC)
                                </h1>
                            </div>
                        </div>

                        <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
                            Master the calculation and analysis of Liability for Remaining Coverage under IFRS 17. Learn to calculate Unearned Premium Reserve, Earned Premium, Deferred Acquisition Costs, and perform comprehensive LRC roll-forward calculations.
                        </p>
                    </div>
                </div>

                {/* TAB NAVIGATION */}
                <div className="mb-8">
                    <div className={`border-b ${theme === 'light' ? 'border-green-200' : 'border-gray-500'} ${styles.transition}`}>
                        <nav className="flex space-x-8">
                            {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => switchTab(tab)}
                                    className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                                        ? theme === 'light'
                                            ? 'border-white text-white font-semibold bg-green-600/20 px-3 py-1 rounded-t-lg'
                                            : 'border-green-400 text-white font-semibold bg-green-400/20 px-3 py-1 rounded-t-lg'
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
                        <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`}>
                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                                Module Objective
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                                    ? 'bg-gradient-to-r from-green-700 to-teal-700'
                                    : 'bg-gradient-to-r from-green-400 to-teal-500'
                                    } transform translate-y-1 ${styles.transition}`}></span>
                            </h3>
                            <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                                This module aims to equip learners with practical skills in calculating and analyzing the Liability for Remaining Coverage (LRC). By the end of the module, participants will be able to determine Unearned Premium Reserve (UPR), calculate Earned Premium, apply Deferred Acquisition Costs (DAC), and derive the LRC using real insurance data. This will strengthen the accuracy of actuarial valuations, improve the reliability of financial reporting, and support compliance with IFRS 17 requirements.
                            </p>

                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                                Learning Outcomes
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                                    ? 'bg-gradient-to-r from-green-700 to-teal-700'
                                    : 'bg-gradient-to-r from-green-400 to-teal-500'
                                    } transform translate-y-1 ${styles.transition}`}></span>
                            </h3>
                            <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                                <li>Understand the purpose and definitions of Unearned Premium Reserve (UPR), Earned Premium, Deferred Acquisition Costs (DAC), and Liability for Remaining Coverage (LRC) under IFRS 17.</li>
                                <li>Explain the interrelationship between UPR, Earned Premium, DAC, and LRC in the context of insurance contract liabilities and revenue recognition.</li>
                                <li>Apply practical methods, such as the 365th method, to calculate UPR and Earned Premium, and demonstrate how these flow into LRC.</li>
                                <li>Calculate unamortized DAC and incorporate it into the roll-forward calculation of LRC balances.</li>
                                <li>Perform step-by-step LRC roll-forward calculations using worked examples, linking premium receivables, written premium, earned premium, UPR, and DAC.</li>
                                <li>Interpret results to ensure compliance with IFRS 17 and produce financial statements that fairly represent insurance contract liabilities.</li>
                            </ul>
                        </div>
                    )}

                    {/* Course Content Tab */}
                    {activeTab === 'course' && (
                        <div>
                            <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                                    This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Liability for Remaining Coverage (LRC) Analysis</span>. Download and use them as your primary references throughout the module.
                                </p>

                                {/* Resource Card */}
                                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div className={`p-3 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-xl ${styles.transition}`}>
                                            📄
                                        </div>
                                        <div>
                                            <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>LRC Internal Technical Procedure</h4>
                                            <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS ITP Liability for Remaining Coverage - PDF • 30 pages • Comprehensive guide</p>
                                        </div>
                                    </div>
                                    <a
                                        href="/Training Modules/Module-3-LRC/Course Content/KAFS-Internal-Technical-Procedures-Liability-for-Remaining-Coverage-Analysis-2025.pdf"
                                        download="KAFS Internal Technical Procedures LRC Analysis 2025.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`px-4 md:px-6 py-2 ${theme === 'light'
                                            ? 'bg-gradient-to-r from-green-700 to-teal-700 hover:from-green-800 hover:to-teal-800 shadow-lg hover:shadow-xl'
                                            : 'bg-green-500 hover:bg-green-600'
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
                                        Kenbright Actuarial and Financial Services Limited - Liability for Remaining Coverage Internal Technical Procedures (Version 1.0). This 30-page manual covers:
                                    </p>
                                    <ul className={`list-disc pl-5 mt-2 ${styles.textTertiary} text-xs md:text-sm ${styles.transition}`}>
                                        <li>IFRS 17 requirements for LRC calculation</li>
                                        <li>Step-by-step UPR and Earned Premium calculations</li>
                                        <li>DAC amortization methods and principles</li>
                                        <li>Comprehensive LRC roll-forward calculations</li>
                                        <li>Practical examples and implementation guidance</li>
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
                                        <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Liability for Remaining Coverage (LRC)</h3>
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
                                                backgroundColor: theme === 'light' ? '#047857' : '#34d399'
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
                                /* Results View */
                                <div className="space-y-6 md:space-y-8">
                                    {/* Score Card */}
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

                                    {/* Answer Review */}
                                    <div>
                                        <h4 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 md:mb-6 ${styles.transition}`}>Answer Review</h4>
                                        <div className="space-y-4 md:space-y-6">
                                            {quizQuestions.map((q, index) => (
                                                <div
                                                    key={q.id}
                                                    className={`rounded-xl p-4 md:p-6 border-2 ${isAnswerCorrect(q.id)
                                                        ? theme === 'light'
                                                            ? 'bg-green-50 border-green-500'
                                                            : 'bg-green-500/10 border-green-400/30'
                                                        : theme === 'light'
                                                            ? 'bg-red-50 border-red-400'
                                                            : 'bg-red-500/10 border-red-400/30'
                                                        } ${styles.transition}`}
                                                >
                                                    <div className="flex items-start gap-3 mb-4">
                                                        <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${isAnswerCorrect(q.id)
                                                            ? theme === 'light'
                                                                ? 'bg-green-200 text-green-800'
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
                                                                <p className={`${theme === 'light' ? 'text-green-800' : 'text-green-300'} font-medium mb-2 text-sm md:text-base ${styles.transition}`}>Explanation:</p>
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
                        <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`}>
                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Assignments</h3>

                            {/* Data Files Subsection */}
                            <div className="space-y-4">
                                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-700' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                                    <Database className="w-6 h-6" />
                                    Data Files
                                </h4>
                                <p className={`${styles.textTertiary} ${styles.transition}`}>
                                    Download the following datasets to practice your LRC calculations:
                                </p>

                                <div className="space-y-4">
                                    {/* Premium Register Data */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-green-50 border-green-200 hover:bg-green-100'
                                        : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-2xl ${styles.transition}`}>
                                                📊
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Premium Register Data</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Premium Register 31-12-2024.xlsx • Year-end premium data</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-3-LRC/Data/Premium Register_31_12_2024.xlsx',
                                                'Premium Register 31-12-2024.xlsx'
                                            )}
                                            className={`px-6 py-2 ${theme === 'light'
                                                ? 'bg-green-700 hover:bg-green-800'
                                                : 'bg-green-500 hover:bg-green-600'
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
                                    Download these templates to structure your LRC calculations:
                                </p>

                                <div className="space-y-4">
                                    {/* LRC Analysis Template */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                                        : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                                                🛠️
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>LRC Analysis Template</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>LRC Analysis.xlsx • Comprehensive LRC calculation workbook</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-3-LRC/Working Files/LRC_Analysis.xlsx',
                                                'LRC Analysis Template.xlsx'
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

                                    {/* UPR, GEP & DAC Analysis Template */}
                                    <div className={`rounded-2xl ${theme === 'light'
                                        ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                                        : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                                        } border p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-3 md:space-x-4">
                                            <div className={`p-3 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-xl ${styles.transition}`}>
                                                ⚙️
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>UPR, GEP & DAC Analysis Template</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>UPR, GEP & DAC Analysis.xlsx • Component calculations workbook</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-3-LRC/Working Files/UPR,GEP & DAC_Analysis.xlsx',
                                                'UPR, GEP & DAC Analysis Template.xlsx'
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
                                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-700' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
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
                                        <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-green-700' : 'text-green-400'} mx-auto mb-4 ${styles.transition}`} />
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
                                                ? 'bg-green-700 hover:bg-green-800'
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
                                                            <FileText className={`w-4 h-4 ${theme === 'light' ? 'text-green-700' : 'text-green-400'} ${styles.transition}`} />
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
                                                    ? 'bg-green-700 hover:bg-green-800 shadow-md hover:shadow-lg'
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