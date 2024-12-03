import { useState, useCallback } from 'react';
import { formatAuthError } from '../utils/authErrors';
import type { AuthError } from '../types/auth';

export function useAuthError() {
  const [error, setError] = useState<AuthError | null>(null);

  const handleAuthError = useCallback((error: any) => {
    const formattedError = formatAuthError(error);
    setError(formattedError);
    return formattedError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleAuthError,
    clearError
  };
}