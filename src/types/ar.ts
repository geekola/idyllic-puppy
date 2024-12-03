interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface VideoMetadata {
  url: string;
  position: Vector3;
  rotation?: Vector3;
  width?: number;
  height?: number;
}

export interface ARState {
  videoUrl: string | null;
  videoMetadata: VideoMetadata | null;
  setVideoUrl: (url: string) => void;
  setVideoMetadata: (metadata: VideoMetadata) => void;
}