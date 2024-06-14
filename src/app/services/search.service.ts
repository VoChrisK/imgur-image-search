import { Injectable } from '@angular/core';
import { getImagesBaseUri, getImagesConfig } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private images: any;

  async getImages(query: string): Promise<void> {
    const getImagesUri = `${getImagesBaseUri}?q=${query}&q_type=png+OR+jpg`;
    const response = await fetch(getImagesUri, getImagesConfig);
    const formattedResponse = await response.json();
    this.images = formattedResponse.data;
  }

  retrieveImages() {
    return this.images;
  }
}