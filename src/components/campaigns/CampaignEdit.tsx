import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { CampaignForm } from './forms/CampaignForm';
import { CampaignHeader } from './CampaignHeader';
import { Button } from '../common/Button';
import { ArrowLeft } from 'lucide-react';
import type { Campaign } from '../../types/campaign';

export function CampaignEdit() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'campaigns', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCampaign({ id: docSnap.id, ...docSnap.data() } as Campaign);
        } else {
          setError('Campaign not found');
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setError('Failed to load campaign');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!user || !campaign || !id) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const updates: any = {
        title: data.title,
        description: data.description,
        tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        startDate: data.startDate,
        endDate: data.endDate,
        updatedAt: new Date().toISOString(),
      };

      // Upload new files if provided
      if (data.markerImage?.length) {
        const markerFile = data.markerImage[0];
        const markerRef = ref(storage, `markers/${user.uid}/${Date.now()}-${markerFile.name}`);
        const snapshot = await uploadBytes(markerRef, markerFile);
        updates.markerImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (data.videoFile?.length) {
        const videoFile = data.videoFile[0];
        const videoRef = ref(storage, `videos/${user.uid}/${Date.now()}-${videoFile.name}`);
        const snapshot = await uploadBytes(videoRef, videoFile);
        updates.videoUrl = await getDownloadURL(snapshot.ref);
      }

      const docRef = doc(db, 'campaigns', id);
      await updateDoc(docRef, updates);
      console.log('Campaign updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating campaign:', error);
      setError(error instanceof Error ? error.message : 'Failed to update campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Campaign not found'}</p>
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

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
        <CampaignHeader title={`Edit Campaign: ${campaign.title}`} />
        
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
              {error}
            </div>
          )}

          <CampaignForm
            initialData={campaign}
            onSubmit={handleSubmit}
            submitLabel="Update Campaign"
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}