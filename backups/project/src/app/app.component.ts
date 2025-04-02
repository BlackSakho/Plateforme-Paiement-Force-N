import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Plateforme de Gestion</span>
      <span class="spacer"></span>
      <button mat-icon-button>
        <mat-icon>notifications</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" [opened]="true">
        <div class="sidenav-header">
          <img src="https://th.bing.com/th/id/OIP.08YfVY9RUhMnT6nVSfXUhgHaCi?w=338&h=119&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Logo" class="logo">
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Tableau de bord</span>
          </a>
          <a mat-list-item routerLink="/users" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            <span>Utilisateurs</span>
          </a>
          <a mat-list-item routerLink="/missions" routerLinkActive="active">
            <mat-icon>work</mat-icon>
            <span>Missions</span>
          </a>
          <a mat-list-item routerLink="/timesheets" routerLinkActive="active">
            <mat-icon>schedule</mat-icon>
            <span>Feuilles de presence</span>
          </a>
          <a mat-list-item routerLink="/invoices" routerLinkActive="active">
            <mat-icon>receipt</mat-icon>
            <span>Factures</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    mat-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    mat-sidenav-container {
      height: calc(100vh - 64px);
      margin-top: 64px;
    }

    mat-sidenav {
      width: 280px;
    }

    .sidenav-header {
      height: 150px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(25, 118, 210, 0.1));
    }

    .logo {
      max-width: 150px;
      height: auto;
    }

    mat-nav-list {
      padding-top: 0;
    }

    mat-nav-list a {
      height: 48px;
      margin: 8px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      color: #1e293b;
    }

    mat-nav-list a.active {
      background-color: rgba(33, 150, 243, 0.1);
      color: #2196F3;
    }

    mat-nav-list a mat-icon {
      margin-right: 12px;
    }

    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent {
  title = 'Plateforme de Gestion';
}