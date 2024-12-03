import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { ProfileForm } from '../components/profile/ProfileForm';
import { AlertCircle, Loader } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, error } = useProfile(user?.uid);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg flex items-start">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
              {error}
            </h3>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">
              Please try refreshing the page. If the problem persists, contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const initialData = {
    fullName: user?.displayName || '',
    email: user?.email || '',
    phoneNumber: profile?.phoneNumber || '',
    photoURL: user?.photoURL || profile?.photoURL,
    communityOptIn: profile?.communityOptIn || false,
    emailNotifications: profile?.emailNotifications || false,
    theme: profile?.theme || 'dark'
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Profile
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ProfileForm initialData={initialData} />
        </div>
      </motion.div>
    </div>
  );
}