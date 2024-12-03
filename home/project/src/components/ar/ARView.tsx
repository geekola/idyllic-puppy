import { useEffect, useRef, useState } from 'react';

interface ARViewProps {
  markerImageUrl: string;
  videoUrl: string;
  autoplay?: boolean;
}

export function ARView({ markerImageUrl, videoUrl, autoplay = false }: ARViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Load A-Frame if not already loaded
        if (!window.AFRAME) {
          const aframeScript = document.createElement('script');
          aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
          aframeScript.async = true;
          await new Promise((resolve, reject) => {
            aframeScript.onload = resolve;
            aframeScript.onerror = reject;
            document.head.appendChild(aframeScript);
          });
        }

        // Load AR.js if not already loaded
        if (!window.THREEx || !window.THREEx.ArToolkitContext) {
          const arScript = document.createElement('script');
          arScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
          arScript.async = true;
          await new Promise((resolve, reject) => {
            arScript.onload = resolve;
            arScript.onerror = reject;
            document.head.appendChild(arScript);
          });
        }

        setScriptsLoaded(true);
      } catch (err) {
        console.error('Error loading AR scripts:', err);
        setError('Failed to load AR components. Please try refreshing the page.');
      }
    };

    loadScripts();

    return () => {
      // Cleanup if needed
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (!scriptsLoaded || !containerRef.current) return;

    try {
      // Create AR scene
      const arScene = document.createElement('a-scene');
      arScene.setAttribute('embedded', '');
      arScene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
      
      // Create marker
      const marker = document.createElement('a-marker');
      marker.setAttribute('preset', 'custom');
      marker.setAttribute('type', 'pattern');
      marker.setAttribute('url', markerImageUrl);
      
      // Create video asset
      const assets = document.createElement('a-assets');
      const videoAsset = document.createElement('video');
      videoAsset.id = 'ar-video';
      videoAsset.src = videoUrl;
      videoAsset.setAttribute('preload', 'auto');
      videoAsset.setAttribute('loop', '');
      videoAsset.setAttribute('crossorigin', 'anonymous');
      videoAsset.muted = true; // Mute by default to allow autoplay
      videoRef.current = videoAsset;
      assets.appendChild(videoAsset);
      
      // Create video plane
      const videoPlane = document.createElement('a-video');
      videoPlane.setAttribute('src', '#ar-video');
      videoPlane.setAttribute('position', '0 0 0');
      videoPlane.setAttribute('rotation', '-90 0 0');
      videoPlane.setAttribute('width', '2');
      videoPlane.setAttribute('height', '1.5');
      marker.appendChild(videoPlane);
      
      // Create camera
      const camera = document.createElement('a-entity');
      camera.setAttribute('camera', '');
      
      // Assemble scene
      arScene.appendChild(assets);
      arScene.appendChild(marker);
      arScene.appendChild(camera);
      
      // Add to DOM
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(arScene);
      
      // Handle marker events
      marker.addEventListener('markerFound', () => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
          });
        }
      });
      
      marker.addEventListener('markerLost', () => {
        if (videoRef.current && !autoplay) {
          videoRef.current.pause();
        }
      });

      // If autoplay is enabled, start playing the video immediately
      if (autoplay && videoRef.current) {
        videoRef.current.play().catch(err => {
          console.error('Error autoplaying video:', err);
        });
      }

    } catch (err) {
      console.error('Error setting up AR scene:', err);
      setError('Failed to initialize AR experience. Please try refreshing the page.');
    }
  }, [scriptsLoaded, markerImageUrl, videoUrl, autoplay]);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-center p-4">
        <div>
          <p className="text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!scriptsLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}