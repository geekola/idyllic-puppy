import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Camera, Play, Pause, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { ARView } from './ARView';

interface ARPreviewProps {
  markerImageUrl: string;
  videoUrl: string;
  campaignId: string;
}

export function ARPreview({ markerImageUrl, videoUrl, campaignId }: ARPreviewProps) {
  const [isTestingAR, setIsTestingAR] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const arViewerUrl = `${window.location.origin}/ar/${campaignId}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">AR Preview</h3>
        
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {isTestingAR ? (
            <ARView 
              markerImageUrl={markerImageUrl} 
              videoUrl={videoUrl} 
              autoplay={false} 
            />
          ) : (
            <div className="grid grid-cols-2 gap-4 p-4">
              <div className="space-y-2">
                <p className="font-medium">Marker Image:</p>
                <img
                  src={markerImageUrl}
                  alt="AR Marker"
                  className="w-full rounded-lg border border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium">Overlay Video:</p>
                <video
                  src={videoUrl}
                  className="w-full rounded-lg border border-gray-200"
                  controls
                  playsInline
                  muted
                  loop
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setIsTestingAR(!isTestingAR)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isTestingAR ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Stop Testing
              </>
            ) : (
              <>
                <Camera className="h-5 w-5 mr-2" />
                Test AR Experience
              </>
            )}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">AR Viewer URL:</span>
            </div>
            <button
              onClick={() => copyToClipboard(arViewerUrl)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Copy
            </button>
          </div>
          <div className="mt-2 p-2 bg-white rounded border border-gray-200">
            <div className="flex items-center justify-between">
              <code className="text-sm text-gray-800 break-all">{arViewerUrl}</code>
              <a
                href={arViewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:text-blue-500"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-2">Testing Instructions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Test AR Experience" to start camera</li>
            <li>Point your camera at the marker image</li>
            <li>The video will play automatically when marker is detected</li>
            <li>For best results, ensure good lighting and a stable marker image</li>
          </ol>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-4">Mobile Testing</h3>
        <div className="flex justify-center mb-4">
          <QRCode value={arViewerUrl} size={200} level="H" />
        </div>
        <p className="text-sm text-gray-600">
          Scan this QR code with a mobile device to test the AR experience
        </p>
      </div>
    </div>
  );
}