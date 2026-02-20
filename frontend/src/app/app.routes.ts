import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

// Guards
import { userIsAuthenticated } from './shared/auth/guards/auth.guard';
import { userIsAdmin } from './shared/auth/guards/admin.guard';
import { userIsGuest } from './shared/auth/guards/guest.guard';

// Pages publiques
import { HomePage } from './webapp/home-page/home-page';
import { Login } from './webapp/auth/login/login';
import { Register } from './webapp/auth/register/register';

// Info Pages
import { InfoPageList } from './webapp/info-page/info-page-list/info-page-list';
import { InfoPageDetail } from './webapp/info-page/info-page-detail/info-page-detail';

// Diagnostic
import { DiagnosticIntro } from './webapp/diagnostic/diagnostic-intro/diagnostic-intro';
import { DiagnosticQuestionnaire } from './webapp/diagnostic/diagnostic-questionnaire/diagnostic-questionnaire';
import { DiagnosticResult } from './webapp/diagnostic/diagnostic-result/diagnostic-result';
import { DiagnosticHistory } from './webapp/diagnostic/diagnostic-history/diagnostic-history';

// Profil utilisateur
import { UserProfile } from './webapp/profil/user-profile/user-profile';

// Admin - Info Pages
import { InfoPageManagement } from './webapp/info-page/info-page-management/info-page-management';
import { InfoPageEditor } from './webapp/info-page/info-page-editor/info-page-editor';

// Admin - Menus
import { MenuManagement } from './webapp/menus/menu-management/menu-management';

// Admin - Users
import { UserList } from './webapp/profil/user-list/user-list';

// Admin - Diagnostic
import { DiagnosticQuestionManagement } from './webapp/diagnostic/diagnostic-question-management/diagnostic-question-management';
import { DiagnosticConfig } from './webapp/diagnostic/diagnostic-config/diagnostic-config';
import { Dashboard } from './webapp/dashboard/dashboard';
import { AdminPanel } from './webapp/admin/admin-panel';

export const routes: Routes = [
  // ==================== ROUTES PUBLIQUES ====================
  {
    path: '',
    component: Layout,
    children: [
      // Page d'accueil
      { path: '', component: HomePage },

      // Pages d'information
      { path: 'pages', component: InfoPageList },
      { path: 'pages/:slug', component: InfoPageDetail },

      // Diagnostic (accessible aux visiteurs)
      { path: 'diagnostic', component: DiagnosticIntro },
      { path: 'diagnostic/questionnaire', component: DiagnosticQuestionnaire },
      { path: 'diagnostic/result', component: DiagnosticResult },
    ],
  },

  // ==================== AUTHENTIFICATION (guest only) ====================
  {
    path: 'login',
    component: Login,
    canActivate: [userIsGuest],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [userIsGuest],
  },

  // ==================== ROUTES AUTHENTIFIÉES ====================
  {
    path: '',
    component: Layout,
    canActivate: [userIsAuthenticated],
    children: [
      // Profil utilisateur
      { path: 'profile', component: UserProfile },

      // Historique diagnostic (user connecté)
      { path: 'diagnostic/history', component: DiagnosticHistory },

      { path: 'dashboard', component: Dashboard },
    ],
  },

  // ==================== ROUTES ADMIN ====================
  {
    path: 'admin',
    component: Layout,
    canActivate: [userIsAdmin],
    children: [
      // Panneau d'administration principal
      { path: '', component: AdminPanel },
      { path: 'dashboard', component: AdminPanel },

      // Gestion pages info
      { path: 'pages/new', component: InfoPageEditor },
      { path: 'pages/edit/:id', component: InfoPageEditor },

      // Gestion menus
      { path: 'menus', component: MenuManagement },
    ],
  },

  // ==================== ROUTE 404 ====================
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
