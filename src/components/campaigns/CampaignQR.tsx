import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import QRCode from 'qrcode.react';
import { Download } from 'lucide-react';

export function CampaignQR() {
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

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${campaign.title}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

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
      </div>
    );
  }

  const arUrl = `${window.location.origin}/ar/${campaign.id}`;

  return (
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">QR Code: {campaign.title}</h2>
      
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <QRCode
          id="qr-code"
          value={arUrl}
          size={300}
          level="H"
          includeMargin
          className="mx-auto"
        />
        
        <p className="mt-4 text-sm text-gray-600">
          Scan this QR code to view the AR experience
        </p>

        <button
          onClick={handleDownload}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-5 w-5 mr-2" />
          Download QR Code
        </button>
      </div>
    </div>
  );
}