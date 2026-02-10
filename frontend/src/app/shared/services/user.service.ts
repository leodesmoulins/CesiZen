import { Injectable } from '@angular/core';
import { UserProfile, UpdateProfileData } from '../models/user.interface';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environments.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.API_URL}/${id}`);
  }

  updateProfile(id: number, data: UpdateProfileData): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.API_URL}/${id}`, data);
  }

  // Admin methods
  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.API_URL);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  deactivateUser(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/deactivate`, {});
  }
}
