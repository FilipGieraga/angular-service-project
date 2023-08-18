import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { DatabaseService } from 'src/app/services/database.service';
import { Subject } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let databaseServiceSpy: jasmine.SpyObj<DatabaseService>;

  beforeEach(async () => {
    const databaseServiceSpyObj = jasmine.createSpyObj('DatabaseService', [
      'sendData',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: DatabaseService, useValue: databaseServiceSpyObj },
      ],
    }).compileComponents();

    databaseServiceSpy = TestBed.inject(
      DatabaseService
    ) as jasmine.SpyObj<DatabaseService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = { id: 12, name: 'dsa', img: 'dsa', rating: '5' };
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the review form with default values', () => {
    expect(component.reviewForm.value).toEqual({ feedbackText: '', rating: 5 });
  });

  it('should not call sendData method of DatabaseService when sendReview is called with invalid form', fakeAsync(() => {
    component.sendReview();
    tick();

    expect(databaseServiceSpy.sendData).not.toHaveBeenCalled();
  }));

  it('should unsubscribe from componentDestroyed$ when ngOnDestroy is called', () => {
    spyOn(component.componentDestroyed$, 'next');
    spyOn(component.componentDestroyed$, 'complete');

    component.ngOnDestroy();

    expect(component.componentDestroyed$.next).toHaveBeenCalled();
    expect(component.componentDestroyed$.complete).toHaveBeenCalled();
  });
});
