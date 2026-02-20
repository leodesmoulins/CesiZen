import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }
}
