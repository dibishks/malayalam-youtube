import { Component, Output, EventEmitter } from '@angular/core';
import { SearchOptions, CategoryConfig } from '../../models/youtube.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-category-filter',
  template: `
    <div class="filter-container">
      <div class="category-filter">
        <select (change)="onCategorySelect($event)">
          <option *ngFor="let cat of categories" [value]="cat.id">
            {{cat.name}}
          </option>
        </select>
      </div>

      <div class="sort-filter">
        <select (change)="onSortChange($event)">
          <option value="date">Newest</option>
          <option value="viewCount">Most Viewed</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div class="duration-filter">
        <select (change)="onDurationChange($event)">
          <option value="any">Any Duration</option>
          <option value="short">Short (< 4 minutes)</option>
          <option value="medium">Medium (4-20 minutes)</option>
          <option value="long">Long (> 20 minutes)</option>
        </select>
      </div>

      <div class="views-filter">
        <select (change)="onViewCountChange($event)">
          <option value="0">All Videos</option>
          <option value="25000">25K+ views</option>
          <option value="50000">50K+ views</option>
          <option value="100000">100K+ views</option>
          <option value="500000">500K+ views</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .filter-container {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      flex-wrap: wrap;
    }
    select {
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      min-width: 150px;
    }
  `]
})
export class CategoryFilterComponent {
  @Output() searchOptionsChange = new EventEmitter<SearchOptions>();
  
  categories = environment.youtubeConfig.categories;
  currentOptions: SearchOptions = {
    ...environment.youtubeConfig.defaultSearchOptions,
    category: this.categories[0].id
  };

  onCategorySelect(event: any) {
    const category = this.categories.find((cat: CategoryConfig) => cat.id === event.target.value);
    this.currentOptions = {
      ...this.currentOptions,
      category: event.target.value,
      videoCategoryId: category?.videoCategoryId
    };
    this.emitChanges();
  }

  onSortChange(event: any) {
    this.currentOptions.order = event.target.value;
    this.emitChanges();
  }

  onDurationChange(event: any) {
    this.currentOptions.videoDuration = event.target.value;
    this.emitChanges();
  }

  onViewCountChange(event: any) {
    this.currentOptions.minViewCount = parseInt(event.target.value);
    this.emitChanges();
  }

  private emitChanges() {
    this.searchOptionsChange.emit(this.currentOptions);
  }
}