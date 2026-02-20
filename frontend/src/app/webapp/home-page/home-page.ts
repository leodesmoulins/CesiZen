import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { AuthenticationApplication } from '../../shared/services/auth/authentication.application';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, MatIcon, NgClass],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private authApp = inject(AuthenticationApplication);
  private router = inject(Router);

  ngOnInit() {
    if (this.authApp.isAuthenticated()) {
      this.router.navigate(['/profile']);
    }
  }

  features = [
    {
      icon: 'menu_book',
      title: 'Informations',
      description:
        'Acc\u00e9dez \u00e0 des contenus riches et v\u00e9rifi\u00e9s sur la sant\u00e9 mentale, le stress et la pr\u00e9vention. Apprenez \u00e0 votre rythme.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: 'assignment_turned_in',
      title: 'Diagnostic de stress',
      description:
        '\u00c9valuez votre niveau de stress gr\u00e2ce \u00e0 un questionnaire scientifique. Obtenez des r\u00e9sultats personnalis\u00e9s et des conseils adapt\u00e9s.',
      color: 'bg-accent/20 text-accent',
    },
    {
      icon: 'person',
      title: 'Espace personnel',
      description:
        'G\u00e9rez votre profil, suivez votre progression et retrouvez votre historique de diagnostics en un seul endroit.',
      color: 'bg-chart-3/15 text-chart-3',
    },
    {
      icon: 'bar_chart',
      title: 'Suivi et rapports',
      description:
        "Visualisez l'\u00e9volution de votre bien-\u00eatre dans le temps gr\u00e2ce \u00e0 des graphiques clairs et des rapports d\u00e9taill\u00e9s.",
      color: 'bg-chart-4/15 text-chart-4',
    },
  ];

  benefits = [
    'Questionnaire de stress valid\u00e9 scientifiquement',
    'Contenus r\u00e9dig\u00e9s par des professionnels',
    'Interface accessible et intuitive',
    'Donn\u00e9es personnelles prot\u00e9g\u00e9es (RGPD)',
    'Suivi de votre progression dans le temps',
    'Disponible \u00e0 tout moment, o\u00f9 que vous soyez',
  ];

  sampleQuestions = [
    { text: "D\u00e9c\u00e8s d'un conjoint", points: 100 },
    { text: 'Divorce', points: 73 },
    { text: "Changement d'emploi", points: 36 },
    { text: 'Changement de r\u00e9sidence', points: 20 },
  ];
}
