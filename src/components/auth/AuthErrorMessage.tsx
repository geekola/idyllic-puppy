import { XCircle } from 'lucide-react';
import type { AuthError } from '../../types/auth';

interface AuthErrorMessageProps {
  error: AuthError;
  onDismiss?: () => void;
}

export function AuthErrorMessage({ error, onDismiss }: AuthErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircle className="h-5 w-5 text-red-400 dark:text-red-300" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {error.message}
          </h3>
          {error.action && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              {error.action}
            </div>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md bg-red-50 dark:bg-red-900/20 p-1.5 text-red-500 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                <span className="sr-only">Dismiss</span>
                <XCircle className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}