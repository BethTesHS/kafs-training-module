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
  Settings
} from "lucide-react";

export default function ModuleComponent({ theme = 'dark', moduleData }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Destructure module data
  const {
    title,
    description,
    shortDescription,
    objectives,
    learningOutcomes,
    themeColor,
    courseContent,
    quizTitle,
    assignments,
    quizQuestions
  } = moduleData;

  // Theme-based styles
  const getThemeStyles = () => {
    const accentColor = themeColor || 'purple';
    
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
        shadow: `shadow-2xl shadow-${accentColor}-500/10`,
        accent: `text-${accentColor}-600`,
        accentBg: `bg-${accentColor}-50/80`,
        accentBorder: `border-${accentColor}-200/50`,
        accentHover: `hover:bg-${accentColor}-100/80`,
        gradientText: `bg-gradient-to-r from-${accentColor}-600 to-blue-600 bg-clip-text text-transparent`,
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
      shadow: `shadow-2xl shadow-${accentColor}-500/20`,
      accent: `text-${accentColor}-400`,
      accentBg: `bg-${accentColor}-500/20`,
      accentBorder: `border-${accentColor}-400/30`,
      accentHover: `hover:bg-${accentColor}-500/30`,
      gradientText: `bg-gradient-to-r from-${accentColor}-400 to-blue-400 bg-clip-text text-transparent`,
      transition: 'transition-all duration-300 ease-in-out'
    };
  };

  const styles = getThemeStyles();

  // Helper functions for section display
  const getCurrentSection = (questionIndex) => {
    if (!quizQuestions || quizQuestions.length === 0) return '';
    const question = quizQuestions[questionIndex];
    return question.section || '';
  };

  const getSectionProgress = (questionIndex) => {
    if (!quizQuestions || quizQuestions.length === 0) return '';
    const currentSection = getCurrentSection(questionIndex);
    const sectionQuestions = quizQuestions.filter(q => q.section === currentSection);
    const sectionIndex = quizQuestions.findIndex(q => q.section === currentSection);
    const currentInSection = questionIndex - sectionIndex + 1;
    return `${currentInSection} of ${sectionQuestions.length} questions`;
  };

  const getCurrentSectionNumber = (questionIndex) => {
    if (!quizQuestions || quizQuestions.length === 0) return 1;
    const currentSection = getCurrentSection(questionIndex);
    const sections = [...new Set(quizQuestions.map(q => q.section))];
    return sections.indexOf(currentSection) + 1;
  };

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

  if (!moduleData) {
    return <div>Loading module...</div>;
  }

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
              ? 'linear-gradient(135deg, rgba(77, 98, 190, 0.56) 0%, rgba(148, 64, 232, 0.53) 100%)'
              : 'linear-gradient(135deg, rgba(31, 43, 95, 0.5) 0%, rgba(94, 51, 138, 0.61) 100%)',
            backdropFilter: theme === 'dark' ? 'blur(2px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-8 ${styles.transition}`}>
        {/* Back Button */}
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
            ? 'bg-white/95 shadow-2xl shadow-purple-500/10 border border-white/30'
            : 'bg-black/75 backdrop-blur-xl border border-white/10 shadow-xl'
            } ${styles.transition}`}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? 'bg-gradient-to-br from-purple-400 to-blue-500'
                : 'bg-gradient-to-br from-purple-500/40 to-blue-500/40 border border-purple-400/40'
                } ${styles.transition} flex-shrink-0`}>
                <Book className={`w-9 h-9 ${theme === 'light' ? 'text-white' : 'text-white'} ${styles.transition}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent bg-origin-padding'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'
                  } ${styles.transition}`}>
                  {title}
                </h1>
              </div>
            </div>

            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary} ${styles.transition}`}>
              {shortDescription || description}
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="mb-8">
          <div className={`border-b ${theme === 'light' ? 'border-purple-200' : 'border-gray-500'} ${styles.transition}`}>
            <nav className="flex space-x-8">
              {['overview', 'course', 'assignments', 'quiz'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium border-b-2 transition-all duration-200 ${activeTab === tab
                    ? theme === 'light'
                      ? 'border-white text-white font-semibold bg-blue-600/20 px-3 py-1 rounded-t-lg'
                      : 'border-purple-400 text-white font-semibold bg-purple-400/10 px-3 py-1 rounded-t-lg'
                    : theme === 'light'
                      ? 'border-transparent text-white/80 hover:text-white hover:border-white px-1'
                      : 'border-transparent text-gray-200 hover:text-white hover:border-purple-300 hover:bg-purple-500/10 px-1'
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

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6 ${styles.transition}`}>
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gradient-to-r from-purple-400 to-blue-400'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base ${styles.transition}`}>
                {typeof objectives === 'string' ? objectives : (
                  <>
                    {objectives.intro}
                    {objectives.points && (
                      <ul className="list-disc pl-5 mt-2 text-sm md:text-base">
                        {objectives.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {objectives.closing && <p className="mt-2">{objectives.closing}</p>}
                  </>
                )}
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                  : 'bg-gradient-to-r from-purple-400 to-blue-400'
                  } transform translate-y-1 ${styles.transition}`}></span>
              </h3>
              <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base ${styles.transition}`}>
                {learningOutcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}

          {/* COURSE CONTENT TAB */}
          {activeTab === 'course' && (
            <div>
              <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border} ${styles.transition}`}>
                <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 ${styles.transition}`}>Course Content</h3>
                <p className={`${styles.textTertiary} mb-6 text-sm md:text-base ${styles.transition}`}>
                  {courseContent.description}
                </p>

                {/* Resource Cards */}
                {courseContent.resources && courseContent.resources.map((resource, idx) => (
                  <div key={idx} className={`rounded-2xl ${styles.accentBg} border ${styles.accentBorder} p-4 md:p-6 flex items-center justify-between ${styles.accentHover} ${styles.transition} mb-4`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-purple-500/40'} rounded-xl ${styles.transition}`}>
                        {resource.icon || '📄'}
                      </div>
                      <div>
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} ${styles.transition}`}>{resource.title}</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} ${styles.transition}`}>{resource.description}</p>
                      </div>
                    </div>
                    <a
                      href={resource.url}
                      download={resource.filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 md:px-6 py-2 ${theme === 'light'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                        } rounded-lg text-white transition-all duration-200 flex items-center gap-2 text-sm md:text-base`}
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download PDF
                    </a>
                  </div>
                ))}

                {courseContent.aboutText && (
                  <div className={`mt-4 md:mt-6 p-3 md:p-4 ${styles.inputBg} rounded-lg border ${styles.border} ${styles.transition}`}>
                    <h5 className={`${styles.text} font-semibold mb-2 text-sm md:text-base ${styles.transition}`}>About This Resource:</h5>
                    <p className={`${styles.textTertiary} text-xs md:text-sm ${styles.transition}`}>
                      {courseContent.aboutText.intro}
                    </p>
                    {courseContent.aboutText.points && (
                      <ul className={`list-disc pl-5 mt-2 ${styles.textTertiary} text-xs md:text-sm ${styles.transition}`}>
                        {courseContent.aboutText.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && quizQuestions && quizQuestions.length > 0 && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 ${styles.transition}`}>
              {!showQuizResults ? (
                <>
                  {/* Quiz Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg md:text-xl font-bold ${styles.text} ${styles.transition}`}>{quizTitle || 'Quiz'}</h3>
                    <div className={`${styles.textTertiary} text-sm md:text-base ${styles.transition}`}>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-6 ${styles.transition}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                        backgroundColor: '#6366f1'
                      }}
                    />
                  </div>

                  {/* Section Progress Indicator */}
                  {quizQuestions[currentQuestionIndex]?.section && (
                    <div className="mb-6">
                      <div className={`p-4 rounded-lg border-2 shadow-md ${theme === 'light'
                        ? 'bg-white/80 border-gray-300'
                        : 'bg-white/10 border-white/20'
                        } ${styles.transition}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-semibold ${styles.text} ${styles.transition}`}>
                              {getCurrentSection(currentQuestionIndex)}
                            </p>
                            <p className={`text-xs font-medium ${styles.textSecondary} mt-1 ${styles.transition}`}>
                              {getSectionProgress(currentQuestionIndex)}
                            </p>
                          </div>
                          <div className={`text-xs font-semibold px-3 py-1.5 rounded ${theme === 'light'
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-white/15 text-white'
                            }`}>
                            Section {getCurrentSectionNumber(currentQuestionIndex)}/{new Set(quizQuestions.map(q => q.section)).size}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                /* Results View */
                <div className="space-y-6 md:space-y-8">
                  {/* Score Card */}
                  <div className={`${theme === 'light'
                    ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200'
                    : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30'
                    } rounded-2xl p-6 md:p-8 text-center ${styles.transition}`}>
                    <Award className={`w-12 h-12 md:w-16 md:h-16 ${theme === 'light' ? 'text-indigo-600' : 'text-purple-300'} mx-auto mb-4`} />
                    <h3 className={`text-xl md:text-2xl font-bold ${styles.text} mb-2`}>Quiz Complete!</h3>
                    <div className={`text-3xl md:text-5xl font-extrabold ${theme === 'light' ? 'text-indigo-600' : 'text-purple-300'} mb-2`}>
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
                    <div className="space-y-4">
                      {(() => {
                        let currentSection = null;
                        return quizQuestions.map((q, index) => {
                          const showSectionHeader = q.section ? q.section !== currentSection : false;
                          currentSection = q.section;
                          
                          return (
                            <div key={q.id} className="space-y-3">
                              {showSectionHeader && (
                                <div className={`py-3 px-5 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm border ${theme === 'light'
                                  ? 'border-purple-400/20'
                                  : 'border-purple-400/15'
                                  } shadow-sm`}>
                                  <div className="flex items-center gap-3">
                                    <h5 className={`font-semibold text-base md:text-lg tracking-wide ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                      {q.section}
                                    </h5>
                                    <span className={`text-xs ml-auto font-medium ${theme === 'light' ? 'text-gray-700' : 'text-white/70'}`}>
                                      {quizQuestions.filter(item => item.section === q.section).length} questions
                                    </span>
                                  </div>
                                </div>
                              )}
                              
                              <div className={`rounded-xl p-4 md:p-6 border-2 ${isAnswerCorrect(q.id)
                                ? theme === 'light'
                                  ? 'bg-green-50 border-green-400'
                                  : 'bg-green-500/10 border-green-400/30'
                                : theme === 'light'
                                  ? 'bg-red-50 border-red-400'
                                  : 'bg-red-500/10 border-red-400/30'
                                } ${styles.transition}`}>
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
                            </div>
                          );
                        });
                      })()}
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
          {activeTab === 'assignments' && assignments && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`}>
              <h3 className={`text-2xl font-bold ${styles.text} mb-6 ${styles.transition}`}>Assignments</h3>

              {/* Data Files */}
              {assignments.dataFiles && assignments.dataFiles.length > 0 && (
                <div className="space-y-4">
                  <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
                    <Database className="w-6 h-6" />
                    Data Files
                  </h4>
                  <p className={`${styles.textTertiary} ${styles.transition}`}>
                    Download the following datasets to practice your skills:
                  </p>

                  <div className="space-y-4">
                    {assignments.dataFiles.map((file, idx) => (
                      <div key={idx} className={`rounded-[30px] ${theme === 'light'
                        ? `bg-${file.color}-50 border-${file.color}-200 hover:bg-${file.color}-100`
                        : `bg-${file.color}-500/20 border-${file.color}-400/30 hover:bg-${file.color}-500/30`
                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`p-4 ${theme === 'light' ? `bg-${file.color}-200` : `bg-${file.color}-600/40`} rounded-2xl ${styles.transition}`}>
                            {file.icon}
                          </div>
                          <div>
                            <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>{file.title}</h4>
                            <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>{file.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadFile(file.url, file.filename)}
                          className={`px-6 py-2 ${theme === 'light'
                            ? `bg-${file.color}-600 hover:bg-${file.color}-700`
                            : `bg-${file.color}-500 hover:bg-${file.color}-600`
                            } rounded-lg text-white transition flex items-center gap-2`}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Working Files */}
              {assignments.workingFiles && assignments.workingFiles.length > 0 && (
                <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
                  <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} flex items-center gap-3 ${styles.transition}`}>
                    <Settings className="w-6 h-6" />
                    Working Files
                  </h4>
                  <p className={`${styles.textTertiary} ${styles.transition}`}>
                    Download these templates to structure your workflow:
                  </p>

                  <div className="space-y-4">
                    {assignments.workingFiles.map((file, idx) => (
                      <div key={idx} className={`rounded-[30px] ${theme === 'light'
                        ? `bg-${file.color}-50 border-${file.color}-200 hover:bg-${file.color}-100`
                        : `bg-${file.color}-500/20 border-${file.color}-400/30 hover:bg-${file.color}-500/30`
                        } border p-6 flex items-center justify-between ${styles.transition}`}>
                        <div className="flex items-center space-x-4">
                          <div className={`p-4 ${theme === 'light' ? `bg-${file.color}-200` : `bg-${file.color}-600/40`} rounded-2xl ${styles.transition}`}>
                            {file.icon}
                          </div>
                          <div>
                            <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>{file.title}</h4>
                            <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>{file.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => downloadFile(file.url, file.filename)}
                          className={`px-6 py-2 ${theme === 'light'
                            ? `bg-${file.color}-600 hover:bg-${file.color}-700`
                            : `bg-${file.color}-500 hover:bg-${file.color}-600`
                            } rounded-lg text-white transition flex items-center gap-2`}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submission */}
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
