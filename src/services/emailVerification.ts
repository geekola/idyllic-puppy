import { auth, db } from '../lib/firebase';
import { collection, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { sendEmailVerification, applyActionCode } from 'firebase/auth';
import { VerificationToken } from '../types/auth';

// Generate a cryptographically secure random token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function sendVerificationEmail(userId: string, email: string) {
  try {
    const token = generateToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    const verificationToken: VerificationToken = {
      token,
      userId,
      email,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      used: false
    };

    // Store token in Firestore
    await setDoc(doc(db, 'verificationTokens', token), verificationToken);

    // Send verification email
    const actionCodeSettings = {
      url: `${window.location.origin}/verify-email?token=${token}`,
      handleCodeInApp: true
    };

    const user = auth.currentUser;
    if (!user) throw new Error('No user found');

    await sendEmailVerification(user, actionCodeSettings);

    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function verifyEmail(token: string) {
  try {
    // Get token from Firestore
    const tokenDoc = await getDoc(doc(db, 'verificationTokens', token));
    if (!tokenDoc.exists()) {
      throw new Error('Invalid verification token');
    }

    const tokenData = tokenDoc.data() as VerificationToken;

    // Check if token is expired
    if (new Date(tokenData.expiresAt) < new Date()) {
      throw new Error('Verification token has expired');
    }

    // Check if token has been used
    if (tokenData.used) {
      throw new Error('Verification token has already been used');
    }

    // Mark token as used
    await updateDoc(doc(db, 'verificationTokens', token), {
      used: true,
      verifiedAt: serverTimestamp()
    });

    // Update user's email verified status
    const user = auth.currentUser;
    if (!user) throw new Error('No user found');

    await applyActionCode(auth, token);

    return { success: true };
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}