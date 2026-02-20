import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { InfoPageService } from '../../../shared/services/info-page.service';
import { InfoPage } from '../../../shared/models/info-page.interface';

@Component({
  selector: 'app-info-page-detail',
  imports: [RouterLink, MatIcon, DashboardHeader],
  templateUrl: './info-page-detail.html',
  styleUrl: './info-page-detail.css',
})
export class InfoPageDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private infoPageService = inject(InfoPageService);

  page = signal<InfoPage | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.infoPageService.getPageBySlug(slug).subscribe({
        next: (page) => {
          this.page.set(page);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
    }
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
