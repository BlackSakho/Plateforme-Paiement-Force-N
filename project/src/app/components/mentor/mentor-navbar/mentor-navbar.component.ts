import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentor-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Tableau de Bord Mentor</span>
      <span class="spacer"></span>
      
      <nav>
        <a mat-button routerLink="/mentor-dashboard" routerLinkActive="active">
          <mat-icon>dashboard</mat-icon> Tableau de bord
        </a>
        <a mat-button routerLink="/attendance" routerLinkActive="active">
          <mat-icon>check_circle</mat-icon> Présence
        </a>
        <a mat-button routerLink="/missions" routerLinkActive="active">
          <mat-icon>work</mat-icon> Missions
        </a>
      </nav>

      <span class="spacer"></span>

      <button mat-icon-button>
        <mat-icon>notifications</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
      <button mat-button (click)="logout()" class="logout-button">
        <mat-icon>logout</mat-icon> Déconnexion
      </button>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    mat-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      height: 64px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    nav {
      display: flex;
      gap: 16px;
    }

    nav a {
      text-decoration: none;
      color: white;
      font-weight: 500;
    }

    nav a.active {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 8px 12px;
    }

    .content {
      padding-top: 64px; /* Évite que le contenu soit caché sous la navbar */
    }

    .logout-button {
      color: white;
    }
  `]
})
export class MentorNavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
