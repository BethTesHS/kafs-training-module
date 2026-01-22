import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

export default function Module14({ theme = 'dark' }) {
  const styles = {
    light: {
      bg: 'bg-white/95',
      cardBg: 'bg-white/95',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      border: 'border-gray-200',
      shadow: 'shadow-2xl shadow-purple-500/10',
    },
    dark: {
      bg: 'bg-transparent',
      cardBg: 'bg-black/75',
      text: 'text-white',
      textSecondary: 'text-gray-200',
      border: 'border-white/30',
      shadow: 'shadow-2xl shadow-blue-500/20',
    }
  };

  const currentStyles = theme === 'light' ? styles.light : styles.dark;

  return (
    <div className={`min-h-screen relative transition-all duration-300`}>
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
              ? 'linear-gradient(135deg, rgba(59, 131, 246, 0.35) 0%, rgba(59, 131, 246, 0.36) 100%)'
              : 'rgba(0, 0, 0, 0.3)',
            backdropFilter: theme === 'dark' ? 'blur(3px)' : 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-8 transition-all duration-300 flex items-center justify-center min-h-[calc(100vh-8rem)]`}>
        {/* Back Button */}
        <Link
          to="/modules"
          className={`fixed left-4 top-24 z-20 flex items-center justify-center w-10 h-10 rounded-full ${theme === 'light'
            ? 'bg-white hover:bg-gray-50 text-gray-900 hover:text-gray-950 shadow-xl hover:shadow-2xl backdrop-blur-md border border-gray-200'
            : 'bg-white/30 hover:bg-white/40 text-white hover:text-white backdrop-blur-md border-2 border-white/40 hover:border-white/60 shadow-2xl'
            } transition-all duration-300 hover:scale-110`}
          aria-label="Back to Training Modules"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Under Construction Card */}
        <div
          className={`rounded-[40px] overflow-hidden relative w-full max-w-3xl ${theme === 'light'
            ? `${currentStyles.cardBg} shadow-2xl shadow-blue-500/10 border ${currentStyles.border}`
            : `${currentStyles.cardBg} backdrop-blur-xl border ${currentStyles.border} shadow-xl`
            } transition-all duration-300`}
        >
          <div className="p-8 md:p-10 text-center">
            <div className={`inline-block p-4 rounded-full ${theme === 'light'
              ? 'bg-gradient-to-br from-blue-400 to-blue-500'
              : 'bg-blue-500/30 border border-blue-400/40'
              } transition-all duration-300 mb-4`}>
              <Construction className={`w-12 h-12 ${theme === 'light' ? 'text-white' : 'text-blue-300'}`} />
            </div>
            
            <h1 className={`text-2xl md:text-3xl font-bold mb-4 ${currentStyles.text} transition-all duration-300`}>
              Module 14: Post Retirement Medical Fund
            </h1>
            
            <div className={`rounded-2xl ${theme === 'light' ? 'bg-yellow-50 border-yellow-200' : 'bg-yellow-500/20 border-yellow-400/30'} border p-6 mb-6 transition-all duration-300`}>
              <p className={`text-base md:text-lg font-bold ${theme === 'light' ? 'text-yellow-800' : 'text-yellow-300'} transition-all duration-300`}>
                This module is under construction.
              </p>
            </div>

            <Link
              to="/modules"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 ${theme === 'light'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
