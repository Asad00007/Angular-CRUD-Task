import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

interface LoginResponse {
  response: {
    message: string;
    status: number;
    data?: any;
    access_token?: string;
    token_type?: string;
    expires_in?: number;
  };
}

interface SignupResponse {
  response: {
    errors?: {
      email?: any;
      phone?: any;
    };
    message: string;
    status: number;
    data?: any;
  };
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  isLogin = true;
  isLoading = false;
  errorMessage = null;

  onToggleChange() {
    this.isLogin = !this.isLogin;
  }

  signUpForm: FormGroup;

  loginForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(7),
        Validators.required,
      ]),
      contact: new FormControl(null, [
        Validators.minLength(11),
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(/^\+[0-9]{11,15}$/),
      ]),
    });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignup() {
    if (!this.signUpForm.valid) {
      alert('Please fill out all the fields to SignUp');
    } else {
      // console.log(this.signUpForm);
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;
      const name = this.signUpForm.value.name;
      const phone = this.signUpForm.value.contact;

      this.isLoading = true;
      this.authService.signup(email, password, name, phone).subscribe(
        (resData: SignupResponse) => {
          console.log(resData);
          this.isLoading = false;
          if (
            resData.response.status !== 200 &&
            resData.response.status !== 201
          ) {
            if (resData.response.errors.email) {
              this.errorMessage = resData.response?.errors?.email;
            }
            if (resData.response.errors.phone) {
              this.errorMessage = resData.response?.errors?.phone;
            }
          }
          if (resData.response.status === 201) {
            this.errorMessage = resData.response.message;
            setTimeout(() => {
              this.isLogin = true;
            }, 1000);
          }
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);
        },
        (error) => {
          // console.log(error);
          this.isLoading = false;
        }
      );
      this.signUpForm.reset();
    }
  }

  onLogin() {
    if (!this.loginForm.valid) {
      alert('Please fill out all fields to login');
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.isLoading = true;
      this.authService.login(email, password).subscribe(
        (resData: LoginResponse) => {
          // console.log(resData);

          this.errorMessage = resData.response.message;
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);

          if (resData.response.status === 200) {
            this.router.navigate(['/']);
          }

          this.isLoading = false;
        },
        (error) => {
          console.log('error', error);
          this.isLoading = false;
        }
      );
    }
    this.loginForm.reset();
  }
}
