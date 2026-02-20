import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationApplication } from '../../../shared/services/auth/authentication.application';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, MatIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authApp = inject(AuthenticationApplication);
  private router = inject(Router);

  showPassword = signal(false);
  email = '';
  password = '';
  error = signal('');

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit() {
    this.error.set('');
    if (!this.email || !this.password) {
      this.error.set('Veuillez remplir tous les champs.');
      return;
    }
    this.authApp.login(this.email, this.password);
  }
}
