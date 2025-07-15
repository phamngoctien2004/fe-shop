import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/AuthService';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private route: Router
  ) {
  }
  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
      this.route.navigate(['/login'])
      return false;
    }
    return true;
  }

}
