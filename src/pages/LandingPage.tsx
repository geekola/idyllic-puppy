import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedAuthButton } from '../components/auth/UnifiedAuthButton';

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      id: 'auto',
      title: 'Make Every Image An Event',
      subtitle: 'Turn Ordinary into Extraordinary',
      description: 'Struggling to engage your audience or create a winning marketing strategy? Spatial Mods is a perfect solution.',
      image: '/images/auto-feature.png',
      color: 'orange'
    },
    {
      id: 'family',
      title: 'Make Every Memory Eternal',
      subtitle: 'Your Most Cherished Memories',
      description: 'Capture your family\'s history and honor the memory of loved ones with Spatial Mods.',
      image: '/images/family-feature.png',
      color: 'blue'
    },
    {
      id: 'space',
      title: 'What Was Once Old Is Made New',
      subtitle: 'Legacy Reimagined',
      description: 'With Spatial Mods, you can breathe new life into your existing media library.',
      image: '/images/space-feature.png',
      color: 'purple'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Hero Section */}
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              <span className="block">Transform Your Content with</span>
              <span className="block text-primary">Augmented Reality</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Create immersive AR experiences in seconds. No coding required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
            >
              <div className="rounded-md shadow">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-highlight md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button
                  onClick={() => navigate('/about')}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
                  <h4 className="text-lg text-gray-300 mb-3">{feature.subtitle}</h4>
                  <p className="text-gray-400 mb-6">{feature.description}</p>
                  
                  <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-highlight md:py-4 md:text-lg md:px-10"
                >
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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