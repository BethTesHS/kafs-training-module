// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import QASReports from "./QasReports";
import TrainingLinks from "./TrainingLinks";
import FileSavingFormat from "./FileSavingFormat";
import Modules from "./Modules";

import ModulePage from "./ModulePage";
import Module1Tutorial from "./components/Tutorial/Module1Tutorial"; // Keep for Module 1 tutorial
import Module4Videos from "./Module4Videos"; // Keep for specific video content
// import Module1 from "./Module1";
// import Module2 from "./Module2";
// import Module3 from "./Module3";
// import Module4 from "./Module4";
// import Module5 from "./Module5";
// import Module6 from "./Module6";
// import Module7 from "./Module7";
// import Module8 from "./Module8";
// import Module9 from "./Module9";
// import Module10 from "./Module10";
// import Module11 from "./Module11";
// import Module12 from "./Module12";
// import Module13 from "./Module13";
// import Module14 from "./Module14";
// import Module15 from "./Module15";
// import Module16 from "./Module16";
// import Module17 from "./Module17";
import Auth from "./components/Auth/Auth";
import UserProfile from "./components/UserProfile";
import { TutorialProvider } from "./contexts/TutorialContext";
import ModulesTutorial from "./components/Tutorial/ModulesTutorial";
import ThemeToggle from "./components/ThemeToggle";
import AuthCallback from "./components/AuthCallback";
import ScrollToTop from "./components/ScrollToTop";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for existing Supabase session
    const checkSession = async () => {
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
          role: role
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
      setLoading(false);
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
            role: role
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
        <div className="text-var(--text-primary) text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <TutorialProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-var(--bg-primary) text-var(--text-primary) transition-colors duration-300">
          {/* Theme Toggle - Bottom Right Corner (visible for everyone now) */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Navbar with theme prop */}
          <Navbar user={user} onLogout={handleLogout} theme={theme} />

          <Routes>
            {/* Auth Callback Route for OAuth */}
            <Route
              path="/auth/callback"
              element={<AuthCallback theme={theme} />}
            />

            {/* Auth Pages with theme prop */}
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

            {/* Home - LandingPage with theme prop if not logged in, HomePage if logged in */}
            <Route
              path="/"
              element={
                user ? <HomePage theme={theme} /> : <LandingPage theme={theme} />
              }
            />

            {/* Protected Routes - pass theme to other pages as needed */}
            <Route
              path="/qas-reports"
              element={
                user ? (
                  <div className="pt-20">
                    <QASReports theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />
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
            <Route
              path="/training-links"
              element={
                user ? (
                  <div className="pt-20">
                    <TrainingLinks theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />
            <Route
              path="/file-saving-format"
              element={
                user ? (
                  <div className="pt-20">
                    <FileSavingFormat theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />
            {/* Dynamic Module Route - Handles all modules 1-17 */}
            <Route
              path="/modules/:moduleId"
              element={
                user ? (
                  <div className="pt-20">
                    <ModulePage theme={theme} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </TutorialProvider>
  );
}

export default App;