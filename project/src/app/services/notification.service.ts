import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private apiUrl = "http://localhost:8000/api"; // URL de votre API Laravel

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    const token = localStorage.getItem("token"); // Récupérer le jeton depuis le stockage local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Ajouter le jeton dans l'en-tête
    });

    return this.http.get(`${this.apiUrl}/notifications`, { headers });
  }
}
