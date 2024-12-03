import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { UserProfile } from '../types/profile';

export function getDefaultProfile(): UserProfile {
  return {
    fullName: '',
    email: '',
    phoneNumber: '',
    communityOptIn: false,
    emailNotifications: false,
    theme: 'dark',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, 'userProfiles', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw new Error('Unable to access profile data');
  }
}

export async function createProfile(userId: string, data: UserProfile): Promise<void> {
  try {
    const docRef = doc(db, 'userProfiles', userId);
    await setDoc(docRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Profile creation error:', error);
    throw new Error('Unable to create profile');
  }
}

export async function updateProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  try {
    const docRef = doc(db, 'userProfiles', userId);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Profile update error:', error);
    throw new Error('Unable to update profile');
  }
}