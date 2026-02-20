import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { InfoPageService } from '../../../shared/services/info-page.service';
import { InfoPage } from '../../../shared/models/info-page.interface';

@Component({
  selector: 'app-info-page-list',
  imports: [RouterLink, MatIcon, FormsModule, DashboardHeader],
  templateUrl: './info-page-list.html',
  styleUrl: './info-page-list.css',
})
export class InfoPageList {
  private infoPageService = inject(InfoPageService);

  pages = signal<InfoPage[]>([]);
  searchQuery = signal('');
  isLoading = signal(true);

  filteredPages = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.pages();
    return this.pages().filter(
      (p) => p.title.toLowerCase().includes(query) || p.content.toLowerCase().includes(query),
    );
  });

  featuredPages = computed(() => this.filteredPages().slice(0, 3));
  allPages = computed(() => this.filteredPages());

  constructor() {
    this.infoPageService.getPublishedPages().subscribe({
      next: (pages) => {
        this.pages.set(pages);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
  }

  getExcerpt(content: string, maxLength = 120): string {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
