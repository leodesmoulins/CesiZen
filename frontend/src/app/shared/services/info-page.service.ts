import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoPage } from '../models/info-page.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPageService {
  private readonly API_URL = `${environments.apiUrl}/pages`;

  constructor(private http: HttpClient) {}

  getPublishedPages(): Observable<InfoPage[]> {
    return this.http.get<InfoPage[]>(this.API_URL);
  }

  getPageBySlug(slug: string): Observable<InfoPage> {
    return this.http.get<InfoPage>(`${this.API_URL}/${slug}`);
  }

  createPage(data: any): Observable<InfoPage> {
    return this.http.post<InfoPage>(this.API_URL, data);
  }

  updateMenu(id: number, data: any): Observable<InfoPage> {
    return this.http.put<InfoPage>(`${this.API_URL}/${id}`, data);
  }
}
