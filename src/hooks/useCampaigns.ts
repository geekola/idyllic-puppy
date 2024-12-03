import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Campaign } from '../types/campaign';

export function useCampaigns(userId: string | undefined) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCampaigns = async () => {
      try {
        setError(null);
        const q = query(
          collection(db, 'campaigns'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const campaignData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Campaign));
        
        setCampaigns(campaignData);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Failed to load campaigns. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [userId]);

  return { campaigns, loading, error };
}