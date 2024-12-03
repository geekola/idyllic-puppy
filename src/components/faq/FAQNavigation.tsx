import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface FAQNavigationProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function FAQNavigation({ categories, selectedCategory, onCategorySelect }: FAQNavigationProps) {
  return (
    <nav className="sticky top-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onCategorySelect(null)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Categories
          </button>
        </li>
        {categories.map((category) => (
          <motion.li
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => onCategorySelect(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center justify-between ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{category}</span>
              <ChevronRight className={`h-4 w-4 transition-transform ${
                selectedCategory === category ? 'rotate-90' : ''
              }`} />
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}