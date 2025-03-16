import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Mission, TimeSheet, Invoice } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api'; // Laravel API URL

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
    return this.http.patch<TimeSheet>(`${this.apiUrl}/timesheets/${id}/approve`, {});
  }

  // Invoice endpoints
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/invoices`);
  }

  generateInvoice(missionId: number): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/invoices/generate`, { missionId });
  }

}