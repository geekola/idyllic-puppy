import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Hls from 'hls.js';
import type { VideoMetadata } from '../../types/ar';

interface VideoPlayerProps {
  url: string;
  metadata: VideoMetadata;
  scene: THREE.Scene;
}

export function VideoPlayer({ url, metadata, scene }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    let hls: Hls | null = null;

    const initVideo = async () => {
      try {
        // Initialize HLS if supported
        if (Hls.isSupported()) {
          hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
          });

          hls.loadSource(url);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(console.error);
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // Fallback for Safari
          video.src = url;
          video.addEventListener('loadedmetadata', () => {
            video.play().catch(console.error);
          });
        }

        // Create video texture
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create video plane
        const geometry = new THREE.PlaneGeometry(
          metadata.width || 1.6,
          metadata.height || 0.9
        );
        
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          metadata.position.x,
          metadata.position.y,
          metadata.position.z
        );
        
        if (metadata.rotation) {
          mesh.rotation.set(
            THREE.MathUtils.degToRad(metadata.rotation.x),
            THREE.MathUtils.degToRad(metadata.rotation.y),
            THREE.MathUtils.degToRad(metadata.rotation.z)
          );
        }

        meshRef.current = mesh;
        scene.add(mesh);

      } catch (error) {
        console.error('Error initializing video:', error);
      }
    };

    initVideo();

    return () => {
      if (hls) {
        hls.destroy();
      }
      if (meshRef.current) {
        scene.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
      video.pause();
      video.src = '';
      video.load();
    };
  }, [url, metadata, scene]);

  return (
    <video
      ref={videoRef}
      className="hidden"
      playsInline
      crossOrigin="anonymous"
      loop
      muted
    />
  );
}