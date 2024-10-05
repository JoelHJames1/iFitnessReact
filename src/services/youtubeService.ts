import axios from 'axios';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export interface YouTubeTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

export const searchTracks = async (query: string, maxResults: number = 10): Promise<YouTubeTrack[]> => {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  } catch (error) {
    console.error('Error searching YouTube tracks:', error);
    throw error;
  }
};

export const searchWorkoutVideos = async (query: string, maxResults: number = 10): Promise<YouTubeVideo[]> => {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: `${query} workout`,
        type: 'video',
        maxResults,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  } catch (error) {
    console.error('Error searching workout videos:', error);
    throw error;
  }
};

export const getTrackDetails = async (videoId: string): Promise<YouTubeTrack> => {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    const item = response.data.items[0];
    return {
      id: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
    };
  } catch (error) {
    console.error('Error getting track details:', error);
    throw error;
  }
};