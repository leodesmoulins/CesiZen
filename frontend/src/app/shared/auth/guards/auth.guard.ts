import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApplication } from '../../services/auth/authentication.application';

/**
 * Authentication guard to protect routes from unauthorized access.
 * This guard checks if the user is authenticated before allowing navigation.
 */
export const userIsAuthenticated: CanActivateFn = (
  route,
  state,
  application = inject(AuthenticationApplication),
  router = inject(Router),
) => {
  if (!application.isAuthenticated()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
