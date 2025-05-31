'use client';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { Twitter } from 'lucide-react';

interface SocialLoginButtonsProps {
  onSuccess?: () => void;
  className?: string;
}

interface ErrorContext {
  error: {
    message: string;
  };
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  onSuccess,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState<{ 
    google: boolean;
    twitter: boolean;
  }>({
    google: false,
    twitter: false
  });

  const handleGoogleLogin = async () => {
    setIsLoading({ ...isLoading, google: true });
    try {
      // @ts-ignore - better-auth type definition might be outdated
      await authClient.signIn.social({
        provider: "google",
        fetchOptions: {
          onSuccess: () => {
            toast.success('Successfully signed in with Google');
            if (onSuccess) onSuccess();
          },
          onError: (ctx: ErrorContext) => {
            toast.error(ctx.error.message || 'Failed to sign in with Google');
          },
          onSettled: () => {
            setIsLoading({ ...isLoading, google: false });
          }
        }
      });
    } catch (error) {
      setIsLoading({ ...isLoading, google: false });
      toast.error('An error occurred during Google sign in');
    }
  };

  const handleTwitterLogin = async () => {
    setIsLoading({ ...isLoading, twitter: true });
    try {
      // @ts-ignore - better-auth type definition might be outdated
      await authClient.signIn.social({
        provider: "twitter",
        fetchOptions: {
          onSuccess: () => {
            toast.success('Successfully signed in with Twitter');
            if (onSuccess) onSuccess();
          },
          onError: (ctx: ErrorContext) => {
            toast.error(ctx.error.message || 'Failed to sign in with Twitter');
          },
          onSettled: () => {
            setIsLoading({ ...isLoading, twitter: false });
          }
        }
      });
    } catch (error) {
      setIsLoading({ ...isLoading, twitter: false });
      toast.error('An error occurred during Twitter sign in');
    }
  };

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      <div className="relative flex items-center justify-center w-full mb-2">
        <hr className="w-full h-px bg-gray-400/30" />
        <span className="absolute px-3 text-sm text-gray-400 -translate-y-1/2 bg-[#313130] top-1/2">
          or continue with
        </span>
      </div>
      
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading.google}
        className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-500 rounded-lg hover:bg-white/10 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c2.775 0 5.33-.924 7.36-2.485l-3.042-2.358c-1.258.9-2.792 1.434-4.44 1.434-3.876 0-7.072-2.891-7.58-6.635h15.92c.322-1.087.5-2.236.5-3.428 0-6.627-5.373-12-12-12zm0 4.75c1.79 0 3.467.78 4.627 2.095l2.605-2.607C17.392 2.346 14.82 1 12 1a11.21 11.21 0 0 0-7.967 3.28l2.98 2.29C8.254 5.077 10.06 4.75 12 4.75z" />
        </svg>
        <span>{isLoading.google ? 'Signing in...' : 'Sign in with Google'}</span>
      </button>
      
      <button
        onClick={handleTwitterLogin}
        disabled={isLoading.twitter}
        className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-500 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Twitter size={20} />
        <span>{isLoading.twitter ? 'Signing in...' : 'Sign in with Twitter'}</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons; 