import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowUp } from 'lucide-react';
import { FAQList } from '../components/faq/FAQList';
import { FAQSearch } from '../components/faq/FAQSearch';
import { FAQNavigation } from '../components/faq/FAQNavigation';
import { useFAQ } from '../hooks/useFAQ';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { items, loading, error } = useFAQ();

  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery.trim() === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(items.map(item => item.category || 'General')));

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add scroll event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <HelpCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions about our AR Campaign Builder
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FAQNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <FAQSearch 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />

          <FAQList 
            items={filteredItems}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary hover:bg-highlight text-white rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}