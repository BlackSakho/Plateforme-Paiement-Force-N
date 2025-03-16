import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { TimeSheet } from '../../models/user.model';

@Component({
  selector: 'app-timesheets',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Feuilles de presence</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="timesheets" class="full-width">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let timesheet">{{timesheet.date | date}}</td>
            </ng-container>

            <ng-container matColumnDef="hours">
              <th mat-header-cell *matHeaderCellDef>Heures</th>
              <td mat-cell *matCellDef="let timesheet">{{timesheet.hours}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let timesheet">{{timesheet.status}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let timesheet">
                <button mat-icon-button color="primary" (click)="approveTimesheet(timesheet)" *ngIf="timesheet.status === 'pending'">
                  <mat-icon>check</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="rejectTimesheet(timesheet)" *ngIf="timesheet.status === 'pending'">
                  <mat-icon>close</mat-icon>
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
export class TimesheetsComponent implements OnInit {
  timesheets: TimeSheet[] = [];
  displayedColumns: string[] = ['date', 'hours', 'status', 'actions'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // TODO: Implement timesheet loading
  }

  approveTimesheet(timesheet: TimeSheet) {
    this.apiService.approveTimeSheet(timesheet.id).subscribe(() => {
      // Reload timesheets after approval
      // TODO: Implement reload logic
    });
  }

  rejectTimesheet(timesheet: TimeSheet) {
    // TODO: Implement reject timesheet functionality
    console.log('Reject timesheet:', timesheet);
  }
}