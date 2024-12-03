import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { CampaignList } from '../components/campaigns/CampaignList';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user.displayName || 'User'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Manage your AR campaigns and create new experiences
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <CampaignList />
        </div>
      </motion.div>
    </div>
  );
}