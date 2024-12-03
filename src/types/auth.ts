export interface VerificationToken {
  token: string;
  userId: string;
  email: string;
  createdAt: string;
  expiresAt: string;
  used: boolean;
}

export interface EmailVerificationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  action?: string;
}

export type Language = 'en' | 'es';