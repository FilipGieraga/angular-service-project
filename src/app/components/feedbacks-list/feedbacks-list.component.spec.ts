import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksListComponent } from './feedbacks-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('FeedbacksListComponent', () => {
  let component: FeedbacksListComponent;
  let fixture: ComponentFixture<FeedbacksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbacksListComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(FeedbacksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
