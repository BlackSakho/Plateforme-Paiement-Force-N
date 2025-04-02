import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../../services/api.service";
import { MentorNavbarComponent } from "./mentor-navbar/mentor-navbar.component";

@Component({
  selector: "app-attendance-form",
  standalone: true,
  imports: [
    MentorNavbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <app-mentor-navbar></app-mentor-navbar>
    <div class="container mx-auto p-6">
      <mat-card class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <mat-card-header
          class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl"
        >
          <mat-card-title class="text-2xl font-bold">
            <mat-icon class="mr-2 align-middle">how_to_reg</mat-icon>
            Formulaire de Présence
          </mat-card-title>
          <mat-card-subtitle class="text-blue-100 mt-2">
            Enregistrez la présence et les détails de la session
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content class="p-6">
          <form
            [formGroup]="attendanceForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <mat-form-field appearance="outline">
                <mat-label>Date de la session</mat-label>
                <input
                  matInput
                  [matDatepicker]="picker"
                  formControlName="date"
                />
                <mat-datepicker-toggle
                  matIconSuffix
                  [for]="picker"
                ></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error
                  *ngIf="attendanceForm.get('date')?.hasError('required')"
                >
                  La date est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Heure de la session</mat-label>
                <input matInput type="time" formControlName="time" />
                <mat-icon matSuffix>schedule</mat-icon>
                <mat-error
                  *ngIf="attendanceForm.get('time')?.hasError('required')"
                >
                  L'heure est requise
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Cours/Session</mat-label>
              <mat-select formControlName="cours">
                <mat-option *ngFor="let course of courses" [value]="course.id">
                  {{ course.name }}
                </mat-option>
              </mat-select>
              <mat-error
                *ngIf="attendanceForm.get('cours')?.hasError('required')"
              >
                Le cours est requis
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Notes/Commentaires</mat-label>
              <textarea
                matInput
                formControlName="notes"
                rows="4"
                placeholder="Ajoutez vos observations..."
                class="resize-none"
              ></textarea>
            </mat-form-field>

            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <mat-checkbox
                formControlName="faith_declaration"
                color="primary"
                class="block mb-2"
              >
                Je déclare sur l'honneur que les informations ci-dessus sont
                exactes
              </mat-checkbox>
              <p class="text-sm text-blue-600">
                <mat-icon class="align-middle mr-1" style="font-size: 16px"
                  >info</mat-icon
                >
                Cette déclaration sera horodatée et enregistrée avec votre
                soumission
              </p>
            </div>

            <div class="flex justify-end space-x-4">
              <button mat-stroked-button type="button" (click)="resetForm()">
                <mat-icon>clear</mat-icon>
                Annuler
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!attendanceForm.valid || isSubmitting"
                class="bg-gradient-to-r from-blue-600 to-blue-800"
              >
                <mat-icon>save</mat-icon>
                {{ isSubmitting ? "Enregistrement..." : "Enregistrer" }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .mat-mdc-card {
        margin-bottom: 2rem;
      }
      textarea {
        min-height: 100px;
      }
      .mat-icon {
        vertical-align: middle;
      }
    `,
  ],
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm: FormGroup;
  isSubmitting = false;
  courses = [
    { id: "mentorat", name: "Mentorat" },
    { id: "boot", name: "Bootcamp" },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.attendanceForm = this.fb.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
      cours: ["", Validators.required], // Correction ici
      notes: [""],
      faith_declaration: [false, Validators.requiredTrue], // Correction ici
    });
  }

  ngOnInit() {
    // Initialisation si nécessaire
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      this.isSubmitting = true;

      const presenceData = this.attendanceForm.value;

      this.apiService.submitPresence(presenceData).subscribe({
        next: (response) => {
          this.snackBar.open("Présence enregistrée avec succès", "Fermer", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          });
          this.resetForm();
        },
        error: (error) => {
          const errorMessage =
            error?.error?.message || "Erreur lors de l'enregistrement";
          this.snackBar.open(errorMessage, "Fermer", {
            duration: 3000,
            panelClass: ["error-snackbar"],
          });
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }

  resetForm() {
    this.attendanceForm.reset({
      date: "",
      time: "",
      cours: "",
      notes: "",
      faith_declaration: false,
    });
    this.attendanceForm.markAsPristine();
    this.attendanceForm.markAsUntouched();
  }
}
