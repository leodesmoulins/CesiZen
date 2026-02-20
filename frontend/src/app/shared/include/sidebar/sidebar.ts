import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationApplication } from '../../services/auth/authentication.application';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authApp = inject(AuthenticationApplication);
  private router = inject(Router);

  readonly user = this.authApp.user;
  readonly isAdmin = computed(() => this.user()?.isAdmin === true);

  get userInitials(): string {
    const u = this.user();
    if (!u) return '';
    return `${u.firstName?.charAt(0) ?? ''}${u.lastName?.charAt(0) ?? ''}`;
  }

  mainNavItems = [
    { title: 'Tableau de bord', href: '/dashboard', icon: 'dashboard' },
    { title: 'Informations', href: '/pages', icon: 'menu_book' },
    { title: 'Diagnostic', href: '/diagnostic', icon: 'assignment_turned_in' },
  ];

  accountNavItems = [
    { title: 'Mon profil', href: '/profile', icon: 'person' },
    { title: 'Historique', href: '/diagnostic/history', icon: 'history' },
  ];

  onLogout() {
    this.authApp.logout();
    this.router.navigate(['/']);
  }
}
