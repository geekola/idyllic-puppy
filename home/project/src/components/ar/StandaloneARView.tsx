import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ARView } from './ARView';

export function StandaloneARView() {
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'campaigns', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCampaign({ id: docSnap.id, ...data });
          
          // Preload the video
          const video = document.createElement('video');
          video.src = data.videoUrl;
          video.load();
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-center p-4">
        <div>
          <p className="text-xl">{error || 'Campaign not found'}</p>
          <p className="mt-2 text-gray-400">Please check the URL and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <ARView
        markerImageUrl={campaign.markerImageUrl}
        videoUrl={campaign.videoUrl}
        autoplay={true}
      />
    </div>
  );
}