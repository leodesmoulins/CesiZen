import { Component, inject } from '@angular/core';
import { Navbar } from '../shared/include/navbar/navbar';
import { Sidebar } from '../shared/include/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../shared/include/footer/footer';
import { AuthenticationApplication } from '../shared/services/auth/authentication.application';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Sidebar, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private authApp = inject(AuthenticationApplication);
  readonly isAuthenticated = this.authApp.isAuthenticated;
}
