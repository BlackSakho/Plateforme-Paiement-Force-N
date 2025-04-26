import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        this.setToken(response.token); // Stocker le token
        this.setRole(response.role); // Stocker le rôle
        localStorage.setItem("user", JSON.stringify(response.user)); // Stocker les infos utilisateur
        return response;
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): Observable<any> {
    const token = this.getToken(); // Récupérer le token depuis localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Ajouter le token dans l'en-tête

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      map(() => {
        // Nettoyer les données locales après une déconnexion réussie
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  setRole(role: string): void {
    if (role) {
      localStorage.setItem("role", role); // Stocker le rôle directement
    }
  }

  getCurrentUserRole(): string | null {
    return localStorage.getItem("role"); // Récupérer le rôle depuis localStorage
  }

  getCurrentUser(): any {
    const user = localStorage.getItem("user"); // Supposons que les infos utilisateur sont stockées dans localStorage
    return user ? JSON.parse(user) : null;
  }
  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.id || null;
  }
  

  redirectToDashboard(): void {
    const role = localStorage.getItem("role");
    if (role === "comptable") {
      this.router.navigate(["/accountant-dashboard"]);
    } else if (role === "mentor") {
      this.router.navigate(["/mentor-dashboard"]);
    } else if (role === "consultant") {
      this.router.navigate(["/dashboard"]);
    } else {
      this.router.navigate(["/"]); // Rediriger vers la page d'accueil par défaut
    }
  }

  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getCurrentUserRole();
    return roles.includes(userRole || "");
  }
}
