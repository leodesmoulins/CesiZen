import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Diagnostic } from './diagnostic.service';
import { AuthService } from './auth/auth.service';

export interface DashboardStats {
  totalDiagnostics: number;
  lastScore: number;
  articlesRead: number;
  activeDays: number;
}

export interface RecentDiagnostic {
  id: number;
  date: string;
  score: number;
  category: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentDiagnostics: RecentDiagnostic[];
  weeklyProgress: {
    diagnostics: { current: number; total: number };
    articles: { current: number; total: number };
  };
  dailyTip: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private diagnosticService = inject(Diagnostic);
  private authService = inject(AuthService);

  getDashboardData(): Observable<DashboardData> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return of(this.getEmptyDashboard());
    }

    return this.diagnosticService.getUserResults().pipe(
      map((history) => {
        const recentDiagnostics = history.slice(0, 3).map((item: any) => ({
          id: item.id,
          date: new Date(item.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          score: item.totalScore,
          category: item.category,
        }));

        const lastScore = history.length > 0 ? history[0].totalScore : 0;

        return {
          stats: {
            totalDiagnostics: history.length,
            lastScore: lastScore,
            articlesRead: Math.floor(Math.random() * 30) + 10, // Mock data
            activeDays: this.calculateActiveDays(history),
          },
          recentDiagnostics,
          weeklyProgress: {
            diagnostics: { current: 2, total: 3 },
            articles: { current: 4, total: 5 },
          },
          dailyTip: this.getDailyTip(),
        };
      }),
    );
  }

  private calculateActiveDays(history: any[]): number {
    if (!history.length) return 0;
    const uniqueDates = new Set(
      history.map((item) => new Date(item.createdAt).toLocaleDateString()),
    );
    return uniqueDates.size;
  }

  private getDailyTip(): string {
    const tips = [
      'Prendre 5 minutes de pause toutes les heures peut réduire significativement votre niveau de stress. Essayez de vous lever et de faire quelques pas.',
      'La respiration profonde pendant 2 minutes peut aider à calmer votre esprit. Inspirez par le nez, expirez par la bouche.',
      "L'exercice physique régulier améliore votre humeur et réduit le stress. Commencez par 10 minutes de marche quotidienne.",
      'Un sommeil de qualité est essentiel pour gérer le stress. Essayez de maintenir des horaires réguliers.',
      "Prenez le temps de noter 3 choses positives qui vous sont arrivées aujourd'hui.",
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }

  private getEmptyDashboard(): DashboardData {
    return {
      stats: {
        totalDiagnostics: 0,
        lastScore: 0,
        articlesRead: 0,
        activeDays: 0,
      },
      recentDiagnostics: [],
      weeklyProgress: {
        diagnostics: { current: 0, total: 3 },
        articles: { current: 0, total: 5 },
      },
      dailyTip: this.getDailyTip(),
    };
  }
}
