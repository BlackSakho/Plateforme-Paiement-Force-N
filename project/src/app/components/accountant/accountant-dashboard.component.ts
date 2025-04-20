import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AccountantNavbarComponent } from "./accountant-navbar.component";

@Component({
  selector: "app-accountant-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, AccountantNavbarComponent],
  template: `
    <app-accountant-navbar></app-accountant-navbar>
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Espace Comptabilité</h1>
        <p class="dashboard-subtitle">
          Bienvenue dans le tableau de bord du service comptable. Gérez les
          paiements, les fiches de présence et générez des factures.
        </p>
      </div>

      <div class="actions">
        <button
          mat-raised-button
          color="primary"
          routerLink="/accountant-payments"
          class="action-button"
        >
          <span>💳</span> Valider les Paiements
        </button>


        <button
          mat-raised-button
          color="warn"
          routerLink="/validated-presences"
          class="action-button"
        >
          <span>📋</span> Fiches Validées
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 80vh;
        background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
        padding: 40px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .dashboard-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .dashboard-title {
        font-size: 3rem;
        font-weight: 800;
        color: #1b5e20;
        margin-bottom: 10px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }

      .dashboard-subtitle {
        font-size: 1.2rem;
        color: #4e4e4e;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }

      .action-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px 30px;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 8px;
        background-color: #2e7d32;
        color: white;
        transition: transform 0.2s ease, background-color 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .action-button:hover {
        background-color: #1b5e20;
        transform: translateY(-3px);
      }

      .action-button span {
        font-size: 1.5rem;
      }
    `,
  ],
})
export class AccountantDashboardComponent {}
