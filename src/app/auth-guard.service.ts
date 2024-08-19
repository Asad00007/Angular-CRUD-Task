import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements OnDestroy {
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
  canActivate() {
    return this.isAuthenticated;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
};
