import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-list">
      <h1>Liste des Utilisateurs</h1>

      <table *ngIf="users.length > 0; else noUsers">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.name }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button (click)="editUser(user.id)">Modifier</button>
              <button (click)="deleteUser(user.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #noUsers>
        <p>Aucun utilisateur trouvé.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
    }
    th {
      background-color: #f2f2f2;
    }
    button {
      margin: 0 5px;
      padding: 5px 10px;
      background-color: #007bff;
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class UserListComponent {
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    });
  }

  editUser(id: number) {
    // Exemple de redirection ou ouverture d'une modale pour édition
    window.alert(`Fonctionnalité Modifier utilisateur ${id} (à implémenter)`);
  }

  deleteUser(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.apiService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      }, error => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      });
    }
  }
}
