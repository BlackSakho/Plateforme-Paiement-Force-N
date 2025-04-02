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
    <!-- Navbar mentor -->
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">
        Tableau de bord Mentor
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Box pour aller vers la page Attendance -->
        <mat-card
          class="hover-box bg-gradient-to-br from-blue-50 to-blue-100"
          (click)="navigateTo('attendance')"
        >
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-blue-700 text-5xl mb-4"
              >check_circle</mat-icon
            >
            <h3 class="text-xl font-bold text-blue-900">Présence</h3>
            <p class="text-blue-800 text-sm">
              Gérez les présences des sessions
            </p>
          </mat-card-content>
        </mat-card>

        <!-- Box pour aller vers la page Missions -->
        <mat-card
          class="hover-box bg-gradient-to-br from-green-50 to-green-100"
          (click)="navigateTo('missions')"
        >
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-green-700 text-5xl mb-4">work</mat-icon>
            <h3 class="text-xl font-bold text-green-900">Missions</h3>
            <p class="text-green-800 text-sm">
              Consultez et gérez vos missions
            </p>
          </mat-card-content>
        </mat-card>

        <!-- Box pour aller vers la page Timesheets -->
        <mat-card
          class="hover-box bg-gradient-to-br from-purple-50 to-purple-100"
          (click)="navigateTo('timesheets')"
        >
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-purple-700 text-5xl mb-4">schedule</mat-icon>
            <h3 class="text-xl font-bold text-purple-900">
              Feuilles de présence
            </h3>
            <p class="text-purple-800 text-sm">
              Suivez vos feuilles de présence
            </p>
          </mat-card-content>
        </mat-card>

        <!-- Box pour aller vers la page Invoices -->
        <mat-card
          class="hover-box bg-gradient-to-br from-yellow-50 to-yellow-100"
          (click)="navigateTo('invoices')"
        >
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-yellow-700 text-5xl mb-4">receipt</mat-icon>
            <h3 class="text-xl font-bold text-yellow-900">Factures</h3>
            <p class="text-yellow-800 text-sm">Gérez vos factures</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Statistiques des missions -->
        <mat-card class="bg-gradient-to-br from-blue-50 to-blue-100">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-800 text-sm font-medium">
                  Missions actives
                </p>
                <h3 class="text-3xl font-bold text-blue-900">
                  {{ activeMissionsCount }}
                </h3>
              </div>
              <div class="bg-blue-200 p-3 rounded-full">
                <mat-icon class="text-blue-700">work</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

      

       
      </div>

      <!-- Liste des missions récentes -->
      <mat-card class="mb-8">
        <mat-card-header class="bg-gray-50 p-4">
          <mat-card-title class="text-xl font-semibold"
            >Missions récentes</mat-card-title
          >
        </mat-card-header>
        <mat-card-content class="p-4">
          <table mat-table [dataSource]="recentMissions" class="w-full">
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
                <mat-chip-listbox>
                  <mat-chip [ngClass]="getStatusClass(mission.status)">
                    {{ mission.status }}
                  </mat-chip>
                </mat-chip-listbox>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let mission">
                <button
                  mat-icon-button
                  color="primary"
                  [routerLink]="['/missions', mission.id]"
                >
                  <mat-icon>visibility</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <!-- Activités récentes -->
      <mat-card>
        <mat-card-header class="bg-gray-50 p-4">
          <mat-card-title class="text-xl font-semibold"
            >Activités récentes</mat-card-title
          >
        </mat-card-header>
        <mat-card-content class="p-4">
          <div class="space-y-4">
            <div
              *ngFor="let activity of recentActivities"
              class="flex items-start p-4 bg-gray-50 rounded-lg"
            >
              <div class="bg-white p-2 rounded-full mr-4">
                <mat-icon [ngClass]="getActivityIconClass(activity.type)">
                  {{ getActivityIcon(activity.type) }}
                </mat-icon>
              </div>
              <div>
                <p class="font-medium">{{ activity.description }}</p>
                <p class="text-sm text-gray-600">
                  {{ activity.date | date : "medium" }}
                </p>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .hover-box {
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        border-radius: 12px;
        overflow: hidden;
      }

      .hover-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }

      mat-card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      mat-icon {
        transition: color 0.3s;
      }

      mat-card:hover mat-icon {
        color: #1e293b;
      }

      .mat-mdc-card {
        border-radius: 12px;
        overflow: hidden;
      }
      .status-active {
        background-color: #e0f2f1 !important;
        color: #004d40 !important;
      }
      .status-completed {
        background-color: #e8f5e9 !important;
        color: #1b5e20 !important;
      }
      .status-pending {
        background-color: #fff3e0 !important;
        color: #e65100 !important;
      }
      .activity-icon-mission {
        color: #1976d2;
      }
      .activity-icon-evaluation {
        color: #7b1fa2;
      }
      .activity-icon-consultant {
        color: #388e3c;
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
