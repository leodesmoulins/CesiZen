import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { concatMap, pipe, tap } from 'rxjs';
import { computed, inject, Signal } from '@angular/core';
import { User } from '../../models/auth.interface';
import { AuthenticationInfracstructure } from '../../services/auth/authentication.infracstructure';
import { localStorageAuthenticationInfrastructure } from '../../services/auth/localstorage.authentication.infracstructure';

// 1. State to be created
export interface AuthenticationState {
  user: User | undefined | null;
  isLoading: boolean;
}

export interface AuthenticationStoreType {
  user: Signal<User | undefined | null>;
  isLoading: Signal<boolean>;
  isAuthenticated: Signal<boolean>;

  logIn: (auth: AuthenticateType) => void;
  logOut: () => void;
  localLogin: (user: User) => void;
}

export type AuthenticateType = {
  login: string;
  password: string;
};

// 2. Initial value
const initialValue: AuthenticationState = {
  user: undefined,
  isLoading: false,
};

// 3. Reducer / store ...
export const AuthenticationStore = signalStore(
  { providedIn: 'root' },
  withState(initialValue),
  withComputed((store) => ({
    isAuthenticated: computed(() => store.user() !== undefined),
  })),
  withMethods(
    (
      store,
      infra = inject(AuthenticationInfracstructure),
      localInfra = inject(localStorageAuthenticationInfrastructure),
    ) => ({
      localLogin(user: User): void {
        patchState(store, {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            active: user.active,
            roles: user.roles,
            isAdmin: user.isAdmin,
          },
        });
      },
      logIn: rxMethod<AuthenticateType>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          concatMap((input) => {
            return infra.login(input.login, input.password).pipe(
              tap((user) => {
                localInfra.startSession({
                  id: user.id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  active: user.active,
                  roles: user.roles,
                  isAdmin: user.isAdmin,
                });
              }),
              tapResponse({
                next: (user: User) => {
                  patchState(store, { isLoading: false, user });
                },
                error: () => {
                  patchState(store, { isLoading: false });
                },
              }),
            );
          }),
        ),
      ),
      logOut(): void {
        patchState(store, {
          user: null,
        });
        localInfra.clearSession();
      },
    }),
  ),
  withHooks({
    onInit(store, localInfra = inject(localStorageAuthenticationInfrastructure)) {
      // Restaurer la session au démarrage
      const savedUser = localInfra.getSession();
      if (savedUser) {
        patchState(store, { user: savedUser });
      }
    },
  }),
);
