import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'image-gallery',
  template: `
    <div class="gallery">
      <div class="row mb-2">
        <div class="col-sm-2" *ngFor="let image of images">
          <img 
            [src]="image.images?.[0]?.link || image.link"
            [alt]="image.title"
            [routerLink]="['/image', { image: image.images?.[0]?.link }]"
            class="img-fluid"
            style="cursor: pointer;"
          />
        </div>
      </div>
    </div>
  `,
  standalone: true,
  styleUrl: './image-gallery.component.scss',
  imports: [CommonModule, RouterModule ]
})
export class ImageGalleryComponent {
  @Input() images: any;
}

// <div class="row">
//   <div class="col-md-4" *ngFor="let item of items">
//     <!-- item content -->
//   </div>
// </div>