import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const authenticationServiceSpyObj = jasmine.createSpyObj(
      'AuthenticationService',
      ['signOut']
    );
    const userStatSubject = new BehaviorSubject<boolean>(false);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceSpyObj,
        },
        {
          provide: AuthenticationService,
          useValue: { userStat: userStatSubject },
        },
      ],
    }).compileComponents();

    authenticationServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should toggle showNavbar property when showMore is called', () => {
    component.showNavbar = false;

    component.showMore();

    expect(component.showNavbar).toBeTrue();

    component.showMore();

    expect(component.showNavbar).toBeFalse();
  });
});
