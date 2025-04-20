import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-wrapper">
        <div class="login-illustration">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
            alt="Register Illustration"
          />
        </div>

        <div class="login-card">
          <h2>Rejoignez <span>FORCE-N</span></h2>
          <p class="subtitle">Créez un compte pour accéder à votre espace</p>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                formControlName="firstname"
                placeholder="Votre prénom"
              />
            </div>

            <div class="form-group">
              <label for="name">Nom</label>
              <input
                type="text"
                id="name"
                formControlName="name"
                placeholder="Votre nom"
              />
            </div>

            <div class="form-group">
              <label for="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                formControlName="email"
                placeholder="votre@email.com"
              />
            </div>

            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                placeholder="********"
              />
            </div>

            <div class="form-group">
              <label for="role">Rôle</label>
              <select id="role" formControlName="role">
                <option value="mentor">Mentor</option>
                <option value="consultant">Consultant</option>
                <option value="comptable">Agent Comptable</option>
              </select>
            </div>

            <button
              type="submit"
              [disabled]="registerForm.invalid"
              class="btn-login"
            >
              S'inscrire
            </button>

            <p class="bottom-text">
              Vous avez déjà un compte ?
              <a routerLink="/login">Se connecter</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(to right, #ffffff, #f1f7ff);
        font-family: "Segoe UI", sans-serif;
        padding: 2rem;
      }

      .login-wrapper {
        display: flex;
        background-color: white;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        max-width: 900px;
        width: 100%;
        flex-direction: column;
      }

      @media (min-width: 768px) {
        .login-wrapper {
          flex-direction: row;
        }
      }

      .login-illustration {
        background-color: #f7f9fc;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      .login-illustration img {
        max-width: 100%;
        height: auto;
      }

      .login-card {
        flex: 1;
        padding: 2rem;
      }

      .login-card h2 {
        text-align: center;
        color: #0057a0;
        font-size: 2rem;
        margin-bottom: 10px;
      }

      .login-card h2 span {
        color: #f7941d;
      }

      .subtitle {
        text-align: center;
        color: #666;
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
      }

      .form-group input,
      .form-group select {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
      }

      .btn-login {
        width: 100%;
        padding: 0.9rem;
        background-color: #0057a0;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s ease;
      }

      .btn-login:hover {
        background-color: #003f7d;
      }

      .bottom-text {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.95rem;
      }

      .bottom-text a {
        color: #f7941d;
        text-decoration: none;
        font-weight: bold;
      }

      .bottom-text a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: ["", Validators.required],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      role: ["mentor", Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(["/dashboard"]);
        },
        error: (error) => {
          console.error("Registration failed:", error);
          if (error.status === 422) {
            const validationErrors = error.error.errors;
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                alert(`${key}: ${validationErrors[key].join(", ")}`);
              }
            }
          }
        },
      });
    }
  }
}
