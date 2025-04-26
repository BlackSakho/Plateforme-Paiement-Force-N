import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatChipsModule } from "@angular/material/chips";
import { RouterModule, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { MentorNavbarComponent } from "./mentor-navbar/mentor-navbar.component";

@Component({
  selector: "app-mentor-dashboard",
  standalone: true,
  imports: [
    MentorNavbarComponent, // Importer la navbar
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    RouterModule,
  ],
  template: `
    <app-mentor-navbar></app-mentor-navbar>
    <div class="dashboard-container">
      <h1 class="dashboard-title">Tableau de bord Mentor</h1>

      <div class="stats-grid">
        <!-- Présence -->
        <mat-card
          class="stat-card presence-card"
          (click)="navigateTo('attendance')"
        >
          <mat-card-content>
            <mat-icon class="stat-icon">check_circle</mat-icon>
            <h3 class="stat-title">Présence</h3>
            <p class="stat-description">Gérez les présences des sessions</p>
          </mat-card-content>
        </mat-card>

        <!-- Missions -->
        <mat-card
          class="stat-card missions-card"
          (click)="navigateTo('missions')"
        >
          <mat-card-content>
            <mat-icon class="stat-icon">work</mat-icon>
            <h3 class="stat-title">Missions</h3>
            <p class="stat-description">Consultez et gérez vos missions</p>
          </mat-card-content>
        </mat-card>

        <!-- Feuilles de présence -->
        <mat-card
          class="stat-card timesheets-card"
          (click)="navigateTo('user-attendance')"
        >
          <mat-card-content>
            <mat-icon class="stat-icon">schedule</mat-icon>
            <h3 class="stat-title">Mes rapports</h3>
            <p class="stat-description">Suivez vos feuilles de présence</p>
          </mat-card-content>
        </mat-card>

        <!-- Factures -->
        <mat-card
          class="stat-card invoices-card"
          (click)="navigateTo('mentor-invoices')"
        >
          <mat-card-content>
            <mat-icon class="stat-icon">receipt</mat-icon>
            <h3 class="stat-title">Factures</h3>
            <p class="stat-description">Gérez vos factures</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="recent-section">
        <mat-card class="recent-card">
          <mat-card-header>
            <mat-card-title>Missions récentes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="recentMissions" class="recent-table">
              <ng-container matColumnDef="consultant">
                <th mat-header-cell *matHeaderCellDef>Consultant</th>
                <td mat-cell *matCellDef="let mission">
                  {{ mission.consultant }}
                </td>
              </ng-container>

              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Mission</th>
                <td mat-cell *matCellDef="let mission">{{ mission.title }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Statut</th>
                <td mat-cell *matCellDef="let mission">
                  <span
                    class="status-chip"
                    [ngClass]="getStatusClass(mission.status)"
                  >
                    {{ mission.status }}
                  </span>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background: linear-gradient(to bottom, #f9fafb, #e3f2fd);
        min-height: 100vh;
        padding: 16px;
      }

      .dashboard-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      .dashboard-title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1e88e5;
        text-align: center;
        margin-bottom: 40px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .stat-card {
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
        background: white;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      .stat-icon {
        font-size: 3rem;
        color: #1e88e5;
        margin-bottom: 10px;
      }

      .stat-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #424242;
      }

      .stat-description {
        font-size: 0.9rem;
        color: #757575;
      }

      .presence-card {
        background: linear-gradient(to right, #e3f2fd, #bbdefb);
      }

      .missions-card {
        background: linear-gradient(to right, #e8f5e9, #c8e6c9);
      }

      .timesheets-card {
        background: linear-gradient(to right, #ede7f6, #d1c4e9);
      }

      .invoices-card {
        background: linear-gradient(to right, #fff8e1, #ffecb3);
      }

      .recent-section {
        margin-top: 40px;
      }

      .recent-card {
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .recent-table {
        width: 100%;
        border-collapse: collapse;
      }

      .recent-table th {
        text-align: left;
        padding: 10px;
        background: #f5f5f5;
        color: #424242;
      }

      .recent-table td {
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
      }

      .status-chip {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
        text-transform: capitalize;
      }

      .status-active {
        background-color: #c8e6c9;
        color: #388e3c;
      }

      .status-completed {
        background-color: #bbdefb;
        color: #1976d2;
      }

      .status-pending {
        background-color: #ffe0b2;
        color: #f57c00;
      }
    `,
  ],
})
export class MentorDashboardComponent implements OnInit {
  activeMissionsCount = 0;
  consultantsCount = 0;
  pendingEvaluationsCount = 0;
  displayedColumns = ["consultant", "title", "status", "actions"];

  recentMissions: any[] = [];
  recentActivities: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Charger les statistiques
    this.apiService.getMissions().subscribe((missions) => {
      this.activeMissionsCount = missions.filter(
        (m) => m.status === "in-progress"
      ).length;
      this.recentMissions = missions.slice(0, 5); // 5 missions les plus récentes
    });

    this.apiService.getUsers().subscribe((users) => {
      this.consultantsCount = users.filter(
        (u) => u.role === "consultant"
      ).length;
    });

    // Simuler des activités récentes (à remplacer par des données réelles)
    this.recentActivities = [
      {
        type: "mission",
        description: "Nouvelle mission créée pour Jean Dupont",
        date: new Date(),
      },
      {
        type: "evaluation",
        description: "Évaluation complétée pour le projet XYZ",
        date: new Date(Date.now() - 86400000),
      },
      {
        type: "consultant",
        description: "Nouveau consultant assigné à votre supervision",
        date: new Date(Date.now() - 172800000),
      },
    ];
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      default:
        return "";
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case "mission":
        return "work";
      case "evaluation":
        return "rate_review";
      case "consultant":
        return "person";
      default:
        return "info";
    }
  }

  getActivityIconClass(type: string): string {
    switch (type) {
      case "mission":
        return "activity-icon-mission";
      case "evaluation":
        return "activity-icon-evaluation";
      case "consultant":
        return "activity-icon-consultant";
      default:
        return "";
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
