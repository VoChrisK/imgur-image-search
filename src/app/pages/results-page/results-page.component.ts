import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { TagsListComponent } from '../../components/tags-list/tags-list.component';
import { FilteredImages, Image } from '../../models/image';
import { Tag, TagFrequency } from '../../models/tag';

@Component({
  selector: 'search-page',
  template: `
    <div>
      <search-input (searchEvent)="onReceived($event)"></search-input>
      <tags-list [tags]="tags" (tagOnClick)="filterImages($event)"></tags-list>
      <image-gallery [images]="images"></image-gallery>
    </div>
  `,
  styleUrl: './results-page.component.scss',
  standalone: true,
  imports: [SearchInputComponent, ImageGalleryComponent, TagsListComponent]
})
export class ResultsPageComponent implements OnInit {
  images: FilteredImages;
  tags: Array<TagFrequency>;

  constructor(
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.images = this.searchService.retrieveFilteredImages() || this.searchService.retrieveImages();
    this.searchService.getTagsList();
    this.tags = this.searchService.retrieveTagsFrequency();
  }

  onReceived(value: string): void {
    this.searchService.getImages(value)
      .then(() => {
        this.images = this.searchService.retrieveImages();
        this.searchService.getTagsList();
        this.tags = this.searchService.retrieveTagsFrequency();
      });
  }

  filterImages(tag: string): void {
    this.searchService.filterImages(tag);
    this.images = this.searchService.retrieveFilteredImages();
  }
}
