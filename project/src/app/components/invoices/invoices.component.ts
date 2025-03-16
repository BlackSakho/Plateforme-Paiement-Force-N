import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { Invoice } from '../../models/user.model';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gestion des Factures</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="invoices" class="full-width">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>N° Facture</th>
              <td mat-cell *matCellDef="let invoice">{{invoice.id}}</td>
            </ng-container>

            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Montant</th>
              <td mat-cell *matCellDef="let invoice">{{invoice.amount}} €</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let invoice">{{invoice.status}}</td>
            </ng-container>

            <ng-container matColumnDef="dueDate">
              <th mat-header-cell *matHeaderCellDef>Date d'échéance</th>
              <td mat-cell *matCellDef="let invoice">{{invoice.dueDate | date}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let invoice">
                <button mat-icon-button color="primary" (click)="viewInvoice(invoice)">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button color="accent" (click)="markAsPaid(invoice)" *ngIf="invoice.status === 'pending'">
                  <mat-icon>payment</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    table {
      width: 100%;
    }
  `]
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  displayedColumns: string[] = ['id', 'amount', 'status', 'dueDate', 'actions'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.apiService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  viewInvoice(invoice: Invoice) {
    // TODO: Implement view invoice functionality
    console.log('View invoice:', invoice);
  }

  markAsPaid(invoice: Invoice) {
    // TODO: Implement mark as paid functionality
    console.log('Mark invoice as paid:', invoice);
  }
}