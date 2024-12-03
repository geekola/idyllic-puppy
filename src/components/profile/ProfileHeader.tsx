import { User } from 'lucide-react';

interface ProfileHeaderProps {
  photoURL: string | null | undefined;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHeader({ photoURL, onImageChange }: ProfileHeaderProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="relative">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          {photoURL ? (
            <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-full h-full p-4 text-gray-400" />
          )}
        </div>
        <label className="absolute bottom-0 right-0 bg-primary hover:bg-highlight rounded-full p-2 cursor-pointer transition-colors">
          <User className="h-4 w-4 text-white" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onImageChange}
          />
        </label>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update your personal information and preferences
        </p>
      </div>
    </div>
  );
}