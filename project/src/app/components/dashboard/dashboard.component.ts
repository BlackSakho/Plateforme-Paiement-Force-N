import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de bord</h1>

      <div class="stats-grid">
        <mat-card>
          <mat-card-header>
            <mat-icon>people</mat-icon>
            <mat-card-title>Consultants</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ consultantCount }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon>school</mat-icon>
            <mat-card-title>Mentors</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ mentorCount }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon>work</mat-icon>
             <mat-card-title>Missions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ activeMissionCount }}</h2>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon>schedule</mat-icon>
            <mat-card-title>Feuilles de présence</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h2>{{ pendingInvoiceCount }}</h2>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="recent-activity">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Activités récentes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div
                class="activity-item"
                *ngFor="let activity of recentActivities"
              >
                <mat-icon>{{ activity.icon }}</mat-icon>
                <div class="activity-details">
                  <p>{{ activity.description }}</p>
                  <small>{{ activity.date | date : "short" }}</small>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 20px;
      }
      mat-card {
        padding: 16px;
      }
      mat-card-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
      mat-card-header mat-icon {
        margin-right: 8px;
        color: #2196f3;
      }
      h2 {
        font-size: 2em;
        margin: 10px 0;
        color: #2196f3;
      }
      .activity-list {
        margin-top: 16px;
      }
      .activity-item {
        display: flex;
        align-items: start;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
      }
      .activity-item:last-child {
        border-bottom: none;
      }
      .activity-item mat-icon {
        margin-right: 12px;
        color: #666;
      }
      .activity-details {
        flex: 1;
      }
      .activity-details p {
        margin: 0;
        color: #333;
      }
      .activity-details small {
        color: #666;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  consultantCount = 0;
  mentorCount = 0;
  activeMissionCount = 0;
  pendingInvoiceCount = 0;
  recentActivities = [
    {
      icon: "person_add",
      description: "Nouveau  mentor inscrit",
      date: new Date(),
    },
    {
      icon: "work",
      description: "Nouvelle mission créée",
      date: new Date(Date.now() - 3600000),
    },
    {
      icon: "payment",
      description: "Facture payée",
      date: new Date(Date.now() - 7200000),
    },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.apiService.getStatistics().subscribe((stats) => {
      this.consultantCount = stats.consultants;
      this.mentorCount = stats.mentors;
      this.activeMissionCount = stats.missions;
      this.pendingInvoiceCount = stats.presences; // Utiliser le nombre de feuilles de présence
    });
  }
}
