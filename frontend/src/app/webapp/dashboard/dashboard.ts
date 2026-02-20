import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService, DashboardData } from '../../shared/services/dashboard.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MatIcon, MatProgressBar, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);
  private router = inject(Router);

  dashboardData = signal<DashboardData | null>(null);
  loading = signal(true);

  get user() {
    return this.authService.getCurrentUser();
  }

  get userName(): string {
    const user = this.user;
    return user ? user.firstName : 'Utilisateur';
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading.set(true);
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading dashboard:', err);
        this.loading.set(false);
      },
    });
  }

  getCategoryColor(category: string): string {
    switch (category?.toUpperCase()) {
      case 'FAIBLE':
        return 'text-green-600';
      case 'MOYEN':
        return 'text-orange-500';
      case 'ÉLEVÉ':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }

  getCategoryLabel(category: string): string {
    return category || 'Non défini';
  }

  getProgressPercentage(current: number, total: number): number {
    return total > 0 ? (current / total) * 100 : 0;
  }
}
