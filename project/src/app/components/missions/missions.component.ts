import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { Mission } from '../../models/user.model';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gestion des Missions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="missions" class="full-width">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Titre</th>
              <td mat-cell *matCellDef="let mission">{{mission.title}}</td>
            </ng-container>

            <ng-container matColumnDef="startDate">
              <th mat-header-cell *matHeaderCellDef>Date de début</th>
              <td mat-cell *matCellDef="let mission">{{mission.startDate | date}}</td>
            </ng-container>

            <ng-container matColumnDef="endDate">
              <th mat-header-cell *matHeaderCellDef>Date de fin</th>
              <td mat-cell *matCellDef="let mission">{{mission.endDate | date}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let mission">{{mission.status}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let mission">
                <button mat-icon-button color="primary" (click)="editMission(mission)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteMission(mission)">
                  <mat-icon>delete</mat-icon>
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
export class MissionsComponent implements OnInit {
  missions: Mission[] = [];
  displayedColumns: string[] = ['title', 'startDate', 'endDate', 'status', 'actions'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMissions();
  }

  loadMissions() {
    this.apiService.getMissions().subscribe(missions => {
      this.missions = missions;
    });
  }

  editMission(mission: Mission) {
    // TODO: Implement edit mission functionality
    console.log('Edit mission:', mission);
  }

  deleteMission(mission: Mission) {
    // TODO: Implement delete mission functionality
    console.log('Delete mission:', mission);
  }
}