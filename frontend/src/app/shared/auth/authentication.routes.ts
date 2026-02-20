import { Routes } from '@angular/router';
import { Login } from '../../webapp/auth/login/login';

export const authenticationRoutes: Routes = [
  {
    path: 'login',
    component: Login,
  },
];
