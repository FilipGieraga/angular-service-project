import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ReviewI } from 'src/app/models/ReviewModel';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css'],
})
export class ReviewsListComponent implements OnInit {
  constructor(public db: DatabaseService) {}

  reviews: ReviewI[] = [];
  currentPage = 1;
  totalReviews = 0;

  ngOnInit(): void {
    this.fetchReviews(this.currentPage);
  }

  fetchReviews(page: number): void {
    this.db
      .getPaginatedReviews(page)
      .pipe(
        switchMap((paginatedReview) => {
          this.reviews = paginatedReview;
          return this.db.getData('reviews');
        })
      )
      .subscribe((data) => {
        this.totalReviews = data.length;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchReviews(this.currentPage);
  }
}
