// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { Home, BookOpen, Gamepad2, Calculator, User, ChevronDown, LogOut, Settings, Menu, X, LogIn, UserPlus } from "lucide-react";
import { supabase } from "../supabaseClient"; 

export default function Navbar({ user, onLogout, theme = 'dark' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileToolsMenu, setShowMobileToolsMenu] = useState(false);
  const [showMobileResourcesMenu, setShowMobileResourcesMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMobileMenu && e.target.closest('.mobile-menu-container')) return;
      
      if (!e.target.closest('.profile-dropdown')) setShowProfileMenu(false);
      if (!e.target.closest('.resources-dropdown')) setShowResourcesMenu(false);
      if (!e.target.closest('.tools-dropdown')) setShowToolsMenu(false);
      if (!e.target.closest('.mobile-menu-button') && !e.target.closest('.mobile-menu-container')) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  const isActive = (path) => currentPath === path;

  // Dual color scheme: Cyan for dark mode, Blue/Purple for light mode
  const colors = {
    // Dark mode colors (cyan theme)
    cyan: "#00E5FF",
    darkCyan: "#00B8D4",
    
    // Light mode colors (blue/purple theme)
    blue: "#0066FF",
    purple: "#7C4DFF",
    darkBlue: "#0033CC",
    
    // Theme-aware colors
    primary: theme === 'dark' ? "#00E5FF" : "#0066FF",
    secondary: theme === 'dark' ? "#00B8D4" : "#7C4DFF",
    primaryLight: theme === 'dark' ? "#00E5FF20" : "#0066FF20",
    
    // Common colors
    gradientStart: theme === 'dark' ? "#00E5FF" : "#0066FF",
    gradientEnd: theme === 'dark' ? "#0091EA" : "#7C4DFF",
    green: "#8BC53F",
    darkGreen: "#006B3D",
    orange: "#FF6B35",
    gold: "#FFB800",
    darkCard: theme === 'dark' ? "#1A1F2E" : "#F8FAFC",
    bg: theme === 'dark' ? "#0A0F1E" : "#FFFFFF",
    text: theme === 'dark' ? "#FFFFFF" : "#0F172A",
    textSecondary: theme === 'dark' ? "#9CA3AF" : "#64748B"
  };

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/modules", label: "Training", icon: <BookOpen className="w-5 h-5" /> },
  ];

  const toolItems = [
    { 
      label: "UPR & GEP Model", 
      url: "https://kenbright-upr-and-gep-model.share.connect.posit.cloud",
      icon: <Calculator className="w-4 h-4" />
    },
    { 
      label: "Exposure, Frequency & Severity Model", 
      url: "https://kenbright-exposure-frequency-and-severity-model.share.connect.posit.cloud",
      icon: <Calculator className="w-4 h-4" />
    },
    { 
      label: "Risk Adjustment & Loss Triangles", 
      url: "https://kenbright-risk-adjustment-and-loss-triangles-model.share.connect.posit.cloud",
      icon: <Calculator className="w-4 h-4" />
    },
  ];

  const resourceItems = [
    { label: "QAS Reports", path: "/qas-reports", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Training Links", path: "/training-links", icon: <BookOpen className="w-4 h-4" /> },
    { label: "File Formats", path: "/file-saving-format", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Documentation", path: "/docs", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const getUserInitials = () => {
    if (!user) return "U";
    if (user.name) return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    if (user.username) return user.username.slice(0, 2).toUpperCase();
    return "U";
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setShowMobileMenu(!showMobileMenu);
  };

  // UPDATED: Proper logout function with Supabase integration
  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('user');
      
      // Call parent logout handler if provided (from App.jsx)
      if (onLogout) {
        onLogout();
      }
      
      // Close all open menus
      setShowMobileMenu(false);
      setShowProfileMenu(false);
      setShowResourcesMenu(false);
      setShowToolsMenu(false);
      
      // Navigate to home page
      navigate('/');
      
      // Show success message (optional)
      console.log('Successfully logged out');
      
    } catch (error) {
      console.error('Error signing out:', error.message);
      // You could show an error toast/notification here
      alert('Error signing out: ' + error.message);
    }
  };

  // LOGGED OUT NAVBAR
  if (!isLoggedIn) {
    return (
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: isScrolled 
            ? (theme === 'dark' ? 'rgba(10, 15, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)') 
            : (theme === 'dark' ? 'rgba(10, 15, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)'),
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled 
            ? (theme === 'dark' ? '1px solid rgba(0, 229, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)')
            : (theme === 'dark' ? '1px solid rgba(0, 229, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)'),
          boxShadow: theme === 'dark' 
            ? '0 4px 30px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                  boxShadow: `0 4px 20px ${colors.primary}40`
                }}
              >
                KB
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg leading-none" style={{ color: colors.text }}>
                  KENBRIGHT
                </div>
                <div
                  className="text-xs font-medium mt-0.5"
                  style={{ color: colors.primary }}
                >
                  Actuarial Hub
                </div>
              </div>
            </a>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/auth?mode=login')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  border: theme === 'dark' ? '1px solid rgba(0, 229, 255, 0.25)' : '1px solid rgba(0,0,0,0.1)',
                  color: colors.text
                }}
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
              <button
                onClick={() => navigate('/auth?mode=signup')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                  boxShadow: `0 4px 20px ${colors.primary}50`,
                  color: 'white'
                }}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg mobile-menu-button"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                border: theme === 'dark' ? '1px solid rgba(0, 229, 255, 0.25)' : '1px solid rgba(0,0,0,0.1)'
              }}
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" style={{ color: colors.text }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: colors.text }} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="mobile-menu-container md:hidden pb-4">
              <div className="flex flex-col gap-2 pt-4">
                <button
                  onClick={() => { navigate('/auth?mode=login'); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    border: theme === 'dark' ? '1px solid rgba(0, 229, 255, 0.25)' : '1px solid rgba(0,0,0,0.1)',
                    color: colors.text
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </button>
                <button
                  onClick={() => { navigate('/auth?mode=signup'); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                    boxShadow: `0 4px 20px ${colors.primary}50`,
                    color: 'white'
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up Free
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // LOGGED IN NAVBAR
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: theme === 'dark' ? 'rgba(10, 15, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: theme === 'dark' ? `1px solid ${colors.primary}20` : '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: theme === 'dark' ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                  boxShadow: `0 4px 20px ${colors.primary}40`
                }}
              >
                KB
              </div>
              <div className="hidden lg:block">
                <div className="font-bold text-lg leading-none" style={{ color: colors.text }}>KENBRIGHT</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: colors.primary }}>Actuarial Hub</div>
              </div>
            </a>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${isActive(item.path) ? 'font-semibold' : 'hover:scale-105'}`}
                  style={{
                    color: isActive(item.path) ? colors.primary : colors.text,
                    background: isActive(item.path) ? `${colors.primary}15` : 'transparent'
                  }}
                  onMouseEnter={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = `${colors.primary}10`; }}
                  onMouseLeave={(e) => { if (!isActive(item.path)) e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}

              {/* Game Link */}
              <a
                href="https://www.ifrs17game.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ color: colors.text }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${colors.primary}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Gamepad2 className="w-5 h-5" />
                <span className="text-sm font-medium">Game</span>
              </a>

              {/* Tools Dropdown */}
              <div className="relative tools-dropdown">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowToolsMenu(!showToolsMenu); setShowResourcesMenu(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    color: showToolsMenu ? colors.primary : colors.text,
                    background: showToolsMenu ? `${colors.primary}15` : 'transparent'
                  }}
                >
                  <Calculator className="w-5 h-5" />
                  <span className="text-sm font-medium">Tools</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showToolsMenu ? 'rotate-180' : ''}`} style={{ color: showToolsMenu ? colors.primary : colors.text }} />
                </button>

                {showToolsMenu && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: `${colors.darkCard}f5`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.primary}30`,
                      boxShadow: `0 8px 32px ${colors.primary}20`
                    }}
                  >
                    {toolItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 transition-all text-sm"
                        style={{ 
                          borderBottom: i < toolItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                          color: colors.text
                        }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.background = `${colors.primary}15`; 
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.background = 'transparent'; 
                          e.currentTarget.style.color = colors.text;
                        }}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative resources-dropdown">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowResourcesMenu(!showResourcesMenu); setShowToolsMenu(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    color: showResourcesMenu ? colors.primary : colors.text,
                    background: showResourcesMenu ? `${colors.primary}15` : 'transparent'
                  }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showResourcesMenu ? 'rotate-180' : ''}`} style={{ color: showResourcesMenu ? colors.primary : colors.text }} />
                </button>

                {showResourcesMenu && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: `${colors.darkCard}f5`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.primary}30`,
                      boxShadow: `0 8px 32px ${colors.primary}20`
                    }}
                  >
                    {resourceItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.path}
                        className="flex items-center gap-3 px-4 py-3 text-sm transition-all"
                        style={{ 
                          borderBottom: i < resourceItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                          color: colors.text
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = `${colors.primary}15`; e.currentTarget.style.color = colors.primary; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.text; }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: showProfileMenu ? `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${showProfileMenu ? colors.primary : 'rgba(255,255,255,0.15)'}`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})` }}
                >
                  {getUserInitials()}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold leading-none mb-1" style={{ color: colors.text }}>{user?.username || user?.name || 'User'}</div>
                  <div className="text-xs leading-none" style={{ color: colors.primary }}>{user?.role === 'admin' ? 'Admin' : 'Member'}</div>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} style={{ color: colors.text }} />
              </button>

              {showProfileMenu && (
                <div
                  className="absolute top-full right-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl z-50"
                  style={{
                    background: `${colors.darkCard}f5`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${colors.primary}30`,
                    boxShadow: `0 8px 32px ${colors.primary}20`
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg"
                        style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})` }}>
                        {getUserInitials()}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: colors.text }}>{user?.username || user?.name || 'User'}</div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>{user?.email || ''}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    {[
                      { href: "/profile", icon: <User className="w-4 h-4" />, label: "Profile" },
                      { href: "/settings", icon: <Settings className="w-4 h-4" />, label: "Settings" }
                    ].map((item, i) => (
                      <a key={i} href={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all"
                        style={{ color: colors.text }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = `${colors.primary}15`; e.currentTarget.style.color = colors.primary; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.text; }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>

                  <div className="p-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm w-full transition-all"
                      style={{ color: colors.text }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#EF4444'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.text; }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg mobile-menu-button"
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(0, 229, 255, 0.25)' : '1px solid rgba(0,0,0,0.1)'
            }}
          >
            {showMobileMenu ? (
              <X className="w-6 h-6" style={{ color: colors.text }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: colors.text }} />
            )}
          </button>
        </div>

        {/* Mobile Menu - Logged In */}
        {showMobileMenu && (
          <div className="mobile-menu-container lg:hidden pb-4">
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              
              {/* User Profile Section at Top */}
              <div className="px-3 py-3 mb-4 rounded-xl" style={{ 
                background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`,
                border: `1px solid ${colors.primary}20`
              }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})` }}
                  >
                    {getUserInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: colors.text }}>{user?.username || user?.name || 'User'}</div>
                    <div className="text-xs" style={{ color: colors.primary }}>{user?.role === 'admin' ? 'Admin' : 'Member'}</div>
                  </div>
                </div>
              </div>

              {/* Navigation Section */}
              <div className="mb-3">
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                    Navigation
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(item.path) ? 'font-semibold' : ''}`}
                      style={{
                        color: isActive(item.path) ? colors.primary : colors.text,
                        background: isActive(item.path) ? `${colors.primary}15` : 'transparent'
                      }}
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </a>
                  ))}

                  {/* Game Link */}
                  <a
                    href="https://www.ifrs17game.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all"
                    style={{ color: colors.text }}
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span className="text-sm">Game</span>
                  </a>
                </div>
              </div>

              {/* Tools Dropdown Section */}
              <div className="mb-3">
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                    Tools
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowMobileToolsMenu(!showMobileToolsMenu); }}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-all"
                  style={{ 
                    background: showMobileToolsMenu ? `${colors.primary}10` : 'transparent',
                    color: colors.text
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5" />
                    <span className="text-sm font-medium">Actuarial Tools</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileToolsMenu ? 'rotate-180' : ''}`} style={{ color: colors.primary }} />
                </button>

                {showMobileToolsMenu && (
                  <div className="mt-1 ml-9 flex flex-col gap-1">
                    {toolItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5"
                        style={{ color: colors.text }}
                      >
                        <span className="truncate">{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown Section */}
              <div className="mb-4">
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                    Resources
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowMobileResourcesMenu(!showMobileResourcesMenu); }}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-all"
                  style={{ 
                    background: showMobileResourcesMenu ? `${colors.primary}10` : 'transparent',
                    color: colors.text
                  }}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium">Learning Resources</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMobileResourcesMenu ? 'rotate-180' : ''}`} style={{ color: colors.primary }} />
                </button>

                {showMobileResourcesMenu && (
                  <div className="mt-1 ml-9 flex flex-col gap-1">
                    {resourceItems.map((item, i) => (
                      <a
                        key={i}
                        href={item.path}
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5"
                        style={{ color: colors.text }}
                      >
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px mx-3 mb-3" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Account Section */}
              <div className="mb-3">
                <div className="px-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: colors.primary }}>
                    Account
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    href="/profile"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all"
                    style={{ color: colors.text }}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </a>
                  <a
                    href="/settings"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all"
                    style={{ color: colors.text }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </a>
                </div>
              </div>

              {/* Logout Button at Bottom */}
              <div className="px-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                  className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm w-full transition-all font-medium"
                  style={{ 
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: colors.text
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}