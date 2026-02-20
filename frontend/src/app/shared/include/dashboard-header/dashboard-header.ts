import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationApplication } from '../../services/auth/authentication.application';

@Component({
  selector: 'app-dashboard-header',
  imports: [RouterLink, MatIcon],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {
  title = input('Tableau de bord');

  private authApp = inject(AuthenticationApplication);
  readonly user = this.authApp.user;
  menuOpen = signal(false);

  get userInitials(): string {
    const u = this.user();
    if (!u) return '';
    return `${u.firstName?.charAt(0) ?? ''}${u.lastName?.charAt(0) ?? ''}`;
  }

  get displayName(): string {
    const u = this.user();
    if (!u) return '';
    return `${u.firstName} ${u.lastName}`;
  }

  get displayEmail(): string {
    return this.user()?.email ?? '';
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  onLogout() {
    this.authApp.logout();
  }
}
