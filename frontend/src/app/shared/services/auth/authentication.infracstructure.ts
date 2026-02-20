import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../models';
import { tap } from 'rxjs/internal/operators/tap';
import { map } from 'rxjs/internal/operators/map';
import { LoginRequest } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInfracstructure {
  private authService = inject(AuthService);

  login(email: string, password: string): Observable<User> {
    const loginRequest: LoginRequest = { email, password };
    return this.authService.login(loginRequest).pipe(
      map((response) => response.user),
      tap((user) => {
        console.log('User logged in:', user);
        if (!user) {
          console.error('Invalid user data received:', user);
        }
      }),
    );
  }
}
