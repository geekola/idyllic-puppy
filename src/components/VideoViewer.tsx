import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function VideoViewer() {
  const [searchParams] = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const videoUrl = searchParams.get('url');

  useEffect(() => {
    const initializeVideo = async () => {
      if (!videoRef.current || !videoUrl) return;

      try {
        // Set initial properties
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        
        // Attempt autoplay
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started successfully
              // Unmute after a short delay to ensure smooth playback
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.muted = false;
                }
              }, 100);
            })
            .catch(err => {
              console.error('Autoplay failed:', err);
              setError('Tap to start video playback');
            });
        }
      } catch (err) {
        console.error('Error initializing video:', err);
        setError('Unable to play video automatically. Please tap to play.');
      }
    };

    initializeVideo();

    // Add click handler for mobile devices that require user interaction
    const handleClick = async () => {
      if (!videoRef.current) return;
      
      try {
        videoRef.current.muted = true;
        await videoRef.current.play();
        videoRef.current.muted = false;
        setError(null);
      } catch (err) {
        console.error('Play failed:', err);
        setError('Playback failed. Please try again.');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <p>No video URL provided</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {error && (
        <div className="absolute top-4 left-0 right-0 z-50 text-center">
          <div className="inline-block bg-white bg-opacity-90 text-black px-4 py-2 rounded-full text-sm">
            {error}
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        controls
        playsInline
        autoPlay
        loop
        muted
        poster={videoUrl + '#t=0.1'}
      />
    </div>
  );
}