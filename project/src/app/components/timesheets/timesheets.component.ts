import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-timesheets",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Feuilles de présence</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="presences" class="full-width">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let presence">
                {{ presence.date | date }}
              </td>
            </ng-container>

            <ng-container matColumnDef="cours">
              <th mat-header-cell *matHeaderCellDef>Cours</th>
              <td mat-cell *matCellDef="let presence">
                {{ presence.cours }}
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let presence">
                <span [ngClass]="getStatusClass(presence.status)">
                  {{
                    presence.status === "validated" ? "Validé" : "En attente"
                  }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="mentor">
              <th mat-header-cell *matHeaderCellDef>Mentor</th>
              <td mat-cell *matCellDef="let presence">
                {{ presence.mentor?.firstname }}
                {{ presence.mentor?.name || "Non spécifié" }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let presence">
                <button
                  mat-icon-button
                  color="primary"
                  (click)="validateByConsultant(presence.id)"
                  *ngIf="!presence.validated_by_consultant"
                >
                  <mat-icon>check</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="primary"
                  (click)="validateByConsultant(presence.id)"
                  *ngIf="!presence.validated_by_consultant"
                >
                  <mat-icon>check</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="accent"
                  (click)="validateByCertificateManager(presence.id)"
                  *ngIf="!presence.validated_by_certificate_manager"
                >
                  <mat-icon>verified</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="validateByFinance(presence.id)"
                  *ngIf="!presence.validated_by_finance"
                >
                  <mat-icon>attach_money</mat-icon>
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
      .container {
        padding: 20px;
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
export class TimesheetsComponent implements OnInit {
  presences: any[] = [];
  displayedColumns: string[] = ["date", "cours", "mentor", "status", "actions"];
  snackBar: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPresences();
  }

  loadPresences() {
    this.apiService.getPresences().subscribe((data) => {
      this.presences = data.map((presence) => ({
        ...presence,
        status: presence.status || "pending", // Par défaut, le statut est "en attente"
      }));
    });
  }

  validatePresence(presence: any) {
    // Simuler la validation (vous pouvez appeler une API pour mettre à jour le statut)
    presence.status = "validated";
  }

  validateByConsultant(id: number) {
    this.apiService.validatePresenceByConsultant(id).subscribe(() => {
      this.loadPresences(); // Recharger les données après validation
      this.snackBar.open("Feuille de présence validée avec succès", "Fermer", {
        duration: 3000,
      });
    });
  }

  validateByCertificateManager(id: number) {
    // Simuler la validation par le gestionnaire de certificats
  }

  validateByFinance(id: number) {
    // Simuler la validation par le service financier
  }

  getStatusClass(status: string): string {
    return status === "validated" ? "status-validated" : "status-pending";
  }
}
