import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import * as _ from 'lodash';

@Component({
  selector: 'image-gallery',
  template: `
    <div class="gallery">
      <div *ngFor="let tag of tags">
        <p (click)="handleTagClick($event)" [style.font-size]="setFontSize(tag[1])">{{tag[0]}} - {{tag[1]}}</p>
      </div>
      <div class="row mb-2">
        <div class="col-sm-2" *ngFor="let image of filteredImages">
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
export class ImageGalleryComponent implements OnInit {
  @Input() images: any;
  tags: any = {};
  filteredImages: any;

  ngOnInit(): void {
    this.filteredImages = this.images;
    this.getTagFrequency();
  }

  getTagFrequency() {
    if (this.images) {
      for(let i = 0; i < this.images.length; i++) {
        for(let j = 0; j < this.images[i].tags.length; j++) {
          let name = this.images[i].tags[j]?.name;

          if (name in this.tags) {
            this.tags[name] += 1;
          } else {
            this.tags[name] = 1;
          }
        }
      }

      this.tags = Object.entries(this.tags).sort((a: any, b: any) => b[1] - a[1]);
    }
  }

  handleTagClick(event: any) {
    let tagName = event.target.innerHTML.split("-")[0].split(" ")[0];
    let filteredImages = [];

    for(let i = 0; i < this.images.length; i++) {
      for(let j = 0; j < this.images[i].tags.length; j++) {
        let name = this.images[i].tags[j]?.name;

        if (name === tagName) {
          filteredImages.push(this.images[i]);
          break;
        }
      }
    }

    this.filteredImages = filteredImages;
  }

  setFontSize(value: number) {
    let pixels = 16 + value;

    return `${pixels}px`;
  }
}
