import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ARPreview } from '../ar/ARPreview';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CampaignPreview() {
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
          setCampaign({ id: docSnap.id, ...docSnap.data() });
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600">{error || 'Campaign not found'}</div>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to campaigns
          </Link>
          <h2 className="text-2xl font-bold mt-2">Preview: {campaign.title}</h2>
        </div>
      </div>

      <ARPreview
        markerImageUrl={campaign.markerImageUrl}
        videoUrl={campaign.videoUrl}
        campaignId={campaign.id}
      />
    </div>
  );
}