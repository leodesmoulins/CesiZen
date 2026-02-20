import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { Diagnostic } from '../../../shared/services/diagnostic.service';
import { DiagnosticQuestion } from '../../../shared/models/diagnostic.interface';

@Component({
  selector: 'app-diagnostic-questionnaire',
  imports: [MatIcon, DashboardHeader],
  templateUrl: './diagnostic-questionnaire.html',
  styleUrl: './diagnostic-questionnaire.css',
})
export class DiagnosticQuestionnaire {
  private diagnosticService = inject(Diagnostic);
  private router = inject(Router);

  readonly ITEMS_PER_PAGE = 10;

  stressEvents = signal<DiagnosticQuestion[]>([]);
  selectedEvents = signal<number[]>([]);
  currentPage = signal(0);

  totalPages = computed(() => Math.ceil(this.stressEvents().length / this.ITEMS_PER_PAGE));

  currentEvents = computed(() => {
    const start = this.currentPage() * this.ITEMS_PER_PAGE;
    return this.stressEvents().slice(start, start + this.ITEMS_PER_PAGE);
  });

  totalScore = computed(() => {
    const selected = this.selectedEvents();
    return this.stressEvents()
      .filter((e) => selected.includes(e.id))
      .reduce((sum, e) => sum + e.points, 0);
  });

  progressPercent = computed(() => {
    const total = this.totalPages();
    return total > 0 ? ((this.currentPage() + 1) / total) * 100 : 0;
  });

  constructor() {
    this.diagnosticService.getQuestions().subscribe({
      next: (questions) => this.stressEvents.set(questions),
      error: () => {
        // Fallback: use default Holmes & Rahe events
        this.stressEvents.set(this.getDefaultEvents());
      },
    });
  }

  toggleEvent(eventId: number) {
    this.selectedEvents.update((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId],
    );
  }

  isSelected(eventId: number): boolean {
    return this.selectedEvents().includes(eventId);
  }

  prevPage() {
    this.currentPage.update((p) => Math.max(0, p - 1));
  }

  nextPage() {
    this.currentPage.update((p) => p + 1);
  }

  showResults() {
    // Store results in sessionStorage for the result page
    sessionStorage.setItem('diagnostic_score', this.totalScore().toString());
    sessionStorage.setItem('diagnostic_selected', JSON.stringify(this.selectedEvents()));
    sessionStorage.setItem('diagnostic_events', JSON.stringify(this.stressEvents()));
    this.router.navigate(['/diagnostic/result']);
  }

  private getDefaultEvents(): DiagnosticQuestion[] {
    const events = [
      { eventName: 'D\u00e9c\u00e8s du conjoint', points: 100 },
      { eventName: 'Divorce', points: 73 },
      { eventName: 'S\u00e9paration conjugale', points: 65 },
      { eventName: 'S\u00e9jour en prison', points: 63 },
      { eventName: "D\u00e9c\u00e8s d'un proche parent", points: 63 },
      { eventName: 'Blessure ou maladie personnelle', points: 53 },
      { eventName: 'Mariage', points: 50 },
      { eventName: 'Licenciement', points: 47 },
      { eventName: 'R\u00e9conciliation conjugale', points: 45 },
      { eventName: 'Retraite', points: 45 },
      { eventName: "Changement de sant\u00e9 d'un membre de la famille", points: 44 },
      { eventName: 'Grossesse', points: 40 },
      { eventName: 'Difficult\u00e9s sexuelles', points: 39 },
      { eventName: "Arriv\u00e9e d'un nouveau membre dans la famille", points: 39 },
      { eventName: 'Changement professionnel important', points: 39 },
      { eventName: 'Changement de situation financi\u00e8re', points: 38 },
      { eventName: "D\u00e9c\u00e8s d'un ami proche", points: 37 },
      { eventName: "Changement d'emploi / reconversion", points: 36 },
      { eventName: 'Augmentation des disputes conjugales', points: 35 },
      { eventName: 'Hypoth\u00e8que ou pr\u00eat important', points: 31 },
      { eventName: "Saisie d'hypoth\u00e8que ou de pr\u00eat", points: 30 },
      { eventName: 'Changement de responsabilit\u00e9s au travail', points: 29 },
      { eventName: "D\u00e9part d'un enfant du foyer", points: 29 },
      { eventName: 'Probl\u00e8mes avec la belle-famille', points: 29 },
      { eventName: 'R\u00e9alisation personnelle remarquable', points: 28 },
      { eventName: 'D\u00e9but ou fin de travail du conjoint', points: 26 },
      { eventName: 'D\u00e9but ou fin de scolarit\u00e9', points: 26 },
      { eventName: 'Changement de conditions de vie', points: 25 },
      { eventName: "Changement d'habitudes personnelles", points: 24 },
      { eventName: 'Difficult\u00e9s avec un sup\u00e9rieur', points: 23 },
      { eventName: "Changement d'horaires ou conditions de travail", points: 20 },
      { eventName: 'Changement de r\u00e9sidence', points: 20 },
      { eventName: "Changement d'\u00e9cole", points: 20 },
      { eventName: 'Changement de loisirs', points: 19 },
      { eventName: "Changement d'activit\u00e9s religieuses", points: 19 },
      { eventName: "Changement d'activit\u00e9s sociales", points: 18 },
      { eventName: 'Emprunt ou pr\u00eat mineur', points: 17 },
      { eventName: "Changement d'habitudes de sommeil", points: 16 },
      { eventName: 'Changement du nombre de r\u00e9unions familiales', points: 15 },
      { eventName: "Changement d'habitudes alimentaires", points: 15 },
      { eventName: 'Vacances', points: 13 },
      { eventName: "F\u00eates de fin d'ann\u00e9e", points: 12 },
      { eventName: 'Infractions mineures \u00e0 la loi', points: 11 },
    ];
    return events.map((e, i) => ({
      id: i + 1,
      eventName: e.eventName,
      points: e.points,
      order: i + 1,
      isActive: true,
    }));
  }
}
