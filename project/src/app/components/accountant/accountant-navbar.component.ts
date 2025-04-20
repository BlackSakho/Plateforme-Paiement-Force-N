import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-accountant-navbar",
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a routerLink="/accountant-dashboard" class="navbar-logo">
          <span class="logo-icon">📊</span> FORCE-N Comptabilité
        </a>
        <div class="user-info" *ngIf="currentUser">
          <mat-icon>person</mat-icon>
          {{ currentUser.firstname }} {{ currentUser.name }}
        </div>
        <ul class="navbar-links">
          <li>
            <a routerLink="/accountant-dashboard">
              <span class="link-icon">🏠</span> Dashboard
            </a>
          </li>
          <li>
            <a routerLink="/accountant-payments">
              <span class="link-icon">💳</span> Valider Paiements
            </a>
          </li>
          <li>
            <a routerLink="/validated-presences">
              <span class="link-icon">📋</span> Fiches Validées
            </a>
          </li>
          <li>
            <a (click)="logout()">
              <span class="link-icon">🚪</span> Déconnexion
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        background-color: #1f8c4c;
        color: white;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .navbar-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .navbar-logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .logo-icon {
        font-size: 1.8rem;
      }

      .navbar-links {
        list-style: none;
        display: flex;
        gap: 20px;
        margin: 0;
        padding: 0;
      }

      .navbar-links li {
        display: inline;
      }

      .navbar-links a {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: color 0.3s ease, transform 0.2s ease;
      }

      .navbar-links a:hover {
        color: #d4f1d4;
        transform: translateY(-2px);
      }

      .link-icon {
        font-size: 1.2rem;
      }
    `,
  ],
})
export class AccountantNavbarComponent {
  currentUser: { firstname: string; name: string } | null = null;
  ngOnInit() {
    const user = localStorage.getItem("user");
    this.currentUser = user ? JSON.parse(user) : null;
  }
  logout() {
    localStorage.clear(); // Supprimer le token et les données utilisateur
    window.location.href = "/login"; // Rediriger vers la page de connexion
  }
}
