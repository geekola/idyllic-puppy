import { AlertCircle, RefreshCw } from 'lucide-react';

interface ARErrorProps {
  message: string;
  onRetry: () => void;
}

export function ARError({ message, onRetry }: ARErrorProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90">
      <div className="text-center p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">
          {message}
        </h2>
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );
}