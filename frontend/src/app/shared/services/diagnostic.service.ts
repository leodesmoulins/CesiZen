import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticQuestion, DiagnosticResult } from '../models/diagnostic.interface';

@Injectable({
  providedIn: 'root',
})
export class Diagnostic {
  private readonly API_URL = `${environments.apiUrl}/diagnostic`;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<DiagnosticQuestion[]> {
    return this.http.get<DiagnosticQuestion[]>(`${this.API_URL}/questions`);
  }

  calculateScore(selectedIds: number[]): Observable<number> {
    return this.http.post<number>(`${this.API_URL}/calculate`, { selectedIds });
  }

  saveResults(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/save-result`, data);
  }

  getUserResults(): Observable<DiagnosticResult[]> {
    return this.http.get<DiagnosticResult[]>(`${this.API_URL}/results`);
  }
}
