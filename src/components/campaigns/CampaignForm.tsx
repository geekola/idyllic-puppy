import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CampaignForm as CampaignFormComponent } from './forms/CampaignForm';
import { CampaignHeader } from './CampaignHeader';
import { Button } from '../common/Button';
import { ArrowLeft } from 'lucide-react';

export function CampaignForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    if (!user) return;
    setError(null);
    setIsSubmitting(true);

    try {
      // Upload files first
      const uploadPromises = [];
      let markerImageUrl = '';
      let videoUrl = '';

      if (data.markerImage?.length) {
        const markerFile = data.markerImage[0];
        const markerRef = ref(storage, `markers/${user.uid}/${Date.now()}-${markerFile.name}`);
        uploadPromises.push(
          uploadBytes(markerRef, markerFile)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(url => { markerImageUrl = url; })
        );
      } else {
        throw new Error('Marker image is required');
      }

      if (data.videoFile?.length) {
        const videoFile = data.videoFile[0];
        const videoRef = ref(storage, `videos/${user.uid}/${Date.now()}-${videoFile.name}`);
        uploadPromises.push(
          uploadBytes(videoRef, videoFile)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(url => { videoUrl = url; })
        );
      } else {
        throw new Error('Video file is required');
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      // Create campaign document
      const campaignData = {
        userId: user.uid,
        title: data.title,
        description: data.description,
        tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        startDate: data.startDate,
        endDate: data.endDate,
        markerImageUrl,
        videoUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
      console.log('Campaign created with ID:', docRef.id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
      setError(error instanceof Error ? error.message : 'Failed to create campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <CampaignHeader title="Create New Campaign" />
        
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
              {error}
            </div>
          )}

          <CampaignFormComponent
            onSubmit={handleSubmit}
            submitLabel="Create Campaign"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}