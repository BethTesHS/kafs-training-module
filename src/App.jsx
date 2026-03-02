// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

// Contexts
import { TutorialProvider } from "./contexts/TutorialContext";

// Pages
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import QASReports from "./QasReports";
import TrainingLinks from "./TrainingLinks";
import FileSavingFormat from "./FileSavingFormat";
import Modules from "./Modules";
import ModulePage from "./ModulePage";
import Module1Tutorial from "./components/Tutorial/Module1Tutorial";
import Module4Videos from "./Module4Videos";
import Auth from "./components/Auth/Auth";
import UserProfile from "./components/UserProfile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

// Components
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import AuthCallback from "./components/AuthCallback";
import ModulesTutorial from "./components/Tutorial/ModulesTutorial";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for existing Supabase session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          // Store the Supabase session token for API authentication
          if (session.access_token) {
          localStorage.setItem('authToken', session.access_token);
          }

          // User is logged in via Supabase
          let role = 'trainee';
          const email = session.user.email?.toLowerCase() || '';
          if (email.includes('admin')) {
            role = 'admin';
          } else if (email.includes('supervisor') || session.user.user_metadata?.role === 'supervisor') {
            role = 'supervisor';
          } else if (session.user.user_metadata?.role) {
            role = session.user.user_metadata.role;
          }

          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
            role: role,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // Check for local storage (for backward compatibility)
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          // Clear auth token if no session
          localStorage.removeItem('authToken');
        }

        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes (for social login, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        if (session?.user) {
          // Store the Supabase session token for API authentication
          if (session.access_token) {
            localStorage.setItem('authToken', session.access_token);
          }

          let role = 'trainee';
          const email = session.user.email?.toLowerCase() || '';
          if (email.includes('admin')) {
            role = 'admin';
          } else if (email.includes('supervisor') || session.user.user_metadata?.role === 'supervisor') {
            role = 'supervisor';
          } else if (session.user.user_metadata?.role) {
            role = session.user.user_metadata.role;
          }

          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
            role: role,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));

          // If user just signed in from auth modal, redirect to home
          if (window.location.pathname.includes('/auth')) {
            window.location.href = '/';
          }
        } else {
          // No session, clear everything
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-var(--bg-primary) flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-var(--text-primary) text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <TutorialProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-var(--bg-primary) text-var(--text-primary) transition-colors duration-300">
          {/* Theme Toggle - Bottom Right Corner */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Navbar */}
          <Navbar user={user} onLogout={handleLogout} theme={theme} />

          <Routes>
            {/* Auth Routes */}
            <Route
              path="/auth/callback"
              element={<AuthCallback theme={theme} />}
            />
            <Route
              path="/auth"
              element={
                user ? <Navigate to="/" replace /> : <Auth onAuthSuccess={handleAuthSuccess} theme={theme} />
              }
            />
            <Route
              path="/forgot-password"
              element={
                user ? <Navigate to="/" replace /> : <ForgotPassword theme={theme} />
              }
            />
            <Route
              path="/reset-password"
              element={
                user ? <Navigate to="/" replace /> : <ResetPassword theme={theme} />
              }
            />

            {/* Home - LandingPage if not logged in, HomePage if logged in */}
            <Route
              path="/"
              element={
                user ? <HomePage theme={theme} /> : <LandingPage theme={theme} />
              }
            />

            {/* Public Routes */}
            <Route path="/training-links" element={<TrainingLinks theme={theme} />} />
            <Route path="/file-saving-format" element={<FileSavingFormat theme={theme} />} />
            <Route path="/qas-reports" element={<QASReports theme={theme} />} />

            {/* Protected Routes */}
            <Route
              path="/modules"
              element={
                user ? (
                  <div className="pt-20">
                    <Modules theme={theme} />
                    <ModulesTutorial />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            {/* Dynamic Module Route */}
            <Route
              path="/modules/:moduleId"
              element={
                user ? (
                  <div className="pt-20">
                    <ModulePage theme={theme} user={user} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            {/* Module 4 Videos - Special route for video content */}
            <Route
              path="/modules/4/videos"
              element={
                user ? (
                  <div className="pt-20">
                    <Module4Videos theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            {/* Module 1 Tutorial - Special route for tutorial content */}
            <Route
              path="/modules/1/tutorial"
              element={
                user ? (
                  <div className="pt-20">
                    <Module1Tutorial />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            {/* User Profile */}
            <Route
              path="/profile"
              element={
                user ? (
                  <div className="pt-20">
                    <UserProfile user={user} onLogout={handleLogout} theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "dark" ? "dark" : "light"}
          />
        </div>
      </Router>
    </TutorialProvider>
  );
}

export default App;