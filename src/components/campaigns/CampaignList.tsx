import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, Calendar, Tag, Edit2, Eye, Trash2, QrCode, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCampaigns } from '../../hooks/useCampaigns';
import { format, parseISO } from 'date-fns';
import { Button } from '../common/Button';
import { IconButton } from '../common/IconButton';
import { QRCodeModal } from './QRCodeModal';

export function CampaignList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<{ id: string; title: string } | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns, loading, error } = useCampaigns(user?.uid);

  const handleDelete = async (campaignId: string) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;

    try {
      await deleteDoc(doc(db, 'campaigns', campaignId));
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign. Please try again.');
    }
  };

  const handleShowQRCode = (campaignId: string, campaignTitle: string) => {
    setSelectedCampaign({ id: campaignId, title: campaignTitle });
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const searchLower = searchTerm.toLowerCase();
    return (
      campaign.title.toLowerCase().includes(searchLower) ||
      campaign.description.toLowerCase().includes(searchLower) ||
      campaign.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredCampaigns.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
              <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                {campaign.markerImageUrl ? (
                  <img
                    src={campaign.markerImageUrl}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Tag className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </span>
                </div>
                
                {campaign.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {campaign.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-center space-x-4">
                  <IconButton
                    icon={Eye}
                    onClick={() => navigate(`/campaigns/${campaign.id}/preview`)}
                    tooltip="Preview AR experience"
                  />
                  <IconButton
                    icon={Edit2}
                    onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
                    tooltip="Edit campaign"
                  />
                  <IconButton
                    icon={QrCode}
                    onClick={() => handleShowQRCode(campaign.id, campaign.title)}
                    tooltip="View QR Code"
                  />
                  <IconButton
                    icon={Trash2}
                    variant="danger"
                    onClick={() => handleDelete(campaign.id)}
                    tooltip="Delete campaign"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No campaigns</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {searchTerm ? 'No campaigns match your search' : 'Get started by creating a new campaign'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button
                icon={Plus}
                onClick={() => navigate('/campaigns/new')}
              >
                New Campaign
              </Button>
            </div>
          )}
        </div>
      )}

      <QRCodeModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        campaignId={selectedCampaign?.id || ''}
        campaignTitle={selectedCampaign?.title || ''}
      />
    </div>
  );
}