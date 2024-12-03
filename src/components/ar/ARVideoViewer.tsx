import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Hls from 'hls.js';
import { ARScene } from './ARScene';
import { VideoPlayer } from './VideoPlayer';
import { useARStore } from '../../store/arStore';

interface ARVideoViewerProps {
  initialVideoUrl: string;
  initialMarkerUrl: string;
  autoplay?: boolean;
  onError: (error: string) => void;
}

export function ARVideoViewer({
  initialVideoUrl,
  initialMarkerUrl,
  autoplay = false,
  onError
}: ARVideoViewerProps) {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setVideoUrl, setVideoMetadata } = useARStore();

  useEffect(() => {
    if (!initialVideoUrl || !initialMarkerUrl) {
      onError('Missing video or marker URL');
      return;
    }

    setVideoUrl(initialVideoUrl);
    setVideoMetadata({
      url: initialVideoUrl,
      position: { x: 0, y: 0, z: -2 },
      rotation: { x: 0, y: 0, z: 0 },
      width: 1.6,
      height: 0.9
    });
  }, [initialVideoUrl, initialMarkerUrl, setVideoUrl, setVideoMetadata, onError]);

  const handleSceneReady = (newScene: THREE.Scene) => {
    setScene(newScene);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <ARScene
        onSceneReady={handleSceneReady}
        onError={onError}
      />
      {scene && (
        <VideoPlayer
          url={initialVideoUrl}
          metadata={{
            url: initialVideoUrl,
            position: { x: 0, y: 0, z: -2 },
            rotation: { x: 0, y: 0, z: 0 },
            width: 1.6,
            height: 0.9
          }}
          scene={scene}
        />
      )}
    </div>
  );
}