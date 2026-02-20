import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { DashboardHeader } from '../../../shared/include/dashboard-header/dashboard-header';

@Component({
  selector: 'app-diagnostic-intro',
  imports: [RouterLink, MatIcon, DashboardHeader],
  templateUrl: './diagnostic-intro.html',
  styleUrl: './diagnostic-intro.css',
})
export class DiagnosticIntro {}
