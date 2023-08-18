import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const authenticationServiceSpyObj = jasmine.createSpyObj(
      'AuthenticationService',
      ['signUp', 'signIn']
    );

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceSpyObj,
        },
      ],
    }).compileComponents();

    authenticationServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function mockAsyncOperation(): Promise<void> {
    return Promise.resolve(); // Resolving with undefined
  }

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registerForm and loginForm with empty values', () => {
    expect(component.registerForm.value).toEqual({ email: '', password: '' });
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should call signUp method of AuthenticationService when registerUser is called with valid form', () => {
    const expectedEmail = 'test@example.com';
    const expectedPassword = 'password123';
    component.registerForm.patchValue({
      email: expectedEmail,
      password: expectedPassword,
    });

    authenticationServiceSpy.signUp.and.returnValue(mockAsyncOperation());

    component.registerUser();

    expect(authenticationServiceSpy.signUp).toHaveBeenCalledWith(
      expectedEmail,
      expectedPassword
    );
  });

  it('should not call signUp method of AuthenticationService when registerUser is called with invalid form', () => {
    component.registerUser();

    expect(authenticationServiceSpy.signUp).not.toHaveBeenCalled();
  });

  it('should toggle the loginFormVisible property when switchForm is called', () => {
    const initialValue = component.loginFormVisible;
    component.switchForm();
    expect(component.loginFormVisible).toBe(!initialValue);
    component.switchForm();
    expect(component.loginFormVisible).toBe(initialValue);
  });
});
