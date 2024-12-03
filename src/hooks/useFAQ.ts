import { useState, useEffect } from 'react';
import { FAQItem, FAQState } from '../types/faq';
import { fetchFAQs } from '../services/faqService';

export function useFAQ() {
  const [state, setState] = useState<FAQState>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const loadFAQs = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const { data, error } = await fetchFAQs();

        if (!mounted) return;

        if (error) {
          setState({
            items: [],
            loading: false,
            error: error.message
          });
          return;
        }

        setState({
          items: data,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!mounted) return;
        
        setState({
          items: [],
          loading: false,
          error: 'Failed to load FAQ items'
        });
      }
    };

    loadFAQs();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}