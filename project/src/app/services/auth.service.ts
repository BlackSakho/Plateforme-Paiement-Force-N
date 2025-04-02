import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      // Nettoyer les données locales après une déconnexion réussie
      map(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  setRole(role: string): void {
    if (role) {
      localStorage.setItem('role', role); // Stocker le rôle directement
    }
  }

  getCurrentUserRole(): string | null {
    return localStorage.getItem('role'); // Récupérer le rôle depuis localStorage
  }

  redirectToDashboard(): void {
    const role = this.getCurrentUserRole();
    switch (role) {
      case 'mentor':
        this.router.navigate(['/mentor-dashboard']);
        break;
      case 'consultant':
        this.router.navigate(['/consultant-dashboard']);
        break;
      default:
        this.router.navigate(['/dashboard']);
        break;
    }
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getCurrentUserRole();
    return roles.includes(userRole || '');
  }
}