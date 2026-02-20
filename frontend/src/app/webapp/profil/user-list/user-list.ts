import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../shared/services/user.service';
import { UserProfile } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [MatIcon],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  users = signal<UserProfile[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  deactivateUser(userId: number) {
    this.userService.deactivateUser(userId).subscribe({
      next: () => {
        this.snackBar.open('Utilisateur d\u00e9sactiv\u00e9', 'OK', { duration: 3000 });
        this.loadUsers();
      },
      error: () => {
        this.snackBar.open('Erreur lors de la d\u00e9sactivation', 'OK', { duration: 3000 });
      },
    });
  }

  deleteUser(userId: number) {
    if (!confirm('\u00cates-vous s\u00fbr de vouloir supprimer cet utilisateur ?')) return;
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.snackBar.open('Utilisateur supprim\u00e9', 'OK', { duration: 3000 });
        this.loadUsers();
      },
      error: () => {
        this.snackBar.open('Erreur lors de la suppression', 'OK', { duration: 3000 });
      },
    });
  }

  getInitials(user: UserProfile): string {
    return ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase();
  }
}
