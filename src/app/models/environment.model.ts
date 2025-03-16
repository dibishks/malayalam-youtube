import { SearchOptions, CategoryConfig } from './youtube.model';

export interface Environment {
  production: boolean;
  youtubeConfig: {
    defaultSearchOptions: SearchOptions;
    categories: CategoryConfig[];
  };
} 