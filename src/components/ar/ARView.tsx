import { useEffect, useRef, useState } from 'react';
import { ARVideoViewer } from './ARVideoViewer';
import { ARLoading } from './ARLoading';
import { ARError } from './ARError';
import { QrScanner } from './QrScanner';

interface ARViewProps {
  markerImageUrl: string;
  videoUrl: string;
  autoplay?: boolean;
}

export function ARView({ markerImageUrl, videoUrl, autoplay = false }: ARViewProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkCompatibility = async () => {
      try {
        // Check for WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          throw new Error('WebGL is not supported on this device');
        }

        // Check for camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        stream.getTracks().forEach(track => track.stop());

        setIsLoading(false);
      } catch (err) {
        console.error('Compatibility check failed:', err);
        setError('Your device does not support AR features');
        setIsLoading(false);
      }
    };

    checkCompatibility();
  }, []);

  const handleScan = (data: string) => {
    try {
      const scannedData = JSON.parse(data);
      if (scannedData.videoUrl && scannedData.markerUrl) {
        // Handle scanned data
        setIsScanning(false);
      }
    } catch (err) {
      console.error('Invalid QR code data:', err);
    }
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  if (error) {
    return <ARError message={error} onRetry={handleRetry} />;
  }

  if (isLoading) {
    return <ARLoading />;
  }

  if (isScanning) {
    return (
      <QrScanner
        onScan={handleScan}
        onError={(error) => setError(error)}
      />
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black">
      <ARVideoViewer
        initialVideoUrl={videoUrl}
        initialMarkerUrl={markerImageUrl}
        autoplay={autoplay}
        onError={(error) => setError(error)}
      />
      
      <button
        onClick={() => setIsScanning(true)}
        className="absolute bottom-4 right-4 bg-primary hover:bg-highlight text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Scan QR Code
      </button>
    </div>
  );
}