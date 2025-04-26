import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-box">
      <label *ngIf="recipients.length > 1">
        Destinataire :
        <select [(ngModel)]="recipientId" (change)="loadMessages()">
          <option *ngFor="let user of recipients" [value]="user.id">{{ user.name }}</option>
        </select>
      </label>

      <div class="messages">
        <div
          *ngFor="let msg of messages"
          [class.own]="msg.sender_id === currentUserId"
          class="message"
        >
          <strong *ngIf="msg.sender_id !== currentUserId">👤</strong>
          {{ msg.message }}
        </div>
      </div>

      <form (ngSubmit)="sendMessage()" class="chat-form">
        <input [(ngModel)]="messageText" name="message" required placeholder="Écrire un message..." />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  `,
  styles: [`
    .chat-box {
      border: 1px solid #ccc;
      padding: 1rem;
      max-width: 500px;
      margin: auto;
      border-radius: 8px;
    }
    .messages {
      height: 200px;
      overflow-y: auto;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .message {
      padding: 5px 10px;
      border-radius: 5px;
      background: #eee;
      max-width: 80%;
    }
    .message.own {
      align-self: flex-end;
      background: #cce5ff;
    }
    .chat-form {
      display: flex;
      gap: 10px;
    }
    input {
      flex: 1;
      padding: 8px;
    }
    button {
      padding: 8px 16px;
    }
    select {
      margin-bottom: 1rem;
      padding: 4px 8px;
    }
  `],
})
export class ChatBoxComponent implements OnInit {
  @Input() role!: 'mentor' | 'consultant' | 'comptable';

  messageText = '';
  messages: any[] = [];
  recipients: { id: number; name: string }[] = [];
  recipientId!: number;
  currentUserId!: number;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    const id = this.authService.getUserId();
    if (id) {
      this.currentUserId = id;
      this.setupRecipients();
    }
  }

  setupRecipients() {
    if (this.role === 'mentor') {
      // Récupérer les consultants liés au mentor
      this.http.get<any[]>(`${this.apiUrl}/consultants`).subscribe((res) => {
        this.recipients = res;
        if (res.length > 0) {
          this.recipientId = res[0].id;
          this.loadMessages();
        }
      });
    } else if (this.role === 'consultant') {
      // Récupérer mentor et comptable pour le consultant
      this.http.get<any[]>(`${this.apiUrl}/recipients-for-consultant`).subscribe((res) => {
        this.recipients = res;
        if (res.length > 0) {
          this.recipientId = res[0].id;
          this.loadMessages();
        }
      });
    } else if (this.role === 'comptable') {
      // Récupérer les consultants liés au comptable
      this.http.get<any[]>(`${this.apiUrl}/consultants`).subscribe((res) => {
        this.recipients = res;
        if (res.length > 0) {
          this.recipientId = res[0].id;
          this.loadMessages();
        }
      });
    }
  }

  loadMessages() {
    if (!this.recipientId) return;
    this.http
      .get<any[]>(`${this.apiUrl}/messages/${this.recipientId}`)
      .subscribe((res) => (this.messages = res));
  }

  sendMessage() {
    if (!this.messageText.trim()) return;

    const payload = {
      receiver_id: this.recipientId,
      message: this.messageText,
    };

    this.http.post(`${this.apiUrl}/messages`, payload).subscribe((newMsg) => {
      this.messages.push(newMsg);
      this.messageText = '';
    });
  }
}
