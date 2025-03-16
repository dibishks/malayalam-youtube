import { Component, OnInit } from '@angular/core';
import { Video } from './models/video';
import { YoutubeService } from './services/youtube.service';
import { YouTubeResponse, YouTubeItem, isSearchResult, SearchOptions } from './models/youtube.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video | null = null;
  currentCategory = 'cinema';
  pageToken: string = '';
  isLoading = false;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    this.loadVideos();
  }

  onCategoryChange(category: string) {
    this.currentCategory = category;
    this.pageToken = '';
    this.videos = [];
    this.loadVideos();
  }

  onSearchOptionsChange(options: SearchOptions) {
    this.pageToken = '';
    this.videos = [];
    this.loadVideos(options);
  }

  loadVideos(options?: SearchOptions) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const searchOptions: SearchOptions = {
      ...environment.youtubeConfig.defaultSearchOptions,
      ...options,
      category: options?.category || this.currentCategory,
      pageToken: this.pageToken
    };

    this.youtubeService.getVideosByCategory(searchOptions)
      .subscribe({
        next: (response: YouTubeResponse) => {
          this.pageToken = response.nextPageToken || '';
          const newVideos = response.items
            .map((item: YouTubeItem) => {
              if (!isSearchResult(item) || !item.snippet) return null;
              const viewCount = parseInt(item.statistics?.viewCount || '0');
              
              // Filter by minimum view count if specified
              if (searchOptions.minViewCount && viewCount < searchOptions.minViewCount) {
                return null;
              }
              
              return {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.medium.url,
                publishedAt: new Date(item.snippet.publishedAt),
                viewCount: viewCount,
                rating: parseInt(item.statistics?.likeCount || '0'),
                category: this.currentCategory
              };
            })
            .filter((video): video is Video => video !== null);
          
          this.videos = [...this.videos, ...newVideos];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading videos:', error);
          this.isLoading = false;
        }
      });
  }

  onLoadMore() {
    if (this.pageToken) {
      this.loadVideos();
    }
  }

  onVideoSelect(video: Video) {
    this.selectedVideo = video;
  }

  closeVideo() {
    this.selectedVideo = null;
  }
} 