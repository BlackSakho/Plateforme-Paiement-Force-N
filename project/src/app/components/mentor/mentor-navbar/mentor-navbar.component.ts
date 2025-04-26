import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-mentor-navbar",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar class="glass-navbar">
      <div class="brand">FORCE-N🌟 Mentor dashboard</div>

      <button mat-icon-button class="mobile-toggle" (click)="toggleMenu()">
        <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
      </button>

      <nav [class.open]="isMenuOpen">
        <a mat-button routerLink="/mentor-dashboard" routerLinkActive="active">
          <mat-icon>dashboard</mat-icon> <span>Tableau de bord</span>
        </a>
        <a mat-button routerLink="/attendance" routerLinkActive="active">
          <mat-icon>check_circle</mat-icon> <span>Présence</span>
        </a>
        <a mat-button routerLink="/missions" routerLinkActive="active">
          <mat-icon>work</mat-icon> <span>Missions</span>
        </a>

        <div class="user-info" *ngIf="currentUser">
          <mat-icon>person</mat-icon>
          {{ currentUser.firstname }} {{ currentUser.name }}
        </div>

        <div class="actions">
          <button mat-icon-button>
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button>
            <mat-icon>account_circle</mat-icon>
          </button>
          <button mat-button class="logout" (click)="logout()">
            <mat-icon>logout</mat-icon> Déconnexion
          </button>
        </div>
      </nav>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .glass-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      padding: 0 16px;
      color: white;
    }

    .brand {
      font-size: 1.3rem;
      font-weight: bold;
      color: #ffffffdd;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-left: auto;
      transition: max-height 0.3s ease-in-out;
    }

    nav a {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font-weight: 500;
      color: white;
      border-radius: 6px;
      transition: background 0.3s;
    }

    nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    nav a.active {
      background: rgba(255, 255, 255, 0.25);
    }

    .user-info {
      margin-left: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      color: #fff;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logout {
      color: #f44336;
      font-weight: bold;
    }

    .content {
      padding-top: 72px;
    }

    .mobile-toggle {
      display: none;
      margin-left: auto;
      color: white;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      nav {
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.9);
        padding: 16px;
        max-height: 0;
        overflow: hidden;
      }

      nav.open {
        max-height: 500px;
      }

      .mobile-toggle {
        display: block;
      }

      .user-info {
        margin-left: 0;
      }
    }
  `],
})
export class MentorNavbarComponent {
  currentUser: any;
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem("user");
    this.currentUser = user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    this.router.navigate(["/home"]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
