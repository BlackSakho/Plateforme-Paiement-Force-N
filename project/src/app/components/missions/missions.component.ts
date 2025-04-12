import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { ApiService } from "../../services/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MentorNavbarComponent } from "../mentor/mentor-navbar/mentor-navbar.component";

@Component({
  selector: "app-missions",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MentorNavbarComponent,
  ],
  template: `
    <app-mentor-navbar></app-mentor-navbar>
    <div class="container mx-auto p-6">
      <mat-card class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <mat-card-header
          class="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-t-xl"
        >
          <mat-card-title class="text-2xl font-bold">
            <mat-icon class="mr-2 align-middle">work</mat-icon>
            Vos Missions
          </mat-card-title>
          <mat-card-subtitle class="text-blue-100 mt-2">
            Consultez et gérez les missions qui vous sont assignées
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="p-6">
          <table mat-table [dataSource]="missions" class="full-width">
            <!-- Colonne Titre -->
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Titre</th>
              <td mat-cell *matCellDef="let mission">{{ mission.title }}</td>
            </ng-container>

            <!-- Colonne Description -->
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let mission">
                {{ mission.description }}
              </td>
            </ng-container>

            <!-- Colonne Statut -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let mission">
                <span [ngClass]="getStatusClass(mission.status)">
                  {{ mission.status }}
                </span>
              </td>
            </ng-container>

            <!-- Colonne Actions -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let mission">
                <button
                  mat-icon-button
                  color="primary"
                  (click)="viewMissionDetails(mission)"
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
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background-color: #f9fafb; /* Couleur de fond douce */
        min-height: 100vh; /* S'assure que la page occupe toute la hauteur */
        padding: 16px;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      mat-card {
        border-radius: 12px; /* Coins arrondis */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre douce */
      }

      mat-card-header {
        background: linear-gradient(
          to right,
          #16a34a,
          #15803d
        ); /* Dégradé vert */
        color: white;
        padding: 16px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      mat-card-title {
        font-size: 1.5rem;
        font-weight: bold;
        display: flex;
        align-items: center;
      }

      mat-card-title mat-icon {
        margin-right: 8px;
        font-size: 1.8rem;
      }

      mat-card-subtitle {
        font-size: 0.9rem;
        color: #d1fae5; /* Couleur vert clair */
      }

      mat-card-content {
        padding: 24px;
      }

      table {
        width: 100%;
      }

      .status-active {
        color: green;
        font-weight: bold;
      }

      .status-pending {
        color: orange;
        font-weight: bold;
      }

      .status-completed {
        color: blue;
        font-weight: bold;
      }
    `,
  ],
})
export class MissionsComponent implements OnInit {
  missions: any[] = [];
  displayedColumns: string[] = ["title", "description", "status", "actions"];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadMissions();
  }

  loadMissions() {
    this.apiService.getMissions().subscribe((data) => {
      this.missions = data.filter(
        (mission: any) => mission.assignedToCurrentUser
      );
    });
  }

  viewMissionDetails(mission: any) {
    this.snackBar.open(
      `Mission: ${mission.title}\nDescription: ${mission.description}`,
      "Fermer",
      { duration: 5000 }
    );
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "pending":
        return "status-pending";
      case "completed":
        return "status-completed";
      default:
        return "";
    }
  }
}
