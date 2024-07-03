import { Injectable } from '@angular/core';
import { getImagesBaseUri, getImagesConfig } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private images: any;
  private filteredImages: any;
  private tags: any;

  async getImages(query: string): Promise<void> {
    this.filteredImages = null;
    const getImagesUri = `${getImagesBaseUri}?q=${query}&q_type=png+OR+jpg`;
    const response = await fetch(getImagesUri, getImagesConfig);
    const formattedResponse = await response.json();
    this.images = formattedResponse.data;
  }

  filterImages(tag: string) {
    this.filteredImages = this.images.filter((originalImage: any) => {
      const imageTagsNames = originalImage.tags.map(((tag: any) => tag.name));

      return imageTagsNames.includes(tag);
    });
  }

  getTags() {
    this.tags = this.images.map((image: any) => image.tags);
  }

  retrieveTagsFrequency() {
    this.getTags();

    const frequency: any = {};

    this.tags.forEach((tags: any) => {
      tags.forEach((tag: any) => {
        frequency[tag.name] = frequency[tag.name] ? frequency[tag.name] + 1 : 1;
      })
    })

    return Object.entries(frequency).sort((el1: any, el2: any) => el2[1] - el1[1]);
  }

  retrieveImages() {
    return this.images;
  }

  retrieveFilteredImages() {
    return this.filteredImages;
  }

  retrieveTags() {
    return this.tags;
  }
}