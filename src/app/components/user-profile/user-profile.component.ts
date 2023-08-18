import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  storedDetails!: any;

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService
  ) {}

  userDetailsForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    contactMethod: new FormControl('Email'),
    cardDetails: new FormControl(''),
  });

  ngOnInit(): void {
    this.auth.userStat
      .pipe(
        switchMap((userLoginStatus) => {
          if (userLoginStatus !== null) {
            return this.db.getUserDetails(userLoginStatus.email);
          } else {
            // Return an observable with an appropriate default value or behavior
            return of(null);
          }
        })
      )
      .subscribe((data) => {
        if (data !== null) {
          this.storedDetails = data[0];
          this.userDetailsForm.patchValue(this.storedDetails);
        }
      });
  }

  submitChanges() {
    if (this.userDetailsForm.invalid) return;
    this.db
      .updateUserDetails(this.storedDetails.id, this.userDetailsForm.value)
      .subscribe();
    location.reload();
  }
}
