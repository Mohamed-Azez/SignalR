import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

//3Tutorial
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.authService.router.navigateByUrl("auth");
      return false;
    }
    return true;
  }
}