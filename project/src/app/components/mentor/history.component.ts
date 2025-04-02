/* import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container mx-auto p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <mat-icon class="mr-3 text-blue-600">history</mat-icon>
          Historique des Activités
        </h1>
        <p class="text-gray-600">Consultez l'historique complet des activités et transactions</p>
      </div>

      <mat-card class="mb-6 overflow-hidden">
        <mat-tab-group animationDuration="200ms" class="history-tabs">
          <!-- Onglet Présences -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">how_to_reg</mat-icon>
              Présences
              <span class="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {{attendanceRecords.length}}
              </span>
            </ng-template>

            <div class="p-4">
              <div *ngIf="isLoading" class="flex justify-center items-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
              </div>

              <div *ngIf="!isLoading && attendanceRecords.length === 0" 
                   class="text-center py-8 text-gray-500">
                <mat-icon class="text-6xl mb-4 opacity-50">event_busy</mat-icon>
                <p>Aucun enregistrement de présence trouvé</p>
              </div>

              <div *ngIf="!isLoading && attendanceRecords.length > 0" class="grid gap-4">
                <mat-card *ngFor="let record of attendanceRecords" 
                         class="attendance-card p-4 border-l-4"
                         [ngClass]="getAttendanceStatusClass(record.status)">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="flex items-center mb-2">
                        <mat-icon class="mr-2 text-blue-600">event</mat-icon>
                        <span class="text-lg font-semibold">{{record.course_name}}</span>
                      </div>
                      <p class="text-gray-600">
                        {{record.date | date:'fullDate'}} à {{record.time}}
                      </p>
                      <p class="mt-2" *ngIf="record.notes">
                        <mat-icon class="align-middle mr-1 text-gray-500">notes</mat-icon>
                        {{record.notes}}
                      </p>
                    </div>
                    <mat-chip-list>
                      <mat-chip [ngClass]="getStatusChipClass(record.status)">
                        {{record.status}}
                      </mat-chip>
                    </mat-chip-list>
                  </div>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Onglet Déclarations -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">verified</mat-icon>
              Déclarations
              <span class="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {{declarations.length}}
              </span>
            </ng-template>

            <div class="p-4">
              <div *ngIf="isLoading" class="flex justify-center items-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
              </div>

              <div *ngIf="!isLoading && declarations.length === 0" 
                   class="text-center py-8 text-gray-500">
                <mat-icon class="text-6xl mb-4 opacity-50">description_off</mat-icon>
                <p>Aucune déclaration trouvée</p>
              </div>

              <div *ngIf="!isLoading && declarations.length > 0" class="grid gap-4">
                <mat-card *ngFor="let declaration of declarations" class="declaration-card p-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="flex items-center mb-2">
                        <mat-icon class="mr-2 text-green-600">verified</mat-icon>
                        <span class="text-lg font-semibold">Déclaration de foi</span>
                      </div>
                      <p class="text-gray-600">
                        Soumise le {{declaration.submitted_at | date:'fullDate'}}
                      </p>
                      <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p class="text-gray-700 italic">
                          "{{declaration.declaration_text}}"
                        </p>
                      </div>
                    </div>
                    <mat-icon class="text-green-500" 
                             matTooltip="Déclaration validée"
                             *ngIf="declaration.verified">verified</mat-icon>
                  </div>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Onglet Transactions -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">payments</mat-icon>
              Transactions
              <span class="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                {{transactions.length}}
              </span>
            </ng-template>

            <div class="p-4">
              <div *ngIf="isLoading" class="flex justify-center items-center py-8">
                <mat-spinner diameter="40"></mat-spinner>
              </div>

              <div *ngIf="!isLoading && transactions.length === 0" 
                   class="text-center py-8 text-gray-500">
                <mat-icon class="text-6xl mb-4 opacity-50">account_balance_wallet</mat-icon>
                <p>Aucune transaction trouvée</p>
              </div>

              <div *ngIf="!isLoading && transactions.length > 0" class="grid gap-4">
                <mat-card *ngFor="let transaction of transactions" 
                         class="transaction-card p-4 border-l-4"
                         [ngClass]="getTransactionStatusClass(transaction.status)">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="flex items-center mb-2">
                        <mat-icon class="mr-2" [ngClass]="getTransactionIconClass(transaction.type)">
                          {{getTransactionIcon(transaction.type)}}
                        </mat-icon>
                        <span class="text-lg font-semibold">{{transaction.description}}</span>
                      </div>
                      <p class="text-gray-600">
                        {{transaction.date | date:'fullDate'}}
                      </p>
                      <p class="mt-2 font-semibold" 
                         [ngClass]="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'">
                        {{transaction.type === 'credit' ? '+' : '-'}}{{transaction.amount}} €
                      </p>
                    </div>
                    <mat-chip-list>
                      <mat-chip [ngClass]="getTransactionChipClass(transaction.status)">
                        {{transaction.status}}
                      </mat-chip>
                    </mat-chip-list>
                  </div>
                </mat-card>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .history-tabs {
      background: white;
      border-radius: 12px;
      overflow: hidden;
    }

    .attendance-card, .declaration-card, .transaction-card {
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    .attendance-card:hover, .declaration-card:hover, .transaction-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .border-l-4.border-blue-500 {
      border-left-color: #3b82f6;
    }

    .border-l-4.border-green-500 {
      border-left-color: #22c55e;
    }

    .border-l-4.border-red-500 {
      border-left-color: #ef4444;
    }

    .status-chip-present {
      background-color: #dcfce7 !important;
      color: #166534 !important;
    }

    .status-chip-absent {
      background-color: #fee2e2 !important;
      color: #991b1b !important;
    }

    .status-chip-late {
      background-color: #fef3c7 !important;
      color: #92400e !important;
    }

    .status-chip-completed {
      background-color: #dbeafe !important;
      color: #1e40af !important;
    }

    .status-chip-pending {
      background-color: #f3e8ff !important;
      color: #6b21a8 !important;
    }

    .mat-mdc-tab-group {
      border-radius: 12px;
      overflow: hidden;
    }

    .mat-mdc-tab {
      min-width: 160px !important;
    }

    .mat-mdc-card {
      border-radius: 16px !important;
      overflow: hidden;
    }
  `]
})
export class HistoryComponent implements OnInit {
  attendanceRecords: any[] = [];
  declarations: any[] = [];
  transactions: any[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.isLoading = true;

    // Charger les présences
    this.apiService.getTimeSheets().subscribe({
      next: (data) => {
        this.attendanceRecords = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des présences:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });

    // Charger les déclarations
    this.apiService.getDeclarations().subscribe({
      next: (data) => {
        this.declarations = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des déclarations:', error);
      }
    });

    // Charger les transactions
    this.apiService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des transactions:', error);
      }
    });
  }

  getAttendanceStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'present':
        return 'border-green-500';
      case 'absent':
        return 'border-red-500';
      case 'late':
        return 'border-yellow-500';
      default:
        return 'border-gray-500';
    }
  }

  getStatusChipClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'present':
        return 'status-chip-present';
      case 'absent':
        return 'status-chip-absent';
      case 'late':
        return 'status-chip-late';
      default:
        return '';
    }
  }

  getTransactionStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'border-green-500';
      case 'pending':
        return 'border-yellow-500';
      case 'failed':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  }

  getTransactionChipClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-chip-completed';
      case 'pending':
        return 'status-chip-pending';
      default:
        return '';
    }
  }

  getTransactionIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'credit':
        return 'add_circle';
      case 'debit':
        return 'remove_circle';
      default:
        return 'payments';
    }
  }

  getTransactionIconClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'credit':
        return 'text-green-600';
      case 'debit':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  }
} */