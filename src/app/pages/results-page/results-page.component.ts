import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { SearchService } from '../../services/search.service';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';

@Component({
  selector: 'search-page',
  template: `
    <div>
      <search-input (searchEvent)="onReceived($event)"></search-input>
      <image-gallery [images]="images"></image-gallery>
    </div>
  `,
  standalone: true,
  styleUrl: './results-page.component.scss',
  imports: [SearchInputComponent, ImageGalleryComponent]
})
export class ResultsPageComponent implements OnInit {
  images: any;

  constructor(
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.images = this.searchService.retrieveImages();
  }

  onReceived(value: string) {
    this.searchService.getImages(value)
      .then(() => this.images = this.searchService.retrieveImages());
  }
}
