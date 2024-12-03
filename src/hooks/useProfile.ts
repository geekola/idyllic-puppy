import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getDefaultProfile, createProfile } from '../services/profileService';
import type { UserProfile } from '../types/profile';

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'userProfiles', userId);
        const docSnap = await getDoc(docRef);
        
        if (!mounted) return;

        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
          setError(null);
        } else {
          // Create default profile if it doesn't exist
          const defaultProfile = getDefaultProfile();
          await createProfile(userId, defaultProfile);
          
          if (!mounted) return;
          setProfile(defaultProfile);
          setError(null);
        }
      } catch (error) {
        if (!mounted) return;
        console.error('Profile fetch error:', error);
        // Use a more user-friendly error message
        setError('Unable to access profile. Please try again later.');
        setProfile(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { profile, loading, error };
}