import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';

@Component({
  selector: 'app-menu-management',
  imports: [MatIcon, DashboardHeader],
  templateUrl: './menu-management.html',
  styleUrl: './menu-management.css',
})
export class MenuManagement {
  menus = signal<{ id: number; name: string; order: number }[]>([]);
  isLoading = signal(false);
}
