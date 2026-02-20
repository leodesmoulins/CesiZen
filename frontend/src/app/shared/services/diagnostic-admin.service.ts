import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagnosticConfig } from '../models/diagnostic.interface';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticAdmin {
  private readonly API_URL = `${environments.apiUrl}/admin/diagnostic`;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(`${this.API_URL}/questions`);
  }

  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/questions/${id}`);
  }

  createQuestion(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/questions`, data);
  }

  updateQuestion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/questions/${id}`, data);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/questions/${id}`);
  }

  getConfig(): Observable<DiagnosticConfig> {
    return this.http.get<DiagnosticConfig>(`${this.API_URL}/config`);
  }

  updateConfig(data: DiagnosticConfig): Observable<any> {
    return this.http.put(`${this.API_URL}/config`, data);
  }
}
