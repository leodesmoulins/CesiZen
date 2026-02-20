import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { InfoPageService } from '../../../shared/services/info-page.service';

@Component({
  selector: 'app-info-page-editor',
  imports: [RouterLink, MatIcon, FormsModule, DashboardHeader],
  templateUrl: './info-page-editor.html',
  styleUrl: './info-page-editor.css',
})
export class InfoPageEditor implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private infoPageService = inject(InfoPageService);
  private snackBar = inject(MatSnackBar);

  isEditing = signal(false);
  isSaving = signal(false);
  pageId = signal<number | null>(null);

  title = '';
  slug = '';
  content = '';
  published = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageId.set(Number(id));
      this.isEditing.set(true);
      this.infoPageService.getPageBySlug(id).subscribe({
        next: (page) => {
          this.title = page.title;
          this.slug = page.slug;
          this.content = page.content;
          this.published = page.published;
        },
      });
    }
  }

  generateSlug() {
    this.slug = this.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  savePage() {
    this.isSaving.set(true);
    const data = {
      title: this.title,
      slug: this.slug,
      content: this.content,
      published: this.published,
    };

    const obs = this.pageId()
      ? this.infoPageService.updateMenu(this.pageId()!, data)
      : this.infoPageService.createPage(data);

    obs.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.snackBar.open(
          this.pageId() ? 'Article mis \u00e0 jour' : 'Article cr\u00e9\u00e9',
          'OK',
          { duration: 3000 },
        );
        this.router.navigate(['/admin/pages']);
      },
      error: () => {
        this.isSaving.set(false);
        this.snackBar.open('Erreur lors de la sauvegarde', 'OK', { duration: 3000 });
      },
    });
  }
}
