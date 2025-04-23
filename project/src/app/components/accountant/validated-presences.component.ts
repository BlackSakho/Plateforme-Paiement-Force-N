import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { AccountantNavbarComponent } from "./accountant-navbar.component";

@Component({
  selector: "app-validated-presences",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    AccountantNavbarComponent,
  ],
  template: `
    <app-accountant-navbar></app-accountant-navbar>
    <div class="container">
      <h2>Rapport d'activité</h2>

      <!-- Barre de recherche -->
      <div class="search-bar">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom"
          [(ngModel)]="searchQuery"
          (input)="filterPresences()"
        />
        <input
          type="date"
          [(ngModel)]="searchDate"
          (change)="filterPresences()"
        />
        <select [(ngModel)]="selectedMonth" (change)="filterPresences()">
          <option value="">Tous les mois</option>
          <option *ngFor="let m of months" [value]="m.value">{{ m.label }}</option>
        </select>
        <select [(ngModel)]="selectedStatus" (change)="filterPresences()">
          <option value="">Tous les statuts</option>
          <option value="validated">Validées</option>
          <option value="unvalidated">Non validées</option>
        </select>
      </div>

      <!-- Tableau -->
      <table mat-table [dataSource]="filteredPresences" class="full-width">
        <!-- Colonnes -->
        <ng-container matColumnDef="mentor">
          <th mat-header-cell *matHeaderCellDef>Mentor</th>
          <td mat-cell *matCellDef="let presence">
            {{ presence.mentor.firstname }} {{ presence.mentor.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let presence">{{ presence.date }}</td>
        </ng-container>

        <ng-container matColumnDef="cours">
          <th mat-header-cell *matHeaderCellDef>Cours</th>
          <td mat-cell *matCellDef="let presence">{{ presence.cours }}</td>
        </ng-container>

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
        padding: 30px;
      }

      h2 {
        text-align: center;
        margin-bottom: 30px;
        color: #2c3e50;
      }

      .search-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 25px;
        justify-content: center;
      }

      .search-bar input,
      .search-bar select {
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 6px;
        min-width: 180px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th {
        background-color: #f3f3f3;
        font-weight: bold;
      }

      td,
      th {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      .status {
        font-weight: bold;
        padding: 6px 12px;
        border-radius: 20px;
      }

      .status.validated {
        color: #2e7d32;
        background-color: #c8e6c9;
      }

      .status.unvalidated {
        color: #c62828;
        background-color: #ffcdd2;
      }

      button[disabled] {
        background-color: #ccc !important;
        color: #666 !important;
        cursor: not-allowed;
      }
    `,
  ],
})
export class ValidatedPresencesComponent implements OnInit {
  presences: any[] = [];
  filteredPresences: any[] = [];
  displayedColumns: string[] = ["mentor", "date", "cours", "status", "actions"];

  searchQuery: string = "";
  searchDate: string = "";
  selectedMonth: string = "";
  selectedStatus: string = "";

  months = [
    { value: "01", label: "Janvier" },
    { value: "02", label: "Février" },
    { value: "03", label: "Mars" },
    { value: "04", label: "Avril" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juin" },
    { value: "07", label: "Juillet" },
    { value: "08", label: "Août" },
    { value: "09", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPresences();
  }

  loadPresences() {
    this.apiService.getConsultantValidatedPresences().subscribe((data) => {
      this.presences = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.filterPresences();
    });
  }

  validateByFinance(presence: any) {
    this.apiService.validatePresenceByFinance(presence.id).subscribe({
      next: (response) => {
        presence.validated_by_finance = true;
        alert("Fiche validée par le service finance !");
        this.filterPresences();
      },
      error: (err) => {
        console.error("Erreur lors de la validation :", err);
        alert("Une erreur est survenue lors de la validation.");
      },
    });
  }

  filterPresences() {
    const query = this.searchQuery.toLowerCase();
    const date = this.searchDate;
    const month = this.selectedMonth;
    const status = this.selectedStatus;

    this.filteredPresences = this.presences
      .filter((presence) => {
        const nameMatch =
          presence.mentor.firstname.toLowerCase().includes(query) ||
          presence.mentor.name.toLowerCase().includes(query);

        const dateMatch = !date || presence.date === date;

        const monthMatch =
          !month || new Date(presence.date).getMonth() + 1 === +month;

        const statusMatch =
          !status ||
          (status === "validated" && presence.validated_by_finance) ||
          (status === "unvalidated" && !presence.validated_by_finance);

        return nameMatch && dateMatch && monthMatch && statusMatch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
