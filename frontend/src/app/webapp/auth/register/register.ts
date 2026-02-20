import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, MatIcon],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = signal(false);
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  acceptTerms = false;
  error = signal('');

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onSubmit() {
    this.error.set('');

    if (
      !this.formData.firstName ||
      !this.formData.lastName ||
      !this.formData.email ||
      !this.formData.password
    ) {
      this.error.set('Veuillez remplir tous les champs.');
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.error.set('Les mots de passe ne correspondent pas.');
      return;
    }

    if (this.formData.password.length < 8) {
      this.error.set('Le mot de passe doit contenir au moins 8 caract\u00e8res.');
      return;
    }

    if (!this.acceptTerms) {
      this.error.set("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    this.authService
      .register({
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        password: this.formData.password,
      })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => this.error.set(err?.error?.message || "Erreur lors de l'inscription."),
      });
  }
}
