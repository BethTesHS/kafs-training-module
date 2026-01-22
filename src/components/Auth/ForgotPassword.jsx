// src/components/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "../../supabaseClient";

export default function ForgotPassword({ theme = 'dark' }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const colors = {
    dark: {
      cyan: "#00E5FF",
      blue: "#3B82F6",
      purple: "#7C4DFF",
      gradientStart: "#00E5FF",
      gradientEnd: "#3B82F6",
      card: "#1A1F2E",
      bg: "#0A0F1E",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF",
      inputBg: "rgba(255,255,255,0.05)",
      inputBorder: "rgba(255,255,255,0.1)",
      inputText: "#FFFFFF"
    },
    light: {
      cyan: "#00E5FF",
      blue: "#0066FF",
      purple: "#7C4DFF",
      gradientStart: "#0066FF",
      gradientEnd: "#7C4DFF",
      card: "#FFFFFF",
      bg: "#F8FAFC",
      text: "#0F172A",
      textSecondary: "#64748B",
      inputBg: "#FFFFFF",
      inputBorder: "#E2E8F0",
      inputText: "#0F172A"
    }
  };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: currentColors.bg }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-0 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentColors.gradientStart}40, transparent)`,
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentColors.gradientEnd}40, transparent)`,
            animation: 'float 25s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
          style={{
            background: theme === 'dark' 
              ? 'rgba(26, 31, 46, 0.95)' 
              : 'rgba(255, 255, 255, 0.98)',
            border: theme === 'dark'
              ? `1.5px solid ${currentColors.cyan}30`
              : `1.5px solid ${currentColors.purple}20`,
            boxShadow: theme === 'dark'
              ? `0 8px 32px rgba(0, 221, 255, 0.15), 0 0 0 1px rgba(0, 229, 255, 0.1)`
              : `0 20px 60px rgba(103, 58, 183, 0.15), 0 0 0 1px rgba(103, 58, 183, 0.08)`
          }}
        >
          <div className="p-10">
            {/* Back Button - Cleaner design */}
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="mb-8 text-sm font-medium transition-all duration-200 hover:gap-2 flex items-center gap-1.5 group"
              style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to login
            </button>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3" style={{ color: currentColors.text }}>
                Forgot Password
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: currentColors.textSecondary }}>
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div
                className="mb-6 p-5 rounded-xl flex items-start gap-3 animate-fade-in"
                style={{
                  background: theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)',
                  border: theme === 'dark' ? '1.5px solid rgba(34, 197, 94, 0.3)' : '1.5px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme === 'dark' ? '#22C55E' : '#16A34A' }} />
                <div>
                  <p className="font-semibold mb-1 text-base" style={{ color: theme === 'dark' ? '#4ADE80' : '#16A34A' }}>
                    Email Sent Successfully!
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#86EFAC' : '#15803D' }}>
                    Please check your inbox and click the link to reset your password. The link will expire in 1 hour.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && !success && (
              <div
                className="mb-6 p-4 rounded-xl flex items-center gap-2 text-sm animate-fade-in"
                style={{
                  background: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                  border: theme === 'dark' ? '1.5px solid rgba(239, 68, 68, 0.3)' : '1.5px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: theme === 'dark' ? '#EF4444' : '#DC2626' }} />
                <span style={{ color: theme === 'dark' ? '#F87171' : '#DC2626' }}>{error}</span>
              </div>
            )}

            {/* Form */}
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: currentColors.textSecondary }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: currentColors.inputBg,
                        border: `2px solid ${currentColors.inputBorder}`,
                        color: currentColors.inputText
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                        e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = currentColors.inputBorder;
                        e.target.style.boxShadow = 'none';
                      }}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(135deg, #00E5FF, #0093dc)'
                      : 'linear-gradient(135deg, #0066ffda, rgb(120, 72, 252))',
                    boxShadow: theme === 'dark'
                      ? '0 5px 20px rgba(0, 229, 255, 0.4)'
                      : '0 5px 20px rgba(103, 58, 183, 0.4)',
                    color: theme === 'dark' ? '#fefefe' : 'white'
                  }}
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderTopColor: 'white'
                        }} />
                      <span>Sending reset link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4" style={{ color: 'white' }} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <button
                  onClick={() => navigate('/auth?mode=login')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : `${currentColors.blue}08`,
                    border: `2px solid ${theme === 'dark' ? currentColors.cyan : currentColors.blue}80`,
                    color: theme === 'dark' ? currentColors.cyan : currentColors.blue
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            )}

            {/* Footer Note */}
            <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                Remember your password?{' '}
                <button
                  onClick={() => navigate('/auth?mode=login')}
                  className="transition hover:opacity-70 font-medium" 
                  style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Additional help text */}
        <p className="text-center text-xs mt-6" style={{ color: currentColors.textSecondary }}>
          Need help? Contact{' '}
          <a 
            href="mailto:support@kenbright.com" 
            className="transition hover:opacity-70 font-medium" 
            style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
          >
            support@kenbright.com
          </a>
        </p>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
      `}</style>
    </div>
  );
}