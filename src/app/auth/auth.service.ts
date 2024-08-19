import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';

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
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {}
  signup(email: string, password: string, name: string, phone: string) {
    return this.http.post('http://127.0.0.1:8000/api/register', {
      email: email,
      password: password,
      name: name,
      status: 1,
      phone: phone,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((resData) => {
          const user = new User(
            resData.response.access_token,
            resData.response.expires_in
          );
          this.user.next(user);
          this.autoLogout(resData.response.expires_in * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.access_token, userData.expires_in);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      alert('You have been Logged out, Please Login again to see posts');
    }, expirationDuration);
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
