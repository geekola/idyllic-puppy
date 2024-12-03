import { useState } from 'react';
import { HelpCircle, Search } from 'lucide-react';
import { FAQList } from './FAQList';
import { FAQSearch } from './FAQSearch';
import { FAQCategories } from './FAQCategories';
import { useFAQ } from '../../hooks/useFAQ';

export function FAQ() {
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
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-center mb-4">
          <HelpCircle className="h-12 w-12 text-blue-600" />
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
    </div>
  );
}