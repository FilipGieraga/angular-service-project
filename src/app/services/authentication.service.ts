import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData = {};
  private userStatus = new BehaviorSubject<any>(null);

  get userStat() {
    return this.userStatus.asObservable();
  }

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: DatabaseService
  ) {
    this.afAuth.authState.subscribe((user) => this.handleAuthState(user));
  }

  private handleAuthState(user: any) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userStatus.next(user);
    } else {
      localStorage.setItem('user', 'null');
      this.userStatus.next(null);
    }
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => this.userStatus.next(user));
        this.db
          .sendData('userInfos', { email: email, contactMethod: 'Email' })
          .subscribe();
        this.router.navigate(['/preferences']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userStatus.next(null);
      this.router.navigate(['/']);
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.userStatus.next(user);
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
