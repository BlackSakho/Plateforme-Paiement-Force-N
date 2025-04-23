import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { ApiService } from "../../services/api.service";
import { AccountantNavbarComponent } from "./accountant-navbar.component";
import { Router } from "@angular/router"; // ✅ Import du Router

@Component({
  selector: "app-accountant-payments",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    AccountantNavbarComponent,
  ],
  template: `
    <app-accountant-navbar></app-accountant-navbar>
    <div class="container">
  <h2>Validation des Paiements</h2>
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
          color="accent"
          (click)="generateInvoice(presence)"
        >
          Générer la Facture
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

  constructor(private apiService: ApiService, private router: Router) {} // ✅ Router injecté

  ngOnInit() {
    this.loadPresences();
  }

  loadPresences() {
    this.apiService.getValidatedPresences().subscribe((data) => {
      console.log("Présences validées :", data);
      this.presences = data;
    });
  }
  

  validatePayment(presence: any) {
    this.apiService.validatePresencePayment(presence.id).subscribe(() => {
      presence.status = "validated";
      alert("Paiement validé avec succès !");
    });
  }

  generateInvoice(presence: any) {
    this.apiService.generateInvoice(presence.id).subscribe({
      next: (response) => {
        alert("Facture générée avec succès !");
        console.log("Facture générée :", response);

        const invoiceId = response.invoiceId; 

        if (invoiceId) {
          this.router.navigate(['/invoice', invoiceId]); // ✅ Redirection après génération
        } else {
          alert("Impossible de rediriger : ID de facture manquant.");
        }
      },
      error: (err) => {
        console.error("Erreur lors de la génération de la facture :", err);
        alert("Une erreur est survenue lors de la génération de la facture.");
      },
    });
  }
}
