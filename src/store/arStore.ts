import { create } from 'zustand';
import type { ARState } from '../types/ar';

export const useARStore = create<ARState>((set) => ({
  videoUrl: null,
  videoMetadata: null,
  setVideoUrl: (url) => set({ videoUrl: url }),
  setVideoMetadata: (metadata) => set({ videoMetadata: metadata })
}));