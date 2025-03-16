import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { YouTubeResponse, YouTubeItem, isSearchResult, SearchOptions, CategoryConfig } from '../models/youtube.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly API_KEY = 'AIzaSyDtPN9B5cvC2ARdE7x5qNROKcfEhc6u8NA';
  private readonly API_URL = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  getVideosByCategory(options: SearchOptions): Observable<YouTubeResponse> {
    return this.searchVideos(options).pipe(
      switchMap(searchResponse => {
        const videoIds = searchResponse.items
          .filter(isSearchResult)
          .map(item => item.id.videoId)
          .join(',');
        
        return this.getVideoDetails(videoIds).pipe(
          map(statsResponse => {
            const items = searchResponse.items.map(searchItem => {
              if (!isSearchResult(searchItem)) return searchItem;
              
              const statsItem = statsResponse.items.find(
                statItem => statItem.id === searchItem.id.videoId
              );
              return {
                ...searchItem,
                statistics: statsItem?.statistics
              };
            });
            return {
              items,
              nextPageToken: searchResponse.nextPageToken
            };
          })
        );
      })
    );
  }

  private searchVideos(options: SearchOptions): Observable<YouTubeResponse> {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    
    let params = new HttpParams()
      .set('part', 'snippet')
      .set('type', 'video')
      .set('regionCode', 'IN')
      .set('relevanceLanguage', 'ml')
      .set('maxResults', options.maxResults?.toString() || '12')
      .set('key', this.API_KEY);

    const categoryConfig = environment.youtubeConfig.categories
      .find((cat: CategoryConfig) => cat.id === options.category);

    if (categoryConfig) {
      const searchParams = {
        ...categoryConfig.searchParams,
        ...options
      };

      params = params.set('q', searchParams.q || '');

      if (searchParams.videoDuration) {
        params = params.set('videoDuration', searchParams.videoDuration);
      }
      if (searchParams.order) {
        params = params.set('order', searchParams.order);
      }
      if (searchParams.videoCategoryId) {
        params = params.set('videoCategoryId', searchParams.videoCategoryId);
      }
      if (searchParams.publishedAfter === 'today') {
        params = params.set('publishedAfter', thirtyDaysAgo.toISOString());
      }
    }

    if (options.pageToken) {
      params = params.set('pageToken', options.pageToken);
    }

    return this.http.get<YouTubeResponse>(`${this.API_URL}/search`, { params })
      .pipe(
        map(response => {
          if (options.minViewCount && options.minViewCount > 0) {
            response.items = response.items.filter(item => {
              const viewCount = parseInt(item.statistics?.viewCount || '0');
              return viewCount >= (options.minViewCount || 0);
            });
          }
          return response;
        })
      );
  }

  private getVideoDetails(videoIds: string): Observable<YouTubeResponse> {
    const params = new HttpParams()
      .set('part', 'statistics')
      .set('id', videoIds)
      .set('key', this.API_KEY);

    return this.http.get<YouTubeResponse>(`${this.API_URL}/videos`, { params });
  }
} 