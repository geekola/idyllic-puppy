import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { UnifiedAuthButton } from '../components/auth/UnifiedAuthButton';

export function AboutPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-8">
            Spatial Mods: Your Gateway to What's Next!
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert mx-auto"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Forget complex setups and coding nightmares. With Spatial Mods, anyone can get started in spatial computing and create stunning augmented reality (AR) experiences in seconds. Just upload your video, and let our platform do the rest.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Simple, accessible, and fun, that's our promise. We've stripped away the technical jargon and created a tool that's as easy to use as sharing a photo.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to wow your audience? No more fear of the unknown. Our platform is designed to be intuitive, user-friendly, and powerful. Whether you're a seasoned pro, an agency looking for a fresh angle or just getting started as a content creator and hungry for new ideas, Spatial Mods is your secret weapon.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our philosophy? Brand Engagement, Everywhere, All the Time. The lines between digital and physical are blurring. It's time for you to embrace this new reality. With Spatial Mods, you can reach your audience in ways you and they never thought possible.
          </p>

          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
            Ready to take the leap? Let's redefine what's possible together.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>SIDE NOTE:</strong> Faster adoption of spatial computing is directly correlated to its novelty and utility. The massive success of the AR game, Pokémon GO demonstrates just how powerful and profitable ($6.B) novelty and utility are when deployed effectively. Narrative matters!
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowAuthModal(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-highlight"
          >
            Join Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setShowAuthModal(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
              <UnifiedAuthButton onSuccess={() => setShowAuthModal(false)} defaultMode="signup" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}