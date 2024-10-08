import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'search-page',
  template: `
    <div class="h-100 search-page-container">
      <h1 class="mt-2">Chris Vo's Imgur Image Search</h1>
      <h3 class="mt-2">Type your search below to search for images</h3>
      <search-input (searchEvent)="onReceived($event)"></search-input>
    </div>
  `,
  styleUrl: './search-page.component.scss',
  standalone: true,
  imports: [SearchInputComponent]
})
export class SearchPageComponent {
  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  onReceived(value: string): void {
    this.searchService.getImages(value)
      .then(() => this.router.navigate(['results']));
  }
}
