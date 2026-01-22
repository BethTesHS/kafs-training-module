// src/components/UserProfile.jsx
import React from 'react';
import { User, LogOut, Settings, Mail, Calendar, Award } from 'lucide-react';

const UserProfile = ({ user, onLogout, theme = 'dark' }) => {
  const colors = {
    dark: {
      bg: '#0A0F1E',
      card: '#1A1F2E',
      cardBorder: 'rgba(0, 229, 255, 0.2)',
      text: '#FFFFFF',
      textSecondary: '#9CA3AF',
      primary: '#00E5FF',
      gradientStart: '#00E5FF',
      gradientEnd: '#3B82F6'
    },
    light: {
      bg: '#F8FAFC',
      card: '#FFFFFF',
      cardBorder: 'rgba(0, 0, 0, 0.1)',
      text: '#0F172A',
      textSecondary: '#64748B',
      primary: '#0066FF',
      gradientStart: '#0066FF',
      gradientEnd: '#7C4DFF'
    }
  };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  if (!user) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: currentColors.bg }}
      >
        <p style={{ color: currentColors.text }}>No user data available</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ background: currentColors.bg }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div 
          className="rounded-2xl p-8 shadow-xl"
          style={{ 
            background: currentColors.card,
            border: `1px solid ${currentColors.cardBorder}`
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-6 mb-8">
            <div 
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
              style={{ 
                background: `linear-gradient(135deg, ${currentColors.gradientStart}, ${currentColors.gradientEnd})`,
                boxShadow: `0 8px 30px ${currentColors.primary}30`
              }}
            >
              {user.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt={user.username} 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                user.name?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            <div>
              <h1 
                className="text-2xl font-bold mb-1"
                style={{ color: currentColors.text }}
              >
                {user.name || user.username || 'User'}
              </h1>
              <p 
                className="text-sm mb-2"
                style={{ color: currentColors.textSecondary }}
              >
                @{user.username || 'user'}
              </p>
              <span 
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                style={{ 
                  background: `${currentColors.primary}20`,
                  color: currentColors.primary
                }}
              >
                {user.role === 'admin' ? 'Administrator' : user.role === 'supervisor' ? 'Supervisor' : 'Member'}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4 mb-8">
            <div 
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <Mail className="w-5 h-5" style={{ color: currentColors.primary }} />
              <div>
                <p className="text-xs" style={{ color: currentColors.textSecondary }}>Email</p>
                <p className="font-medium" style={{ color: currentColors.text }}>{user.email || 'Not set'}</p>
              </div>
            </div>

            <div 
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
            >
              <Award className="w-5 h-5" style={{ color: currentColors.primary }} />
              <div>
                <p className="text-xs" style={{ color: currentColors.textSecondary }}>Account Type</p>
                <p className="font-medium" style={{ color: currentColors.text }}>
                  {user.role === 'admin' ? 'Administrator' : user.role === 'supervisor' ? 'Supervisor' : 'Training Member'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onLogout}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444'
              }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;