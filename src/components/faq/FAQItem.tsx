import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQItem as FAQItemType } from '../../types/faq';

interface FAQItemProps {
  item: FAQItemType;
}

export function FAQItem({ item }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
    >
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="font-medium text-gray-900 dark:text-white pr-8">
          {item.question}
        </span>
        <ChevronDown
          className={`flex-shrink-0 h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            id={`faq-answer-${item.id}`}
            className="border-t border-gray-100 dark:border-gray-700"
          >
            <div className="px-6 py-4 text-gray-600 dark:text-gray-300">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}