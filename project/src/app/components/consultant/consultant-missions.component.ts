import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-consultant-missions",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Assigner une Mission</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="missionForm" (ngSubmit)="onSubmit()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Titre</mat-label>
                <input
                  matInput
                  formControlName="title"
                  placeholder="Titre de la mission"
                />
                <mat-error
                  *ngIf="missionForm.get('title')?.hasError('required')"
                >
                  Le titre est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Description</mat-label>
                <textarea
                  matInput
                  formControlName="description"
                  rows="3"
                  placeholder="Description de la mission"
                ></textarea>
                <mat-error
                  *ngIf="missionForm.get('description')?.hasError('required')"
                >
                  La description est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Date</mat-label>
                <input
                  matInput
                  [matDatepicker]="picker"
                  formControlName="date"
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="picker"
                ></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error
                  *ngIf="missionForm.get('date')?.hasError('required')"
                >
                  La date est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Heure</mat-label>
                <input matInput type="time" formControlName="time" />
                <mat-error
                  *ngIf="missionForm.get('time')?.hasError('required')"
                >
                  L'heure est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Mentor</mat-label>
                <mat-select formControlName="mentorId">
                  <mat-option
                    *ngFor="let mentor of mentors"
                    [value]="mentor.id"
                  >
                    {{ mentor.firstname }} {{ mentor.name }}
                  </mat-option>
                </mat-select>
                <mat-error
                  *ngIf="missionForm.get('mentorId')?.hasError('required')"
                >
                  Le mentor est requis
                </mat-error>
              </mat-form-field>
            </div>

            <div class="flex justify-end mt-4">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!missionForm.valid"
              >
                Assigner
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="mt-6">
        <mat-card-header>
          <mat-card-title>Liste des Missions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="missions" class="full-width">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Titre</th>
              <td mat-cell *matCellDef="let mission">{{ mission.title }}</td>
            </ng-container>

            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let mission">
                {{ mission.description }}
              </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let mission">
                {{ mission.date | date }}
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Statut</th>
              <td mat-cell *matCellDef="let mission">
                <span [ngClass]="getStatusClass(mission.status)">
                  {{ mission.status }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="mentor">
              <th mat-header-cell *matHeaderCellDef>Mentor</th>
              <td mat-cell *matCellDef="let mission">
                {{ mission.mentor?.firstname }} {{ mission.mentor?.name }}
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
        background-color: #f9f9f9;
        min-height: 100vh;
      }

      mat-card {
        margin-bottom: 24px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
      }

      mat-card-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #3f51b5;
      }

      form {
        margin-top: 16px;
      }

      mat-form-field {
        width: 100%;
      }

      .mat-form-field-infix {
        font-size: 14px;
      }

      .full-width {
        width: 100%;
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th.mat-header-cell {
        font-weight: bold;
        background-color: #e3f2fd;
        color: #333;
      }

      td.mat-cell {
        padding: 12px 8px;
      }

      .mat-row:nth-child(even) {
        background-color: #fafafa;
      }

      .status-pending {
        color: #ff9800;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: #fff3e0;
      }

      .status-active {
        color: #4caf50;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: #e8f5e9;
      }

      .status-completed {
        color: #2196f3;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
        background-color: #e3f2fd;
      }

      button[mat-raised-button] {
        padding: 8px 24px;
        font-weight: 600;
        font-size: 14px;
        border-radius: 6px;
      }

      @media (max-width: 768px) {
        .grid {
          grid-template-columns: 1fr !important;
        }
      }
    `,
  ],
})
export class ConsultantMissionsComponent implements OnInit {
  missions: any[] = [];
  mentors: any[] = [];
  missionForm: FormGroup;
  displayedColumns: string[] = [
    "title",
    "description",
    "date",
    "status",
    "mentor",
  ];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.missionForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      date: ["", Validators.required],
      time: ["", Validators.required],
      mentorId: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.loadMissions();
    this.loadMentors();
  }

  loadMentors() {
    this.apiService.getMentors().subscribe((mentors) => {
      this.mentors = mentors;
    });
  }

  loadMissions() {
    this.apiService.getMissions().subscribe((missions) => {
      this.missions = missions;
    });
  }

  onSubmit() {
    if (this.missionForm.valid) {
      const formValue = this.missionForm.value;
      const missionData = {
        title: formValue.title,
        description: formValue.description,
        date: formValue.date,
        time: formValue.time,
        mentor_id: formValue.mentorId,
        status: "pending",
      };

      this.apiService.assignMission(missionData).subscribe({
        next: (response) => {
          this.snackBar.open("Mission assignée avec succès", "Fermer", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          });
          this.loadMissions();
          this.missionForm.reset();
        },
        error: () => {
          this.snackBar.open(
            "Erreur lors de l'assignation de la mission",
            "Fermer",
            {
              duration: 3000,
              panelClass: ["error-snackbar"],
            }
          );
        },
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "pending":
        return "status-pending";
      case "active":
        return "status-active";
      case "completed":
        return "status-completed";
      default:
        return "";
    }
  }
}
