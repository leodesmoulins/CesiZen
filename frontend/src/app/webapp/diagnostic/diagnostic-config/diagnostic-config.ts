import { Component, inject, signal, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';
import { DiagnosticAdmin } from '../../../shared/services/diagnostic-admin.service';
import { DiagnosticConfig as DiagnosticConfigModel } from '../../../shared/models/diagnostic.interface';

@Component({
  selector: 'app-diagnostic-config',
  imports: [MatIcon, FormsModule, DashboardHeader],
  templateUrl: './diagnostic-config.html',
  styleUrl: './diagnostic-config.css',
})
export class DiagnosticConfig implements OnInit {
  private diagnosticAdmin = inject(DiagnosticAdmin);
  private snackBar = inject(MatSnackBar);

  config = signal<DiagnosticConfigModel | null>(null);
  isLoading = signal(true);
  isSaving = signal(false);

  formData: DiagnosticConfigModel = {
    id: 0,
    minScoreLow: 0,
    maxScoreLow: 150,
    minScoreMedium: 151,
    maxScoreMedium: 300,
    minScoreHigh: 301,
    maxScoreHigh: 999,
    textLow: '',
    textMedium: '',
    textHigh: '',
  };

  ngOnInit() {
    this.diagnosticAdmin.getConfig().subscribe({
      next: (config) => {
        this.config.set(config);
        this.formData = { ...config };
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  saveConfig() {
    this.isSaving.set(true);
    this.diagnosticAdmin.updateConfig(this.formData).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.snackBar.open('Configuration mise \u00e0 jour', 'OK', { duration: 3000 });
      },
      error: () => {
        this.isSaving.set(false);
        this.snackBar.open('Erreur lors de la sauvegarde', 'OK', { duration: 3000 });
      },
    });
  }
}
