import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-grid',
  template: `
    <div class="video-grid" #gridContainer>
      <div *ngFor="let video of videos" class="video-card" (click)="onVideoClick(video)">
        <img [src]="video.thumbnailUrl" [alt]="video.title">
        <h3>{{video.title}}</h3>
        <p>Views: {{video.viewCount | number}}</p>
      </div>
    </div>
    <div class="loading" *ngIf="isLoading">Loading more videos...</div>
  `,
  styles: [`
    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    .video-card {
      cursor: pointer;
      background: white;
      padding: 0.5rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .video-card:hover {
      transform: translateY(-2px);
    }
    img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
    h3 {
      margin: 0.5rem 0;
      font-size: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .loading {
      text-align: center;
      padding: 1rem;
      font-style: italic;
    }
  `]
})
export class VideoGridComponent {
  @Input() videos: Video[] = [];
  @Input() isLoading = false;
  @Output() videoSelect = new EventEmitter<Video>();
  @Output() loadMore = new EventEmitter<void>();

  private scrollThreshold = 0.8; // Load more when user scrolls 80% down

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isLoading) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrolledPercentage = (scrollTop + windowHeight) / documentHeight;
    
    if (scrolledPercentage > this.scrollThreshold) {
      this.loadMore.emit();
    }
  }

  onVideoClick(video: Video) {
    this.videoSelect.emit(video);
  }
} 