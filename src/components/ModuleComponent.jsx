import React, { useState, useEffect } from "react";
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
  Loader2,
  AlertCircle,
  CheckCircle2,
  Maximize2,
  X,
  Brain,
  Send,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { supabase } from "../supabaseClient";
import { gradeAiQuiz } from "../services/ai-quiz.service";

const BUCKET_NAME = 'submissions';

export default function ModuleComponent({ theme = 'dark', moduleData, user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewingPdf, setViewingPdf] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  // AI Quiz Grading state
  const [aiQuizAnswers, setAiQuizAnswers] = useState({});
  const [gradingInProgress, setGradingInProgress] = useState(false);
  const [gradingResults, setGradingResults] = useState(null);
  const [gradingError, setGradingError] = useState(null);
  const [expandedResults, setExpandedResults] = useState({});
  const [quizSubTab, setQuizSubTab] = useState('multiple-choice');
  
  // Quiz Fetching States
  const [isFetchingQuiz, setIsFetchingQuiz] = useState(false);
  const [isFetchingAiQuiz, setIsFetchingAiQuiz] = useState(false);

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
    aiQuizQuestions,
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

  // Fetch previous multiple choice quiz submission
  useEffect(() => {
    const fetchPreviousSubmission = async () => {
      if (!user?.id || !moduleData?.id || activeTab !== 'quiz' || quizSubTab !== 'multiple-choice') return;

      setIsFetchingQuiz(true);
      try {
        const { data, error } = await supabase
          .from('quiz_submissions')
          .select('*')
          .eq('user_id', user.id)
          .eq('module_id', String(moduleData.id))
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setQuizAnswers(data.answers || {});
          setShowQuizResults(true);
        }
      } catch (err) {
        console.error("Error fetching previous quiz submission:", err);
      } finally {
        setIsFetchingQuiz(false);
      }
    };

    fetchPreviousSubmission();
  }, [user?.id, moduleData?.id, activeTab, quizSubTab]);

  // Fetch previous AI quiz submission
  useEffect(() => {
    const fetchPreviousAiSubmission = async () => {
      if (!user?.id || !moduleData?.id || activeTab !== 'quiz' || quizSubTab !== 'ai-graded') return;

      setIsFetchingAiQuiz(true);
      try {
        const { data, error } = await supabase
          .from('ai_quiz_submissions')
          .select('*')
          .eq('user_id', user.id)
          .eq('module_id', String(moduleData.id))
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setAiQuizAnswers(data.answers || {});
          setGradingResults(data.grading_results || null);
          
          // Optionally expand feedback for review
          if (data.grading_results?.results) {
             const expanded = {};
             data.grading_results.results.forEach(r => {
               expanded[r.questionId] = true;
             });
             setExpandedResults(expanded);
          }
        }
      } catch (err) {
        console.error("Error fetching previous AI quiz submission:", err);
      } finally {
        setIsFetchingAiQuiz(false);
      }
    };

    fetchPreviousAiSubmission();
  }, [user?.id, moduleData?.id, activeTab, quizSubTab]);

  // Load previously uploaded files from Supabase Storage on mount
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      if (!user?.id || !moduleData?.id) return;
      setLoadingFiles(true);
      try {
        const folderPath = `${user.id}/${moduleData.id}`;
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .list(folderPath, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

        if (error) throw error;

        if (data && data.length > 0) {
          const existingFiles = data.map(file => ({
            id: file.id || file.name,
            name: file.name.replace(/^\d+_/, ''), 
            storageName: file.name,
            size: file.metadata?.size
              ? (file.metadata.size / (1024 * 1024)).toFixed(2) + ' MB'
              : 'N/A',
            type: file.metadata?.mimetype || 'application/octet-stream',
            uploadDate: file.created_at
              ? new Date(file.created_at).toLocaleDateString()
              : 'Unknown',
            storagePath: `${folderPath}/${file.name}`,
            uploaded: true
          }));
          setUploadedFiles(existingFiles);
        }
      } catch (err) {
        console.error('Error fetching uploaded files:', err);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchUploadedFiles();
  }, [user?.id, moduleData?.id]);

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
      setQuizSubTab('multiple-choice');
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

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length };
  };

  const submitQuiz = async () => {
    if (!user?.id) {
      alert("You must be logged in to save your score. Your results will be displayed but not saved.");
      setShowQuizResults(true);
      return;
    }

    const { correct, total } = calculateScore();

    try {
      const { error } = await supabase
        .from('quiz_submissions')
        .upsert({
          user_id: user.id,
          module_id: String(moduleData.id),
          score: correct,
          total_questions: total,
          answers: quizAnswers,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id, module_id'
        });

      if (error) throw error;
    } catch (err) {
      console.error("Error saving quiz results:", err);
      alert("There was an error saving your quiz results to the database.");
    }

    setShowQuizResults(true);
  };

  const getStoragePath = (fileName) => {
    const uid = user?.id;
    const modId = moduleData?.id || 'unknown';
    const timestamp = Date.now();
    const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `${uid}/${modId}/${timestamp}_${sanitized}`;
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    if (!user?.id) {
      setUploadError('Please log in to upload files.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const newFiles = [];

    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) {
        setUploadError(`File "${file.name}" exceeds 50MB limit.`);
        continue;
      }

      const storagePath = getStoragePath(file.name);

      try {
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        newFiles.push({
          id: data?.id || storagePath,
          name: file.name,
          storageName: storagePath.split('/').pop(),
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.type,
          uploadDate: new Date().toLocaleDateString(),
          storagePath: storagePath,
          uploaded: true
        });
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
        setUploadError(`Failed to upload "${file.name}": ${err.message}`);
      }
    }

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }

    setUploading(false);
    event.target.value = '';
  };

  const removeFile = async (fileId) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    if (file.storagePath) {
      try {
        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([file.storagePath]);
        if (error) throw error;
      } catch (err) {
        console.error('Error removing file from storage:', err);
        setUploadError(`Failed to remove "${file.name}": ${err.message}`);
        return;
      }
    }

    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmitAll = async () => {
    if (!user?.id || uploadedFiles.length === 0) return;

    setSubmitting(true);
    setSubmitSuccess(false);
    setUploadError(null);

    try {
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting files:', err);
      setUploadError(`Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const isAnswerCorrect = (questionId) => {
    const question = quizQuestions.find(q => q.id === questionId);
    return quizAnswers[questionId] === question.correctAnswer;
  };

  // AI Quiz Grading handlers
  const handleAiQuizAnswerChange = (questionId, value) => {
    setAiQuizAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitForGrading = async () => {
    if (!aiQuizQuestions || aiQuizQuestions.length === 0) return;
    if (!user?.id) {
      setGradingError('Please log in to submit answers for grading.');
      return;
    }

    const answeredCount = Object.values(aiQuizAnswers).filter(a => a && a.trim().length > 0).length;
    if (answeredCount === 0) {
      setGradingError('Please answer at least one question before submitting.');
      return;
    }

    setGradingInProgress(true);
    setGradingError(null);
    setGradingResults(null);

    try {
      const response = await gradeAiQuiz({
        moduleData: {
          title,
          description,
          shortDescription,
          objectives,
          learningOutcomes,
          courseContent,
          assignments,
          quizQuestions: quizQuestions?.slice(0, 10), 
        },
        questions: aiQuizQuestions,
        answers: aiQuizAnswers,
      });

      if (response.success) {
        setGradingResults(response.data);
        const expanded = {};
        response.data.results?.forEach(r => {
          expanded[r.questionId] = true;
        });
        setExpandedResults(expanded);
        
        // Save the results to Supabase
        try {
          const { error: dbError } = await supabase
            .from('ai_quiz_submissions')
            .upsert({
              user_id: user.id,
              module_id: String(moduleData.id),
              score: response.data.overallScore,
              answers: aiQuizAnswers,
              grading_results: response.data,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id, module_id'
            });

          if (dbError) throw dbError;
        } catch (dbErr) {
          console.error("Error saving AI quiz results to database:", dbErr);
          // SHOW ALERT TO USER IF DATABASE SAVE FAILS
          alert(`DATABASE ERROR: ${dbErr.message || JSON.stringify(dbErr)}. Please ensure the ai_quiz_submissions table exists in Supabase.`);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setGradingError(response.error || 'Grading failed. Please try again.');
      }
    } catch (err) {
      console.error('Grading error:', err);
      setGradingError(err?.error || err?.message || 'Failed to grade quiz. Please try again.');
    } finally {
      setGradingInProgress(false);
    }
  };

  const resetAiQuizGrading = () => {
    setAiQuizAnswers({});
    setGradingResults(null);
    setGradingError(null);
    setExpandedResults({});
  };

  const toggleResultExpanded = (questionId) => {
    setExpandedResults(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  if (!moduleData) {
    return <div>Loading module...</div>;
  }

  return (
    <div className={`min-h-screen relative ${styles.transition}`}>
      {viewingPdf && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900/95 border-b border-gray-700">
            <h4 className="text-white font-semibold text-sm md:text-base truncate mr-4">{viewingPdf.title}</h4>
            <div className="flex items-center gap-2">
              <a
                href={viewingPdf.url}
                download={viewingPdf.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white text-sm flex items-center gap-2 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
              <button
                onClick={() => setViewingPdf(null)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 w-full bg-white">
            <object
              data={`${encodeURI(viewingPdf.url)}#toolbar=1&view=FitH`}
              type="application/pdf"
              className="w-full h-full border-0"
            >
              <div className="flex items-center justify-center h-full flex-col gap-4 p-6 text-center bg-gray-50">
                <FileText className="w-12 h-12 text-gray-400" />
                <p className="text-gray-600 max-w-md">The PDF could not be displayed directly in your browser. You can still download it using the button above.</p>
              </div>
            </object>
          </div>
        </div>
      )}

      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: `url('/src/assets/bground.jpg')` }}
      >
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(77, 98, 190, 0.56) 0%, rgba(148, 64, 232, 0.53) 100%)'
              : 'linear-gradient(135deg, rgba(31, 43, 95, 0.5) 0%, rgba(94, 51, 138, 0.61) 100%)',
            backdropFilter: 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-8 ${styles.transition}`}>
        <Link
          to="/modules"
          className={`fixed left-4 top-24 z-20 flex items-center justify-center w-10 h-10 rounded-full ${theme === 'light'
            ? 'bg-white hover:bg-gray-50 text-gray-900 hover:text-gray-950 shadow-xl hover:shadow-2xl backdrop-blur-md border border-gray-200'
            : 'bg-white/30 hover:bg-white/40 text-white hover:text-white backdrop-blur-md border-2 border-white/40 hover:border-white/60 shadow-2xl'
            } transition-all duration-300 hover:scale-110 ${styles.transition}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

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
                } flex-shrink-0`}>
                <Book className="w-9 h-9 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight ${theme === 'light'
                  ? 'bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'
                  }`}>
                  {title}
                </h1>
              </div>
            </div>
            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary}`}>
              {shortDescription || description}
            </p>
          </div>
        </div>

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
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6`}>
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Module Objective
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'} transform translate-y-1`}></span>
              </h3>
              <p className={`${styles.textSecondary} mb-6 text-sm md:text-base`}>
                {typeof objectives === 'string' ? objectives : (
                  <>
                    {objectives.intro}
                    {objectives.points && (
                      <ul className="list-disc pl-5 mt-2">
                        {objectives.points.map((point, idx) => <li key={idx}>{point}</li>)}
                      </ul>
                    )}
                    {objectives.closing && <p className="mt-2">{objectives.closing}</p>}
                  </>
                )}
              </p>

              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
                Learning Outcomes
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'} transform translate-y-1`}></span>
              </h3>
              <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base`}>
                {learningOutcomes.map((outcome, idx) => <li key={idx}>{outcome}</li>)}
              </ul>
            </div>
          )}

          {/* COURSE CONTENT TAB */}
          {activeTab === 'course' && (
            <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border}`}>
              <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4`}>Course Content</h3>
              <p className={`${styles.textTertiary} mb-6 text-sm md:text-base`}>
                {courseContent.description}
              </p>

              {courseContent.resources && courseContent.resources.map((resource, idx) => (
                <div key={idx} className="mb-8 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className={`${styles.accentBg} p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700`}>
                    <div className="flex items-center space-x-3 md:space-x-4 w-full">
                      <div className={`p-3 ${theme === 'light' ? 'bg-blue-200' : 'bg-purple-500/40'} rounded-xl shrink-0`}>
                        <FileText className={`w-5 h-5 ${theme === 'light' ? 'text-blue-700' : 'text-purple-300'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-base md:text-lg font-semibold ${styles.text} truncate`}>{resource.title}</h4>
                        <p className={`text-xs md:text-sm ${styles.textTertiary} line-clamp-2`}>{resource.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setViewingPdf({ url: resource.url, title: resource.title, filename: resource.filename })}
                        className={`w-full md:w-auto px-4 md:px-6 py-2.5 ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium`}
                      >
                        <Maximize2 className="w-4 h-4" /> Full View
                      </button>
                      <a
                        href={resource.url}
                        download={resource.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full md:w-auto px-4 md:px-6 py-2.5 ${theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-md hover:shadow-lg' : 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-md hover:shadow-lg'} rounded-lg text-white transition-all flex items-center justify-center gap-2 text-sm font-medium`}
                      >
                        <Download className="w-4 h-4" /> Download PDF
                      </a>
                    </div>
                  </div>
                  <div className="w-full h-[70vh] md:h-[800px] bg-white relative">
                    <object data={`${encodeURI(resource.url)}#toolbar=0&view=FitH`} type="application/pdf" className="w-full h-full absolute inset-0 border-0">
                      <div className="flex items-center justify-center h-full flex-col gap-4 p-6 text-center bg-gray-50">
                        <FileText className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-600 max-w-md">The PDF could not be displayed directly in your browser. You can still download it using the button above.</p>
                      </div>
                    </object>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && (
            <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6`}>
              <div className="mb-6">
                <div className={`flex gap-2 p-1 rounded-xl ${theme === 'light' ? 'bg-gray-100' : 'bg-white/5'}`}>
                  <button
                    onClick={() => setQuizSubTab('multiple-choice')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      quizSubTab === 'multiple-choice'
                        ? theme === 'light' ? 'bg-white text-indigo-700 shadow-md' : 'bg-indigo-500/20 text-white border border-indigo-400/30'
                        : theme === 'light' ? 'text-gray-500 hover:text-gray-700 hover:bg-white/50' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileText className="w-4 h-4" /> Multiple Choice
                  </button>
                  <button
                    onClick={() => setQuizSubTab('ai-graded')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      quizSubTab === 'ai-graded'
                        ? theme === 'light' ? 'bg-white text-purple-700 shadow-md' : 'bg-purple-500/20 text-white border border-purple-400/30'
                        : theme === 'light' ? 'text-gray-500 hover:text-gray-700 hover:bg-white/50' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Brain className="w-4 h-4" /> AI-Graded
                  </button>
                </div>
              </div>

              {/* Multiple Choice Sub-Tab */}
              {quizSubTab === 'multiple-choice' && (
                isFetchingQuiz ? (
                  <div className="flex flex-col justify-center items-center py-16 gap-4">
                    <Loader2 className={`w-10 h-10 animate-spin ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
                    <p className={`${styles.textSecondary}`}>Loading your previous results...</p>
                  </div>
                ) : (
                  quizQuestions && quizQuestions.length > 0 ? (
                    <>
                    {!showQuizResults ? (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <h3 className={`text-lg md:text-xl font-bold ${styles.text}`}>{quizTitle || 'Quiz'}</h3>
                          <div className={`${styles.textTertiary} text-sm md:text-base`}>
                            Question {currentQuestionIndex + 1} of {quizQuestions.length}
                          </div>
                        </div>

                        <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-6`}>
                          <div
                            className={`h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`, backgroundColor: '#6366f1' }}
                          />
                        </div>

                        {quizQuestions[currentQuestionIndex]?.section && (
                          <div className="mb-6">
                            <div className={`p-4 rounded-lg border-2 shadow-md ${theme === 'light' ? 'bg-white/80 border-gray-300' : 'bg-white/10 border-white/20'}`}>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className={`text-sm font-semibold ${styles.text}`}>{getCurrentSection(currentQuestionIndex)}</p>
                                  <p className={`text-xs font-medium ${styles.textSecondary} mt-1`}>{getSectionProgress(currentQuestionIndex)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className={`${styles.inputBg} rounded-2xl p-4 md:p-6 mb-6 border ${styles.border}`}>
                          <h4 className={`text-base md:text-lg font-medium ${styles.text} mb-4`}>
                            {quizQuestions[currentQuestionIndex].question}
                          </h4>

                          <div className="space-y-2.5">
                            {quizQuestions[currentQuestionIndex].options.map((option) => (
                              <label
                                key={option}
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${quizAnswers[quizQuestions[currentQuestionIndex].id] === option
                                  ? theme === 'light' ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-indigo-500/30 border-2 border-indigo-400'
                                  : theme === 'light' ? 'bg-white border-2 border-gray-200 hover:bg-gray-50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${quizQuestions[currentQuestionIndex].id}`}
                                  value={option}
                                  checked={quizAnswers[quizQuestions[currentQuestionIndex].id] === option}
                                  onChange={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, option)}
                                  className="mr-3 w-4 h-4"
                                />
                                <span className={`${styles.textSecondary} text-sm md:text-base`}>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <button
                            onClick={goToPreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-4 md:px-6 py-3 ${theme === 'light' ? 'bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-900' : 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 text-white'} disabled:cursor-not-allowed disabled:opacity-50 rounded-lg flex items-center gap-2`}
                          >
                            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Previous
                          </button>

                          <div className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs md:text-sm`}>
                            {Object.keys(quizAnswers).length} of {quizQuestions.length} answered
                          </div>

                          {currentQuestionIndex < quizQuestions.length - 1 ? (
                            <button
                              onClick={goToNextQuestion}
                              className={`px-4 md:px-6 py-3 bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white rounded-lg flex items-center gap-2`}
                            >
                              Next <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
                            </button>
                          ) : (
                            <button
                              onClick={submitQuiz}
                              disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                              className={`px-6 md:px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-semibold`}
                            >
                              Submit Quiz
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="space-y-6 md:space-y-8">
                        {/* HEADER: Multiple Choice Questions (Left) + Retake Button (Right) */}
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`text-xl font-semibold ${styles.text} flex items-center gap-3 ${styles.transition}`}>
                            <FileText className={`w-6 h-6 ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`} />
                            Multiple Choice Questions
                          </h4>
                          <button
                              onClick={() => {
                                setShowQuizResults(false);
                                setQuizAnswers({});
                                setCurrentQuestionIndex(0);
                              }}
                              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl`}
                            >
                              <RotateCcw className="w-4 h-4" />
                              Retake
                            </button>
                        </div>

                        {/* SCORE BOX */}
                        <div className={`rounded-2xl p-6 text-center ${theme === 'light'
                          ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200'
                          : 'bg-gradient-to-br from-purple-500/15 to-indigo-500/15 border border-purple-400/20'
                        } ${styles.transition}`}>

                          <div className="flex items-center justify-center gap-3 mb-3">
                            <Award className={`w-8 h-8 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                            <h3 className={`text-xl font-bold ${styles.text}`}>Quiz Complete!</h3>
                          </div>
                          
                          <div className={`text-4xl font-extrabold mb-2 ${
                            (calculateScore().correct / calculateScore().total) * 100 >= 70
                              ? theme === 'light' ? 'text-green-600' : 'text-green-400'
                              : (calculateScore().correct / calculateScore().total) * 100 >= 50
                                ? theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                                : theme === 'light' ? 'text-red-600' : 'text-red-400'
                          }`}>
                            {Math.round((calculateScore().correct / calculateScore().total) * 100)}%
                          </div>
                          
                          <p className={`${styles.textTertiary} text-sm`}>
                            You got {calculateScore().correct} out of {calculateScore().total} questions correct. {calculateScore().correct === calculateScore().total ? 'Excellent work!' : 'Review your answers below and keep studying!'}
                          </p>
                        </div>

                        {/* ANSWER REVIEW */}
                        <div>
                          <h4 className={`text-lg md:text-xl font-bold ${styles.text} mb-4`}>Answer Review</h4>
                          <div className="space-y-4">
                            {quizQuestions.map((q, index) => (
                              <div key={q.id} className="space-y-3">
                                <div className={`rounded-xl p-4 md:p-6 border-2 ${isAnswerCorrect(q.id) ? (theme === 'light' ? 'bg-green-50 border-green-400' : 'bg-green-500/10 border-green-400/30') : (theme === 'light' ? 'bg-red-50 border-red-400' : 'bg-red-500/10 border-red-400/30')}`}>
                                  <div className="flex items-start gap-3 mb-4">
                                    <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${isAnswerCorrect(q.id) ? (theme === 'light' ? 'bg-green-200 text-green-700' : 'bg-green-500/30 text-green-400') : (theme === 'light' ? 'bg-red-200 text-red-700' : 'bg-red-500/30 text-red-400')}`}>
                                      {isAnswerCorrect(q.id) ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <span className="font-bold">✗</span>}
                                    </div>
                                    <div className="flex-1">
                                      <h5 className={`text-base font-semibold ${styles.text} mb-3`}>Question {index + 1}: {q.question}</h5>
                                      {!isAnswerCorrect(q.id) && (
                                        <div className={`mb-3 p-3 rounded-lg ${theme === 'light' ? 'bg-red-100' : 'bg-red-500/20'}`}>
                                          <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-red-800' : 'text-red-300'}`}><span className="font-semibold">Your answer:</span> {quizAnswers[q.id]}</p>
                                        </div>
                                      )}
                                      <div className={`mb-3 p-3 rounded-lg ${theme === 'light' ? 'bg-green-100' : 'bg-green-500/20'}`}>
                                        <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-green-800' : 'text-green-300'} `}><span className="font-semibold">Correct answer:</span> {q.correctAnswer}</p>
                                      </div>
                                      <div className={`p-3 md:p-4 rounded-lg ${theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-purple-500/10 border border-purple-400/20'}`}>
                                        <p className={`${theme === 'light' ? 'text-blue-700' : 'text-purple-300'} font-medium mb-2 text-sm`}>Explanation:</p>
                                        <p className={`${styles.textSecondary} text-sm`}>{q.explanation}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    </>
                  ) : (
                    <div className={`text-center py-12 ${styles.textTertiary}`}>
                      <FileText className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">No multiple choice questions available yet.</p>
                    </div>
                  )
                )
              )}

              {/* AI-Graded Sub-Tab */}
              {quizSubTab === 'ai-graded' && (
                isFetchingAiQuiz ? (
                  <div className="flex flex-col justify-center items-center py-16 gap-4">
                    <Loader2 className={`w-10 h-10 animate-spin ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                    <p className={`${styles.textSecondary}`}>Loading your previous AI grading results...</p>
                  </div>
                ) : (
                  aiQuizQuestions && aiQuizQuestions.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xl font-semibold ${styles.text} flex items-center gap-3 ${styles.transition}`}>
                          <Sparkles className={`w-6 h-6 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                          AI-Graded Questions
                        </h4>
                        {gradingResults && (
                          <button
                              onClick={resetAiQuizGrading}
                              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl`}
                            >
                              <RotateCcw className="w-4 h-4" />
                              Retake
                            </button>
                        )}
                      </div>
                      <p className={`${styles.textTertiary} ${styles.transition}`}>
                        Answer the questions below based on the module's training materials. Submit your answers to receive instant AI-powered feedback.
                      </p>

                      {/* Grading Error */}
                      {gradingError && (
                        <div className={`rounded-xl p-4 flex items-center gap-3 ${theme === 'light' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/10 border border-red-400/20 text-red-300'}`}>
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">{gradingError}</p>
                          <button onClick={() => setGradingError(null)} className="ml-auto text-xs underline">Dismiss</button>
                        </div>
                      )}

                      {/* Overall Score Card (shown after grading) */}
                      {gradingResults && (
                        <div className={`rounded-2xl p-6 text-center ${theme === 'light'
                          ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200'
                          : 'bg-gradient-to-br from-purple-500/15 to-indigo-500/15 border border-purple-400/20'
                        } ${styles.transition}`}>
                          <div className="flex items-center justify-center gap-3 mb-3">
                            <Sparkles className={`w-8 h-8 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                            <h3 className={`text-xl font-bold ${styles.text}`}>AI Grading Complete</h3>
                          </div>
                          <div className={`text-4xl font-extrabold mb-2 ${
                            gradingResults.overallScore >= 70
                              ? theme === 'light' ? 'text-green-600' : 'text-green-400'
                              : gradingResults.overallScore >= 50
                                ? theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                                : theme === 'light' ? 'text-red-600' : 'text-red-400'
                          }`}>
                            {Math.round(gradingResults.overallScore)}%
                          </div>
                          <p className={`${styles.textTertiary} text-sm`}>{gradingResults.overallFeedback}</p>
                        </div>
                      )}

                      {/* Questions List */}
                      <div className="space-y-5">
                        {aiQuizQuestions.map((q, idx) => {
                          const result = gradingResults?.results?.find(r => String(r.questionId) === String(q.id));
                          const isExpanded = expandedResults[q.id];

                          return (
                            <div key={q.id} className={`rounded-2xl border overflow-hidden ${styles.transition} ${
                              result
                                ? result.isCorrect
                                  ? theme === 'light'
                                    ? 'border-green-300 bg-green-50/50'
                                    : 'border-green-400/30 bg-green-500/5'
                                  : theme === 'light'
                                    ? 'border-red-300 bg-red-50/50'
                                    : 'border-red-400/30 bg-red-500/5'
                                : theme === 'light'
                                  ? 'border-gray-200 bg-white/80'
                                  : 'border-white/10 bg-white/5'
                            }`}>
                              {/* Question Header */}
                              <div className="p-5">
                                <div className="flex items-start gap-3 mb-3">
                                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    result
                                      ? result.isCorrect
                                        ? theme === 'light' ? 'bg-green-200 text-green-700' : 'bg-green-500/30 text-green-400'
                                        : theme === 'light' ? 'bg-red-200 text-red-700' : 'bg-red-500/30 text-red-400'
                                      : theme === 'light' ? 'bg-purple-200 text-purple-700' : 'bg-purple-500/30 text-purple-400'
                                  }`}>
                                    {result ? (result.isCorrect ? <Check className="w-4 h-4" /> : '✗') : idx + 1}
                                  </span>
                                  <div className="flex-1">
                                    <h5 className={`text-base font-semibold ${styles.text} ${styles.transition}`}>
                                      {q.question}
                                    </h5>
                                    {q.hint && !gradingResults && (
                                      <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} italic`}>
                                        Hint: {q.hint}
                                      </p>
                                    )}
                                    {result && (
                                      <div className="flex items-center gap-3 mt-2">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                          result.isCorrect
                                            ? theme === 'light' ? 'bg-green-200 text-green-800' : 'bg-green-500/25 text-green-300'
                                            : theme === 'light' ? 'bg-red-200 text-red-800' : 'bg-red-500/25 text-red-300'
                                        }`}>
                                          {result.isCorrect ? 'Correct' : 'Needs Improvement'} — {result.score}/10
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Answer Input */}
                                <textarea
                                  value={aiQuizAnswers[q.id] || ''}
                                  onChange={(e) => handleAiQuizAnswerChange(q.id, e.target.value)}
                                  disabled={gradingInProgress}
                                  placeholder="Type your answer here..."
                                  rows={4}
                                  className={`w-full rounded-xl p-4 text-sm resize-y border transition-all focus:outline-none focus:ring-2 ${
                                    theme === 'light'
                                      ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                                      : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-purple-400/50 focus:border-purple-400/50'
                                  } ${gradingInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
                                />
                              </div>

                              {/* AI Feedback (shown after grading) */}
                              {result && (
                                <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
                                  <button
                                    onClick={() => toggleResultExpanded(q.id)}
                                    className={`w-full px-5 py-3 flex items-center justify-between text-sm font-medium transition-colors ${
                                      theme === 'light'
                                        ? 'hover:bg-gray-100 text-gray-700'
                                        : 'hover:bg-white/5 text-gray-300'
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <MessageSquare className="w-4 h-4" />
                                      AI Feedback
                                    </span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </button>

                                  {isExpanded && (
                                    <div className="px-5 pb-5 space-y-3">
                                      {/* Feedback */}
                                      <div className={`p-4 rounded-lg ${theme === 'light'
                                        ? 'bg-blue-50 border border-blue-200'
                                        : 'bg-blue-500/10 border border-blue-400/20'
                                      }`}>
                                        <p className={`text-xs font-semibold mb-1 ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>
                                          Feedback:
                                        </p>
                                        <p className={`text-sm ${theme === 'light' ? 'text-blue-800' : 'text-blue-200'}`}>
                                          {result.feedback}
                                        </p>
                                      </div>

                                      {/* Correct Guidance (shown when wrong or partially correct) */}
                                      {!result.isCorrect && result.correctGuidance && (
                                        <div className={`p-4 rounded-lg ${theme === 'light'
                                          ? 'bg-green-50 border border-green-200'
                                          : 'bg-green-500/10 border border-green-400/20'
                                        }`}>
                                          <p className={`text-xs font-semibold mb-1 ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>
                                            Correct Answer / Key Points:
                                          </p>
                                          <p className={`text-sm ${theme === 'light' ? 'text-green-800' : 'text-green-200'}`}>
                                            {result.correctGuidance}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Submit for Grading Button */}
                      {!gradingResults && (
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={handleSubmitForGrading}
                            disabled={gradingInProgress || !user?.id || Object.values(aiQuizAnswers).filter(a => a && a.trim()).length === 0}
                            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                              theme === 'light'
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                                : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-purple-500/25'
                            }`}
                          >
                            {gradingInProgress ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                AI is grading your answers...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5" />
                                Submit for AI Grading
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {!user?.id && (
                        <div className={`rounded-xl p-4 flex items-center gap-3 ${theme === 'light' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-amber-500/10 border border-amber-400/20 text-amber-300'}`}>
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">Please log in to submit your answers for AI grading.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`text-center py-12 ${styles.textTertiary}`}>
                      <Brain className={`w-12 h-12 mx-auto mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-gray-600'}`} />
                      <p className="text-lg font-medium">No AI-graded questions available yet.</p>
                      <p className="text-sm mt-2">Check back later or try the Multiple Choice quiz.</p>
                    </div>
                  )
                )
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
                  {/* Login prompt if not authenticated */}
                  {!user?.id && (
                    <div className={`rounded-xl p-4 mb-4 flex items-center gap-3 ${theme === 'light' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-amber-500/10 border border-amber-400/20 text-amber-300'}`}>
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">Please log in to upload and submit assignment files.</p>
                    </div>
                  )}

                  {/* Upload Error */}
                  {uploadError && (
                    <div className={`rounded-xl p-4 mb-4 flex items-center gap-3 ${theme === 'light' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/10 border border-red-400/20 text-red-300'}`}>
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{uploadError}</p>
                      <button onClick={() => setUploadError(null)} className="ml-auto text-xs underline">Dismiss</button>
                    </div>
                  )}

                  {/* Submit Success */}
                  {submitSuccess && (
                    <div className={`rounded-xl p-4 mb-4 flex items-center gap-3 ${theme === 'light' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-green-500/10 border border-green-400/20 text-green-300'}`}>
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">Files submitted successfully for review!</p>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className={`border-2 border-dashed ${theme === 'light'
                    ? 'border-green-300 hover:border-green-400'
                    : 'border-green-400/30 hover:border-green-400/50'
                    } rounded-2xl p-8 text-center transition-colors ${styles.transition} ${!user?.id ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} animate-spin mb-4`} />
                        <h5 className={`text-lg font-semibold ${styles.text} mb-2`}>Uploading to Supabase Storage...</h5>
                        <p className={`${styles.textTertiary}`}>Please wait while your files are being uploaded</p>
                      </div>
                    ) : (
                      <>
                        <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} mx-auto mb-4 ${styles.transition}`} />
                        <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Completed Work</h5>
                        <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                          Drag and drop your files here, or click to browse
                        </p>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.xlsx,.xls,.docx,.pptx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          disabled={!user?.id || uploading}
                        />
                        <label
                          htmlFor="file-upload"
                          className={`inline-block px-6 py-2 ${theme === 'light'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-green-500 hover:bg-green-600'
                            } rounded-lg text-white cursor-pointer transition ${!user?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          Choose Files
                        </label>
                        <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 ${styles.transition}`}>
                          Supported formats: .xlsx, .xls, .pdf, .docx, .pptx (Max 50MB per file)
                        </p>
                      </>
                    )}
                  </div>

                  {/* Loading previously uploaded files */}
                  {loadingFiles && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Loader2 className={`w-4 h-4 animate-spin ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
                      <span className={`text-sm ${styles.textTertiary}`}>Loading your previously uploaded files...</span>
                    </div>
                  )}

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
                                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs ${styles.transition}`}>
                                  {file.size} • {file.uploadDate}
                                  {file.uploaded && <span className="ml-2 text-green-400">✓ Stored</span>}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-red-400 hover:text-red-300 transition text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Submit Button */}
                      <div className="mt-4 text-center">
                        <button
                          onClick={handleSubmitAll}
                          disabled={submitting || uploading}
                          className={`px-8 py-3 ${theme === 'light'
                            ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                            : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/25'
                            } rounded-xl text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto`}
                        >
                          {submitting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                          ) : (
                            <>Submit All Files for Review</>
                          )}
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