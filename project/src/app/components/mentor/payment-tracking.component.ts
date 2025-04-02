import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-payment-tracking',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule
  ],
  template: `
    <div class="container mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Card - Paiements en attente -->
        <mat-card class="bg-gradient-to-br from-orange-100 to-orange-50 transform hover:scale-105 transition-transform duration-300">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-orange-800 text-sm font-medium">En attente</p>
                <h3 class="text-3xl font-bold text-orange-900">{{pendingPayments.length}}</h3>
                <p class="text-orange-700 text-sm mt-1">Paiements à traiter</p>
              </div>
              <div class="bg-orange-200 p-3 rounded-full">
                <mat-icon class="text-orange-700">pending</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Card - Paiements validés -->
        <mat-card class="bg-gradient-to-br from-green-100 to-green-50 transform hover:scale-105 transition-transform duration-300">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-800 text-sm font-medium">Validés</p>
                <h3 class="text-3xl font-bold text-green-900">{{completedPayments.length}}</h3>
                <p class="text-green-700 text-sm mt-1">Paiements traités</p>
              </div>
              <div class="bg-green-200 p-3 rounded-full">
                <mat-icon class="text-green-700">check_circle</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Card - Montant total -->
        <mat-card class="bg-gradient-to-br from-blue-100 to-blue-50 transform hover:scale-105 transition-transform duration-300">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-800 text-sm font-medium">Total</p>
                <h3 class="text-3xl font-bold text-blue-900">{{totalAmount}} €</h3>
                <p class="text-blue-700 text-sm mt-1">Montant global</p>
              </div>
              <div class="bg-blue-200 p-3 rounded-full">
                <mat-icon class="text-blue-700">euro</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="mb-8">
        <mat-card-content>
          <mat-tab-group animationDuration="200ms">
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="mr-2">pending_actions</mat-icon>
                Paiements en attente
                <span class="ml-2 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                  {{pendingPayments.length}}
                </span>
              </ng-template>
              <div class="p-4">
                <table mat-table [dataSource]="pendingPayments" class="w-full">
                  <ng-container matColumnDef="student">
                    <th mat-header-cell *matHeaderCellDef>Étudiant</th>
                    <td mat-cell *matCellDef="let payment">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mr-3">
                          {{payment.student[0]}}
                        </div>
                        {{payment.student}}
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="amount">
                    <th mat-header-cell *matHeaderCellDef>Montant</th>
                    <td mat-cell *matCellDef="let payment" class="font-semibold">
                      {{payment.amount}} €
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="dueDate">
                    <th mat-header-cell *matHeaderCellDef>Date limite</th>
                    <td mat-cell *matCellDef="let payment">
                      <div class="flex items-center">
                        <mat-icon class="mr-2 text-gray-400">event</mat-icon>
                        {{payment.dueDate | date}}
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let payment">
                      <mat-chip-listbox>
                        <mat-chip [ngClass]="getStatusClass(payment.status)" class="status-chip">
                          <mat-icon class="mr-1">{{getStatusIcon(payment.status)}}</mat-icon>
                          {{payment.status}}
                        </mat-chip>
                      </mat-chip-listbox>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let payment">
                      <button mat-icon-button color="primary" (click)="markAsPaid(payment)"
                              class="hover:bg-blue-50 transition-colors duration-200">
                        <mat-icon>check_circle</mat-icon>
                      </button>
                      <button mat-icon-button color="warn"
                              class="hover:bg-red-50 transition-colors duration-200">
                        <mat-icon>notifications</mat-icon>
                      </button>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                      class="hover:bg-gray-50 transition-colors duration-200"></tr>
                </table>
              </div>
            </mat-tab>

            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="mr-2">history</mat-icon>
                Historique
                <span class="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {{completedPayments.length}}
                </span>
              </ng-template>
              <div class="p-4">
                <table mat-table [dataSource]="completedPayments" class="w-full">
                  <ng-container matColumnDef="student">
                    <th mat-header-cell *matHeaderCellDef>Étudiant</th>
                    <td mat-cell *matCellDef="let payment">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center mr-3">
                          {{payment.student[0]}}
                        </div>
                        {{payment.student}}
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="amount">
                    <th mat-header-cell *matHeaderCellDef>Montant</th>
                    <td mat-cell *matCellDef="let payment" class="font-semibold text-green-700">
                      {{payment.amount}} €
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="dueDate">
                    <th mat-header-cell *matHeaderCellDef>Date de paiement</th>
                    <td mat-cell *matCellDef="let payment">
                      <div class="flex items-center">
                        <mat-icon class="mr-2 text-gray-400">event_available</mat-icon>
                        {{payment.dueDate | date}}
                      </div>
                    </td>
                  </ng-container>

                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Statut</th>
                    <td mat-cell *matCellDef="let payment">
                      <mat-chip-listbox>
                        <mat-chip color="primary" selected class="status-chip">
                          <mat-icon class="mr-1">check_circle</mat-icon>
                          {{payment.status}}
                        </mat-chip>
                      </mat-chip-listbox>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                      class="hover:bg-gray-50 transition-colors duration-200"></tr>
                </table>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .status-pending {
      background-color: #fff3e0 !important;
      color: #e65100 !important;
    }
    .status-completed {
      background-color: #e8f5e9 !important;
      color: #2e7d32 !important;
    }
    .mat-mdc-card {
      border-radius: 16px;
      overflow: hidden;
    }
    .mat-column-actions {
      width: 100px;
    }
    .status-chip {
      display: flex !important;
      align-items: center !important;
      height: 28px !important;
      padding: 0 12px !important;
    }
    .mat-mdc-tab-group {
      border-radius: 12px;
      overflow: hidden;
    }
    .mat-mdc-tab {
      min-width: 160px !important;
    }
    .mat-mdc-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    .mat-mdc-header-cell {
      font-weight: 600;
      color: #374151;
    }
  `]
})
export class PaymentTrackingComponent implements OnInit {
  displayedColumns: string[] = ['student', 'amount', 'dueDate', 'status', 'actions'];
  pendingPayments: any[] = [];
  completedPayments: any[] = [];
  totalAmount = 0;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.isLoading = true;
    this.apiService.getInvoices().subscribe({
      next: (invoices) => {
        this.pendingPayments = invoices.filter(invoice => invoice.status === 'pending')
          .map(invoice => ({
            ...invoice,
            student: `${invoice.userId}`, // TODO: Get user name from user service
            status: 'En attente'
          }));

        this.completedPayments = invoices.filter(invoice => invoice.status === 'paid')
          .map(invoice => ({
            ...invoice,
            student: `${invoice.userId}`, // TODO: Get user name from user service
            status: 'Payé'
          }));

        this.totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des paiements', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'En attente' ? 'status-pending' : 'status-completed';
  }

  getStatusIcon(status: string): string {
    return status === 'En attente' ? 'pending' : 'check_circle';
  }

  markAsPaid(payment: any) {
    const updatedInvoice = {
      ...payment,
      status: 'paid'
    };

    this.apiService.updateInvoice(payment.id, updatedInvoice).subscribe({
      next: () => {
        this.snackBar.open('Paiement marqué comme effectué', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.loadPayments();
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de la mise à jour du paiement', 'Fermer', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
} 