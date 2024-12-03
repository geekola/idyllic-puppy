import { useEffect } from 'react';
import { getProfile, updateProfile } from '../services/profileService';
import { useAuth } from './useAuth';

export function useThemeSync(theme: 'light' | 'dark', setTheme: (theme: 'light' | 'dark') => void) {
  const { user } = useAuth();

  // Load theme preference from user profile
  useEffect(() => {
    if (!user) {
      setTheme('dark');
      return;
    }

    let mounted = true;

    const loadUserTheme = async () => {
      try {
        const profile = await getProfile(user.uid);
        if (!mounted) return;
        
        if (profile?.theme) {
          setTheme(profile.theme);
        }
      } catch (error) {
        // Silently fall back to default theme
        console.debug('Using default theme preferences');
      }
    };

    loadUserTheme();

    return () => {
      mounted = false;
    };
  }, [user, setTheme]);

  // Save theme preference to user profile
  useEffect(() => {
    if (!user) return;

    let timeoutId: number;

    const saveUserTheme = async () => {
      try {
        await updateProfile(user.uid, { theme });
      } catch (error) {
        // Silently fail if update fails
        console.debug('Theme preference saved locally only');
      }
    };

    // Debounce theme saves to prevent too many writes
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(saveUserTheme, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [theme, user]);
}