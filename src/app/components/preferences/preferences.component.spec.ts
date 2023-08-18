import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferencesComponent } from './preferences.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferencesComponent],
      imports: [RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['paramName', 'paramValue']]) },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the PreferencesComponent', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed
});
