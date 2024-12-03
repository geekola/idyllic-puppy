export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface FAQState {
  items: FAQItem[];
  loading: boolean;
  error: string | null;
}