import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { AuthenticationApplication } from '../../../shared/services/auth/authentication.application';
import { UserService } from '../../../shared/services/user.service';
import { Diagnostic } from '../../../shared/services/diagnostic.service';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, MatIcon, DashboardHeader],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  private authApp = inject(AuthenticationApplication);
  private userService = inject(UserService);
  private diagnosticService = inject(Diagnostic);
  private snackBar = inject(MatSnackBar);

  readonly user = this.authApp.user;

  isEditing = signal(false);
  isSaving = signal(false);
  diagnosticCount = signal(0);

  firstName = '';
  lastName = '';
  email = '';

  ngOnInit() {
    const u = this.user();
    if (u) {
      this.firstName = u.firstName;
      this.lastName = u.lastName;
      this.email = u.email;
    }
    this.diagnosticService.getUserResults().subscribe({
      next: (results) => this.diagnosticCount.set(results.length),
      error: () => {},
    });
  }

  getInitials(): string {
    const u = this.user();
    if (!u) return '?';
    return ((u.firstName?.[0] || '') + (u.lastName?.[0] || '')).toUpperCase();
  }

  startEditing() {
    const u = this.user();
    if (u) {
      this.firstName = u.firstName;
      this.lastName = u.lastName;
      this.email = u.email;
    }
    this.isEditing.set(true);
  }

  cancelEditing() {
    this.isEditing.set(false);
  }

  saveProfile() {
    const u = this.user();
    if (!u) return;
    this.isSaving.set(true);
    this.userService
      .updateProfile(u.id, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      })
      .subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isEditing.set(false);
          this.snackBar.open('Profil mis \u00e0 jour avec succ\u00e8s', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: () => {
          this.isSaving.set(false);
          this.snackBar.open('Erreur lors de la mise \u00e0 jour', 'OK', {
            duration: 3000,
          });
        },
      });
  }
}
