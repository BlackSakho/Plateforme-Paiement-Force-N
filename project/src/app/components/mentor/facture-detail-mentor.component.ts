import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facture-detail-mentor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card *ngIf="facture" class="invoice-card">
      <div class="header">
        <img src="assets/logo.png" alt="Logo" class="logo" />
        <div class="org-info">
          <h1>FORCE-N</h1>
          <p>Plateforme de Formation Numérique</p>
        </div>
      </div>

      <hr class="divider" />

      <div class="invoice-meta">
        <h2>Facture N°{{ facture.id }}</h2>
        <p class="date">Date : {{ facture.date | date: 'dd/MM/yyyy' }}</p>
      </div>

      <mat-card-content>
        <div class="info-grid">
          <p><strong>Mentor :</strong> {{ facture.presence?.mentor?.firstname }} {{ facture.presence?.mentor?.name }}</p>
          <p><strong>Montant :</strong> {{ facture.amount | number:'1.0-0' }} FCFA</p>
          <p><strong>Rapport :</strong> {{ facture.presence?.cours || 'Non spécifié' }}</p>
          <p><strong>Statut :</strong> {{ facture.status || 'Payée ✅' }}</p>
          <p><strong>Comptable :</strong> {{ facture.accountant_name }}</p>

        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-stroked-button color="accent" (click)="printInvoice()">
          <mat-icon>print</mat-icon> Télécharger / Imprimer
        </button>
        
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .invoice-card {
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }
    .logo {
      width: 80px;
    }
    .org-info h1 {
      margin: 0;
      font-size: 24px;
      color: #1976d2;
    }
    .org-info p {
      margin: 0;
      color: #777;
    }
    .divider {
      border: none;
      border-top: 1px solid #ddd;
      margin: 20px 0;
    }
    .invoice-meta {
      text-align: center;
      margin-bottom: 20px;
    }
    .invoice-meta h2 {
      margin: 0;
      font-size: 22px;
      color: #2c3e50;
    }
    .invoice-meta .date {
      font-size: 14px;
      color: #555;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      font-size: 16px;
      color: #444;
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      gap: 10px;
    }
    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
      .header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class FactureDetailMentorComponent implements OnInit {
  facture: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getInvoiceById(+id).subscribe({
        next: (data) => {
          console.log('Facture chargée :', data);
          this.facture = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la facture', err);
          alert('Erreur lors du chargement de la facture.');
        }
      });
    }
  }

  sendInvoice() {
    if (!this.facture?.id) return;

    this.apiService.sendInvoiceToMentor(this.facture.id).subscribe({
      next: () => alert('Facture envoyée avec succès !'),
      error: () => alert("Erreur lors de l'envoi de la facture.")
    });
  }

  printInvoice() {
    const printContents = document.querySelector('.invoice-card')?.innerHTML;
    if (printContents) {
      const popupWindow = window.open('', '_blank', 'width=800,height=600');
      popupWindow?.document.open();
      popupWindow?.document.write(`
        <html>
          <head>
            <title>Facture N°${this.facture.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .invoice-content { max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; }
              h2 { text-align: center; }
              p { margin: 8px 0; }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div class="invoice-content">
              ${printContents}
            </div>
          </body>
        </html>
      `);
      popupWindow?.document.close();
    }
  }
}
