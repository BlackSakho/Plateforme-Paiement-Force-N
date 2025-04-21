import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../services/api.service";
import { AccountantNavbarComponent } from "./accountant-navbar.component"; // Import du navbar

@Component({
  selector: "app-accountant-payments",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    AccountantNavbarComponent,
  ], // Ajout du navbar
  template: `
    <app-accountant-navbar></app-accountant-navbar>
    <!-- Navbar ajouté -->
    <div class="container">
      <h2>Validation des Paiements</h2>
      <table mat-table [dataSource]="presences" class="full-width">
        <!-- Colonne Mentor -->
        <ng-container matColumnDef="mentor">
          <th mat-header-cell *matHeaderCellDef>Mentor</th>
          <td mat-cell *matCellDef="let presence">{{ presence.mentorName }}</td>
        </ng-container>

        <!-- Colonne Date -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let presence">{{ presence.date }}</td>
        </ng-container>

        <!-- Colonne Statut -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Statut</th>
          <td mat-cell *matCellDef="let presence">{{ presence.status }}</td>
        </ng-container>

        <!-- Colonne Actions -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let presence">
            <button
              mat-raised-button
              color="primary"
              (click)="validatePayment(presence)"
            >
              Valider
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
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
    `,
  ],
})
export class AccountantPaymentsComponent implements OnInit {
  presences: any[] = [];
  displayedColumns: string[] = ["mentor", "date", "status", "actions"];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPresences();
  }

  loadPresences() {
    this.apiService.getConsultantValidatedPresences().subscribe((data) => {
      console.log("Données reçues :", data); // Vérifiez les données reçues
      this.presences = data;
    });
  }

  validatePayment(presence: any) {
    this.apiService.validatePresencePayment(presence.id).subscribe(() => {
      presence.status = "validated";
      alert("Paiement validé avec succès !");
    });
  }
}
