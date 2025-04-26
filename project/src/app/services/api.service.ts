import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, Mission, TimeSheet, Invoice } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:8000/api"; // Laravel API URL

  constructor(private http: HttpClient) {}

  // User endpoints
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Mission endpoints
  getMissions(): Observable<any[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<any[]>(`${this.apiUrl}/missions`, { headers });
  }

  createMission(mission: Partial<Mission>): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/missions`, mission);
  }

  assignMission(mission: any): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(`${this.apiUrl}/missions`, mission, { headers });
  }

  updateMissionStatus(missionId: number, status: string): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.put(
      `${this.apiUrl}/missions/${missionId}/status`,
      { status },
      { headers }
    );
  }

  // TimeSheet endpoints
  submitTimeSheet(timeSheet: Partial<TimeSheet>): Observable<TimeSheet> {
    return this.http.post<TimeSheet>(`${this.apiUrl}/timesheets`, timeSheet);
  }

  approveTimeSheet(id: number): Observable<TimeSheet> {
    return this.http.patch<TimeSheet>(
      `${this.apiUrl}/timesheets/${id}/approve`,
      {}
    );
  }

  // Invoice endpoints
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/invoices`);
  }

  generateInvoice(presenceId: number) {
    const token = localStorage.getItem("token"); // Récupérer le jeton depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le jeton dans l'en-tête
    });

    return this.http.post<any>(
      `${this.apiUrl}/invoices/generate`, // Correction de l'URL
      { presenceId },
      { headers }
    );
  }

  submitPresence(presence: {
    date: string;
    time: string;
    cours: string;
    faith_declaration: boolean;
  }): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.post(`${this.apiUrl}/presence`, presence, { headers });
  }

  validatePresenceByConsultant(id: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.patch(
      `${this.apiUrl}/presences/${id}/validate/consultant`,
      {},
      { headers }
    );
  }

  validatePresenceByCertificateManager(id: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.patch(
      `${this.apiUrl}/presences/${id}/validate/certificate-manager`,
      {},
      { headers }
    );
  }

  validatePresenceByFinance(presenceId: number): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.put(
      `${this.apiUrl}/presences/${presenceId}/validate-by-finance`,
      {}, // Pas de corps nécessaire pour cette requête
      { headers }
    );
  }

  getPresences(): Observable<any[]> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.get<any[]>(`${this.apiUrl}/presences`, { headers });
  }

  getStatistics(): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.get<any>(`${this.apiUrl}/statistics`, { headers });
  }

  getUserPresences(): Observable<any[]> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.get<any[]>(`${this.apiUrl}/user-presences`, { headers });
  }

  getMentors(): Observable<any[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<any[]>(`${this.apiUrl}/mentors`, { headers });
  }

  getMentorMissions(): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.get(`${this.apiUrl}/mentor/missions`, { headers }); // Utiliser l'URL complète du backend
  }

  getPendingPresences(): Observable<any[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.apiUrl}/accountant/pending-presences`, {
      headers,
    });
  }

  validatePresencePayment(presenceId: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(
      `${this.apiUrl}/accountant/validate-payment/${presenceId}`,
      {},
      { headers }
    );
  }

  getConsultantValidatedPresences(): Observable<any[]> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/consultant-validated-presences`,
      { headers }
    );
  }

  getValidatedPresences(): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le token depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    });

    return this.http.get<any[]>(`${this.apiUrl}/presences/validated`, {
      headers,
    });
  }

  getNotifications(): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/notifications`, { headers });
  }
  sendInvoiceToMentor(id: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `${this.apiUrl}/invoices/${id}/send`,
      {},
      { headers }
    );
  }

  getInvoiceById(id: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/invoices/${id}`, { headers });
  }

  getMessagesWithUser(recipientId: number): Observable<any[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/messages/${recipientId}`, {
      headers,
    });
  }

  // 📤 Envoyer un message à un destinataire
  sendMessage(receiverId: number, message: string): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}/messages`, {
      receiver_id: receiverId,
      message: message,
      headers,
    });
  }
  // Récupérer les factures d'un mentor
  getMentorInvoices(mentorId: number): Observable<any[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/invoices/by-mentor/${mentorId}`,
      { headers }
    );
  }

  // Générer un lien de téléchargement pour une facture
  getInvoiceDownloadLink(invoiceId: number): string {
    return `${this.apiUrl}/invoices/${invoiceId}/download`;
  }
  
}
