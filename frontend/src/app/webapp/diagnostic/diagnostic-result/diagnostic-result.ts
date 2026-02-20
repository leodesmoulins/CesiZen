import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { NgClass } from '@angular/common';
import { Diagnostic } from '../../../shared/services/diagnostic.service';
import { AuthenticationApplication } from '../../../shared/services/auth/authentication.application';

@Component({
  selector: 'app-diagnostic-result',
  imports: [MatIcon, DashboardHeader, NgClass],
  templateUrl: './diagnostic-result.html',
  styleUrl: './diagnostic-result.css',
})
export class DiagnosticResult {
  private router = inject(Router);
  private diagnosticService = inject(Diagnostic);
  private authApp = inject(AuthenticationApplication);

  totalScore = signal(0);
  selectedEventIds = signal<number[]>([]);
  allEvents = signal<{ id: number; eventName: string; points: number }[]>([]);

  selectedEventsDetails = computed(() => {
    const ids = this.selectedEventIds();
    return this.allEvents().filter((e) => ids.includes(e.id));
  });

  level = computed(() => {
    const score = this.totalScore();
    if (score <= 150) {
      return {
        label: 'Faible',
        color: 'text-primary',
        bg: 'bg-primary/10',
        icon: 'trending_down',
        description:
          'Votre niveau de stress est relativement bas. Continuez \u00e0 prendre soin de vous et maintenez vos bonnes habitudes.',
      };
    }
    if (score <= 300) {
      return {
        label: 'Mod\u00e9r\u00e9',
        color: 'text-accent',
        bg: 'bg-accent/15',
        icon: 'horizontal_rule',
        description:
          'Votre niveau de stress est mod\u00e9r\u00e9. Quelques ajustements dans votre quotidien pourraient vous aider \u00e0 mieux le g\u00e9rer.',
      };
    }
    return {
      label: '\u00c9lev\u00e9',
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      icon: 'trending_up',
      description:
        "Votre niveau de stress est \u00e9lev\u00e9. Il est recommand\u00e9 de consulter un professionnel et d'adopter des strat\u00e9gies de gestion du stress.",
    };
  });

  constructor() {
    const score = sessionStorage.getItem('diagnostic_score');
    const selected = sessionStorage.getItem('diagnostic_selected');
    const events = sessionStorage.getItem('diagnostic_events');

    if (score) this.totalScore.set(parseInt(score, 10));
    if (selected) this.selectedEventIds.set(JSON.parse(selected));
    if (events) this.allEvents.set(JSON.parse(events));

    // Save result if authenticated
    if (this.authApp.isAuthenticated() && score) {
      this.diagnosticService
        .saveResults({
          totalScore: this.totalScore(),
          selectedIds: this.selectedEventIds(),
        })
        .subscribe();
    }
  }

  resetDiagnostic() {
    sessionStorage.removeItem('diagnostic_score');
    sessionStorage.removeItem('diagnostic_selected');
    sessionStorage.removeItem('diagnostic_events');
    this.router.navigate(['/diagnostic']);
  }
}
