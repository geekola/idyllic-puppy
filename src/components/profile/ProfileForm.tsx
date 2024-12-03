import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { reauthenticateUser } from '../../utils/authUtils';
import { ProfileHeader } from './ProfileHeader';
import { DeleteAccountModal } from './DeleteAccountModal';
import { PhoneInput } from '../common/PhoneInput';
import { Button } from '../common/Button';
import {
  User,
  Mail,
  Key,
  Save,
  Trash2,
  Users,
  Bell,
  Phone,
  CheckCircle
} from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
  confirmPassword: z.string().optional(),
  communityOptIn: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  theme: z.enum(['light', 'dark']).optional()
}).refine(data => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required to set a new password",
  path: ["currentPassword"]
}).refine(data => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    photoURL?: string;
    communityOptIn: boolean;
    emailNotifications: boolean;
    theme?: 'light' | 'dark';
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError: setFormError
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...initialData,
      smsNotifications: false
    }
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || !user) return;

    const file = event.target.files[0];
    const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
      await updateProfile(user, { photoURL });
      
      await setDoc(doc(db, 'userProfiles', user.uid), {
        photoURL,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error uploading profile image:', error);
      setError('Failed to upload profile image');
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (data.newPassword) {
        const reauthenticated = await reauthenticateUser(user, data.currentPassword);
        if (!reauthenticated) {
          throw new Error('Failed to authenticate. Please check your current password.');
        }
      }

      // Update profile in Firebase Auth
      await updateProfile(user, {
        displayName: data.fullName
      });

      // Update profile in Firestore
      await setDoc(doc(db, 'userProfiles', user.uid), {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        communityOptIn: data.communityOptIn,
        emailNotifications: data.emailNotifications,
        smsNotifications: data.smsNotifications,
        theme: data.theme,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value: string, isValid: boolean) => {
    setValue('phoneNumber', value);
    if (!isValid) {
      setFormError('phoneNumber', {
        type: 'manual',
        message: 'Please enter a valid phone number'
      });
    }
  };

  const handleDeleteAccount = async (confirmName: string) => {
    if (!user || confirmName !== watch('fullName')) return;

    try {
      await user.delete();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setError('Failed to delete account');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProfileHeader
        photoURL={user?.photoURL}
        onImageChange={handleImageChange}
      />

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Profile updated successfully! Redirecting to dashboard...
        </div>
      )}

      <div className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="input-icon-wrapper">
              <User className="input-icon" />
            </div>
            <input
              type="text"
              {...register('fullName')}
              className="input-with-icon"
            />
          </div>
          {errors.fullName && (
            <p className="form-error">{errors.fullName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
            </div>
            <input
              type="email"
              {...register('email')}
              className="input-with-icon"
              disabled
            />
          </div>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <PhoneInput
            value={watch('phoneNumber')}
            onChange={handlePhoneChange}
            error={errors.phoneNumber?.message}
          />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Preferences
          </h3>

          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('communityOptIn')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Join our community
                </span>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('emailNotifications')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Receive email notifications
                </span>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('smsNotifications')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Receive SMS notifications
                </span>
              </div>
            </label>
          </div>
        </div>

        {showPasswordSection && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Change Password
            </h3>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="input-icon-wrapper">
                  <Key className="input-icon" />
                </div>
                <input
                  type="password"
                  {...register('currentPassword')}
                  className="input-with-icon"
                />
              </div>
              {errors.currentPassword && (
                <p className="form-error">{errors.currentPassword.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="input-icon-wrapper">
                  <Key className="input-icon" />
                </div>
                <input
                  type="password"
                  {...register('newPassword')}
                  className="input-with-icon"
                />
              </div>
              {errors.newPassword && (
                <p className="form-error">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="input-icon-wrapper">
                  <Key className="input-icon" />
                </div>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className="input-with-icon"
                />
              </div>
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4 pt-6">
          <Button
            type="button"
            variant="secondary"
            icon={Key}
            onClick={() => setShowPasswordSection(!showPasswordSection)}
            className="w-full"
          >
            {showPasswordSection ? 'Hide Password Form' : 'Change Password'}
          </Button>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="danger"
              icon={Trash2}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>

            <Button
              type="submit"
              variant="primary"
              icon={Save}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        userName={watch('fullName')}
      />
    </form>
  );
}