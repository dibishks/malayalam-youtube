import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="video-player-overlay" (click)="onOverlayClick($event)">
      <div class="video-player-container">
        <button class="close-btn" (click)="onClose()">×</button>
        <div class="video-wrapper">
          <iframe 
            width="100%" 
            height="100%"
            [src]="'https://www.youtube.com/embed/' + video?.id | safe"
            frameborder="0" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="video-info">
          <h2>{{video?.title}}</h2>
          <p>{{video?.description}}</p>
          <p class="views">{{video?.viewCount | number}} views</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-player-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
    }
    .video-player-container {
      background: white;
      border-radius: 8px;
      width: 90%;
      max-width: 1000px;
      max-height: 90vh;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
      height: 0;
      overflow: hidden;
    }
    .video-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .video-info {
      padding: 20px;
      overflow-y: auto;
      max-height: 200px;
    }
    .close-btn {
      position: absolute;
      right: 15px;
      top: 15px;
      background: rgba(0,0,0,0.6);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 24px;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    .close-btn:hover {
      background: rgba(0,0,0,0.8);
    }
    h2 {
      margin: 0 0 10px 0;
      font-size: 1.2rem;
    }
    p {
      margin: 0 0 10px 0;
      color: #666;
      font-size: 0.9rem;
    }
    .views {
      color: #888;
      font-size: 0.8rem;
    }
    @media (max-width: 768px) {
      .video-player-container {
        width: 95%;
      }
      .video-info {
        max-height: 150px;
      }
    }
  `]
})
export class VideoPlayerComponent {
  @Input() video: Video | null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    // Close only if clicking the overlay background, not the video container
    if ((event.target as HTMLElement).className === 'video-player-overlay') {
      this.close.emit();
    }
  }
} 