import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <h1>Dashboard Admin</h1>

      <div class="stats">
        <div class="card">
          <h2>Total Utilisateurs</h2>
          <p>{{ totalUsers }}</p>
        </div>

        <!-- Tu pourras ajouter d'autres stats ici -->
      </div>

      <div class="actions">
        <button (click)="goToUsers()">Gérer les Utilisateurs</button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }
    .card {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      width: 200px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .actions button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .actions button:hover {
      background-color: #0056b3;
    }
  `]
})
export class AdminDashboardComponent {
  totalUsers = 0;

  constructor(private apiService: ApiService, private router: RouterModule) {}

  ngOnInit() {
    this.fetchTotalUsers();
  }

  fetchTotalUsers() {
    this.apiService.getUsers().subscribe(users => {
      this.totalUsers = users.length;
    }, error => {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    });
  }

  goToUsers() {
    window.location.href = '/admin/users';
  }
}
