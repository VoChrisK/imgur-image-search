import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tags-list',
  template: `
    <div class="container-fluid">
      <div class="row mb-3">
        <div class="col-sm-2" *ngFor="let tag of tags">
          <p
            class="tag"
            (click)="handleTagClick(tag[0])"
            [style.font-size]="setFontSize(tag[1])"
          >
            {{tag[0]}} - {{tag[1]}}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './tags-list.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class TagsListComponent { 
  @Input() tags: any;

  @Output() tagOnClick = new EventEmitter<string>();

  handleTagClick(tag: string) {
    this.tagOnClick.emit(tag);
  }

    setFontSize(value: number) {
    let pixels = value > 12 ? 32 : 16 + value;

    return `${pixels}px`;
  }
}