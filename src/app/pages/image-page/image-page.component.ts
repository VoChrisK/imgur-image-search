import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'image-page',
  template: `
    <div>
      <div class="go-back-link">
        <mat-icon>arrow_left</mat-icon>
        <i (click)="redirectToPreviousPage()">Go back</i>
      </div>
      <img 
        [src]="image"
        class="img-fullscreen"
      />
    </div>
  `,
  styleUrl: './image-page.component.scss',
  standalone: true,
  imports: [MatIconModule]
})
export class ImagePageComponent implements OnInit {
  image: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.image = this.activatedRoute.snapshot.paramMap.get('image') ?? "";
  }

  redirectToPreviousPage(): void {
    this.router.navigate(['results']);
  }
}
