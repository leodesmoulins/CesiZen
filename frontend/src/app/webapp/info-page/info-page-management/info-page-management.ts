import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoPageService } from '../../../shared/services/info-page.service';
import { InfoPage } from '../../../shared/models/info-page.interface';

@Component({
  selector: 'app-info-page-management',
  imports: [RouterLink, MatIcon],
  templateUrl: './info-page-management.html',
  styleUrl: './info-page-management.css',
})
export class InfoPageManagement {
  private infoPageService = inject(InfoPageService);
  private snackBar = inject(MatSnackBar);

  pages = signal<InfoPage[]>([]);
  isLoading = signal(true);

  constructor() {
    this.loadPages();
  }

  loadPages() {
    this.isLoading.set(true);
    this.infoPageService.getPublishedPages().subscribe({
      next: (pages) => {
        this.pages.set(pages);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
}
