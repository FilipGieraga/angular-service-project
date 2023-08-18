import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { YourFeedbackComponent } from './your-feedback.component';
import { DatabaseService } from 'src/app/services/database.service';
import { of } from 'rxjs';

describe('YourFeedbackComponent', () => {
  let component: YourFeedbackComponent;
  let fixture: ComponentFixture<YourFeedbackComponent>;
  let databaseServiceSpy: jasmine.SpyObj<DatabaseService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const databaseServiceSpyObj = jasmine.createSpyObj('DatabaseService', [
      'sendData',
    ]);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [YourFeedbackComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: DatabaseService, useValue: databaseServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
    }).compileComponents();

    databaseServiceSpy = TestBed.inject(
      DatabaseService
    ) as jasmine.SpyObj<DatabaseService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the yourFeedbackForm with default values', () => {
    expect(component.yourFeedbackForm.value).toEqual({
      orderId: '',
      feedbackText: '',
      overalExperience: 5,
      serviceQuality: 5,
    });
  });

  it('should call sendData method of DatabaseService and navigate to feedbacks page when sendYourFeedback is called with valid form', () => {
    const expectedFeedback = {
      orderId: '12345',
      feedbackText: 'Test feedback',
      overalExperience: 4,
      serviceQuality: 3,
    };
    component.yourFeedbackForm.patchValue(expectedFeedback);

    databaseServiceSpy.sendData.and.returnValue(of({}));

    component.sendYourFeedback();

    expect(databaseServiceSpy.sendData).toHaveBeenCalledWith(
      'feedbacks',
      expectedFeedback
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/preferences/feedbacks']);
  });

  it('should not call sendData method of DatabaseService and not navigate to feedbacks page when sendYourFeedback is called with invalid form', () => {
    component.sendYourFeedback();

    expect(databaseServiceSpy.sendData).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
