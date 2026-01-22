// src/components/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AuthCallback({ theme = 'dark' }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if this is a password reset callback
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');
        
        if (type === 'recovery') {
          // Redirect to reset password page
          navigate('/reset-password' + window.location.hash, { replace: true });
          return;
        }
        
        // Handle OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/auth?mode=login&error=' + encodeURIComponent(error.message));
          return;
        }
        
        if (session?.user) {
          // Successfully authenticated via OAuth
          console.log('User authenticated via OAuth:', session.user);
          
          // Give a moment for the session to be fully processed
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 500);
        } else {
          // No session found, check URL for hash fragment
          if (window.location.hash) {
            // Wait a bit more for Supabase to process the hash
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 1000);
          } else {
            // No auth data found, redirect to login
            navigate('/auth?mode=login', { replace: true });
          }
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/auth?mode=login&error=' + encodeURIComponent(error.message));
      }
    };

    handleAuthCallback();
  }, [navigate]);

  const colors = {
    bg: theme === 'dark' ? "#0A0F1E" : "#F8FAFC",
    text: theme === 'dark' ? "#FFFFFF" : "#0F172A",
    primary: theme === 'dark' ? "#00E5FF" : "#0066FF"
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ background: colors.bg }}
    >
      <div className="text-center">
        <div 
          className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
          style={{ 
            borderColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 102, 255, 0.2)', 
            borderTopColor: colors.primary 
          }}
        ></div>
        <p 
          className="text-lg font-medium"
          style={{ color: colors.text }}
        >
          Completing authentication...
        </p>
        <p 
          className="text-sm mt-2"
          style={{ color: theme === 'dark' ? '#9CA3AF' : '#64748B' }}
        >
          You will be redirected shortly
        </p>
      </div>
    </div>
  );
}