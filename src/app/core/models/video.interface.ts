import { User } from './user.interface';

export interface Videos {
  id: string;
  title: string;
  createdDate: string; // iso date string
  author: User;
  previewUrl: string;
}

export interface VideoReaction {
  id: string;
  video: Videos;
  author: User;
  type: 'star' | 'snapshot';
  postedDate?: string; // iso date string
  timeframe: number;
  createdDate?: string;
  imageUrl?: string;
}

export interface AddReactionToVideoPayload {
  videoId: string;
  type: 'star' | 'snapshot';
  timeframe: any;
  dataUri?: string;
}

export interface UpdateExistingVideoPayload {
  title?: string;
  description?: string;
}
