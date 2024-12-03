import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { sendVerificationEmail } from '../../services/emailVerification';
import { Mail, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export function EmailVerification() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResendVerification = async () => {
    if (!user || !user.email) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendVerificationEmail(user.uid, user.email);
      setSuccess(true);
    } catch (error) {
      setError('Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.emailVerified) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3 w-full">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Email Verification Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
            <p>
              Please verify your email address to access all features. 
              Check your inbox for the verification link.
            </p>
          </div>
          <div className="mt-4">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:bg-yellow-900 dark:text-yellow-100 dark:hover:bg-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Resend Verification Email
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            {success && (
              <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verification email sent successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}