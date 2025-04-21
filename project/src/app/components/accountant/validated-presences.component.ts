import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../services/api.service";
import { AccountantNavbarComponent } from "./accountant-navbar.component"; // Import du navbar

@Component({
  selector: "app-validated-presences",
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
      <h2>Fiches de Présence Validées par le Consultant</h2>
      <table mat-table [dataSource]="presences" class="full-width">
        <!-- Colonne Mentor -->
        <ng-container matColumnDef="mentor">
          <th mat-header-cell *matHeaderCellDef>Mentor</th>
          <td mat-cell *matCellDef="let presence">
            {{ presence.mentor.firstname }} {{ presence.mentor.name }}
          </td>
        </ng-container>

        <!-- Colonne Date -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let presence">{{ presence.date }}</td>
        </ng-container>

        <!-- Colonne Cours -->
        <ng-container matColumnDef="cours">
          <th mat-header-cell *matHeaderCellDef>Cours</th>
          <td mat-cell *matCellDef="let presence">{{ presence.cours }}</td>
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
              (click)="validateByFinance(presence)"
              [disabled]="presence.validated_by_finance === true"
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
      h2 {
        text-align: center;
        margin-bottom: 20px;
      }
      button[mat-raised-button] {
        margin: 5px;
      }
    `,
  ],
})
export class ValidatedPresencesComponent implements OnInit {
  presences: any[] = [];
  displayedColumns: string[] = ["mentor", "date", "cours", "status", "actions"];

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

  validateByFinance(presence: any) {
    console.log("Tentative de validation pour la présence :", presence);

    this.apiService.validatePresenceByFinance(presence.id).subscribe({
      next: (response) => {
        console.log("Réponse de l'API :", response);
        presence.validated_by_finance = true; // Mettre à jour localement
        presence.status = response.presence.status; // Mettre à jour le statut global
        alert("Fiche validée par le service finance !");
      },
      error: (err) => {
        console.error("Erreur lors de la validation :", err);
        alert("Une erreur est survenue lors de la validation.");
      },
    });
  }
}
