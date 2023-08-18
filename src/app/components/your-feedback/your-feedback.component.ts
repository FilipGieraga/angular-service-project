import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-your-feedback',
  templateUrl: './your-feedback.component.html',
  styleUrls: ['./your-feedback.component.css'],
})
export class YourFeedbackComponent {
  yourFeedbackForm = new FormGroup({
    orderId: new FormControl('', [Validators.required]),
    feedbackText: new FormControl('', [Validators.required]),
    overalExperience: new FormControl(5, [Validators.required]),
    serviceQuality: new FormControl(5, [Validators.required]),
  });

  constructor(private db: DatabaseService, private router: Router) {}

  sendYourFeedback() {
    if (this.yourFeedbackForm.invalid) return;
    this.db.sendData('feedbacks', this.yourFeedbackForm.value).subscribe();
    this.router.navigate(['/preferences/feedbacks']);
  }
}
