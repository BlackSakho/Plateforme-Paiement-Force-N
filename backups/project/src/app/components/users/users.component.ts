import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Gestion des Utilisateurs</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="full-width">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nom</th>
              <td mat-cell *matCellDef="let user">{{user.firstName}} {{user.lastName}}</td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let user">{{user.email}}</td>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Rôle</th>
              <td mat-cell *matCellDef="let user">{{user.role}}</td>
            </ng-container>

            <ng-container matColumnDef="rate">
              <th mat-header-cell *matHeaderCellDef>Taux</th>
              <td mat-cell *matCellDef="let user">{{user.rate}} €/jour</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="primary" (click)="editUser(user)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteUser(user)">
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
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'rate', 'actions'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: User) {
    // TODO: Implement edit user functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    // TODO: Implement delete user functionality
    console.log('Delete user:', user);
  }
}