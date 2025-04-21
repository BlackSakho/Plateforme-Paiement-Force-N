import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { NotificationService } from "../../services/notification.service"; // Import du service

@Component({
  selector: "app-accountant-navbar",
  imports: [CommonModule, RouterModule, MatIconModule, MatMenuModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a routerLink="/accountant-dashboard" class="navbar-logo">
          <span class="logo-icon">📊</span> FORCE-N Comptabilité
        </a>
        <div class="user-info" *ngIf="currentUser">
          <mat-icon>person</mat-icon>
          {{ currentUser.firstname }} {{ currentUser.name }}
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>notifications</mat-icon>
            <span *ngIf="notifications.length > 0" class="notification-badge">
              {{ notifications.length }}
            </span>
          </button>
          <mat-menu #menu="matMenu">
            <ng-container *ngFor="let notification of notifications">
              <button mat-menu-item>
                {{ notification.data.message }}
              </button>
            </ng-container>
          </mat-menu>
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
      background-color: #2e7d32; /* Vert plus élégant */
      color: white;
      padding: 12px 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
      font-family: 'Segoe UI', sans-serif;
    }

    .navbar-container {
      width: 100%;
      max-width: 1440px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .navbar-logo {
      font-size: 1.6rem;
      font-weight: 600;
      color: #ffffff;
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
      align-items: center;
      gap: 25px;
      margin: 0;
      padding: 0;
    }

    .navbar-links li a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease-in-out;
      padding: 6px 10px;
      border-radius: 6px;
    }

    .navbar-links li a:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: scale(1.05);
    }

    .link-icon {
      font-size: 1.2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      color: white;
    }

    .user-info mat-icon {
      font-size: 24px;
    }

    .notification-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      background-color: #e53935;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 10px;
      line-height: 1;
      font-weight: bold;
      z-index: 10;
    }

    @media (max-width: 768px) {
      .navbar-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .navbar-links {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .user-info {
        align-self: flex-end;
      }
    }
  `,
],
})
export class AccountantNavbarComponent {
  currentUser: { firstname: string; name: string } | null = null;
  notifications: any[] = []; // Propriété pour stocker les notifications

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    this.currentUser = user ? JSON.parse(user) : null;

    // Charger les notifications
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }

  logout() {
    localStorage.clear(); // Supprimer le token et les données utilisateur
    window.location.href = "/login"; // Rediriger vers la page de connexion
  }
}
