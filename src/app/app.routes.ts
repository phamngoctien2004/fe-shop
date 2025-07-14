import { Routes } from '@angular/router';
import {LoginComponent} from './modules/auth/login/login.component';
import {VerifyComponent} from './modules/auth/verify/verify.component';
import {GoogleComponent} from './modules/auth/google/google.component';
import {HomeComponent} from './modules/pages/user/home/home.component';
import {DashboardComponent} from './modules/dashboard/dashboard/dashboard.component';
import {AuthGuard} from './core/guards/AuthGuard';
import {RoleGuard} from './core/guards/RoleGuard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/verify',
    component: VerifyComponent
  },
  {
    path: 'login/google',
    component: GoogleComponent
  }
];
