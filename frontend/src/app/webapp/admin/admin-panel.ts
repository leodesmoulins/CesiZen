import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AdminService, AdminStats } from '../../shared/services/admin.service';
import { UserList } from '../profil/user-list/user-list';
import { InfoPageManagement } from '../info-page/info-page-management/info-page-management';
import { DiagnosticQuestionManagement } from '../diagnostic/diagnostic-question-management/diagnostic-question-management';

type TabType = 'users' | 'content' | 'diagnostic';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, MatIcon, UserList, InfoPageManagement, DiagnosticQuestionManagement],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel implements OnInit {
  private adminService = inject(AdminService);

  stats = signal<AdminStats | null>(null);
  isLoading = signal(true);
  activeTab = signal<TabType>('users');

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading.set(true);
    this.adminService.getAdminStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  setActiveTab(tab: TabType) {
    this.activeTab.set(tab);
  }

  isTabActive(tab: TabType): boolean {
    return this.activeTab() === tab;
  }
}
