import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { UserService } from './user.service';
import { InfoPageService } from './info-page.service';
import { Diagnostic } from './diagnostic.service';

export interface AdminStats {
  totalUsers: number;
  totalArticles: number;
  totalDiagnosticEvents: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private userService = inject(UserService);
  private infoPageService = inject(InfoPageService);
  private diagnosticService = inject(Diagnostic);

  getAdminStats(): Observable<AdminStats> {
    return forkJoin({
      users: this.userService.getAllUsers(),
      articles: this.infoPageService.getPublishedPages(),
      questions: this.diagnosticService.getQuestions(),
    }).pipe(
      map((data) => ({
        totalUsers: data.users.length,
        totalArticles: data.articles.length,
        totalDiagnosticEvents: data.questions.length,
      })),
    );
  }
}
