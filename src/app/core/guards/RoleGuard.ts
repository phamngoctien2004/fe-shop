import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/AuthService';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate{
  constructor(
    private authService: AuthService,
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role = this.authService.getRole();
    if(route.data['roles'].includes(role)){
      return true
    }
    return false;
  }

}
