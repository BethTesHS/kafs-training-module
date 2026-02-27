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
    Users,
    Clock,
    Scale
} from "lucide-react";

export default function Module13({ theme = 'dark' }) {
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
            question: "Which of the following is not an objective of the IPS?",
            options: [
                "a. Prescribe principles governing investment decisions",
                "b. Guide appointment of investment managers",
                "c. Guarantee member pension amounts regardless of scheme type",
                "d. Provide clear performance benchmarks"
            ],
            correctAnswer: "c. Guarantee member pension amounts regardless of scheme type",
            explanation: "IPS objectives include prescribing principles, guiding manager appointments, and providing benchmarks, but it does not guarantee pension amounts."
        },
        {
            id: 2,
            question: "Which type of pension scheme places investment and longevity risk primarily on the member?",
            options: [
                "a. Defined Benefit (DB)",
                "b. Defined Contribution (DC)",
                "c. Guaranteed Scheme",
                "d. Provident Fund"
            ],
            correctAnswer: "b. Defined Contribution (DC)",
            explanation: "In DC schemes, members bear investment and longevity risk, while benefits are based on contributions and investment returns."
        },
        {
            id: 3,
            question: "Which of the following is a key purpose of the IPS related to governance?",
            options: [
                "a. Ensuring fund managers choose only high-risk assets",
                "b. Providing clarity on roles and responsibilities of involved parties",
                "c. Eliminating the need for statutory submissions",
                "d. Allowing unlimited tactical shifts"
            ],
            correctAnswer: "b. Providing clarity on roles and responsibilities of involved parties",
            explanation: "A key governance purpose of IPS is to clearly define roles and responsibilities for all parties involved."
        },
        {
            id: 4,
            question: "Which investment type typically guarantees capital or a minimum return and is often managed by approved issuers?",
            options: [
                "a. Segregated Schemes",
                "b. Guaranteed Schemes",
                "c. Private Equity",
                "d. Offshore Funds"
            ],
            correctAnswer: "b. Guaranteed Schemes",
            explanation: "Guaranteed schemes provide capital protection or minimum returns through approved issuers."
        },
        {
            id: 5,
            question: "Under RBA limits, what is the maximum percentage permitted for immovable property in Kenya?",
            options: [
                "a. 10%",
                "b. 30%",
                "c. 50%",
                "d. 70%"
            ],
            correctAnswer: "b. 30%",
            explanation: "Retirement Benefits Authority limits immovable property investments to a maximum of 30%."
        },
        {
            id: 6,
            question: "Which portfolio risk profile is most appropriate for a scheme with the majority of members having 10 years and below to retirement?",
            options: [
                "a. Aggressive",
                "b. Moderate",
                "c. Conservative",
                "d. Very Aggressive"
            ],
            correctAnswer: "c. Conservative",
            explanation: "Members close to retirement (10 years or less) require conservative strategies to preserve capital."
        },
        {
            id: 7,
            question: "Which of the following best differentiates Strategic Asset Allocation from Tactical Asset Allocation?",
            options: [
                "a. SAA focuses on short-term opportunities while TAA focuses on long-term stability",
                "b. SAA is fixed long-term, TAA adjusts within set limits based on market conditions",
                "c. SAA permits unlimited risk-taking, TAA bans all changes",
                "d. SAA applies only to guaranteed schemes"
            ],
            correctAnswer: "b. SAA is fixed long-term, TAA adjusts within set limits based on market conditions",
            explanation: "SAA sets long-term target allocations while TAA allows temporary deviations to exploit market conditions."
        },
        {
            id: 8,
            question: "Tactical Asset Allocation (TAA) is best described as:",
            options: [
                "a. A permanent redefinition of the strategic targeted allocations",
                "b. Short-term adjustments around the strategic allocation to take advantage of market conditions",
                "c. A method to ignore benchmarks",
                "d. Only used to increase risk without limits"
            ],
            correctAnswer: "b. Short-term adjustments around the strategic allocation to take advantage of market conditions",
            explanation: "TAA involves temporary tactical shifts from SAA to capitalize on market opportunities."
        },
        {
            id: 9,
            question: "A scheme has three member groups with the following Accumulated Fund Credits and Years to Retirement: Group A AFC = 100, YTR = 30; Group B AFC = 200, YTR = 20; Group C AFC = 700, YTR = 5. What is the investment horizon?",
            options: [
                "a. 9 years",
                "b. 10 years",
                "c. 10 years",
                "d. 11 years"
            ],
            correctAnswer: "c. 10 years",
            explanation: "Investment horizon = Weighted average of YTR = (100×30 + 200×20 + 700×5) / (100+200+700) = 10 years"
        },
        {
            id: 10,
            question: "Which of the following is a reasonability check recommended when receiving membership data?",
            options: [
                "a. Allowing duplicate member numbers to improve data flexibility",
                "b. Verifying currency and units of reported salaries (e.g., monthly vs annual)",
                "c. Ignoring unusual ages as outliers without verification",
                "d. Removing employee contribution records entirely"
            ],
            correctAnswer: "b. Verifying currency and units of reported salaries (e.g., monthly vs annual)",
            explanation: "Verifying salary units is crucial for accurate data interpretation and analysis."
        },
        {
            id: 11,
            question: "Which of the following best describes a guaranteed interest rate in a pension or insurance fund?",
            options: [
                "a. A minimum return that members will receive regardless of market performance",
                "b. A return declared annually based on investment performance",
                "c. A benchmark set for fund managers",
                "d. A projected return used in actuarial valuations"
            ],
            correctAnswer: "a. A minimum return that members will receive regardless of market performance",
            explanation: "Guaranteed interest rates provide minimum returns independent of market performance."
        },
        {
            id: 12,
            question: "The declared interest rate credited in a deposit administration or guaranteed fund is primarily determined by:",
            options: [
                "a. The guaranteed minimum rate only",
                "b. The trust deed of the scheme",
                "c. Annual investment performance and the provider's bonus smoothing policy",
                "d. Trustee discretion"
            ],
            correctAnswer: "c. Annual investment performance and the provider's bonus smoothing policy",
            explanation: "Declared rates reflect annual performance but may be smoothed using bonus stabilization policies."
        },
        {
            id: 13,
            question: "Which age band is most likely to be assigned a moderate risk strategy?",
            options: [
                "a. below 25",
                "b. 25–30",
                "c. 40–45",
                "d. 55–60"
            ],
            correctAnswer: "c. 40–45",
            explanation: "Members aged 40-45 typically have moderate time horizons, suitable for balanced strategies."
        },
        {
            id: 14,
            question: "A pension scheme has 70% of its liabilities in members aged 30 and below. Which investment strategy is most appropriate?",
            options: [
                "a. Aggressive",
                "b. High-risk growth",
                "c. Moderate",
                "d. Conservative"
            ],
            correctAnswer: "a. Aggressive",
            explanation: "Young membership with long time horizons allows for aggressive growth strategies."
        },
        {
            id: 15,
            question: "A DB scheme with an ageing membership is most exposed to which investment risk?",
            options: [
                "a. Inflation risk decreasing due to fewer active members",
                "b. Longevity risk and reinvestment risk increasing as benefit payments rise",
                "c. Concentration risk declining naturally",
                "d. Market risk becoming irrelevant"
            ],
            correctAnswer: "b. Longevity risk and reinvestment risk increasing as benefit payments rise",
            explanation: "Aging DB schemes face increased longevity risk and reinvestment risk for maturing liabilities."
        },
        {
            id: 16,
            question: "A pension scheme is evaluating an investment in infrastructure debt. Which IPS principle is most relevant before approval?",
            options: [
                "a. Capital preservation and matching profile to long-term liabilities",
                "b. Ensuring it has the highest historical return",
                "c. Avoiding any regulatory reporting",
                "d. Guaranteeing benefits irrespective of asset performance"
            ],
            correctAnswer: "a. Capital preservation and matching profile to long-term liabilities",
            explanation: "Infrastructure investments should align with long-term liability matching and capital preservation."
        },
        {
            id: 17,
            question: "Which of the following scenarios would most likely trigger a requirement to revise the IPS?",
            options: [
                "a. A minor underperformance over one financial quarter",
                "b. Change in custodian reporting templates",
                "c. A merger of the sponsoring employer causing structural changes in membership profile",
                "d. Appointment of a new trustee who prefers lower equity exposure"
            ],
            correctAnswer: "c. A merger of the sponsoring employer causing structural changes in membership profile",
            explanation: "Major structural changes like mergers require IPS revision to reflect new scheme characteristics."
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
                            ? 'linear-gradient(135deg, rgba(5, 120, 85, 0.6) 0%, rgba(15, 118, 110, 0.55) 100%)'
                            : 'linear-gradient(135deg, rgba(5, 120, 86, 0.54) 0%, rgba(12, 82, 76, 0.6) 100%)',
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
                                <PieChart className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-green-300'} ${styles.transition}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                                    ? 'bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent bg-origin-padding'
                                    : 'text-green-400'
                                    } ${styles.transition}`}>
                                    Investment Policy Statement
                                </h1>
                            </div>
                        </div>

                        <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
                            Master the design and computation of Investment Policy Statements. Learn to define investment objectives, identify constraints, apply asset allocation principles, and document clear IPS frameworks that align with investor goals and regulatory requirements.
                        </p>
                    </div>
                </div>

                {/* TAB NAVIGATION - EXACT SAME AS MODULE 3 */}
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
                                The objective of this module is to build learners' capability to design and compute an Investment Policy Statement (IPS) by defining investment objectives, identifying key constraints, and applying basic asset allocation principles. It focuses on matching investor needs with suitable investment strategies and documenting them in a clear and practical IPS.
                                By the end of the module, learners will understand the step-by-step process of preparing an IPS that ensures consistency, clarity, and alignment with investor goals.
                            </p>

                            <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                                Learning Outcomes
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                                    ? 'bg-gradient-to-r from-green-700 to-teal-700'
                                    : 'bg-gradient-to-r from-green-400 to-teal-500'
                                    } transform translate-y-1 ${styles.transition}`}></span>
                            </h3>
                            <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                                <li>Define the purpose and key components of an Investment Policy Statement.</li>
                                <li>Identify and document investment constraints such as liquidity, legal/regulatory limits, unique circumstances, and tax considerations.</li>
                                <li>Explain and apply relevant technical terms used in investment planning (e.g., asset allocation, diversification, strategic vs. tactical allocation, benchmarks).</li>
                                <li>Perform risk–return analysis and compute appropriate asset allocations using standard investment techniques.</li>
                                <li>Formulate, document, and present an IPS in a structured format suitable for guiding portfolio management and performance evaluation.</li>
                            </ul>

                        </div>
                    )}

                    {/* Course Content Tab */}
                    {activeTab === 'course' && (
                        <div>
                            <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                                    This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master <span className={styles.accent}>Investment Policy Statement Development</span>. Download and use them as your primary references throughout the module.
                                </p>

                                {/* Primary Document */}
                                <div className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition}`}>
                                    <div className="flex items-center space-x-3 md:space-x-4">
                                        <div className={`p-3 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-xl ${styles.transition}`}>
                                            📄
                                        </div>
                                        <div>
                                            <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Investment Policy Statement Technical Procedure</h4>
                                            <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>KAFS_Internal Technical Procedures_Investment Policy Statement.pdf • Comprehensive guide</p>
                                        </div>
                                    </div>
                                    <a
                                        href="/Training Modules/Module-13-Investment-Policy-Statement/Course Content/KAFS_Internal Technical Procedures_Investment Policy Statement.pdf"
                                        download="KAFS IPS Technical Procedures.pdf"
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

                                {/* Additional Resources */}
                                <div className={`mt-6 pt-6 border-t ${styles.border}`}>
                                    <h4 className={`font-semibold ${styles.text} mb-4 flex items-center gap-2 ${styles.transition}`}>
                                        <FileText className="w-5 h-5" />
                                        Additional Resources
                                    </h4>
                                    <div className="space-y-4">
                                        {/* Draft Investment Guidelines */}
                                        <div className={`rounded-2xl ${theme === 'light' ? 'bg-blue-50/80' : 'bg-blue-500/20'} border ${theme === 'light' ? 'border-blue-200/50' : 'border-blue-400/30'} p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                                            <div className="flex items-center space-x-3 md:space-x-4">
                                                <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-500/40'} rounded-xl ${styles.transition}`}>
                                                    <Shield className={`w-6 h-6 ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`} />
                                                </div>
                                                <div>
                                                    <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>Draft Investment Guidelines</h4>
                                                    <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>Draft_Investment_Guidelines1 2.pdf</p>
                                                </div>
                                            </div>
                                            <a
                                                href="/Training Modules/Module-13-Investment-Policy-Statement/Additional Resources/Draft_Investment_Guidelines1 2.pdf"
                                                download="Draft_Investment_Guidelines.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-4 md:px-6 py-2 ${theme === 'light'
                                                    ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                                    : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl'
                                                    } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                                            >
                                                <Download className="w-3 h-3 md:w-4 md:h-4" />
                                                Download
                                            </a>
                                        </div>

                                        {/* RBA Regulations */}
                                        <div className={`rounded-2xl ${theme === 'light' ? 'bg-purple-50/80' : 'bg-purple-500/20'} border ${theme === 'light' ? 'border-purple-200/50' : 'border-purple-400/30'} p-4 md:p-6 flex items-center justify-between ${styles.transition}`}>
                                            <div className="flex items-center space-x-3 md:space-x-4">
                                                <div className={`p-3 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-500/40'} rounded-xl ${styles.transition}`}>
                                                    <Scale className={`w-6 h-6 ${theme === 'light' ? 'text-purple-700' : 'text-purple-300'}`} />
                                                </div>
                                                <div>
                                                    <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>RBA Retirement Benefits Regulations</h4>
                                                    <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>The Retirement Benefits (Occupational Retirement Benefits Schemes) Regulations.pdf</p>
                                                </div>
                                            </div>
                                            <a
                                                href="/Training Modules/Module-13-Investment-Policy-Statement/Additional Resources/The Retirement Benefits (Occupational Retirement Benefits Schemes) Regulations.pdf"
                                                download="RBA_Retirement_Benefits_Regulations.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`px-4 md:px-6 py-2 ${theme === 'light'
                                                    ? 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
                                                    : 'bg-purple-500 hover:bg-purple-600 shadow-lg hover:shadow-xl'
                                                    } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                                            >
                                                <Download className="w-3 h-3 md:w-4 md:h-4" />
                                                Download
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
                            {!showQuizResults ? (
                                <>
                                    {/* Quiz Header */}
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>Quiz: Investment Policy Statement</h3>
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
                                                ? 'Perfect Score! Excellent understanding of IPS concepts!'
                                                : calculateScore().correct >= calculateScore().total * 0.7
                                                    ? 'Great job! You have a solid grasp of Investment Policy Statements!'
                                                    : 'Review the materials and try again for better mastery!'}
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
                                    Download the following datasets for Investment Policy Statement analysis:
                                </p>

                                <div className="space-y-4">
                                    {/* Financial Statements */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-green-50 border-green-200 hover:bg-green-100'
                                        : 'bg-green-500/20 border-green-400/30 hover:bg-green-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-green-200' : 'bg-green-600/40'} rounded-2xl ${styles.transition}`}>
                                                📊
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Financial Statements (2018-2024)</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Financial_Statements_2018-2024.xlsx • 7-year financial data</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-13-Investment-Policy-Statement/Data/Financial_Statements_2018-2024.xlsx',
                                                'Financial Statements 2018-2024.xlsx'
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

                                    {/* Membership Data */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                                        : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-600/40'} rounded-2xl ${styles.transition}`}>
                                                👥
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Membership Data</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>IPS_Membership Data.xlsx • Member demographic and contribution data</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-13-Investment-Policy-Statement/Data/IPS_Membership Data.xlsx',
                                                'IPS Membership Data.xlsx'
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

                                    {/* Industry Report */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                                        : 'bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-purple-200' : 'bg-purple-600/40'} rounded-2xl ${styles.transition}`}>
                                                📈
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Industry Report (December 2024)</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Industry Brief as at December 2024- Approved for Circulation (1).pdf</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-13-Investment-Policy-Statement/Data/Industry Brief as at December 2024- Approved for Circulation (1).pdf',
                                                'Industry Report December 2024.pdf'
                                            )}
                                            className={`px-6 py-2 ${theme === 'light'
                                                ? 'bg-purple-600 hover:bg-purple-700'
                                                : 'bg-purple-500 hover:bg-purple-600'
                                                } rounded-lg text-white transition flex items-center gap-2`}
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </div>

                                    {/* Trust Deed & Rules */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                                        : 'bg-yellow-500/20 border-yellow-400/30 hover:bg-yellow-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-yellow-200' : 'bg-yellow-600/40'} rounded-2xl ${styles.transition}`}>
                                                📋
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>Trust Deed & Rules</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Solara Summit_Trust Deed & Rules.pdf • Governing documents</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-13-Investment-Policy-Statement/Data/Solara Summit_Trust Deed & Rules.pdf',
                                                'Solara Summit Trust Deed & Rules.pdf'
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
                                    Download these templates to structure your IPS analysis and calculations:
                                </p>

                                <div className="space-y-4">
                                    {/* Working File Template */}
                                    <div className={`rounded-[30px] ${theme === 'light'
                                        ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                                        : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-4 ${theme === 'light' ? 'bg-orange-200' : 'bg-orange-600/40'} rounded-2xl ${styles.transition}`}>
                                                🛠️
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>IPS Working File Template</h4>
                                                <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>Working File.xlsx • Comprehensive IPS calculation workbook</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => downloadFile(
                                                '/Training Modules/Module-13-Investment-Policy-Statement/Working File/Working File.xlsx',
                                                'IPS Working File Template.xlsx'
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
                                <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-700' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
                                    <Upload className="w-6 h-6" />
                                    Submission
                                </h4>
                                <p className={`${styles.textTertiary} ${styles.transition}`}>
                                    Upload your completed Investment Policy Statement assignments for review:
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
                                        <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Completed IPS Analysis</h5>
                                        <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                                            Drag and drop your completed IPS files here, or click to browse
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload-module13"
                                        />
                                        <label
                                            htmlFor="file-upload-module13"
                                            className={`inline-block px-6 py-2 ${theme === 'light'
                                                ? 'bg-green-700 hover:bg-green-800'
                                                : 'bg-green-500 hover:bg-green-600'
                                                } rounded-lg text-white cursor-pointer transition`}
                                        >
                                            Choose Files
                                        </label>
                                        <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 ${styles.transition}`}>
                                            Supported formats: .xlsx, .xls, .pdf, .docx (Max 50MB per file)
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
                                                    Submit IPS Files for Review
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