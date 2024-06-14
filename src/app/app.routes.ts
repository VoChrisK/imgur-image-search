import { Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { ImagePageComponent } from './pages/image-page/image-page.component';

export const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'results', component: ResultsPageComponent },
  { path: 'image', component: ImagePageComponent },
  { path: '**', redirectTo: '' }
];
