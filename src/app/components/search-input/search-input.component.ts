import { Component, EventEmitter, Output } from '@angular/core';
import { searchForm } from '../../models/search-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'search-input',
  template: `
    <div class="mt-4">
      <form [formGroup]="searchForm" class="search-form form-group form-outline">
        <input formControlName="search" class="form-control search-input" type="search" />
        <button (click)="handleOnSubmit()" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  `,
  styleUrl: './search-input.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule]
})
export class SearchInputComponent {
  searchForm = searchForm;
  
  @Output() searchEvent = new EventEmitter<string>();

  handleOnSubmit() {
    const searchValue: string = this.searchForm.get("search")?.value ?? "";

    this.searchEvent.emit(searchValue);
  }
}
