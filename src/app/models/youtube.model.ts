export interface YouTubeResponse {
  items: YouTubeItem[];
  nextPageToken?: string;
}

export interface YouTubeItem {
  id: {
    videoId: string;
  } | string;  // string for videos endpoint, object for search endpoint
  snippet?: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
}

// Helper function to determine if id is string or object
export function isSearchResult(item: YouTubeItem): item is YouTubeItem & { id: { videoId: string } } {
  return typeof item.id === 'object';
}

export interface SearchOptions {
  category: string;
  pageToken?: string;
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'viewCount';
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
  videoDefinition?: 'any' | 'high' | 'standard';
  maxResults?: number;
  videoCategoryId?: string;
  minViewCount?: number;
  q?: string;
  publishedAfter?: string;
  regionCode?: string;
  relevanceLanguage?: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  videoCategoryId: string;
  searchParams: SearchOptions;
} 