import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormVisible = true;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthenticationService) {}

  registerUser() {
    if (this.registerForm.invalid) return;
    this.auth.signUp(
      this.registerForm.value.email!,
      this.registerForm.value.password!
    );
  }

  loginUser() {
    this.auth.signIn(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }

  switchForm() {
    this.loginFormVisible = !this.loginFormVisible!;
  }
}
