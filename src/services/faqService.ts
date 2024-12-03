import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { faqData } from '../data/faqData';
import type { FAQItem } from '../types/faq';

export async function fetchFAQs(): Promise<{ data: FAQItem[]; error: Error | null }> {
  try {
    // First try to fetch from Firestore
    const faqRef = collection(db, 'FAQ');
    const q = query(
      faqRef,
      orderBy('category'),
      orderBy('order')
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // If no Firestore data, return static data
      console.log('No FAQ documents found in Firestore, using static data');
      return {
        data: faqData,
        error: null
      };
    }

    const faqs: FAQItem[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      question: doc.data().question || '',
      answer: doc.data().answer || '',
      category: doc.data().category || 'General',
      order: doc.data().order || 0,
      createdAt: doc.data().createdAt || new Date().toISOString(),
      updatedAt: doc.data().updatedAt || new Date().toISOString()
    }));

    return {
      data: faqs,
      error: null
    };
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    // Fallback to static data on error
    return {
      data: faqData,
      error: null
    };
  }
}