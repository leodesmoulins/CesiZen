import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApplication } from '../../services/auth/authentication.application';

/**
 * Authentication guard to protect routes from unauthorized access.
 * This guard checks if the user is authenticated and has the 'admin' role before allowing navigation.
 */
export const userIsAdmin: CanActivateFn = (
  route,
  state,
  application = inject(AuthenticationApplication),
  router = inject(Router),
) => {
  const user = application.user();
  
  if (!application.isAuthenticated() || !user?.isAdmin) {
    router.navigate(['']);
    return false;
  }
  return true;
};
