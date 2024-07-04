import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilteredImages, Image } from '../../models/image';

@Component({
  selector: 'image-gallery',
  template: `
    <div class="gallery">
      <div class="row mb-2">
        <div class="col-sm-2" *ngFor="let image of images">
          <img 
            [src]="image.images[0].link || image.link"
            [alt]="image.title"
            [routerLink]="['/image', { image: image.images[0].link }]"
            class="img-fluid"
            style="cursor: pointer;"
          />
        </div>
      </div>
    </div>
  `,
  styleUrl: './image-gallery.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ImageGalleryComponent {
  @Input() images: FilteredImages;
}
