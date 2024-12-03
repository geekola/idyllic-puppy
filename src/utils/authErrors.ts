import { AuthError } from '../types/auth';

const authErrors: Record<string, AuthError> = {
  // Email/Password Authentication
  'auth/invalid-email': {
    code: 'auth/invalid-email',
    message: 'Please enter a valid email address.',
    action: 'Check your email format and try again.'
  },
  'auth/user-disabled': {
    code: 'auth/user-disabled',
    message: 'This account has been disabled.',
    action: 'Please contact support for assistance.'
  },
  'auth/user-not-found': {
    code: 'auth/user-not-found',
    message: 'No account found with this email.',
    action: 'Please check your email or create a new account.'
  },
  'auth/wrong-password': {
    code: 'auth/wrong-password',
    message: 'Incorrect password.',
    action: 'Please check your password and try again.'
  },
  'auth/email-already-in-use': {
    code: 'auth/email-already-in-use',
    message: 'An account already exists with this email.',
    action: 'Please sign in or use a different email address.'
  },
  'auth/weak-password': {
    code: 'auth/weak-password',
    message: 'Password is too weak.',
    action: 'Please use a stronger password with at least 6 characters.'
  },
  'auth/network-request-failed': {
    code: 'auth/network-request-failed',
    message: 'Network connection failed.',
    action: 'Please check your internet connection and try again.'
  },
  'auth/too-many-requests': {
    code: 'auth/too-many-requests',
    message: 'Too many unsuccessful attempts.',
    action: 'Please wait a few minutes before trying again.'
  },
  'auth/popup-closed-by-user': {
    code: 'auth/popup-closed-by-user',
    message: 'Sign-in window was closed.',
    action: 'Please complete the sign-in process.'
  },
  'auth/requires-recent-login': {
    code: 'auth/requires-recent-login',
    message: 'This action requires recent authentication.',
    action: 'Please sign in again to continue.'
  },
  'auth/expired-action-code': {
    code: 'auth/expired-action-code',
    message: 'This verification link has expired.',
    action: 'Please request a new verification email.'
  },
  'auth/invalid-action-code': {
    code: 'auth/invalid-action-code',
    message: 'Invalid verification link.',
    action: 'Please request a new verification email.'
  },
  // Default error
  'default': {
    code: 'auth/unknown',
    message: 'An unexpected error occurred.',
    action: 'Please try again or contact support if the problem persists.'
  }
};

export function getAuthError(errorCode: string): AuthError {
  return authErrors[errorCode] || authErrors['default'];
}

export function formatAuthError(error: any): AuthError {
  if (typeof error === 'string') {
    return getAuthError(error);
  }

  const errorCode = error?.code || 'default';
  return getAuthError(errorCode);
}