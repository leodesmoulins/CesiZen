import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly API_URL = `${environments.apiUrl}/menus`;

  constructor(private http: HttpClient) {}

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.API_URL);
  }

  createMenu(data: any): Observable<Menu> {
    return this.http.post<Menu>(this.API_URL, data);
  }

  updateMenu(id: number, data: any): Observable<Menu> {
    return this.http.put<Menu>(`${this.API_URL}/${id}`, data);
  }
}
