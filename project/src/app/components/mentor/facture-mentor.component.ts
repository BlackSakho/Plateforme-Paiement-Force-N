import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MentorNavbarComponent } from "./mentor-navbar/mentor-navbar.component";
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-factures-mentor',
  standalone: true,
  imports: [CommonModule, FormsModule, MentorNavbarComponent, RouterLink
    
  ],
  template: `
    <app-mentor-navbar></app-mentor-navbar>
    <div class="container">
      <h2>Mes Factures</h2>

      <div class="search-bar">
        <input type="date" [(ngModel)]="searchDate" placeholder="Rechercher par date..." />
        <button (click)="filterFactures()">Rechercher</button>
        <button (click)="resetFilter()">Réinitialiser</button>
      </div>

      <div *ngIf="filteredFactures.length === 0" class="no-factures">
        <p>Aucune facture trouvée.</p>
      </div>

      <div *ngFor="let facture of filteredFactures" class="facture-card">
        <h3>Facture #{{ facture.presence_id }}</h3>
        <div class="facture-details">
          <p><strong>Montant :</strong> {{ facture.amount }} FCFA</p>
          <p><strong>Date :</strong> {{ facture.date | date:'longDate' }}</p>
        </div>
        
       
        <a [routerLink]="['/facture', facture.id]" class="btn-download">Voir la facture</a>
        

      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
      margin: 2rem auto;
      padding: 2rem;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    h2 {
      text-align: center;
      margin-bottom: 2.5rem;
      color: #2c3e50;
      font-size: 2.2rem;
      font-weight: 600;
      position: relative;
      padding-bottom: 0.5rem;
    }
    
    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background: linear-gradient(90deg, #3498db, #27ae60);
      border-radius: 3px;
    }
    
    .search-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 2.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    input[type="date"] {
      padding: 0.7rem 1rem;
      font-size: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      transition: all 0.3s ease;
      min-width: 220px;
    }
    
    input[type="date"]:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }
    
    button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.7rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    button:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .facture-card {
      border: 1px solid #e0e0e0;
      background: #fff;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 1.8rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .facture-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.12);
    }
    
    .facture-card h3 {
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1.2rem;
      font-size: 1.4rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.8rem;
    }
    
    .facture-details {
      margin-bottom: 1.5rem;
      color: #555;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .facture-details p {
      margin: 0.5rem 0;
    }
    
    .facture-details strong {
      color: #2c3e50;
    }
    
    .btn-download {
      background: linear-gradient(135deg, #27ae60, #2ecc71);
      padding: 0.8rem 1.5rem;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .btn-download:hover {
      background: linear-gradient(135deg, #219150, #27ae60);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .btn-download:active {
      transform: translateY(0);
    }
    
    .no-factures {
      text-align: center;
      font-size: 1.2rem;
      color: #888;
      margin-top: 3rem;
      padding: 2rem;
      background-color: #f9f9f9;
      border-radius: 10px;
      border: 1px dashed #ddd;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      
      .search-bar {
        flex-direction: column;
        align-items: stretch;
      }
      
      .facture-details {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class FacturesMentorComponent implements OnInit {
  factures: any[] = [];
  filteredFactures: any[] = [];
  currentUserId: number | null = null;
  searchDate: string = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId();
    if (this.currentUserId !== null) {
      this.loadFactures();
    }
  }

  loadFactures() {
    this.apiService.getMentorInvoices(this.currentUserId!).subscribe((invoices) => {
      const seenPresenceIds = new Set();
      this.factures = invoices.filter((invoice) => {
        if (seenPresenceIds.has(invoice.presence_id)) {
          return false;
        } else {
          seenPresenceIds.add(invoice.presence_id);
          return true;
        }
      });
      this.filteredFactures = [...this.factures]; // Par défaut on affiche tout
    });
  }

  getDownloadLink(invoiceId: number) {
    return this.apiService.getInvoiceDownloadLink(invoiceId);
  }

  filterFactures() {
    if (this.searchDate) {
      this.filteredFactures = this.factures.filter(facture => {
        const factureDate = new Date(facture.date).toISOString().split('T')[0];
        return factureDate === this.searchDate;
      });
    }
  }

  resetFilter() {
    this.searchDate = '';
    this.filteredFactures = [...this.factures];
  }
}
