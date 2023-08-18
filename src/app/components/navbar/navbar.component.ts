import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showNavbar = false;
  userLoggedIn = false;
  authenticationServiceSpy: any;
  constructor(private auth: AuthenticationService) {
    this.auth.userStat.subscribe((userLoginStatus) => {
      this.userLoggedIn = userLoginStatus === null ? false : true;
      if (this.userLoggedIn) {
        console.log('Logged In');
      } else {
        console.log('logged out');
      }
    });
  }

  logOut() {
    this.auth.signOut();
  }
  showMore() {
    this.showNavbar = !this.showNavbar;
  }
}
