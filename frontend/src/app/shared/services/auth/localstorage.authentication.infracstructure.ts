import { Injectable } from '@angular/core';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class localStorageAuthenticationInfrastructure {
  private EXPIRATION_KEY = 'session_expiration';

  startSession(user: User): void {
    if (user.id && user.email && user.firstName && user.lastName && user.roles) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('id', user.id.toString());
      localStorage.setItem('email', user.email);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
      localStorage.setItem('roles', JSON.stringify(user.roles));

      localStorage.setItem('access', '');

      const expirationTime = new Date().getTime() + 7 * 60 * 60 * 1000; // 8 hours in milliseconds
      localStorage.setItem(this.EXPIRATION_KEY, expirationTime.toString());
    }
  }

  getSession(): User | null {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (expiration && new Date().getTime() > parseInt(expiration, 10)) {
      this.clearSession();
      return null;
    }

    const userData = localStorage.getItem('user');
    if (!userData) return null;

    return JSON.parse(userData);
  }

  clearSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('roles');
    localStorage.removeItem(this.EXPIRATION_KEY);
  }
}
