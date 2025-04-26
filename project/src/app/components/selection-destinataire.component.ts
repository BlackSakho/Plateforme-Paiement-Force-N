import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-selection-destinataire',
  template: `
    <h2>Choisir un destinataire</h2>
    <ul>
      <li *ngFor="let user of recipients">
        <button (click)="openChat(user.id, user.name)">
          {{ user.name }}
        </button>
      </li>
    </ul>
  `,
})
export class SelectionDestinataireComponent implements OnInit {
  recipients: { id: number; name: string }[] = [];
  currentUserRole!: string;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUserRole = this.authService.getUserRole(); // à adapter selon ton AuthService
    this.loadRecipients();
  }

  loadRecipients() {
    let endpoint = '';
    if (this.currentUserRole === 'mentor' || this.currentUserRole === 'comptable') {
      endpoint = '/consultants';
    } else if (this.currentUserRole === 'consultant') {
      endpoint = '/recipients-for-consultant';
    }

    this.http.get<any[]>(`${this.apiUrl}${endpoint}`).subscribe((res) => {
      this.recipients = res;
    });
  }

  openChat(recipientId: number, recipientName: string) {
    this.router.navigate(['/messagerie', recipientId], {
      queryParams: { name: recipientName },
    });
  }
}
