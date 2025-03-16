export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: Date;
  viewCount: number;
  rating: number;
  category: string;
  subCategory?: string;
}

export interface VideoCategory {
  name: string;
  value: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  name: string;
  value: string;
} 