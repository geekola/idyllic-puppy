import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { GoogleIcon } from '../icons/GoogleIcon';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

interface UnifiedAuthButtonProps {
  onSuccess?: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function UnifiedAuthButton({ onSuccess, defaultMode = 'signin' }: UnifiedAuthButtonProps) {
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    onSuccess?.();
    navigate('/dashboard');
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      handleAuthSuccess();
    } catch (error) {
      setError('Failed to authenticate with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      handleAuthSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {showForgotPassword ? 'Reset Password' : (isSignUp ? 'Create an Account' : 'Welcome Back')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {showForgotPassword 
            ? 'Enter your email to receive reset instructions'
            : (isSignUp
              ? 'Sign up to start creating AR experiences'
              : 'Sign in to your account')}
        </p>
      </div>

      <form onSubmit={showForgotPassword ? handleForgotPassword : handleEmailAuth} className="space-y-4">
        <div className="form-group">
          <div className="relative">
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-with-icon"
              placeholder="Email address"
              required
            />
          </div>
        </div>

        {!showForgotPassword && (
          <div className="form-group">
            <div className="relative">
              <div className="input-icon-wrapper">
                <Lock className="input-icon" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-with-icon pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {resetEmailSent && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md">
            Password reset email sent! Please check your inbox.
          </div>
        )}

        {!showForgotPassword && (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setError(null);
                setResetEmailSent(false);
              }}
              className="text-sm text-primary hover:text-highlight"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          {showForgotPassword 
            ? 'Send Reset Link'
            : (isSignUp ? 'Sign Up' : 'Sign In')}
        </Button>

        {!showForgotPassword && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full"
            >
              <GoogleIcon className="h-5 w-5 mr-2" />
              Continue with Google
            </Button>
          </>
        )}

        <div className="text-center mt-4">
          {showForgotPassword ? (
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setError(null);
                setResetEmailSent(false);
              }}
              className="text-sm text-primary hover:text-highlight"
            >
              Back to sign in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:text-highlight"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}