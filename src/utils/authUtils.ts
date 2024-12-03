import { 
  EmailAuthProvider, 
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  GoogleAuthProvider,
  User
} from 'firebase/auth';

export async function reauthenticateUser(user: User, currentPassword?: string): Promise<boolean> {
  try {
    if (user.providerData[0]?.providerId === 'google.com') {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, provider);
    } else if (currentPassword) {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
    } else {
      throw new Error('Current password required');
    }
    return true;
  } catch (error) {
    console.error('Reauthentication failed:', error);
    return false;
  }
}