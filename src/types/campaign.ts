export interface Campaign {
  id: string;
  userId: string;
  title: string;
  description: string;
  markerImageUrl: string;
  videoUrl: string;
  tags: string[];
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt?: string;
}