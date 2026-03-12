import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import modulesService from './services/modules.service';
import quizService from './services/quiz.service';
import progressService from './services/progress.service';
import filesService from './services/files.service';
import discussionService from './services/discussion.service';
import ModuleComponent from './components/ModuleComponent';
import {
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
  module7Data,
  module8Data,
  module9Data,
  module10Data,
  module11Data,
  module12Data,
  module13Data,
  module14Data,
  module15Data,
  module16Data,
  module17Data,
} from './constants/modules';

// Module data mapping - add all modules here as you create their constants
const MODULES_MAP = {
  1: module1Data,
  2: module2Data,
  3: module3Data,
  4: module4Data,
  5: module5Data,
  6: module6Data,
  7: module7Data,
  8: module8Data,
  9: module9Data,
  10: module10Data,
  11: module11Data,
  12: module12Data,
  13: module13Data,
  14: module14Data,
  15: module15Data,
  16: module16Data,
  17: module17Data,
};

export default function ModulePage({ theme = 'dark', user }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  const [module, setModule] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [resources, setResources] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  // Flag to check if we should show API related prompts
  const useApiMode = true; 

  // Fetch module data from API or constants
  useEffect(() => {
    const fetchModuleData = async () => {
      if (!user && !module && useApiMode) {
        // Only redirect if API mode and no user
        toast.info('Please log in to access full features');
      }

      try {
        setLoading(true);
        let moduleData = null;

        // Try to fetch from API first (user is authenticated via Supabase)
        if (user) {
          try {
            moduleData = await modulesService.getModuleById(moduleId);
            setModule(moduleData?.data || moduleData);

            // Fetch related data from API
            try {
              const progressData = await progressService.getModuleProgress(moduleId);
              setProgress(progressData?.data || progressData);
            } catch (e) {
              console.warn('Could not fetch progress:', e);
            }

            try {
              const questionsData = await quizService.getQuizQuestions(moduleId);
              setQuizQuestions(questionsData?.data || questionsData?.questions || []);
            } catch (e) {
              console.warn('Could not fetch quiz questions:', e);
            }

            try {
              const resourcesData = await filesService.getModuleResources(moduleId);
              setResources(resourcesData?.data || resourcesData?.resources || []);
            } catch (e) {
              console.warn('Could not fetch resources:', e);
            }

            try {
              const assignmentsData = await modulesService.getModuleAssignments(moduleId);
              setAssignments(assignmentsData?.data || assignmentsData?.assignments || []);
            } catch (e) {
              console.warn('Could not fetch assignments:', e);
            }

            try {
              const discussionsData = await discussionService.getModuleDiscussions(moduleId);
              setDiscussions(discussionsData?.data || discussionsData?.discussions || []);
            } catch (e) {
              console.warn('Could not fetch discussions:', e);
            }
          } catch (apiError) {
            console.warn('API fetch failed, using fallback constants:', apiError);
          }
        }

        // Fallback to constants if API is not available or user not authenticated
        if (!moduleData) {
          const fallbackData = MODULES_MAP[parseInt(moduleId)];
          if (fallbackData) {
            setModule(fallbackData);
            setQuizQuestions(fallbackData?.quizzes || []);
            setResources(fallbackData?.resources || []);
            setAssignments(fallbackData?.assignments || []);
            setDiscussions(fallbackData?.discussions || []);
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching module data:', err);
        toast.error('Failed to load module. Please try again.');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
    
    // DEPENDENCY FIX: Only re-run if the moduleId changes or the actual user ID changes. 
    // Watching the whole 'user' object causes re-renders when the tab regains focus.
  }, [moduleId, user?.id]);

  // Handle quiz submission
  const handleQuizSubmit = async (answers) => {
    try {
      if (user) {
        const result = await quizService.submitQuiz(moduleId, answers);
        toast.success('🎉 Quiz submitted successfully!');

        // Update progress
        try {
          await progressService.updateProgress(moduleId, {
            status: 'completed',
            quizScore: result?.data?.score || 0,
          });

          // Refresh progress
          const updatedProgress = await progressService.getModuleProgress(moduleId);
          setProgress(updatedProgress?.data || updatedProgress);
        } catch (progressError) {
          console.warn('Could not update progress:', progressError);
        }
      } else {
        toast.warning('Please log in to submit quizzes');
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
      toast.error('Failed to submit quiz. Please try again.');
    }
  };

  // Handle mark complete
  const handleMarkComplete = async () => {
    try {
      if (user) {
        await modulesService.markModuleComplete(moduleId);
        toast.success('✅ Module marked as complete!');

        // Refresh progress
        const updatedProgress = await progressService.getModuleProgress(moduleId);
        setProgress(updatedProgress?.data || updatedProgress);
      } else {
        toast.warning('Please log in to track progress');
      }
    } catch (err) {
      console.error('Error marking module complete:', err);
      toast.error('Failed to mark module as complete. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Loading module...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !module) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        <div className={`text-center p-8 rounded-lg ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-xl'}`}>
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Module Not Found
          </h1>
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Module {moduleId} is not available.
          </p>
          <button
            onClick={() => navigate('/modules')}
            className={`px-6 py-2 rounded-lg transition ${theme === 'light'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  // If using legacy constant-based approach, use ModuleComponent
  if (!user || !quizQuestions.length) {
    return <ModuleComponent theme={theme} moduleData={module} user={user} onMarkComplete={handleMarkComplete} />;
  }

  // New API-based module view
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      {/* Module Header */}
      <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white py-8`}>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{module?.title}</h1>
          <p className="text-lg opacity-90">{module?.description}</p>
          {progress && (
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <div className="w-48 bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all"
                    style={{ width: `${progress?.progressPercentage || 0}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold">{progress?.progressPercentage || 0}% Complete</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-6">
            {['overview', 'quiz', 'resources', 'assignments', 'discussions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : `${theme === 'light' ? 'text-gray-600 hover:text-gray-800' : 'text-gray-400 hover:text-gray-300'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <OverviewTab module={module} progress={progress} onMarkComplete={handleMarkComplete} theme={theme} />
        )}
        {activeTab === 'quiz' && (
          <QuizTab questions={quizQuestions} onSubmit={handleQuizSubmit} theme={theme} />
        )}
        {activeTab === 'resources' && (
          <ResourcesTab resources={resources} theme={theme} />
        )}
        {activeTab === 'assignments' && (
          <AssignmentsTab assignments={assignments} theme={theme} />
        )}
        {activeTab === 'discussions' && (
          <DiscussionsTab discussions={discussions} moduleId={moduleId} user={user} theme={theme} />
        )}
      </div>
    </div>
  );
}

// Tab Components
function OverviewTab({ module, progress, onMarkComplete, theme }) {
  return (
    <div className="space-y-6">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow p-6`}>
        <h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Overview</h2>
        <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-6`}>{module?.overview || module?.description}</p>

        {(module?.objectives || module?.learningGoals) && (
          <div>
            <h3 className={`text-xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Learning Objectives</h3>
            <ul className={`list-disc list-inside space-y-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              {(module?.objectives || module?.learningGoals)?.map((obj, idx) => (
                <li key={idx}>{typeof obj === 'string' ? obj : obj.title || obj}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onMarkComplete}
          className={`mt-6 px-6 py-2 rounded-lg transition ${
            progress?.status === 'completed'
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          disabled={progress?.status === 'completed'}
        >
          {progress?.status === 'completed' ? '✓ Marked Complete' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}

function QuizTab({ questions, onSubmit, theme }) {
  const [answers, setAnswers] = useState({});

  const handleSubmit = () => {
    onSubmit(answers);
    setAnswers({});
  };

  return (
    <div className="space-y-6">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Module Quiz</h2>
        {questions.length > 0 ? (
          <>
            {questions.map((question, idx) => (
              <div key={question.id} className={`mb-8 pb-8 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {idx + 1}. {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options?.map((option, optIdx) => (
                    <label key={optIdx} className={`flex items-center gap-3 cursor-pointer ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optIdx}
                        checked={answers[question.id] === optIdx}
                        onChange={(e) =>
                          setAnswers({
                            ...answers,
                            [question.id]: parseInt(e.target.value),
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No quiz available for this module.</p>
        )}
      </div>
    </div>
  );
}

function ResourcesTab({ resources, theme }) {
  return (
    <div className="space-y-6">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Resources</h2>
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={`border rounded-lg p-4 hover:shadow-lg transition-shadow ${theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-700'}`}
              >
                <h3 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {resource.filename || resource.title}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {resource.fileSize && `Size: ${(resource.fileSize / 1024).toFixed(2)} KB`}
                </p>
                <a
                  href={resource.fileUrl || resource.url}
                  download
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No resources available yet.</p>
        )}
      </div>
    </div>
  );
}

function AssignmentsTab({ assignments, theme }) {
  return (
    <div className="space-y-6">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Assignments</h2>
        {assignments.length > 0 ? (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`border-l-4 border-blue-500 p-4 rounded ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}
              >
                <h3 className={`font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {assignment.title}
                </h3>
                <p className={`mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{assignment.description}</p>
                {assignment.dueDate && (
                  <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No assignments available yet.</p>
        )}
      </div>
    </div>
  );
}

function DiscussionsTab({ discussions, moduleId, user, theme }) {
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      toast.warning('Please enter a message');
      return;
    }
    try {
      if (user) {
        // API call to create discussion post
        await discussionService.createPost(moduleId, { content: newPost });
        toast.success('Post created successfully!');
      } else {
        toast.warning('Please log in to post');
      }
      setNewPost('');
    } catch (error) {
      toast.error('Failed to create post');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow p-6`}>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Discussions</h2>

        {/* New Post Form */}
        {user && (
          <div className={`mb-6 p-4 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Start a new discussion..."
              className={`w-full px-4 py-2 border rounded-lg mb-3 ${
                theme === 'light'
                  ? 'border-gray-300 bg-white text-gray-900'
                  : 'border-gray-600 bg-gray-600 text-white'
              }`}
              rows="3"
            />
            <button
              onClick={handleCreatePost}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        )}

        {/* Discussions List */}
        {discussions.length > 0 ? (
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className={`border rounded-lg p-4 ${theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-700'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {discussion.title || discussion.content?.substring(0, 50)}
                  </h3>
                  <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  {discussion.content}
                </p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  By {discussion.author?.fullName || discussion.author?.username || user?.name || 'Anonymous'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No discussions yet. Start one!</p>
        )}
      </div>
    </div>
  );
}