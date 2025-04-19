import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../../services/api.service";
import { MentorNavbarComponent } from "./mentor-navbar/mentor-navbar.component";

@Component({
  selector: "app-user-attendance",
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
          class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl"
        >
          <mat-card-title class="text-2xl font-bold">
            <mat-icon class="mr-2 align-middle">how_to_reg</mat-icon>
            Vos Fiches de Présence
          </mat-card-title>
          <mat-card-subtitle class="text-blue-100 mt-2">
            Consultez les fiches de présence que vous avez soumises
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="p-6">
          <table mat-table [dataSource]="attendances" class="full-width">
            <!-- Colonne Date -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let attendance">
                {{ attendance.date | date }}
              </td>
            </ng-container>

            <!-- Colonne Heure -->
            <ng-container matColumnDef="time">
              <th mat-header-cell *matHeaderCellDef>Heure</th>
              <td mat-cell *matCellDef="let attendance">
                {{ attendance.time }}
              </td>
            </ng-container>

            <!-- Colonne Cours -->
            <ng-container matColumnDef="cours">
              <th mat-header-cell *matHeaderCellDef>Cours</th>
              <td mat-cell *matCellDef="let attendance">
                {{ attendance.cours }}
              </td>
            </ng-container>

            <!-- Colonne Statut -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let attendance">
                <span [ngClass]="getStatusClass(attendance.status)">
                  {{
                    attendance.status === "validated" ? "Validé" : "En attente"
                  }}
                </span>
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
          #2563eb,
          #1e40af
        ); /* Dégradé bleu */
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
        color: #dbeafe; /* Couleur bleu clair */
      }

      mat-card-content {
        padding: 24px;
      }

      table {
        width: 100%;
      }

      .status-validated {
        color: green;
        font-weight: bold;
      }

      .status-pending {
        color: orange;
        font-weight: bold;
      }
    `,
  ],
})
export class UserAttendanceComponent implements OnInit {
  attendances: any[] = [];
  displayedColumns: string[] = ["date", "time", "cours", "status"];

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadAttendances();
  }

  loadAttendances() {
    this.apiService.getUserPresences().subscribe((data) => {
      this.attendances = data;
    });
  }

  getCurrentUserId(): number {
    // Récupérer l'ID de l'utilisateur connecté depuis le localStorage ou un autre service
    return Number(localStorage.getItem("userId"));
  }

  getStatusClass(status: string): string {
    return status === "validated" ? "status-validated" : "status-pending";
  }
}
