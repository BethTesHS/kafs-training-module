// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import QASReports from "./QASReports";
import TrainingLinks from "./TrainingLinks";
import FileSavingFormat from "./FileSavingFormat";
import Modules from "./Modules";
import Module1 from "./Module1";
import Module2 from "./Module2";
import Module3 from "./Module3";
import Module4 from "./Module4";
import Module5 from "./Module5";
import Module6 from "./Module6";
import Module7 from "./Module7";
import Module8 from "./Module8";
import Module9 from "./Module9";
import Module10 from "./Module10";
// import Module11 from "./Module11";
// import Module12 from "./Module12";
// import Module13 from "./Module13";
// import Module14 from "./Module14";
// import Module15 from "./Module15";
// import Module16 from "./Module16";
// import Module17 from "./Module17"; // IFRS 17 module
import Auth from "./components/Auth/Auth";
import UserProfile from "./components/UserProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { TutorialProvider } from "./contexts/TutorialContext";
import ModulesTutorial from "./components/Tutorial/ModulesTutorial";
import Module1Tutorial from "./components/Tutorial/Module1Tutorial";
import ThemeToggle from "./components/ThemeToggle";
import AuthCallback from "./components/AuthCallback";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for existing Supabase session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // User is logged in via Supabase
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
          role: session.user.email?.includes('admin') ? 'admin' : 'user'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Check for local storage (for backward compatibility)
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
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

        if (event === 'SIGNED_IN' && session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
            role: session.user.email?.includes('admin') ? 'admin' : 'user'
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));

          // If user just signed in from auth modal, redirect to home
          if (window.location.pathname.includes('/auth')) {
            window.location.href = '/';
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('user');
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

  const isAdmin = user && user.role === 'admin';

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

            {/* Auth Page with theme prop */}
            <Route
              path="/auth"
              element={
                user ? <Navigate to="/" replace /> : <Auth onAuthSuccess={handleAuthSuccess} theme={theme} />
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
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <div className="pt-20">
                    <AdminDashboard theme={theme} />
                  </div>
                ) : <Navigate to="/" replace />
              }
            />

            {/* Module Routes - Only for modules that exist */}
            <Route
              path="/modules/1"
              element={
                user ? (
                  <div className="pt-20">
                    <Module1 theme={theme} />
                    <Module1Tutorial />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            <Route
              path="/modules/2"
              element={
                user ? (
                  <div className="pt-20">
                    <Module2 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            <Route
              path="/modules/3"
              element={
                user ? (
                  <div className="pt-20">
                    <Module3 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            {/* Comment out routes for modules that don't exist yet */}

            <Route
              path="/modules/4"
              element={
                user ? (
                  <div className="pt-20">
                    <Module4 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            <Route
              path="/modules/5"
              element={
                user ? (
                  <div className="pt-20">
                    <Module5 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            <Route
              path="/modules/6"
              element={
                user ? (
                  <div className="pt-20">
                    <Module6 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />

            <Route
              path="/modules/7"
              element={
                user ? (
                  <div className="pt-20">
                    <Module7 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              }
            />
            
            <Route 
              path="/modules/8" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module8 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
             
            <Route 
              path="/modules/9" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module9 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/10" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module10 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            {/*
            <Route 
              path="/modules/11" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module11 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/12" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module12 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/13" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module13 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/14" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module14 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/15" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module15 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/16" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module16 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            
            <Route 
              path="/modules/17" 
              element={
                user ? (
                  <div className="pt-20">
                    <Module17 theme={theme} />
                  </div>
                ) : <Navigate to="/auth" replace />
              } 
            />
            */}

            <Route
              path="/profile"
              element={
                user ? (
                  <div className="pt-20">
                    <UserProfile theme={theme} />
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