import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsListComponent } from './reviews-list.component';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';
import { ReviewI } from 'src/app/models/ReviewModel';
import { FeedbackReviewItemComponent } from '../feedback-review-item/feedback-review-item.component';
describe('ReviewsListComponent', () => {
  let component: ReviewsListComponent;
  let fixture: ComponentFixture<ReviewsListComponent>;
  let databaseServiceSpy: jasmine.SpyObj<DatabaseService>;
  const dummyReviews: ReviewI[] = [
    {
      id: 1,
      productName: 'sad',
      feedbackText: 'dsada',
      rating: 4,
    },
    {
      id: 2,
      productName: 'asdfasdf',
      feedbackText: 'asdfsadf',
      rating: 2,
    },
  ];

  beforeEach(async () => {
    const databaseServiceSpyObj = jasmine.createSpyObj('DatabaseService', [
      'getPaginatedReviews',
      'getData',
      'generateNumberArray',
    ]);
    databaseServiceSpyObj.getPaginatedReviews.and.returnValue(of(dummyReviews));
    databaseServiceSpyObj.getData.and.returnValue(of(dummyReviews));
    databaseServiceSpyObj.generateNumberArray.and.returnValue([1, 2, 3]);

    await TestBed.configureTestingModule({
      declarations: [ReviewsListComponent, FeedbackReviewItemComponent],
      providers: [
        { provide: DatabaseService, useValue: databaseServiceSpyObj },
      ],
    }).compileComponents();

    databaseServiceSpy = TestBed.inject(
      DatabaseService
    ) as jasmine.SpyObj<DatabaseService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch reviews on component initialization', () => {
    spyOn(component, 'fetchReviews').and.callThrough();

    component.ngOnInit();

    expect(component.fetchReviews).toHaveBeenCalledWith(component.currentPage);
    expect(databaseServiceSpy.getPaginatedReviews).toHaveBeenCalledWith(
      component.currentPage
    );
    expect(component.reviews).toEqual(dummyReviews);
    expect(databaseServiceSpy.getData).toHaveBeenCalledWith('reviews');
    expect(component.totalReviews).toEqual(dummyReviews.length);
  });

  it('should fetch reviews when page is changed', () => {
    spyOn(component, 'fetchReviews').and.callThrough();
    const page = 2;

    component.onPageChange(page);

    expect(component.fetchReviews).toHaveBeenCalledWith(page);
    expect(databaseServiceSpy.getPaginatedReviews).toHaveBeenCalledWith(page);
    expect(component.reviews).toEqual(dummyReviews);
    expect(databaseServiceSpy.getData).toHaveBeenCalledWith('reviews');
    expect(component.totalReviews).toEqual(dummyReviews.length);
  });
});
