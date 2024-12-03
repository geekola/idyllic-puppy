import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/emailVerification';
import { Loader, CheckCircle, XCircle } from 'lucide-react';

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }

    const verifyToken = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Verification failed');
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {status === 'loading' && (
          <div className="text-center">
            <Loader className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Verifying your email...
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Email Verified Successfully
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your email has been verified. Redirecting you to the dashboard...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Verification Failed
            </h2>
            <p className="mt-2 text-red-600 dark:text-red-400">
              {error || 'An error occurred during verification'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}