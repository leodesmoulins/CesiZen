import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../../models/auth.interface';
import { environments } from '../../../../environments/environments';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = `${environments.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadCurrentUser();
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, userData)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.setToken(response.token);
    this.currentUserSubject.next(response.user);
  }

  private loadCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      // Optionnel : Valider le token auprès du backend
      this.http.get<User>(`${environments.apiUrl}/users/me`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout(),
      });
    }
  }
}
