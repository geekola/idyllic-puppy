export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  photoURL?: string;
  communityOptIn: boolean;
  emailNotifications: boolean;
  theme?: 'light' | 'dark';
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileFormData extends UserProfile {
  password?: string;
  confirmPassword?: string;
}