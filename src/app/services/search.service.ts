import { Injectable } from '@angular/core';
import { getImagesBaseUri, getImagesConfig } from '../models/api';
import { Tag, TagFrequency } from '../models/tag';
import { FilteredImages, Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private images: Array<Image>;
  private filteredImages: FilteredImages;
  private tagsList: Array<Array<Tag>>;

  async getImages(query: string): Promise<void> {
    this.filteredImages = null;
    const getImagesUri = `${getImagesBaseUri}?q=${query}&q_type=png+OR+jpg`;
    const response = await fetch(getImagesUri, getImagesConfig);
    const formattedResponse = await response.json();
    this.images = formattedResponse.data;
  }

  filterImages(tag: string): void {
    this.filteredImages = this.images.filter((originalImage: any) => {
      const imageTagsNames = originalImage.tags.map(((tag: any) => tag.name));

      return imageTagsNames.includes(tag);
    });
  }

  getTagsList(): void {
    this.tagsList = this.images.map((image: any) => image.tags);
  }

  retrieveTagsFrequency(): Array<TagFrequency> {
    const frequency: any = {};

    this.tagsList.forEach((tags: Array<Tag>) => {
      tags.forEach((tag: Tag) => {
        frequency[tag.name] = frequency[tag.name] ? frequency[tag.name] + 1 : 1;
      })
    })

    const entries = Object.entries(frequency) as Array<TagFrequency>;

    return entries.sort((el1: TagFrequency, el2: TagFrequency) => el2[1] - el1[1]);
  }

  retrieveImages(): Array<Image> {
    return this.images;
  }

  retrieveFilteredImages(): FilteredImages {
    return this.filteredImages;
  }

  retrieveTagsList(): Array<Array<Tag>> {
    return this.tagsList;
  }
}