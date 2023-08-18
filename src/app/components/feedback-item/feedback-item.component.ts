import { Component, Input } from '@angular/core';
import { FeedbackI } from 'src/app/models/FeedbackModel';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-feedback-item',
  templateUrl: './feedback-item.component.html',
  styleUrls: ['./feedback-item.component.css'],
})
export class FeedbackItemComponent {
  @Input() feedback!: FeedbackI;

  constructor(private dbService: DatabaseService) {}

  starsRating(numberOfStars: number) {
    return this.dbService.generateNumberArray(numberOfStars);
  }
}
