import { motion, AnimatePresence } from 'framer-motion';
import { FAQItem } from './FAQItem';
import { AlertCircle, Loader } from 'lucide-react';
import type { FAQItem as FAQItemType } from '../../types/faq';

interface FAQListProps {
  items: FAQItemType[];
  loading: boolean;
  error: string | null;
}

export function FAQList({ items, loading, error }: FAQListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-gray-500 dark:text-gray-400">
          No matching FAQ items found.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        {items.map((item) => (
          <FAQItem key={item.id} item={item} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}