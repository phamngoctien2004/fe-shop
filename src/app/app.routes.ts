import { Routes } from '@angular/router';
import {HomeComponent} from './modules/dashboard/home/home.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {VerifyComponent} from './modules/auth/verify/verify.component';
import {GoogleComponent} from './modules/auth/google/google.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
