import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search } from 'lucide-react';
import { FAQList } from '../components/faq/FAQList';
import { FAQSearch } from '../components/faq/FAQSearch';
import { FAQCategories } from '../components/faq/FAQCategories';
import { useFAQ } from '../hooks/useFAQ';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { items, loading, error } = useFAQ();

  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery.trim() === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(items.map(item => item.category || 'General')));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8 md:py-12"
    >
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-center mb-4">
          <HelpCircle className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find answers to common questions about our AR Campaign Builder
        </p>
      </div>

      <div className="space-y-6">
        <FAQSearch 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />

        <FAQCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <FAQList 
          items={filteredItems}
          loading={loading}
          error={error}
        />
      </div>
    </motion.div>
  );
}