import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [DatabaseService, AuthenticationService],
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
