import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApplication } from '../../services/auth/authentication.application';

/**
 * Guest guard to redirect authenticated users away from public routes.
 * This guard checks if the user is NOT authenticated before allowing navigation to routes like login/register.
 * If the user is already authenticated, they are redirected to the home page.
 */
export const userIsGuest: CanActivateFn = (
  route,
  state,
  application = inject(AuthenticationApplication),
  router = inject(Router),
) => {
  if (application.isAuthenticated()) {
    router.navigate(['']);
    return false;
  }
  return true;
};