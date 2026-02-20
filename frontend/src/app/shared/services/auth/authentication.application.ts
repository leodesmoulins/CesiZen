import { effect, inject, Injectable, Injector, runInInjectionContext, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/auth.interface';
import { AuthenticationStore, AuthenticationStoreType } from '../../auth/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApplication {
  private readonly store = inject(AuthenticationStore) as AuthenticationStoreType;
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly injector = inject(Injector);

  private motsCles: string[] = ['ADMIN', 'USER'];

  login(login: string, password: string) {
    this.store.logIn({ login, password });

    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.store.isAuthenticated()) {
          const user = this.store.user();
          const roles = user?.roles;

          if (this.router.url === '/login') {
            if (user?.isAdmin) {
              this.snackBar.open("Vous êtes connecté en tant qu'Administrateur", 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.router.navigate(['']);
            } else if (user) {
              this.snackBar.open("Vous êtes connecté en tant qu'utilisateur", 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.router.navigate(['users']);
            }
          }
        }
      });
    });
  }

  get isLoading(): Signal<boolean> {
    return this.store.isLoading;
  }

  get isAuthenticated(): Signal<boolean> {
    return this.store.isAuthenticated;
  }

  get user(): Signal<User | null | undefined> {
    return this.store.user;
  }

  logout(): void {
    this.store.logOut();
  }
}
