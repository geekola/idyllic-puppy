import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Get in Touch
      </h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Email
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              <a href="mailto:contact@spatialmods.com" className="hover:text-primary">
                contact@spatialmods.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}