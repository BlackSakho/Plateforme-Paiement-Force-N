import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <h3>Admin</h3>
        <mat-nav-list>
          <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
          <a mat-list-item routerLink="/admin/users" routerLinkActive="active">Utilisateurs</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <span>Administration</span>
          <span class="spacer"></span>
          <button mat-icon-button (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 220px;
      padding: 20px 10px;
      background: #f5f5f5;
    }

    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .content {
      padding: 20px;
    }

    a.active {
      font-weight: bold;
      color: #1976d2;
    }
  `]
})
export class AdminLayoutComponent {
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Ou router.navigate(['/login']);
  }
}
