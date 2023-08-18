import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { FeedbackItemComponent } from './feedback-item.component';
import { DatabaseService } from 'src/app/services/database.service';
import { FeedbackI } from 'src/app/models/FeedbackModel';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-mock-feedback-item',
  template: '<div>{{ feedback.feedbackText }}</div>',
})
class MockFeedbackItemComponent {
  @Input() feedback!: FeedbackI;
}

describe('FeedbackItemComponent', () => {
  let feedbackItemComponent: FeedbackItemComponent;
  let fixture: ComponentFixture<FeedbackItemComponent>;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackItemComponent, MockFeedbackItemComponent],
      providers: [DatabaseService],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackItemComponent);
    feedbackItemComponent = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService);

    const mockedFeedback: FeedbackI = {
      id: 1,
      orderId: 123,
      feedbackText: 'Great service!',
      overalExperience: 5,
      serviceQuality: 4,
    };
    feedbackItemComponent.feedback = mockedFeedback;

    fixture.detectChanges();
  });

  it('should create the FeedbackItemComponent', () => {
    expect(feedbackItemComponent).toBeTruthy();
  });

  it('should display the feedback text', () => {
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toContain('Great service!');
  });

  it('should generate the correct number of stars', () => {
    spyOn(databaseService, 'generateNumberArray').and.returnValue([1, 2, 3]);
    const stars = feedbackItemComponent.starsRating(3);
    expect(stars).toEqual([1, 2, 3]);
    expect(databaseService.generateNumberArray).toHaveBeenCalledWith(3);
  });
});
