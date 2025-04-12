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
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/missions`);
  }

  createMission(mission: Partial<Mission>): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/missions`, mission);
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

  generateInvoice(missionId: number): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/invoices/generate`, {
      missionId,
    });
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

  validatePresenceByFinance(id: number): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.patch(
      `${this.apiUrl}/presences/${id}/validate/finance`,
      {},
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
}
