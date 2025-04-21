import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { AccountantNavbarComponent } from "./accountant-navbar.component"; // Import du navbar

@Component({
  selector: "app-validated-presences",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    AccountantNavbarComponent,
    FormsModule,
    AccountantNavbarComponent,
  ], // Ajout du navbar
  template: `
    <app-accountant-navbar></app-accountant-navbar>
    <div class="container">
      <h2>Rapport d'activité</h2>

      <!-- Barre de recherche -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom"
          [(ngModel)]="searchQuery"
          (input)="filterPresences()"
        />
        <input
          type="date"
          [(ngModel)]="searchDate"
          (change)="filterPresences()"
        />
      </div>

      <!-- Tableau des fiches -->
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
          <td mat-cell *matCellDef="let presence">
            <span
              class="status"
              [ngClass]="{
                validated: presence.validated_by_finance,
                unvalidated: !presence.validated_by_finance
              }"
            >
              {{ presence.validated_by_finance ? "Validée" : "Non validée" }}
            </span>
          </td>
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
              Valider le Paiement
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
        max-width: 1200px;
        margin: 0 auto;
        font-family: "Segoe UI", sans-serif;
      }

      h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #2e7d32; /* Vert élégant */
      }

      .search-bar {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        justify-content: center;
      }

      .search-bar input {
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 6px;
        width: 250px;
        transition: all 0.3s ease;
      }

      .search-bar input:focus {
        border-color: #2e7d32;
        box-shadow: 0 0 5px rgba(46, 125, 50, 0.5);
        outline: none;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
      }

      th {
        background-color: #2e7d32;
        color: white;
        text-align: left;
        padding: 10px;
        font-size: 14px;
      }

      td {
        padding: 10px;
        font-size: 14px;
        border-bottom: 1px solid #ddd;
      }

      tr:hover {
        background-color: rgba(46, 125, 50, 0.1);
      }

      .status {
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 4px;
        text-align: center;
      }

      .status.validated {
        background-color: #c8e6c9; /* Vert clair */
        color: #2e7d32;
      }

      .status.unvalidated {
        background-color: #ffcdd2; /* Rouge clair */
        color: #d32f2f;
      }

      button[mat-raised-button] {
        margin: 5px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
      }

      button[mat-raised-button]:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
      }
    `,
  ],
})
export class ValidatedPresencesComponent implements OnInit {
  presences: any[] = [];
  validatedPresences: any[] = []; // Fiches validées
  unvalidatedPresences: any[] = []; // Fiches non validées
  displayedColumns: string[] = ["mentor", "date", "cours", "status", "actions"];
  searchQuery: string = ""; // Pour la recherche
  searchDate: string = ""; // Pour le filtre par date

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPresences();
  }

  loadPresences() {
    this.apiService.getConsultantValidatedPresences().subscribe((data) => {
      console.log("Données reçues :", data);
      this.presences = data;

      // Séparer les fiches validées et non validées
      this.validatedPresences = this.presences.filter(
        (presence) => presence.validated_by_finance === true
      );
      this.unvalidatedPresences = this.presences.filter(
        (presence) => presence.validated_by_finance !== true
      );
    });
  }

  validateByFinance(presence: any) {
    this.apiService.validatePresenceByFinance(presence.id).subscribe({
      next: (response) => {
        presence.validated_by_finance = true; // Mettre à jour localement
        presence.status = response.presence.status; // Mettre à jour le statut global
        alert("Fiche validée par le service finance !");
        this.loadPresences(); // Recharger les données
      },
      error: (err) => {
        console.error("Erreur lors de la validation :", err);
        alert("Une erreur est survenue lors de la validation.");
      },
    });
  }

  // Méthode pour filtrer les fiches par nom et date
  filterPresences() {
    const query = this.searchQuery.toLowerCase();
    const date = this.searchDate;

    this.validatedPresences = this.presences.filter(
      (presence) =>
        presence.validated_by_finance === true &&
        (presence.mentor.firstname.toLowerCase().includes(query) ||
          presence.mentor.name.toLowerCase().includes(query)) &&
        (!date || presence.date === date)
    );

    this.unvalidatedPresences = this.presences.filter(
      (presence) =>
        presence.validated_by_finance !== true &&
        (presence.mentor.firstname.toLowerCase().includes(query) ||
          presence.mentor.name.toLowerCase().includes(query)) &&
        (!date || presence.date === date)
    );
  }
}
