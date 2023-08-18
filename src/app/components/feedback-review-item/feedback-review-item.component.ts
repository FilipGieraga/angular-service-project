import { Component, Input } from '@angular/core';
import { ReviewI } from 'src/app/models/ReviewModel';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-feedback-review-item',
  templateUrl: './feedback-review-item.component.html',
  styleUrls: ['./feedback-review-item.component.css'],
})
export class FeedbackReviewItemComponent {
  @Input() review!: ReviewI;
  constructor(private dbService: DatabaseService) {}
  starsRating(numberOfStars: number) {
    return this.dbService.generateNumberArray(numberOfStars);
  }
}
