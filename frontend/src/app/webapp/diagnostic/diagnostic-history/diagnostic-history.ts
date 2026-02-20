import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { Diagnostic } from '../../../shared/services/diagnostic.service';
import { DiagnosticResult } from '../../../shared/models/diagnostic.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-diagnostic-history',
  imports: [RouterLink, MatIcon, DashboardHeader, NgClass],
  templateUrl: './diagnostic-history.html',
  styleUrl: './diagnostic-history.css',
})
export class DiagnosticHistory {
  private diagnosticService = inject(Diagnostic);

  results = signal<DiagnosticResult[]>([]);
  isLoading = signal(true);

  constructor() {
    this.diagnosticService.getUserResults().subscribe({
      next: (results) => {
        this.results.set(results);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  getLevel(score: number): { label: string; colorClass: string; bgClass: string } {
    if (score <= 150)
      return { label: 'Faible', colorClass: 'text-primary', bgClass: 'bg-primary/10' };
    if (score <= 300)
      return { label: 'Mod\u00e9r\u00e9', colorClass: 'text-accent', bgClass: 'bg-accent/15' };
    return {
      label: '\u00c9lev\u00e9',
      colorClass: 'text-destructive',
      bgClass: 'bg-destructive/10',
    };
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
