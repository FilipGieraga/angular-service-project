import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackI } from 'src/app/models/FeedbackModel';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-feedbacks-list',
  templateUrl: './feedbacks-list.component.html',
  styleUrls: ['./feedbacks-list.component.css'],
})
export class FeedbacksListComponent {
  constructor(public db: DatabaseService) {}
  feedbacks$: Observable<FeedbackI[]> = this.db.getData('feedbacks');
}
