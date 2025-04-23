import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-invoice-view",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card *ngIf="invoice" class="invoice-card">
  <div class="header">
    <img src="assets/logo.png" alt="FORCE-N" class="logo" />
    <div class="org-info">
      <h1>FORCE-N</h1>
      <p>Formations Ouvertes pour le Renforcement des Compétences</p>
    </div>
  </div>

  <hr class="divider" />

  <div class="invoice-meta">
    <h2>Facture N°{{ invoice.id }}</h2>
    <p class="date">Date : {{ invoice.date | date: 'dd/MM/yyyy' }}</p>
  </div>

  <mat-card-content>
    <div class="info-grid">
      <p><strong>Mentor :</strong> {{ invoice.presence.mentor.firstname }} {{ invoice.presence.mentor.name }}</p>
      <p><strong>Comptable :</strong> {{ invoice.accountant_name }}</p>
      <p><strong>Rapport :</strong> {{ invoice.presence?.cours || "Non spécifié" }}</p>
      <p><strong>Montant :</strong> {{ invoice.amount | currency:'FCFA' }}</p>
      <p><strong>Statut :</strong> {{ invoice.status || "Payée ✅" }}</p>
    </div>
  </mat-card-content>

  <mat-card-actions>
    <button mat-stroked-button color="accent" (click)="printInvoice()">
      <mat-icon>print</mat-icon> Télécharger / Imprimer
    </button>

    <button mat-raised-button color="primary" (click)="sendInvoice()">
      <mat-icon>send</mat-icon> Envoyer au mentor
    </button>
  </mat-card-actions>
</mat-card>

  `,
  styles: [`
    .invoice-card {
      max-width: 750px;
      margin: 40px auto;
      padding: 24px;
      border-radius: 12px;
      background: #ffffff;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      font-family: 'Segoe UI', sans-serif;
    }
  
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
  
    .logo {
      width: 80px;
      height: auto;
    }
  
    .org-info h1 {
      margin: 0;
      font-size: 24px;
      color: #008037;
    }
  
    .org-info p {
      margin: 0;
      color: #555;
      font-size: 14px;
    }
  
    .divider {
      border: none;
      border-top: 2px solid #eee;
      margin: 16px 0;
    }
  
    .invoice-meta {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .invoice-meta h2 {
      margin: 0;
      font-size: 22px;
      color: #1A73E8;
    }
  
    .invoice-meta .date {
      font-size: 14px;
      color: #666;
    }
  
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 10px;
      font-size: 15px;
    }
  
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
  
    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
      .header {
        flex-direction: column;
        align-items: flex-start;
      }
      .logo {
        width: 60px;
      }
    }
  `],
  
})
export class InvoiceViewComponent implements OnInit {
  invoice: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("Récupération ID de l’URL :", id);

    if (id) {
      this.apiService.getInvoiceById(+id).subscribe({
        next: (data) => {
          console.log("Facture chargée :", data);
          this.invoice = data;
        },
        error: (err) => {
          console.error("Erreur lors du chargement de la facture", err);
          alert("Erreur lors du chargement de la facture.");
        },
      });
    }
  }

  sendInvoice() {
    if (!this.invoice?.id) return;

    this.apiService.sendInvoiceToMentor(this.invoice.id).subscribe({
      next: () => alert("Facture envoyée au mentor !"),
      error: () => alert("Erreur lors de l'envoi de la facture."),
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
            <title>Facture N°${this.invoice.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h2 { text-align: center; }
              .invoice-content { max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
              p { margin: 10px 0; }
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
