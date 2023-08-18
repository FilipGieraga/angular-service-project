import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackReviewItemComponent } from './feedback-review-item.component';
import { ReviewI } from 'src/app/models/ReviewModel';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs'; // Import 'of' operator for creating observables

describe('FeedbackReviewItemComponent', () => {
  let component: FeedbackReviewItemComponent;
  let fixture: ComponentFixture<FeedbackReviewItemComponent>;
  let mockDbService: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    // Create a mock of the DatabaseService
    mockDbService = jasmine.createSpyObj('DatabaseService', [
      'generateNumberArray',
    ]);

    TestBed.configureTestingModule({
      declarations: [FeedbackReviewItemComponent],
      providers: [{ provide: DatabaseService, useValue: mockDbService }],
    });

    fixture = TestBed.createComponent(FeedbackReviewItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dbService.generateNumberArray when starsRating is called', () => {
    const numberOfStars = 5;
    const mockStarArray = [1, 2, 3, 4, 5];
    mockDbService.generateNumberArray.and.returnValue(mockStarArray);

    const result = component.starsRating(numberOfStars);

    expect(result).toEqual(mockStarArray);
    expect(mockDbService.generateNumberArray).toHaveBeenCalledWith(
      numberOfStars
    );
  });
});
